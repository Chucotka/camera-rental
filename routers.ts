import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookingsByDateRange, getEquipmentById, getAllEquipment, getBookingsByUser, getAllBookings, updateBookingStatus, getOrdersByUser } from "./db";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { sendBookingConfirmation, sendAdminNotification, sendCancellationEmail, sendAdminCancellationNotification } from "./email";
import { sendBookingConfirmationSMS, sendCancellationSMS } from "./sms";

const stripe = new Stripe(ENV.stripeSecretKey);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  booking: router({
    createBooking: publicProcedure
      .input(
        z.object({
          equipmentId: z.number(),
          quantity: z.number().positive(),
          startDate: z.date(),
          endDate: z.date(),
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id || 0;
        const dayCount = Math.ceil(
          (input.endDate.getTime() - input.startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
        const equipment = await getEquipmentById(input.equipmentId);
        if (!equipment) throw new Error("Equipment not found");

        const totalPrice = equipment.pricePerDay * dayCount * input.quantity;

        const booking = await createBooking({
          userId,
          equipmentId: input.equipmentId,
          quantity: input.quantity,
          startDate: input.startDate,
          endDate: input.endDate,
          totalPrice,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          notes: input.notes,
          status: "pending",
        });

        if (!booking) throw new Error("Failed to create booking");

        // Send confirmation email to customer
        await sendBookingConfirmation({
          customerEmail: input.customerEmail,
          customerName: input.customerName,
          bookingId: booking.id,
          equipmentNames: [equipment.name],
          startDate: input.startDate,
          endDate: input.endDate,
          totalPrice,
          status: "pending",
        });

        // Send admin notification
        await sendAdminNotification(
          booking.id,
          input.customerEmail,
          input.customerName,
          totalPrice
        );

        // Send SMS confirmation if phone number provided
        if (input.customerPhone) {
          await sendBookingConfirmationSMS(
            input.customerPhone,
            input.customerName,
            booking.id,
            input.startDate,
            input.endDate,
            totalPrice
          );
        }

        return booking;
      }),

    getAvailability: publicProcedure
      .input(
        z.object({
          equipmentId: z.number(),
          startDate: z.date(),
          endDate: z.date(),
        })
      )
      .query(async ({ input }) => {
        const bookedDates = await getBookingsByDateRange(
          input.equipmentId,
          input.startDate,
          input.endDate
        );
        return { bookedDates };
      }),

    getEquipment: publicProcedure.query(async () => {
      return await getAllEquipment();
    }),

    getEquipmentById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return await getEquipmentById(input);
      }),

    getUserBookings: protectedProcedure.query(async ({ ctx }) => {
      return await getBookingsByUser(ctx.user.id);
    }),
  }),

  admin: router({
    getAllBookings: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      return await getAllBookings();
    }),

    updateBookingStatus: protectedProcedure
      .input(
        z.object({
          bookingId: z.number(),
          status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        return await updateBookingStatus(input.bookingId, input.status);
      }),

    cancelBooking: protectedProcedure
      .input(
        z.object({
          bookingId: z.number(),
          cancellationReason: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }

        const allBookings = await getAllBookings();
        const booking = allBookings.find(b => b.id === input.bookingId);

        if (!booking) {
          throw new Error('Booking not found');
        }

        const updatedBooking = await updateBookingStatus(input.bookingId, 'cancelled');

        if (!updatedBooking) {
          throw new Error('Failed to cancel booking');
        }

        const equipmentDetails = await getEquipmentById(booking.equipmentId);
        const equipmentName = equipmentDetails?.name || 'Unknown Equipment';

        await sendCancellationEmail(
          booking.customerEmail,
          booking.customerName,
          booking.id,
          [equipmentName],
          booking.startDate,
          booking.endDate,
          booking.totalPrice,
          input.cancellationReason
        );

        await sendAdminCancellationNotification(
          booking.id,
          booking.customerEmail,
          booking.customerName,
          booking.totalPrice,
          input.cancellationReason
        );

        // Send SMS cancellation if phone number available
        if (booking.customerPhone) {
          await sendCancellationSMS(
            booking.customerPhone,
            booking.customerName,
            booking.id,
            booking.totalPrice
          );
        }

        return updatedBooking;
      }),
  }),

  payment: router({
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          bookingId: z.number(),
          equipmentId: z.number(),
          quantity: z.number().positive(),
          startDate: z.date(),
          endDate: z.date(),
          totalPrice: z.number().positive(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = ctx.user;
        if (!user) throw new Error('User not authenticated');

        const equipment = await getEquipmentById(input.equipmentId);
        if (!equipment) throw new Error('Equipment not found');

        const dayCount = Math.ceil(
          (input.endDate.getTime() - input.startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          customer_email: user.email || undefined,
          client_reference_id: user.id.toString(),
          metadata: {
            user_id: user.id.toString(),
            booking_id: input.bookingId.toString(),
            equipment_id: input.equipmentId.toString(),
            customer_email: user.email || '',
            customer_name: user.name || '',
          },
          line_items: [
            {
              price_data: {
                currency: 'rub',
                product_data: {
                  name: equipment.name,
                  description: `${dayCount} дней x ${input.quantity} шт.`,
                },
                unit_amount: Math.round(input.totalPrice * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${ctx.req.headers.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin}/booking-cancel`,
          allow_promotion_codes: true,
        });

        return { sessionUrl: session.url };
      }),

    getCheckoutSession: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);
        return {
          id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_email,
          metadata: session.metadata,
        };
      }),

    getUserOrders: protectedProcedure.query(async ({ ctx }) => {
      const { getOrdersByUser } = await import('./db');
      return await getOrdersByUser(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;

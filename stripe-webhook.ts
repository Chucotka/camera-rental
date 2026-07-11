import express from "express";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { createOrder, updateOrderStatus, getOrderByStripePaymentIntentId, updateBookingStatus } from "./db";

const stripe = new Stripe(ENV.stripeSecretKey);

export function registerStripeWebhook(app: express.Express) {
  // Stripe webhook endpoint - MUST use raw body parser
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"] as string;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          ENV.stripeWebhookSecret
        );
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      console.log(`[Stripe Webhook] Received event: ${event.type}`);

      // Handle test events for verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      try {
        switch (event.type) {
          case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);

            // Check if order already exists
            let order = await getOrderByStripePaymentIntentId(paymentIntent.id);

            if (!order) {
              // Create new order
              const metadata = paymentIntent.metadata || {};
              order = await createOrder({
                userId: parseInt(metadata.user_id || "0"),
                stripePaymentIntentId: paymentIntent.id,
                stripeCustomerId: paymentIntent.customer as string,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                status: "succeeded",
                bookingId: parseInt(metadata.booking_id || "0"),
                customerEmail: metadata.customer_email || "",
                customerName: metadata.customer_name || "",
                metadata: JSON.stringify(metadata),
              });

              console.log(`[Stripe Webhook] Order created: ${order?.id}`);

              // Update booking status to confirmed
              if (metadata.booking_id) {
                await updateBookingStatus(parseInt(metadata.booking_id), "confirmed");
                console.log(`[Stripe Webhook] Booking confirmed: ${metadata.booking_id}`);
              }
            } else {
              // Update existing order status
              await updateOrderStatus(order.id, "succeeded");
              console.log(`[Stripe Webhook] Order status updated: ${order.id}`);
            }
            break;
          }

          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);

            const order = await getOrderByStripePaymentIntentId(paymentIntent.id);
            if (order) {
              await updateOrderStatus(order.id, "failed");
              console.log(`[Stripe Webhook] Order marked as failed: ${order.id}`);
            }
            break;
          }

          case "charge.refunded": {
            const charge = event.data.object as Stripe.Charge;
            console.log(`[Stripe Webhook] Charge refunded: ${charge.id}`);

            if (charge.payment_intent) {
              const order = await getOrderByStripePaymentIntentId(
                charge.payment_intent as string
              );
              if (order) {
                await updateOrderStatus(order.id, "cancelled");
                console.log(`[Stripe Webhook] Order cancelled due to refund: ${order.id}`);
              }
            }
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (error) {
        console.error("[Stripe Webhook] Error processing event:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
}

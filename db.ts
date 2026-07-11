import { eq, and, lte, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bookings, equipment, InsertBooking, Booking, orders, InsertOrder, Order } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createBooking(booking: InsertBooking): Promise<Booking | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create booking: database not available");
    return null;
  }

  try {
    await db.insert(bookings).values(booking);
    const created = await db.select().from(bookings).orderBy(bookings.id).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create booking:", error);
    throw error;
  }
}

export async function getBookingsByDateRange(equipmentId: number, startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.equipmentId, equipmentId),
          eq(bookings.status, "confirmed"),
          lte(bookings.startDate, endDate),
          gte(bookings.endDate, startDate)
        )
      );
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings:", error);
    throw error;
  }
}

export async function getEquipmentById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get equipment: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(equipment).where(eq(equipment.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get equipment:", error);
    throw error;
  }
}

export async function getAllEquipment() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get equipment: database not available");
    return [];
  }

  try {
    return await db.select().from(equipment);
  } catch (error) {
    console.error("[Database] Failed to get equipment:", error);
    throw error;
  }
}

export async function getBookingsByUser(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user bookings:", error);
    throw error;
  }
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }

  try {
    return await db.select().from(bookings).orderBy(bookings.createdAt);
  } catch (error) {
    console.error("[Database] Failed to get all bookings:", error);
    throw error;
  }
}

export async function updateBookingStatus(bookingId: number, status: "pending" | "confirmed" | "cancelled" | "completed") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update booking: database not available");
    return null;
  }

  try {
    await db.update(bookings).set({ status }).where(eq(bookings.id, bookingId));
    const updated = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update booking status:", error);
    throw error;
  }
}

// Order (Payment) functions
export async function createOrder(order: any): Promise<any | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create order: database not available");
    return null;
  }

  try {
    await db.insert(orders).values(order);
    const created = await db.select().from(orders).orderBy(orders.id).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create order:", error);
    throw error;
  }
}

export async function getOrderByStripePaymentIntentId(paymentIntentId: string): Promise<any | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order: database not available");
    return null;
  }

  try {
    const result = await db.select().from(orders).where(eq(orders.stripePaymentIntentId, paymentIntentId)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get order:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: number, status: "pending" | "succeeded" | "failed" | "cancelled"): Promise<any | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order: database not available");
    return null;
  }

  try {
    await db.update(orders).set({ status }).where(eq(orders.id, orderId));
    const updated = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update order status:", error);
    throw error;
  }
}

export async function getOrdersByUser(userId: number): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders: database not available");
    return [];
  }

  try {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user orders:", error);
    throw error;
  }
}

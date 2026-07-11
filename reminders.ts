import { getAllBookings, getEquipmentById } from './db';
import { sendDeliveryReminderSMS, sendReturnReminderSMS } from './sms';

/**
 * Scheduled reminder system for SMS notifications
 * Sends delivery and return reminders to customers
 */

/**
 * Send delivery reminders for bookings starting tomorrow
 * Should be called daily via a cron job
 */
export async function sendDeliveryReminders(): Promise<number> {
  try {
    const bookings = await getAllBookings();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    let remindersSent = 0;

    for (const booking of bookings) {
      // Check if booking starts tomorrow and has confirmed status
      if (
        booking.status === 'confirmed' &&
        new Date(booking.startDate).toDateString() === tomorrow.toDateString()
      ) {
        if (booking.customerPhone) {
          const sent = await sendDeliveryReminderSMS(
            booking.customerPhone,
            booking.customerName,
            booking.id,
            booking.startDate,
            '10:00'
          );

          if (sent) {
            remindersSent++;
            console.log(`[Reminders] Delivery reminder sent for booking #${booking.id}`);
          }
        }
      }
    }

    console.log(`[Reminders] Sent ${remindersSent} delivery reminders`);
    return remindersSent;
  } catch (error) {
    console.error('[Reminders] Error sending delivery reminders:', error);
    return 0;
  }
}

/**
 * Send return reminders for bookings ending tomorrow
 * Should be called daily via a cron job
 */
export async function sendReturnReminders(): Promise<number> {
  try {
    const bookings = await getAllBookings();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    let remindersSent = 0;

    for (const booking of bookings) {
      // Check if booking ends tomorrow and has confirmed or completed status
      if (
        (booking.status === 'confirmed' || booking.status === 'completed') &&
        new Date(booking.endDate).toDateString() === tomorrow.toDateString()
      ) {
        if (booking.customerPhone) {
          const sent = await sendReturnReminderSMS(
            booking.customerPhone,
            booking.customerName,
            booking.id,
            booking.endDate
          );

          if (sent) {
            remindersSent++;
            console.log(`[Reminders] Return reminder sent for booking #${booking.id}`);
          }
        }
      }
    }

    console.log(`[Reminders] Sent ${remindersSent} return reminders`);
    return remindersSent;
  } catch (error) {
    console.error('[Reminders] Error sending return reminders:', error);
    return 0;
  }
}

/**
 * Send all reminders (delivery + return)
 * Should be called once daily, preferably in the morning
 */
export async function sendAllReminders(): Promise<{ delivery: number; returns: number }> {
  console.log('[Reminders] Starting daily reminder cycle...');

  const deliveryCount = await sendDeliveryReminders();
  const returnCount = await sendReturnReminders();

  console.log(`[Reminders] Daily cycle complete. Delivery: ${deliveryCount}, Returns: ${returnCount}`);

  return {
    delivery: deliveryCount,
    returns: returnCount,
  };
}

/**
 * Initialize reminder scheduler
 * Call this once during server startup
 */
export function initializeReminderScheduler(): void {
  console.log('[Reminders] Reminder scheduler initialized');

  // Run reminders every day at 8:00 AM (UTC)
  // In production, use a proper job queue like Bull or node-cron
  const scheduleReminders = () => {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setUTCHours(8, 0, 0, 0);

    // If the scheduled time has already passed today, schedule for tomorrow
    if (now > scheduledTime) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilScheduled = scheduledTime.getTime() - now.getTime();

    console.log(`[Reminders] Next reminder cycle scheduled in ${Math.round(timeUntilScheduled / 1000 / 60)} minutes`);

    setTimeout(() => {
      sendAllReminders();
      // Reschedule for next day
      scheduleReminders();
    }, timeUntilScheduled);
  };

  // Start the scheduler
  scheduleReminders();
}

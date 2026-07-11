import twilio from 'twilio';

/**
 * SMS notification service using Twilio
 * Sends booking confirmations, cancellations, and delivery reminders
 */

const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  // If Twilio is not configured, return a mock client for development
  if (!accountSid || !authToken || !fromNumber) {
    console.warn(
      '[SMS Service] Twilio not configured. Using test mode. Configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER for production.'
    );

    return {
      messages: {
        create: async (options: any) => {
          console.log('[SMS Service - Test Mode]', {
            to: options.to,
            body: options.body,
          });
          return { sid: 'test-' + Date.now() };
        },
      },
    } as any;
  }

  return twilio(accountSid, authToken);
};

let twilioClient: any = null;

const getClient = () => {
  if (!twilioClient) {
    twilioClient = getTwilioClient();
  }
  return twilioClient;
};

/**
 * Format phone number to E.164 format (required by Twilio)
 * Assumes Russian phone numbers by default
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // If it starts with 7 or 8 (Russia), convert to +7
  if (cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.substring(1);
  }

  // Add + prefix if not present
  if (!cleaned.startsWith('+')) {
    if (!cleaned.startsWith('7')) {
      cleaned = '7' + cleaned;
    }
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

/**
 * Send booking confirmation SMS
 */
export async function sendBookingConfirmationSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  startDate: Date,
  endDate: Date,
  totalPrice: number
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const startDateStr = new Date(startDate).toLocaleDateString('ru-RU');
    const endDateStr = new Date(endDate).toLocaleDateString('ru-RU');

    const message = `KINORENTA: Ваше бронирование #${bookingId} подтверждено! Период: ${startDateStr} - ${endDateStr}. Сумма: ₽${totalPrice.toLocaleString('ru-RU')}. Спасибо за заказ!`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Booking confirmation sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending booking confirmation:', error);
    return false;
  }
}

/**
 * Send booking cancellation SMS
 */
export async function sendCancellationSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  totalPrice: number
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const message = `KINORENTA: Ваше бронирование #${bookingId} отменено. Возврат ₽${totalPrice.toLocaleString('ru-RU')} будет обработан в течение 3-5 дней. Вопросы: +7 (999) 999-99-99`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Cancellation SMS sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending cancellation SMS:', error);
    return false;
  }
}

/**
 * Send delivery reminder SMS
 */
export async function sendDeliveryReminderSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  deliveryDate: Date,
  deliveryTime?: string
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const deliveryDateStr = new Date(deliveryDate).toLocaleDateString('ru-RU');
    const timeStr = deliveryTime ? ` в ${deliveryTime}` : '';

    const message = `KINORENTA: Напоминание! Доставка оборудования (заказ #${bookingId}) запланирована на ${deliveryDateStr}${timeStr}. Убедитесь, что вы дома. Контакт: +7 (999) 999-99-99`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Delivery reminder sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending delivery reminder:', error);
    return false;
  }
}

/**
 * Send payment confirmation SMS
 */
export async function sendPaymentConfirmationSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  amount: number,
  transactionId: string
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const message = `KINORENTA: Платёж ₽${amount.toLocaleString('ru-RU')} за заказ #${bookingId} успешно обработан (ID: ${transactionId}). Спасибо!`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Payment confirmation sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending payment confirmation:', error);
    return false;
  }
}

/**
 * Send pickup reminder SMS
 */
export async function sendPickupReminderSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  pickupDate: Date,
  pickupLocation: string
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const pickupDateStr = new Date(pickupDate).toLocaleDateString('ru-RU');

    const message = `KINORENTA: Напоминание! Получение оборудования (заказ #${bookingId}) - ${pickupDateStr}. Адрес: ${pickupLocation}. Контакт: +7 (999) 999-99-99`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Pickup reminder sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending pickup reminder:', error);
    return false;
  }
}

/**
 * Send return reminder SMS
 */
export async function sendReturnReminderSMS(
  phoneNumber: string,
  customerName: string,
  bookingId: number,
  returnDate: Date
): Promise<boolean> {
  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

    const returnDateStr = new Date(returnDate).toLocaleDateString('ru-RU');

    const message = `KINORENTA: Напоминание! Срок возврата оборудования (заказ #${bookingId}) - ${returnDateStr}. Пожалуйста, верните оборудование вовремя. Контакт: +7 (999) 999-99-99`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(phoneNumber),
    });

    console.log('[SMS Service] Return reminder sent to:', phoneNumber, 'SID:', result.sid);
    return true;
  } catch (error) {
    console.error('[SMS Service] Error sending return reminder:', error);
    return false;
  }
}

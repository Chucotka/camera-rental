import nodemailer from 'nodemailer';
import { ENV } from './_core/env';

/**
 * Email service for sending booking confirmations and notifications
 * Uses Nodemailer with configurable SMTP settings
 */

// Create transporter with environment variables
// For development, you can use services like Ethereal or Mailtrap
// For production, configure real SMTP credentials
const createTransporter = () => {
  // Check if we have SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';

  // If SMTP is configured, use it
  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  // Fallback: use test account (for development only)
  console.warn(
    '[Email Service] SMTP not configured. Using test account. Configure SMTP_HOST, SMTP_USER, SMTP_PASSWORD for production.'
  );

  // Return a dummy transporter that logs instead of sending
  return {
    sendMail: async (options: any) => {
      console.log('[Email Service - Test Mode]', options);
      return { messageId: 'test-' + Date.now() };
    },
  } as any;
};

let transporter: any = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

export interface BookingEmailData {
  customerEmail: string;
  customerName: string;
  bookingId: number;
  equipmentNames: string[];
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;
}

export interface PaymentEmailData {
  customerEmail: string;
  customerName: string;
  bookingId: number;
  amount: number;
  paymentMethod: string;
  transactionId: string;
}

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';

    const startDateStr = new Date(data.startDate).toLocaleDateString('ru-RU');
    const endDateStr = new Date(data.endDate).toLocaleDateString('ru-RU');
    const daysCount = Math.ceil(
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
          .booking-details { background: #fff; padding: 15px; margin: 15px 0; border-left: 4px solid #e91e63; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .equipment-list { list-style: none; padding: 0; }
          .equipment-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
          .equipment-list li:last-child { border-bottom: none; }
          .footer { text-align: center; color: #999; font-size: 12px; padding: 20px 0; border-top: 1px solid #ddd; }
          .status { display: inline-block; padding: 8px 12px; border-radius: 4px; font-weight: bold; }
          .status.pending { background: #fff3cd; color: #856404; }
          .status.confirmed { background: #d4edda; color: #155724; }
          .button { display: inline-block; background: #e91e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINORENTA</h1>
            <p>Подтверждение бронирования</p>
          </div>

          <div class="content">
            <p>Здравствуйте, <strong>${data.customerName}</strong>!</p>
            <p>Спасибо за вашу заявку на бронирование оборудования. Мы рады подтвердить ваше бронирование.</p>

            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Номер бронирования:</span>
                <span class="value">#${data.bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Статус:</span>
                <span class="value">
                  <span class="status ${data.status === 'confirmed' ? 'confirmed' : 'pending'}">
                    ${data.status === 'confirmed' ? 'Подтверждено' : 'На рассмотрении'}
                  </span>
                </span>
              </div>
              <div class="detail-row">
                <span class="label">Период аренды:</span>
                <span class="value">${startDateStr} - ${endDateStr} (${daysCount} дн.)</span>
              </div>
              <div class="detail-row">
                <span class="label">Сумма:</span>
                <span class="value"><strong>₽${data.totalPrice.toLocaleString('ru-RU')}</strong></span>
              </div>
            </div>

            <h3>Оборудование:</h3>
            <ul class="equipment-list">
              ${data.equipmentNames.map(name => `<li>• ${name}</li>`).join('')}
            </ul>

            <p style="margin-top: 20px;">
              <strong>Что дальше?</strong><br>
              Наша команда свяжется с вами в ближайшее время для уточнения деталей доставки и подтверждения окончательной стоимости.
            </p>

            <p>Если у вас есть вопросы, свяжитесь с нами:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📞 +7 (999) 999-99-99</li>
              <li>📧 info@kinorenta.ru</li>
            </ul>
          </div>

          <div class="footer">
            <p>© 2026 KINORENTA. Все права защищены.</p>
            <p>Это автоматическое письмо. Пожалуйста, не отвечайте на него напрямую.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: smtpFrom,
      to: data.customerEmail,
      subject: `Подтверждение бронирования #${data.bookingId} - KINORENTA`,
      html: htmlContent,
      text: `
Подтверждение бронирования

Здравствуйте, ${data.customerName}!

Номер бронирования: #${data.bookingId}
Статус: ${data.status === 'confirmed' ? 'Подтверждено' : 'На рассмотрении'}
Период аренды: ${startDateStr} - ${endDateStr} (${daysCount} дн.)
Сумма: ₽${data.totalPrice.toLocaleString('ru-RU')}

Оборудование:
${data.equipmentNames.map(name => `• ${name}`).join('\n')}

Наша команда свяжется с вами в ближайшее время для уточнения деталей.

Контакты:
📞 +7 (999) 999-99-99
📧 info@kinorenta.ru

© 2026 KINORENTA
      `,
    });

    console.log('[Email Service] Booking confirmation sent to:', data.customerEmail, 'Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending booking confirmation:', error);
    return false;
  }
}

/**
 * Send payment confirmation email to customer
 */
export async function sendPaymentConfirmation(data: PaymentEmailData): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
          .payment-details { background: #d4edda; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .footer { text-align: center; color: #999; font-size: 12px; padding: 20px 0; border-top: 1px solid #ddd; }
          .success { color: #28a745; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINORENTA</h1>
            <p>Подтверждение платежа</p>
          </div>

          <div class="content">
            <p>Здравствуйте, <strong>${data.customerName}</strong>!</p>
            <p>Спасибо! Ваш платеж успешно обработан.</p>

            <div class="payment-details">
              <div class="detail-row">
                <span class="label">Статус платежа:</span>
                <span class="value"><span class="success">✓ Успешно</span></span>
              </div>
              <div class="detail-row">
                <span class="label">Номер бронирования:</span>
                <span class="value">#${data.bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Сумма:</span>
                <span class="value"><strong>₽${data.amount.toLocaleString('ru-RU')}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Способ оплаты:</span>
                <span class="value">${data.paymentMethod}</span>
              </div>
              <div class="detail-row">
                <span class="label">ID транзакции:</span>
                <span class="value">${data.transactionId}</span>
              </div>
            </div>

            <p>Ваше бронирование подтверждено и оплачено. Оборудование будет готово к отправке в указанную дату.</p>

            <p>Если у вас есть вопросы, свяжитесь с нами:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📞 +7 (999) 999-99-99</li>
              <li>📧 info@kinorenta.ru</li>
            </ul>
          </div>

          <div class="footer">
            <p>© 2026 KINORENTA. Все права защищены.</p>
            <p>Это автоматическое письмо. Пожалуйста, не отвечайте на него напрямую.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: smtpFrom,
      to: data.customerEmail,
      subject: `Подтверждение платежа - Бронирование #${data.bookingId}`,
      html: htmlContent,
      text: `
Подтверждение платежа

Здравствуйте, ${data.customerName}!

Ваш платеж успешно обработан.

Номер бронирования: #${data.bookingId}
Сумма: ₽${data.amount.toLocaleString('ru-RU')}
Способ оплаты: ${data.paymentMethod}
ID транзакции: ${data.transactionId}

Ваше бронирование подтверждено и оплачено.

Контакты:
📞 +7 (999) 999-99-99
📧 info@kinorenta.ru

© 2026 KINORENTA
      `,
    });

    console.log('[Email Service] Payment confirmation sent to:', data.customerEmail, 'Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending payment confirmation:', error);
    return false;
  }
}

/**
 * Send admin notification about new booking
 */
export async function sendAdminNotification(bookingId: number, customerEmail: string, customerName: string, totalPrice: number): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@kinorenta.ru';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .button { display: inline-block; background: #e91e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINORENTA - Новое бронирование</h1>
          </div>

          <div class="content">
            <p><strong>Поступило новое бронирование!</strong></p>

            <div style="background: #fff; padding: 15px; margin: 15px 0; border-left: 4px solid #e91e63;">
              <div class="detail-row">
                <span class="label">ID бронирования:</span>
                <span>#${bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Клиент:</span>
                <span>${customerName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span>${customerEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Сумма:</span>
                <span><strong>₽${totalPrice.toLocaleString('ru-RU')}</strong></span>
              </div>
            </div>

            <p>Перейдите в админ-панель для просмотра полной информации и управления бронированием.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      subject: `[KINORENTA] Новое бронирование #${bookingId}`,
      html: htmlContent,
      text: `
Новое бронирование

ID бронирования: #${bookingId}
Клиент: ${customerName}
Email: ${customerEmail}
Сумма: ₽${totalPrice.toLocaleString('ru-RU')}

Перейдите в админ-панель для управления бронированием.
      `,
    });

    console.log('[Email Service] Admin notification sent. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending admin notification:', error);
    return false;
  }
}


/**
 * Send booking cancellation email to customer
 */
export async function sendCancellationEmail(
  customerEmail: string,
  customerName: string,
  bookingId: number,
  equipmentNames: string[],
  startDate: Date,
  endDate: Date,
  totalPrice: number,
  cancellationReason?: string
): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';

    const startDateStr = new Date(startDate).toLocaleDateString('ru-RU');
    const endDateStr = new Date(endDate).toLocaleDateString('ru-RU');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
          .cancellation-details { background: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ff6b6b; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .equipment-list { list-style: none; padding: 0; }
          .equipment-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
          .equipment-list li:last-child { border-bottom: none; }
          .footer { text-align: center; color: #999; font-size: 12px; padding: 20px 0; border-top: 1px solid #ddd; }
          .warning { color: #ff6b6b; font-weight: bold; }
          .info-box { background: #e7f3ff; padding: 12px; border-left: 4px solid #2196F3; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINORENTA</h1>
            <p>Уведомление об отмене бронирования</p>
          </div>

          <div class="content">
            <p>Здравствуйте, <strong>${customerName}</strong>!</p>
            <p>К сожалению, ваше бронирование было отменено.</p>

            <div class="cancellation-details">
              <div class="detail-row">
                <span class="label">Номер бронирования:</span>
                <span class="value"><span class="warning">#${bookingId}</span></span>
              </div>
              <div class="detail-row">
                <span class="label">Статус:</span>
                <span class="value"><span class="warning">Отменено</span></span>
              </div>
              <div class="detail-row">
                <span class="label">Период аренды:</span>
                <span class="value">${startDateStr} - ${endDateStr}</span>
              </div>
              <div class="detail-row">
                <span class="label">Сумма возврата:</span>
                <span class="value"><strong>₽${totalPrice.toLocaleString('ru-RU')}</strong></span>
              </div>
            </div>

            <h3>Оборудование:</h3>
            <ul class="equipment-list">
              ${equipmentNames.map(name => `<li>• ${name}</li>`).join('')}
            </ul>

            ${cancellationReason ? `
            <div class="info-box">
              <strong>Причина отмены:</strong><br>
              ${cancellationReason}
            </div>
            ` : ''}

            <div class="info-box">
              <strong>Возврат средств:</strong><br>
              Если вы оплатили бронирование, возврат средств будет обработан в течение 3-5 рабочих дней на вашу карту.
            </div>

            <p>Если у вас есть вопросы по поводу отмены или возврата, пожалуйста, свяжитесь с нами:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📞 +7 (999) 999-99-99</li>
              <li>📧 info@kinorenta.ru</li>
            </ul>

            <p style="margin-top: 20px;">Мы надеемся, что в следующий раз сможем помочь вам с вашим проектом!</p>
          </div>

          <div class="footer">
            <p>© 2026 KINORENTA. Все права защищены.</p>
            <p>Это автоматическое письмо. Пожалуйста, не отвечайте на него напрямую.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: smtpFrom,
      to: customerEmail,
      subject: `Отмена бронирования #${bookingId} - KINORENTA`,
      html: htmlContent,
      text: `
Уведомление об отмене бронирования

Здравствуйте, ${customerName}!

К сожалению, ваше бронирование было отменено.

Номер бронирования: #${bookingId}
Статус: Отменено
Период аренды: ${startDateStr} - ${endDateStr}
Сумма возврата: ₽${totalPrice.toLocaleString('ru-RU')}

Оборудование:
${equipmentNames.map(name => `• ${name}`).join('\n')}

${cancellationReason ? `Причина отмены:\n${cancellationReason}\n` : ''}

Возврат средств:
Если вы оплатили бронирование, возврат средств будет обработан в течение 3-5 рабочих дней на вашу карту.

Контакты:
📞 +7 (999) 999-99-99
📧 info@kinorenta.ru

© 2026 KINORENTA
      `,
    });

    console.log('[Email Service] Cancellation email sent to:', customerEmail, 'Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending cancellation email:', error);
    return false;
  }
}

/**
 * Send admin notification about booking cancellation
 */
export async function sendAdminCancellationNotification(
  bookingId: number,
  customerEmail: string,
  customerName: string,
  totalPrice: number,
  cancellationReason?: string
): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const smtpFrom = process.env.SMTP_FROM || 'noreply@kinorenta.ru';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@kinorenta.ru';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .warning { color: #ff6b6b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINORENTA - Отмена бронирования</h1>
          </div>

          <div class="content">
            <p><strong>Бронирование было отменено!</strong></p>

            <div style="background: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ff6b6b;">
              <div class="detail-row">
                <span class="label">ID бронирования:</span>
                <span><span class="warning">#${bookingId}</span></span>
              </div>
              <div class="detail-row">
                <span class="label">Клиент:</span>
                <span>${customerName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span>${customerEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Сумма возврата:</span>
                <span><strong>₽${totalPrice.toLocaleString('ru-RU')}</strong></span>
              </div>
              ${cancellationReason ? `
              <div class="detail-row">
                <span class="label">Причина:</span>
                <span>${cancellationReason}</span>
              </div>
              ` : ''}
            </div>

            <p>Убедитесь, что возврат средств обработан, если бронирование было оплачено.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      subject: `[KINORENTA] Отмена бронирования #${bookingId}`,
      html: htmlContent,
      text: `
Отмена бронирования

ID бронирования: #${bookingId}
Клиент: ${customerName}
Email: ${customerEmail}
Сумма возврата: ₽${totalPrice.toLocaleString('ru-RU')}
${cancellationReason ? `Причина: ${cancellationReason}` : ''}

Убедитесь, что возврат средств обработан, если бронирование было оплачено.
      `,
    });

    console.log('[Email Service] Admin cancellation notification sent. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('[Email Service] Error sending admin cancellation notification:', error);
    return false;
  }
}

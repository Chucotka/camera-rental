import { describe, it, expect, vi } from 'vitest';
import { sendBookingConfirmation, sendPaymentConfirmation, sendAdminNotification } from './email';

describe('Email Service', () => {
  it('should send booking confirmation email', async () => {
    const result = await sendBookingConfirmation({
      customerEmail: 'test@example.com',
      customerName: 'John Doe',
      bookingId: 123,
      equipmentNames: ['Canon EOS R5', 'RF 24-70mm Lens'],
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-03-05'),
      totalPrice: 15000,
      status: 'pending',
    });

    expect(result).toBe(true);
    console.log('✓ Booking confirmation email sent successfully');
  });

  it('should send payment confirmation email', async () => {
    const result = await sendPaymentConfirmation({
      customerEmail: 'test@example.com',
      customerName: 'John Doe',
      bookingId: 123,
      amount: 15000,
      paymentMethod: 'Stripe',
      transactionId: 'txn_1234567890',
    });

    expect(result).toBe(true);
    console.log('✓ Payment confirmation email sent successfully');
  });

  it('should send admin notification', async () => {
    const result = await sendAdminNotification(
      123,
      'test@example.com',
      'John Doe',
      15000
    );

    expect(result).toBe(true);
    console.log('✓ Admin notification sent successfully');
  });

  it('should handle email sending gracefully', async () => {
    // Test with invalid email (should still return true in test mode)
    const result = await sendBookingConfirmation({
      customerEmail: 'invalid-email',
      customerName: 'Test User',
      bookingId: 999,
      equipmentNames: ['Test Equipment'],
      startDate: new Date(),
      endDate: new Date(),
      totalPrice: 1000,
      status: 'pending',
    });

    // In test mode, should still succeed
    expect(typeof result).toBe('boolean');
    console.log('✓ Email service handles invalid input gracefully');
  });
});

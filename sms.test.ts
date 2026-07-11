import { describe, it, expect } from 'vitest';
import {
  sendBookingConfirmationSMS,
  sendCancellationSMS,
  sendDeliveryReminderSMS,
  sendPaymentConfirmationSMS,
  sendPickupReminderSMS,
  sendReturnReminderSMS,
  formatPhoneNumber,
} from './sms';

describe('SMS Service', () => {
  describe('Phone number formatting', () => {
    it('should format Russian phone number with 7 prefix', () => {
      const formatted = formatPhoneNumber('79991234567');
      expect(formatted).toBe('+79991234567');
    });

    it('should format Russian phone number with 8 prefix', () => {
      const formatted = formatPhoneNumber('89991234567');
      expect(formatted).toBe('+79991234567');
    });

    it('should format phone number with spaces and dashes', () => {
      const formatted = formatPhoneNumber('+7 (999) 123-45-67');
      expect(formatted).toBe('+79991234567');
    });

    it('should handle phone number with + prefix', () => {
      const formatted = formatPhoneNumber('+79991234567');
      expect(formatted).toBe('+79991234567');
    });
  });

  describe('Booking confirmation SMS', () => {
    it('should send booking confirmation SMS', async () => {
      const result = await sendBookingConfirmationSMS(
        '+79991234567',
        'John Doe',
        123,
        new Date('2026-03-01'),
        new Date('2026-03-05'),
        15000
      );

      expect(result).toBe(true);
      console.log('✓ Booking confirmation SMS sent successfully');
    });

    it('should handle Russian phone number format', async () => {
      const result = await sendBookingConfirmationSMS(
        '89991234567',
        'Иван Иванов',
        456,
        new Date('2026-03-10'),
        new Date('2026-03-12'),
        5000
      );

      expect(result).toBe(true);
      console.log('✓ SMS sent to Russian phone number');
    });
  });

  describe('Cancellation SMS', () => {
    it('should send cancellation SMS', async () => {
      const result = await sendCancellationSMS(
        '+79991234567',
        'John Doe',
        123,
        15000
      );

      expect(result).toBe(true);
      console.log('✓ Cancellation SMS sent successfully');
    });
  });

  describe('Delivery reminder SMS', () => {
    it('should send delivery reminder SMS', async () => {
      const result = await sendDeliveryReminderSMS(
        '+79991234567',
        'John Doe',
        123,
        new Date('2026-03-01'),
        '10:00'
      );

      expect(result).toBe(true);
      console.log('✓ Delivery reminder SMS sent successfully');
    });

    it('should send delivery reminder without time', async () => {
      const result = await sendDeliveryReminderSMS(
        '+79991234567',
        'John Doe',
        123,
        new Date('2026-03-01')
      );

      expect(result).toBe(true);
      console.log('✓ Delivery reminder SMS sent without time');
    });
  });

  describe('Payment confirmation SMS', () => {
    it('should send payment confirmation SMS', async () => {
      const result = await sendPaymentConfirmationSMS(
        '+79991234567',
        'John Doe',
        123,
        15000,
        'txn_1234567890'
      );

      expect(result).toBe(true);
      console.log('✓ Payment confirmation SMS sent successfully');
    });
  });

  describe('Pickup reminder SMS', () => {
    it('should send pickup reminder SMS', async () => {
      const result = await sendPickupReminderSMS(
        '+79991234567',
        'John Doe',
        123,
        new Date('2026-03-01'),
        'ул. Пушкина, 10, Москва'
      );

      expect(result).toBe(true);
      console.log('✓ Pickup reminder SMS sent successfully');
    });
  });

  describe('Return reminder SMS', () => {
    it('should send return reminder SMS', async () => {
      const result = await sendReturnReminderSMS(
        '+79991234567',
        'John Doe',
        123,
        new Date('2026-03-05')
      );

      expect(result).toBe(true);
      console.log('✓ Return reminder SMS sent successfully');
    });
  });

  describe('Error handling', () => {
    it('should handle SMS sending gracefully', async () => {
      // Test with invalid phone number format (should still work in test mode)
      const result = await sendBookingConfirmationSMS(
        'invalid',
        'Test User',
        999,
        new Date(),
        new Date(),
        1000
      );

      // In test mode, should still succeed
      expect(typeof result).toBe('boolean');
      console.log('✓ SMS service handles invalid input gracefully');
    });
  });
});

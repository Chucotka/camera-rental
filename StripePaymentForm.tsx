import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface StripePaymentFormProps {
  bookingId: number;
  equipmentId: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  onSuccess?: () => void;
}

export function StripePaymentForm({
  bookingId,
  equipmentId,
  quantity,
  startDate,
  endDate,
  totalPrice,
  onSuccess,
}: StripePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutMutation = trpc.payment.createCheckoutSession.useMutation();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const result = await createCheckoutMutation.mutateAsync({
        bookingId,
        equipmentId,
        quantity,
        startDate,
        endDate,
        totalPrice,
      });

      if (result.sessionUrl) {
        toast.success('Перенаправление на страницу оплаты...');
        window.open(result.sessionUrl, '_blank');
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Ошибка при создании платежа');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 border-t border-border pt-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm">Итого к оплате:</span>
        <span className="font-mono text-lg font-bold text-primary">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </span>
      </div>
      
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full rounded-none font-mono bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? 'Обработка...' : 'ОПЛАТИТЬ ЧЕРЕЗ STRIPE'}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center font-mono">
        Вы будете перенаправлены на безопасную страницу оплаты Stripe
      </p>
    </div>
  );
}

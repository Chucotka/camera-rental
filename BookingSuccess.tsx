import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function BookingSuccess() {
  const [location] = useLocation();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.split('?')[1]);
  const sessionId = params.get('session_id');

  const { data } = trpc.payment.getCheckoutSession.useQuery(
    { sessionId: sessionId || '' },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (data) {
      setSessionData(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-mono">ПЛАТЁЖ УСПЕШЕН</h1>
          <p className="text-muted-foreground">
            Спасибо за ваш заказ! Мы отправили подтверждение на ваш email.
          </p>
        </div>

        {!loading && sessionData && (
          <div className="bg-accent/50 p-4 rounded space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-mono">{sessionData.customer_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID сессии:</span>
              <span className="font-mono text-xs">{sessionData.id?.slice(0, 20)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Статус:</span>
              <span className="font-mono capitalize">{sessionData.payment_status}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Ваше бронирование активно. Администратор свяжется с вами для подтверждения деталей.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-primary hover:bg-primary/90 font-mono"
          >
            ВЕРНУТЬСЯ НА ГЛАВНУЮ
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full font-mono"
          >
            ПОСМОТРЕТЬ ДРУГОЕ ОБОРУДОВАНИЕ
          </Button>
        </div>
      </Card>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function BookingCancel() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-mono">ПЛАТЁЖ ОТМЕНЁН</h1>
          <p className="text-muted-foreground">
            Платёж был отменён. Ваше бронирование не было завершено.
          </p>
        </div>

        <div className="bg-accent/50 p-4 rounded">
          <p className="text-sm text-muted-foreground">
            Если это произошло по ошибке, вы можете попробовать снова. Ваши данные бронирования были сохранены.
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
            onClick={() => window.history.back()}
            className="w-full font-mono"
          >
            ВЕРНУТЬСЯ К БРОНИРОВАНИЮ
          </Button>
        </div>
      </Card>
    </div>
  );
}

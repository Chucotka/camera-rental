import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: orders, isLoading, error } = trpc.payment.getUserOrders.useQuery(
    undefined,
    { enabled: !!user }
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Пожалуйста, войдите в аккаунт</p>
          <Button onClick={() => setLocation("/")} className="bg-primary hover:bg-primary/90">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container px-4 md:px-0 py-12 md:py-20">
        <div className="mb-8">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-2" style={{fontWeight: 900}}>
            История платежей
          </h1>
          <p className="text-muted-foreground">Ваши заказы и платежи</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4 mb-6">
            <p className="text-red-500">Ошибка при загрузке заказов: {error.message}</p>
          </div>
        )}

        {!orders || orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">У вас пока нет заказов</p>
            <Button
              onClick={() => setLocation("/catalog")}
              className="bg-primary hover:bg-primary/90"
            >
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-bold">ID Заказа</th>
                  <th className="text-left py-4 px-4 font-bold">Дата</th>
                  <th className="text-left py-4 px-4 font-bold">Сумма</th>
                  <th className="text-left py-4 px-4 font-bold">Статус</th>
                  <th className="text-left py-4 px-4 font-bold">Email</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-card/50 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm">{order.id}</td>
                    <td className="py-4 px-4">
                      {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      {(order.amount / 100).toFixed(2)} {order.currency.toUpperCase()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded text-sm font-mono ${
                          order.status === "succeeded"
                            ? "bg-green-500/20 text-green-500"
                            : order.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : order.status === "failed"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-gray-500/20 text-gray-500"
                        }`}
                      >
                        {order.status === "succeeded"
                          ? "Успешно"
                          : order.status === "pending"
                          ? "В ожидании"
                          : order.status === "failed"
                          ? "Ошибка"
                          : "Отменено"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{order.customerEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

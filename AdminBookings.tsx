import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface Booking {
  id: number;
  equipmentId: number;
  customerName: string;
  customerEmail: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: BookingStatus;
  quantity: number;
  createdAt: Date;
}

export default function AdminBookings() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookingsQuery = trpc.admin.getAllBookings.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const updateStatusMutation = trpc.admin.updateBookingStatus.useMutation({
    onSuccess: () => {
      toast.success('Статус бронирования обновлён');
      getAllBookingsQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.message}`);
    },
  });

  const cancelBookingMutation = trpc.admin.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success('Бронирование отменено и клиент уведомлен');
      getAllBookingsQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Ошибка при отмене: ${error.message}`);
    },
  });

  useEffect(() => {
    if (getAllBookingsQuery.data) {
      const bookingsData = getAllBookingsQuery.data.map((b: any) => ({
        ...b,
        startDate: new Date(b.startDate),
        endDate: new Date(b.endDate),
        createdAt: new Date(b.createdAt),
      }));
      setBookings(bookingsData);
      setIsLoading(false);
    }
  }, [getAllBookingsQuery.data]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(b => b.status === statusFilter));
    }
  }, [bookings, statusFilter]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Доступ запрещён</h1>
          <p className="text-muted-foreground">Только администраторы могут просматривать эту страницу.</p>
        </Card>
      </div>
    );
  }

  const handleStatusChange = (bookingId: number, newStatus: BookingStatus) => {
    updateStatusMutation.mutate({ bookingId, status: newStatus });
  };

  const handleCancelBooking = (bookingId: number) => {
    const reason = prompt('Укажите причину отмены (опционально):');
    cancelBookingMutation.mutate({
      bookingId,
      cancellationReason: reason || undefined,
    });
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700';
      case 'confirmed':
        return 'bg-green-500/20 text-green-700';
      case 'cancelled':
        return 'bg-red-500/20 text-red-700';
      case 'completed':
        return 'bg-blue-500/20 text-blue-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    const labels: Record<BookingStatus, string> = {
      pending: 'Ожидание',
      confirmed: 'Подтверждено',
      cancelled: 'Отменено',
      completed: 'Завершено',
    };
    return labels[status];
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Управление бронированиями</h1>
          <p className="text-muted-foreground">Просмотр и управление всеми активными бронированиями оборудования</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <div className="w-48">
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">Фильтр по статусу</label>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus | 'all')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все бронирования</SelectItem>
                <SelectItem value="pending">Ожидание</SelectItem>
                <SelectItem value="confirmed">Подтверждено</SelectItem>
                <SelectItem value="cancelled">Отменено</SelectItem>
                <SelectItem value="completed">Завершено</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden">
          {isLoading || getAllBookingsQuery.isLoading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Загрузка бронирований...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Нет бронирований с выбранным статусом</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Клиент</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Даты</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Кол-во</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Сумма</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Статус</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-mono">#{booking.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{booking.customerName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{booking.customerEmail}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        <div className="flex flex-col gap-1">
                          <span>{format(booking.startDate, 'dd MMM yyyy', { locale: ru })}</span>
                          <span className="text-xs text-muted-foreground">до {format(booking.endDate, 'dd MMM yyyy', { locale: ru })}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground text-center">{booking.quantity}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-accent">{booking.totalPrice.toLocaleString()} ₽</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2 items-center">
                          <Select value={booking.status} onValueChange={(value) => handleStatusChange(booking.id, value as BookingStatus)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Ожидание</SelectItem>
                              <SelectItem value="confirmed">Подтверждено</SelectItem>
                              <SelectItem value="cancelled">Отменено</SelectItem>
                              <SelectItem value="completed">Завершено</SelectItem>
                            </SelectContent>
                          </Select>
                          {booking.status !== 'cancelled' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancelBookingMutation.isPending}
                            >
                              Отменить
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Всего бронирований</h3>
            <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Ожидание</h3>
            <p className="text-3xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Подтверждено</h3>
            <p className="text-3xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Общая сумма</h3>
            <p className="text-3xl font-bold text-accent">{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()} ₽</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

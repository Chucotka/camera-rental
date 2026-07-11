import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookingCalendar } from "./BookingCalendar";
import { StripePaymentForm } from "./StripePaymentForm";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface BookingFormProps {
  equipmentId: number;
  equipmentName: string;
  pricePerDay: number;
  onBookingSuccess?: () => void;
}

export function BookingForm({
  equipmentId,
  equipmentName,
  pricePerDay,
  onBookingSuccess,
}: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const { data: availability } = trpc.booking.getAvailability.useQuery(
    {
      equipmentId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
    { enabled: true }
  );

  const createBookingMutation = trpc.booking.createBooking.useMutation();

  const handleDateRangeSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Пожалуйста, выберите даты бронирования");
      return;
    }

    if (!customerName || !customerEmail) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    try {
      const booking = await createBookingMutation.mutateAsync({
        equipmentId,
        quantity,
        startDate,
        endDate,
        customerName,
        customerEmail,
        customerPhone,
        notes,
      });

      setBookingId(booking.id);
      setShowPayment(true);
      toast.success("Бронирование создано! Переходим к оплате...");
    } catch (error) {
      toast.error("Ошибка при создании бронирования. Пожалуйста, попробуйте еще раз.");
      console.error(error);
    }
  };

  const handlePaymentSuccess = () => {
    // Reset form
    setStartDate(null);
    setEndDate(null);
    setQuantity(1);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setNotes("");
    setBookingId(null);
    setShowPayment(false);
    onBookingSuccess?.();
  };

  const dayCount = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  const totalPrice = dayCount * pricePerDay * quantity;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Бронирование: {equipmentName}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <BookingCalendar
              onDateRangeSelect={handleDateRangeSelect}
              bookedDates={availability?.bookedDates?.map((d) => new Date(d)) || []}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dates Summary */}
            <div className="bg-accent/50 p-4 rounded space-y-2">
              <div>
                <Label className="text-sm text-muted-foreground">Начало аренды</Label>
                <p className="font-semibold">
                  {startDate ? startDate.toLocaleDateString("ru-RU") : "не выбрано"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Конец аренды</Label>
                <p className="font-semibold">
                  {endDate ? endDate.toLocaleDateString("ru-RU") : "не выбрано"}
                </p>
              </div>
              {dayCount > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">Количество дней: {dayCount}</p>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">Количество единиц</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1"
              />
            </div>

            {/* Customer Name */}
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ваше имя"
                className="mt-1"
                required
              />
            </div>

            {/* Customer Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
                required
              />
            </div>

            {/* Customer Phone */}
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="mt-1"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Дополнительные пожелания</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Расскажите о ваших специальных требованиях..."
                className="mt-1"
              />
            </div>

            {/* Price Summary */}
            {dayCount > 0 && (
              <div className="bg-primary/10 p-4 rounded space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Цена за день:</span>
                  <span>{pricePerDay.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Количество дней:</span>
                  <span>{dayCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Количество единиц:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-primary/20 pt-2">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {!showPayment ? (
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 font-mono"
                disabled={!startDate || !endDate || createBookingMutation.isPending}
              >
                {createBookingMutation.isPending ? "Создание бронирования..." : "ЗАБРОНИРОВАТЬ"}
              </Button>
            ) : null}

            {/* Payment Form */}
            {showPayment && bookingId && (
              <StripePaymentForm
                bookingId={bookingId}
                equipmentId={equipmentId}
                quantity={quantity}
                startDate={startDate!}
                endDate={endDate!}
                totalPrice={totalPrice}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}

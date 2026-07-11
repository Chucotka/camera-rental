import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BookingCalendarProps {
  onDateRangeSelect: (startDate: Date, endDate: Date) => void;
  bookedDates?: Date[];
  minDate?: Date;
}

export function BookingCalendar({
  onDateRangeSelect,
  bookedDates = [],
  minDate = new Date(),
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) =>
        bookedDate.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateDisabled = (date: Date) => {
    return date < minDate || isDateBooked(date);
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (isDateDisabled(selectedDate)) return;

    if (!startDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (!endDate) {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        setEndDate(selectedDate);
        onDateRangeSelect(startDate, selectedDate);
      }
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isDisabled = isDateDisabled(date);
      const isStart = startDate?.toDateString() === date.toDateString();
      const isEnd = endDate?.toDateString() === date.toDateString();
      const isInRange = isDateInRange(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`h-10 text-sm font-medium rounded transition-colors ${
            isDisabled
              ? "text-muted-foreground cursor-not-allowed opacity-50"
              : isStart || isEnd
              ? "bg-primary text-primary-foreground"
              : isInRange
              ? "bg-primary/20 text-foreground"
              : "hover:bg-accent text-foreground"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthYear = currentMonth.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{monthYear}</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>

        {/* Selected dates display */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="text-sm">
            <span className="font-medium">Начало:</span>{" "}
            {startDate ? startDate.toLocaleDateString("ru-RU") : "не выбрано"}
          </div>
          <div className="text-sm">
            <span className="font-medium">Конец:</span>{" "}
            {endDate ? endDate.toLocaleDateString("ru-RU") : "не выбрано"}
          </div>
          {startDate && endDate && (
            <div className="text-sm text-primary font-medium">
              Дней: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span>Выбранные даты</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive/50 rounded"></div>
            <span>Недоступно</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

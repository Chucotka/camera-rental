import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

interface FloatingBookingButtonProps {
  onBookingClick?: () => void;
}

export function FloatingBookingButton({ onBookingClick }: FloatingBookingButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBooking = () => {
    onBookingClick?.();
    // Scroll to equipment section
    document.getElementById("equipment-section")?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
  };

  const handleCall = () => {
    window.location.href = "tel:+79991234567";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/79991234567?text=Привет! Интересует аренда оборудования", "_blank");
  };

  return (
    <>
      {/* Floating Button Container - Mobile Only */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Call Button */}
            <button
              onClick={handleCall}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
              title="Позвонить"
            >
              <Phone className="w-6 h-6" />
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              title="Забронировать"
            >
              <span className="font-mono font-bold text-xs">БРН</span>
            </button>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 font-mono font-bold text-white ${
            isExpanded
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isExpanded ? "✕" : "≡"}
        </button>
      </div>

      {/* Overlay when menu is expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}

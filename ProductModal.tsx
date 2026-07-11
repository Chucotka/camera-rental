import { X } from 'lucide-react';
import { useState } from 'react';
import { Product, products } from '@/lib/data';
import { BookingForm } from './BookingForm';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [showBooking, setShowBooking] = useState(false);
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg border border-border shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between p-6 z-10">
          <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="flex justify-center bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Gallery */}
          {product.gallery && product.gallery.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">ГАЛЕРЕЯ</p>
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.map((img, idx) => (
                  <div key={idx} className="bg-muted rounded-lg overflow-hidden aspect-square">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Стоимость аренды</p>
            <p className="text-4xl font-bold text-accent">{product.price} ₽/ДЕНЬ</p>
          </div>

          {/* Category */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">КАТЕГОРИЯ</p>
            <p className="text-lg text-foreground">{getCategoryName(product.category)}</p>
          </div>

          {/* Specifications */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3">ХАРАКТЕРИСТИКИ</p>
            <ul className="space-y-2">
              {product.specs.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-foreground">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3">ОПИСАНИЕ</p>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {product.fullDescription || product.description}
            </p>
          </div>

          {/* Additional Info */}
          {product.additionalInfo && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">ДОПОЛНИТЕЛЬНО</p>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {product.additionalInfo}
              </p>
            </div>
          )}

          {/* Recommended Accessories */}
          {product.recommendedAccessories && product.recommendedAccessories.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">РЕКОМЕНДУЕМЫЕ АКСЕССУАРЫ</p>
              <div className="grid grid-cols-2 gap-4">
                {product.recommendedAccessories.map((accessoryId) => {
                  const accessory = products.find(p => p.id === accessoryId);
                  if (!accessory) return null;
                  return (
                    <div key={accessoryId} className="bg-muted rounded-lg p-3 hover:bg-accent/10 transition-colors cursor-pointer">
                      <div className="bg-background rounded mb-2 h-24 flex items-center justify-center overflow-hidden">
                        <img
                          src={accessory.image}
                          alt={accessory.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <p className="font-semibold text-foreground text-sm mb-1">{accessory.name}</p>
                      <p className="text-accent font-bold text-sm">{accessory.price} ₽/день</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Booking Form */}
          {showBooking && (
            <div className="border-t border-border pt-6">
              <BookingForm
                equipmentId={parseInt(product.id.split('-')[1]) || 1}
                equipmentName={product.name}
                pricePerDay={product.price}
                onBookingSuccess={() => {
                  setShowBooking(false);
                  onClose();
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
            {!showBooking && (
              <>
                <button
                  onClick={() => setShowBooking(true)}
                  className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  ЗАБРОНИРОВАТЬ
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-accent/10 transition-colors"
                >
                  Закрыть
                </button>
              </>
            )}
            {showBooking && (
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-accent/10 transition-colors"
              >
                Назад
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'Cameras': 'Камеры',
    'Lenses': 'Объективы',
    'Audio': 'Звук',
    'Lighting': 'Свет',
    'Grip': 'Грип',
    'Drones': 'Дроны',
  };
  return names[category] || category;
}

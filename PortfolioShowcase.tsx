import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
}

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  title?: string;
  description?: string;
}

export function PortfolioShowcase({ 
  items, 
  title = 'Примеры наших работ',
  description = 'Посмотрите примеры профессиональных видеопроизводств от Innoko Films'
}: PortfolioShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer bg-muted"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-2 text-sm font-semibold text-primary">{item.type}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for video preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="aspect-video bg-black">
              {selectedItem.videoUrl ? (
                <iframe
                  src={selectedItem.videoUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-6 bg-background">
              <div className="mb-2 text-sm font-semibold text-primary">{selectedItem.type}</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-muted-foreground">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

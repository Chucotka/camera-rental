import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onProductClick?.(product)}
      className="group relative bg-card border border-border overflow-hidden cut-corners transition-all duration-300 hover:border-primary/50 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden relative bg-black/50 flex items-center justify-center">
        <ResponsiveImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80 p-4 max-w-full max-h-full"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* HUD Overlay */}
        <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-primary"></div>
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-primary"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-primary"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-mono text-xs tracking-widest">
            [ПОДРОБНОСТИ]
          </div>
        </div>

      </div>

      {/* Content */}
        <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            //{product.category === 'Cameras' ? 'Камеры' : product.category === 'Lenses' ? 'Объективы' : product.category === 'Lighting' ? 'Освещение' : product.category === 'Audio' ? 'Звук' : product.category === 'Drones' ? 'Дроны' : 'Грип'}
          </div>
          <h3 className="text-xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="space-y-2">
          {product.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex items-center text-xs text-muted-foreground font-mono">
              <span className="w-1 h-1 bg-primary/50 mr-2"></span>
              {spec}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="font-mono text-lg font-bold">
            {product.price.toLocaleString()} ₽<span className="text-xs text-muted-foreground font-normal">/ДЕНЬ</span>
          </div>
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-none border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onProductClick?.(product);
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";

export default function Studio() {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const studioImages = [
    { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/ZPUtTvEDWIjlIMTs.jpg", alt: "Студия с зелёным экраном" },
    { src: "/images/studio-2.jpg", alt: "Студия с полной комплектацией - вид 2" },
    { src: "/images/studio-3.jpg", alt: "Студия с освещением - вид 3" },
    { src: "/images/studio-4.jpg", alt: "Съёмка в действии - вид 4" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % studioImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + studioImages.length) % studioImages.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation currentPage="production" />

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="container">
          <div className="space-y-4 mb-12">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться
            </button>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              НАША СТУДИЯ
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-mono">
              Профессиональная кинопроизводственная студия с полным спектром оборудования для реализации любых творческих проектов.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container">
          <div className="space-y-8">
            {/* Main Image */}
            <div className="relative aspect-video bg-card border border-border overflow-hidden">
              <img
                src={studioImages[currentImageIndex].src}
                alt={studioImages[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 border border-white/30 font-mono text-sm text-white">
                {currentImageIndex + 1} / {studioImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {studioImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold font-mono">Зелёный экран</h3>
              <p className="text-muted-foreground">
                Профессиональный зелёный экран для хромакея и спецэффектов. Идеален для любых типов видеопроизводства.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold font-mono">Профессиональное освещение</h3>
              <p className="text-muted-foreground">
                Полный набор студийного света Logocam и других производителей для идеального освещения сцены.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold font-mono">Полная комплектация</h3>
              <p className="text-muted-foreground">
                Камеры, объективы, микрофоны, стабилизаторы и все необходимое оборудование для профессиональной съёмки.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Готовы начать?
            </h2>
            <p className="text-xl text-muted-foreground font-mono">
              Забронируйте студию или запросите смету на нужное вам оборудование
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-14 px-8 text-lg">
                ЗАПРОСИТЬ СМЕТУ
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-primary/50 hover:bg-primary/10 font-mono h-14 px-8 text-lg">
                ЗАБРОНИРОВАТЬ СТУДИЮ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="font-mono font-bold text-sm"><span className="font-bold">KINORENTA</span> © 2026</div>
            <div className="flex items-center gap-6 font-mono text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Главная</a>
              <a href="/studio" className="hover:text-primary transition-colors">Студия</a>
              <a href="/contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

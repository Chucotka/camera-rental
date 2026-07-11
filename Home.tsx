import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { FloatingBookingButton } from "@/components/FloatingBookingButton";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Navigation } from "@/components/Navigation";
import { products, Product } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { COMPANY_PHONE, COMPANY_ADDRESS } from "@shared/const";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [, setLocation] = useLocation();

  // Featured products - only show 3-4 best cameras
  const featuredProducts = products.filter(p => p.category === "Cameras").slice(0, 4);

  const handleCatalogClick = () => {
    setLocation("/catalog");
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      <Navigation currentPage="home" />

      {/* BLOCK 1: Hero Section */}
      <section className="relative min-h-screen md:h-screen flex items-center pt-12 md:pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/nvSsKvlIdATSepor.png" 
            alt="Cinema Camera" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-0">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 items-start sm:items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                ПРОФЕССИОНАЛЬНЫЙ КИНОПРОКАТ
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500/50 bg-red-500/10 text-red-500 font-mono text-xs tracking-widest uppercase whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                СТУДИЯ INNOKO FILMS
              </div>
            </div>
            <h1 className="hero-tagline space-y-2 md:space-y-4">
              <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black" style={{fontWeight: 900, fontFamily: 'Montserrat, Oswald, -apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.1'}}>ВОПЛОЩАЙТЕ<br/>МЕЧТЫ</div>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl font-mono leading-relaxed">
              Экосистема для создания визуального контента. От аренды премиум-оборудования (RED) и классического продакшена до передовых AI-решений для кино и бизнеса.
            </p>
            
            {/* Three CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 pb-24 sm:pb-4">
              <button 
                onClick={handleCatalogClick}
                className="inline-flex items-center justify-center rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-9 sm:h-11 px-3 sm:px-5 text-xs sm:text-sm transition-colors flex-1 sm:flex-none"
              >
                КАТАЛОГ ОБОРУДОВАНИЯ <ArrowRight className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              <button 
                onClick={() => {
                  document.getElementById("production-block")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-none border border-primary bg-transparent hover:bg-primary/10 text-primary font-mono h-9 sm:h-11 px-3 sm:px-5 text-xs sm:text-sm transition-colors flex-1 sm:flex-none"
              >
                УСЛУГИ СТУДИИ <ArrowRight className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              <button 
                onClick={() => {
                  document.getElementById("ai-block")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-none border border-primary bg-transparent hover:bg-primary/10 text-primary font-mono h-9 sm:h-11 px-3 sm:px-5 text-xs sm:text-sm transition-colors flex-1 sm:flex-none"
              >
                ГЕНЕРАЦИЯ ИИ <ArrowRight className="ml-2 w-3 sm:w-4 h-3 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[10px] tracking-widest uppercase">Прокрутите</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* BLOCK 2: Services Hub Navigation */}
      <section className="py-12 md:py-20 border-t border-border bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 font-mono" style={{fontWeight: 800}}>ВЫБЕРИТЕ НАПРАВЛЕНИЕ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Rental Card */}
            <button
              onClick={handleCatalogClick}
              className="group border border-border bg-card/50 p-8 hover:border-primary/50 transition-all hover:bg-card cursor-pointer"
            >
              <div className="text-5xl mb-4">📷</div>
              <h3 className="text-xl md:text-2xl font-bold font-mono mb-3 text-left" style={{fontWeight: 800}}>ПРОКАТ ТЕХНИКИ</h3>
              <p className="text-sm md:text-base text-muted-foreground text-left mb-4">Аренда премиум-оборудования RED и профессиональной техники</p>
              <div className="flex items-center text-primary font-mono text-sm group-hover:translate-x-2 transition-transform">
                Перейти в каталог <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </button>

            {/* Production Card */}
            <button
              onClick={() => {
                document.getElementById("production-block")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group border border-border bg-card/50 p-8 hover:border-primary/50 transition-all hover:bg-card cursor-pointer"
            >
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl md:text-2xl font-bold font-mono mb-3 text-left" style={{fontWeight: 800}}>ВИДЕОПРОИЗВОДСТВО</h3>
              <p className="text-sm md:text-base text-muted-foreground text-left mb-4">Услуги студии, кино, реклама и профессиональное видеопроизводство</p>
              <div className="flex items-center text-primary font-mono text-sm group-hover:translate-x-2 transition-transform">
                Посмотреть услуги <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </button>

            {/* AI Lab Card */}
            <button
              onClick={() => {
                document.getElementById("ai-block")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group border border-border bg-card/50 p-8 hover:border-primary/50 transition-all hover:bg-card cursor-pointer"
            >
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl md:text-2xl font-bold font-mono mb-3 text-left" style={{fontWeight: 800}}>НЕЙРОСЕТИ</h3>
              <p className="text-sm md:text-base text-muted-foreground text-left mb-4">Генерация видео, VFX, сценарии и нейро-контент</p>
              <div className="flex items-center text-primary font-mono text-sm group-hover:translate-x-2 transition-transform">
                Узнать больше <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BLOCK 3: Rental Showcase - Featured Equipment Only */}
      <section id="rental-block" className="py-12 md:py-20 border-t border-border">
        <div className="container">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold font-mono" style={{fontWeight: 800}}>ИЗБРАННОЕ ОБОРУДОВАНИЕ</h2>
          </div>
          
          {/* Featured Products Grid - Only 3-4 items, no filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          <button 
            onClick={handleCatalogClick}
            className="inline-flex items-center justify-center rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-12 md:h-14 px-6 md:px-8"
          >
            ПЕРЕЙТИ В ПОЛНЫЙ КАТАЛОГ ПРОКАТА <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>

      {/* BLOCK 4: Production & Studio Showcase */}
      <section id="production-block" className="py-12 md:py-20 border-t border-border bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-0">
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              ПРОФЕССИОНАЛЬНОЕ ПРОИЗВОДствО
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-black mb-4 font-mono" style={{fontWeight: 900, fontFamily: 'Montserrat, Oswald, -apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.2', wordBreak: 'break-word', overflowWrap: 'break-word'}}>КИНОСТУДИЯ ИННОКО<br/>Полный цикл видеопроизводства</h2>
            <p className="text-base md:text-lg text-muted-foreground font-mono">Рекламные ролики, презентации, корпоративное и документальное кино, музыкальные клипы.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">📺</div>
              <h3 className="font-bold font-mono mb-2">Реклама</h3>
              <p className="text-sm text-muted-foreground">От 50 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-bold font-mono mb-2">Имидж видео</h3>
              <p className="text-sm text-muted-foreground">От 40 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">🎥</div>
              <h3 className="font-bold font-mono mb-2">Презентация</h3>
              <p className="text-sm text-muted-foreground">От 60 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">📹</div>
              <h3 className="font-bold font-mono mb-2">Документалка</h3>
              <p className="text-sm text-muted-foreground">От 100 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-bold font-mono mb-2">Художественный</h3>
              <p className="text-sm text-muted-foreground">От 120 000 ₽</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-mono">РЕКЛАМНЫЕ РОЛИКИ</h3>
              <p className="text-sm text-muted-foreground">Профессиональная съемка и производство рекламных видео для бизнеса</p>
              <p className="text-sm font-mono text-primary">50 000 - 100 000 ₽</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-mono">ИМИДЖ ВИДЕО</h3>
              <p className="text-sm text-muted-foreground">Создание фирменных видеороликов, презентаций и контента для социальных сетей</p>
              <p className="text-sm font-mono text-primary">40 000 - 80 000 ₽</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-mono">ДОКУМЕНТАЛЬНОЕ КИНО</h3>
              <p className="text-sm text-muted-foreground">Съемка и монтаж документальных фильмов и проектов</p>
              <p className="text-sm font-mono text-primary">100 000 - 300 000 ₽</p>
            </div>
          </div>

          <div className="relative border border-border overflow-hidden mb-12 md:mb-16 bg-black/50">
            <ResponsiveImage
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/nmFXRbgCdZoIIFoO.jpg"
              alt="Innoko Films Studio with Green Screen"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </div>

          <div className="max-w-2xl space-y-4">
            <h3 className="text-2xl font-bold font-mono">НАША СТУДИЯ</h3>
            <p className="text-base text-muted-foreground">Оборудованная профессиональная студия с зелёным экраном, профессиональным освещением и звукозаписывающей аппаратурой. Идеальна для любых видеопроектов.</p>
            <Button className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-12 md:h-14 px-6 md:px-8">
              ПОСМОТРЕТЬ ПОРТФОЛИО ПРОДАКШН <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* BLOCK 5: AI Lab Showcase */}
      <section id="ai-block" className="py-12 md:py-20 border-t border-border">
        <div className="container px-4 md:px-0">
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase mb-4" style={{fontSize: '0.7rem', letterSpacing: '0.15em'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              НОВОЕ НАПРАВЛЕНИЕ
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-black mb-4 font-mono" style={{fontWeight: 900, fontFamily: 'Montserrat, Oswald, -apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.2', wordBreak: 'break-word', overflowWrap: 'break-word'}}>НЕЙРО-КОНТЕНТ И ИИ-ЛАБОРАТОРИЯ</h2>
            <p className="text-base md:text-lg text-muted-foreground font-mono">От идеи до готового видео: сценарии, генерация видеоконтента, сложные визуальные спецэффекты и озвучка.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="border border-border bg-card/50 p-8 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold font-mono mb-4">Генерация видео</h3>
              <p className="text-sm text-muted-foreground mb-4">Создание видеоконтента с помощью AI</p>
              <p className="text-lg font-bold text-primary">От 5 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-8 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold font-mono mb-4">Компьютерная графика</h3>
              <p className="text-sm text-muted-foreground mb-4">Визуальные эффекты и обработка видео</p>
              <p className="text-lg font-bold text-primary">От 10 000 ₽</p>
            </div>
            <div className="border border-border bg-card/50 p-8 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold font-mono mb-4">Сценарии</h3>
              <p className="text-sm text-muted-foreground mb-4">Написание сценариев и текстов</p>
              <p className="text-lg font-bold text-primary">От 3 000 ₽</p>
            </div>
          </div>

          <button 
            onClick={() => setLocation("/ai-lab")}
            className="inline-flex items-center justify-center rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-12 md:h-14 px-6 md:px-8 transition-colors"
          >
            ВСЕ ВОЗМОЖНОСТИ ИИ-ЛАБОРАТОРИИ <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>

      {/* BLOCK 6: Lead Form */}
      <section className="py-12 md:py-20 border-t border-border bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-mono" style={{fontWeight: 800}}>СВЯЖИТЕСЬ С НАМИ</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-mono mb-2">Ваше имя</label>
                <input 
                  type="text" 
                  placeholder="Иван Петров"
                  className="w-full px-4 py-3 bg-card border border-border rounded font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono mb-2">Телефон</label>
                <input 
                  type="tel" 
                  placeholder="+7 (999) 999-99-99"
                  className="w-full px-4 py-3 bg-card border border-border rounded font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-mono mb-2">Выберите услугу</label>
                <select className="w-full px-4 py-3 bg-card border border-border rounded font-mono text-sm focus:outline-none focus:border-primary transition-colors">
                  <option>Аренда оборудования</option>
                  <option>Услуги студии</option>
                  <option>AI-услуги</option>
                </select>
              </div>

              <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-12 md:h-14">
                ОСТАВИТЬ ЗАЯВКУ
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold font-mono mb-2">Телефон</h4>
                <p className="text-muted-foreground">{COMPANY_PHONE}</p>
              </div>
              <div>
                <h4 className="font-bold font-mono mb-2">Email</h4>
                <p className="text-muted-foreground">info@kinorenta.ru</p>
              </div>
              <div>
                <h4 className="font-bold font-mono mb-2">Адрес</h4>
                <p className="text-muted-foreground">{COMPANY_ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <FloatingBookingButton />
    </div>
  );
}

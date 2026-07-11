import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Production() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<'studio' | 'professional' | 'ai'>('studio');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'professional') {
      setSelectedCategory('professional');
    } else if (tab === 'ai') {
      setSelectedCategory('ai');
    }
  }, []);

  const studioServices = [
    {
      id: 'studio-rental',
      title: 'Аренда студии',
      description: 'Полнофункциональная студия с зелёным экраном и профессиональным оборудованием',
      icon: '🎬',
      features: [
        'Зелёный экран (хромакей)',
        'Профессиональное освещение',
        'Все необходимое оборудование',
        'Техническая поддержка'
      ],
      price: 'От 5 000 ₽/час'
    },
    {
      id: 'photo-studio',
      title: 'Фотостудия',
      description: 'Профессиональная фотостудия для предметной съёмки и портретов',
      icon: '📸',
      features: [
        'Белый и чёрный фоны',
        'Студийное освещение',
        'Все необходимое оборудование',
        'Помощь оператора'
      ],
      price: 'От 3 000 ₽/час'
    },
    {
      id: 'equipment-rental',
      title: 'Аренда оборудования',
      description: 'Профессиональное кино и видеооборудование для аренды',
      icon: '🎥',
      features: [
        'Кинокамеры RED',
        'Профессиональные объективы',
        'Стабилизаторы и гимбалы',
        'Осветительное оборудование'
      ],
      price: 'От 1 000 ₽/день'
    }
  ];

  const professionalServices = [
    {
      id: 'commercial',
      title: 'Рекламные ролики',
      description: 'Профессиональная съёмка и производство рекламных видео',
      icon: '📺',
      features: [
        'Концепция и сценарий',
        'Профессиональная съёмка',
        'Монтаж и цветокоррекция',
        'Финальная обработка'
      ],
      price: 'От 50 000 ₽'
    },
    {
      id: 'film',
      title: 'Художественные фильмы',
      description: 'Создание короткометражных и полнометражных фильмов',
      icon: '🎭',
      features: [
        'Сценарий и режиссура',
        'Профессиональная съёмка',
        'Работа с актёрами',
        'Полный постпродакшн'
      ],
      price: 'От 120 000 ₽'
    },
    {
      id: 'documentary',
      title: 'Документальные фильмы',
      description: 'Создание документальных проектов и расследований',
      icon: '📹',
      features: [
        'Исследование и интервью',
        'Профессиональная съёмка',
        'Архивные материалы',
        'Монтаж и звук'
      ],
      price: 'От 100 000 ₽'
    }
  ];

  const aiServices = [
    {
      id: 'ai-generation',
      title: 'Генерация видео',
      description: 'Создание видеоконтента с помощью AI-моделей',
      icon: '🎬',
      features: [
        'AI-генерация видео',
        'Синтез персонажей',
        'Анимация',
        'Создание фонов'
      ],
      price: 'От 7 500 ₽'
    },
    {
      id: 'ai-vfx',
      title: 'VFX и эффекты',
      description: 'Спецэффекты с использованием AI-технологий',
      icon: '✨',
      features: [
        'Удаление объектов',
        'Добавление эффектов',
        'Цветокоррекция',
        'Композитинг'
      ],
      price: 'От 5 000 ₽'
    }
  ];

  const services = selectedCategory === 'studio' ? studioServices : selectedCategory === 'professional' ? professionalServices : aiServices;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage="production" />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="container px-4 md:px-0 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              УСЛУГИ ПРОДАКШНА
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] max-w-3xl" style={{fontWeight: 900, fontFamily: 'Montserrat, Oswald, -apple-system, BlinkMacSystemFont, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word'}}>
              КИНОСТУДИЯ ИННОКО<br/>ПОЛНЫЙ ЦИКЛ ВИДЕОПРОИЗВОДСТВА
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              От рекламных роликов до полнометражных фильмов. Полный цикл создания контента.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container px-4 md:px-0">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setSelectedCategory('studio')}
              className={`px-6 py-3 font-mono text-sm transition-all border ${
                selectedCategory === 'studio'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              СТУДИЯ
            </button>
            <button
              onClick={() => setSelectedCategory('professional')}
              className={`px-6 py-3 font-mono text-sm transition-all border ${
                selectedCategory === 'professional'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              КИНО И РЕКЛАМА
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-6 py-3 font-mono text-sm transition-all border ${
                selectedCategory === 'ai'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              НЕЙРОСЕТИ
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-8 border-border hover:border-primary transition-colors">
                <div className="space-y-4">
                  <div className="text-4xl">{service.icon}</div>
                  <h3 className="text-2xl font-bold font-mono" style={{fontWeight: 800}}>{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="font-mono font-bold text-lg text-primary">{service.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 border-t border-border bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono" style={{fontWeight: 900}}>ПОРТФОЛИО</h2>
              <p className="text-lg text-muted-foreground font-mono">Примеры наших работ в видеопроизводстве</p>
            </div>

            {/* Portfolio Videos Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Video 1 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-mono" style={{fontWeight: 800}}>Видеоклип - Алтай</h3>
                <p className="text-muted-foreground">Профессиональная съёмка и монтаж видеоклипа в живописных местах Алтая. Полный цикл производства от концепции до финальной обработки.</p>
                <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{aspectRatio: '16/9'}}>
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%23000' width='1280' height='720'/%3E%3C/svg%3E"
                  >
                    <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/hjmIsBOaisRXIdnQ.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border bg-card/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Готовы начать проект?
            </h2>
            <p className="text-xl text-muted-foreground font-mono">
              Свяжитесь с нами для обсуждения деталей вашего проекта
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                onClick={() => setLocation('/contacts')}
                size="lg" 
                className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-14 px-8 text-lg cursor-pointer"
              >
                ЗАПРОСИТЬ СМЕТУ <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => setLocation('/contacts')}
                size="lg" 
                variant="outline" 
                className="rounded-none border-primary/50 hover:bg-primary/10 font-mono h-14 px-8 text-lg cursor-pointer"
              >
                СВЯЗАТЬСЯ
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
              <a href="/production" className="hover:text-primary transition-colors">Продакшн</a>
              <a href="/contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

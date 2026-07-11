import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function AILab() {
  const [, setLocation] = useLocation();
  const aiServices = [
    {
      id: 'ai-generation',
      title: 'Генерация видео',
      description: 'Создание видеоконтента с помощью передовых AI-моделей',
      icon: '🎬',
      features: [
        'AI-генерация видео из текста',
        'Синтез лиц и голосов',
        'Анимация персонажей',
        'Создание фонов и сцен'
      ],
      price: 'От 7 500 ₽'
    },
    {
      id: 'ai-vfx',
      title: 'Компьютерная графика и спецэффекты',
      description: 'Профессиональные спецэффекты с использованием AI-технологий',
      icon: '✨',
      features: [
        'Удаление объектов',
        'Добавление эффектов',
        'Цветокоррекция',
        'Композитинг'
      ],
      price: 'От 5 000 ₽'
    },
    {
      id: 'ai-scenarios',
      title: 'Написание сценариев',
      description: 'AI-помощь в создании сценариев для видео и контента',
      icon: '📝',
      features: [
        'Генерация идей',
        'Написание диалогов',
        'Структурирование сюжета',
        'Адаптация под платформу'
      ],
      price: 'От 2 500 ₽'
    },
    {
      id: 'ai-voiceover',
      title: 'Озвучка и синтез речи',
      description: 'Профессиональная озвучка с синтезом речи и голосов',
      icon: '🎤',
      features: [
        'Синтез речи на 50+ языках',
        'Выбор голосов и эмоций',
        'Музыкальный фон',
        'Синхронизация с видео'
      ],
      price: 'От 1 500 ₽'
    },
    {
      id: 'ai-editing',
      title: 'Автоматический монтаж',
      description: 'Быстрый и профессиональный монтаж видео с AI',
      icon: '🎞️',
      features: [
        'Автоматический выбор кадров',
        'Синхронизация со звуком',
        'Добавление переходов',
        'Цветокоррекция'
      ],
      price: 'От 3 000 ₽'
    },
    {
      id: 'ai-content-creation',
      title: 'Полное производство контента',
      description: 'Полный цикл создания контента от идеи до публикации',
      icon: '🚀',
      features: [
        'Идея и концепция',
        'Сценарий и раскадровка',
        'Генерация видео',
        'Монтаж и публикация'
      ],
      price: 'От 20 000 ₽'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage="ai-lab" />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="container px-4 md:px-0 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              НЕЙРОСЕТИ
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]" style={{fontWeight: 800, wordBreak: 'break-word', overflowWrap: 'break-word'}}>
              НЕЙРО-КОНТЕНТ И ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              Передовые AI-технологии для создания видеоконтента, спецэффектов и полного производства. От идеи к готовому видео за часы, а не дни.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {aiServices.map((service) => (
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
      <section className="py-24 border-t border-border">
        <div className="container px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-12" style={{fontWeight: 800}}>
            Портфолио
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono" style={{fontWeight: 800}}>Пример работы: Генерация видео с помощью ИИ</h3>
              <p className="text-muted-foreground">Демонстрация возможностей AI-генерации видеоконтента. Видео создано полностью с использованием нейросетевых технологий.</p>
              <div className="relative w-full bg-black rounded overflow-hidden" style={{paddingBottom: '56.25%'}}>
                <video 
                  className="absolute inset-0 w-full h-full"
                  controls
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%23000' width='16' height='9'/%3E%3C/svg%3E"
                >
                  <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663246232073/jSyWbPdXJ7wfGWH9WRdnvP/8.03_v01.1_73d78e9b.mp4" type="video/mp4" />
                  Ваш браузер не поддерживает видео
                </video>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono" style={{fontWeight: 800}}>Пример работы: Визуальные эффекты и свет</h3>
              <p className="text-muted-foreground">Демонстрация AI-обработки визуальных эффектов, работы со светом и цветокоррекцией. Профессиональное качество обработки видеоконтента.</p>
              <div className="relative w-full bg-black rounded overflow-hidden" style={{paddingBottom: '56.25%'}}>
                <video 
                  className="absolute inset-0 w-full h-full"
                  controls
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%23000' width='16' height='9'/%3E%3C/svg%3E"
                >
                  <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663246232073/jSyWbPdXJ7wfGWH9WRdnvP/lights_6bda7ff4.mp4" type="video/mp4" />
                  Ваш браузер не поддерживает видео
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-border bg-card/50">
        <div className="container px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-12" style={{fontWeight: 800}}>
            Как это работает
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: '01', title: 'Идея', description: 'Обсудим вашу идею и концепцию проекта' },
              { step: '02', title: 'Планирование', description: 'Создадим план и сценарий с AI-помощью' },
              { step: '03', title: 'Создание', description: 'Используем AI-инструменты для производства' },
              { step: '04', title: 'Публикация', description: 'Финальная обработка и публикация контента' }
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="text-5xl font-bold text-primary/20">{item.step}</div>
                <h3 className="text-xl font-bold font-mono" style={{fontWeight: 800}}>{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{fontWeight: 800}}>
              Готовы создать контент будущего?
            </h2>
            <p className="text-xl text-muted-foreground font-mono">
              Свяжитесь с нами для консультации по AI-решениям для вашего проекта
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                onClick={() => setLocation('/contacts')}
                size="lg" 
                className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-14 px-8 text-lg cursor-pointer"
              >
                ЗАПРОСИТЬ КОНСУЛЬТАЦИЙ <ArrowRight className="ml-2 w-5 h-5" />
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
              <a href="/ai-lab" className="hover:text-primary transition-colors">AI-Лаборатория</a>
              <a href="/contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

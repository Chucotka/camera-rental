import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { aiContentServices, studioServices, professionalVideoServices } from "@/lib/services";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<'ai' | 'studio' | 'professional'>('ai');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'professional') {
      setSelectedCategory('professional');
    }
  }, []);

  const services = selectedCategory === 'ai' ? aiContentServices : selectedCategory === 'studio' ? studioServices : professionalVideoServices;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage="production" />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              НАШИ УСЛУГИ
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono space-y-2">
              <div>ПОЛНЫЙ СПЕКТР</div>
              <div className="text-primary">УСЛУГ</div>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl font-mono leading-relaxed">
              От аренды оборудования до создания контента с помощью нейросетей. Все, что нужно для вашего проекта.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-border py-8">
        <div className="container">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-6 py-3 font-mono text-sm transition-all ${
                selectedCategory === 'ai'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              🤖 AI КОНТЕНТ
            </button>
            <button
              onClick={() => setSelectedCategory('studio')}
              className={`px-6 py-3 font-mono text-sm transition-all ${
                selectedCategory === 'studio'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              🏢 СТУДИЯ
            </button>
            <button
              onClick={() => setSelectedCategory('professional')}
              className={`px-6 py-3 font-mono text-sm transition-all ${
                selectedCategory === 'professional'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              🎬 INNOKO FILMS
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="space-y-6">
                {/* Service Header */}
                <div className="space-y-3">
                  <div className="text-4xl">{service.icon}</div>
                  <h2 className="text-2xl font-bold font-mono">{service.title}</h2>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>

                {/* Packages */}
                <div className="space-y-4">
                  {service.packages.map((pkg) => (
                    <Card 
                      key={pkg.id}
                      className="p-6 border border-border hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      <div className="space-y-4">
                        {/* Package Header */}
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold font-mono">{pkg.name}</h3>
                              <p className="text-sm text-muted-foreground">{pkg.description}</p>
                            </div>
                            <span className="text-2xl">{pkg.icon}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="py-4 border-t border-border border-b">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold font-mono text-primary">
                              {pkg.basePrice.toLocaleString()}
                            </span>
                            <span className="text-lg font-mono text-muted-foreground">{pkg.currency}</span>
                            {pkg.duration && (
                              <span className="text-sm text-muted-foreground font-mono ml-auto">
                                / {pkg.duration}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Deliverables */}
                        {pkg.deliverables && pkg.deliverables.length > 0 && (
                          <div className="pt-4 border-t border-border">
                            <p className="text-xs font-mono text-muted-foreground uppercase mb-2">Включено:</p>
                            <ul className="space-y-1">
                              {pkg.deliverables.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA Button */}
                        <Button 
                          className="w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono group-hover:gap-2 transition-all"
                          onClick={() => {
                            const message = `Я заинтересован в услуге: ${service.title} - ${pkg.name}`;
                            window.location.href = `/contacts?message=${encodeURIComponent(message)}`;
                          }}
                        >
                          ЗАКАЗАТЬ
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-border bg-primary/5">
        <div className="container">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-mono">
              Не нашли подходящий пакет?
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы создаем индивидуальные решения под ваши нужды. Свяжитесь с нами для обсуждения вашего проекта.
            </p>
            <a href="/contacts" className="no-underline">
              <Button 
                size="lg"
                className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-14 px-8"
              >
                ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

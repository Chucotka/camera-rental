import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_ADDRESS } from "@shared/const";

export default function Contacts() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="container px-4 md:px-0">
          <div className="space-y-4 mb-12">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться
            </button>
            <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]" style={{fontWeight: 900}}>
              КОНТАКТЫ
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              Свяжитесь с нами для консультации или бронирования
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="border border-border bg-card/50 p-8">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-mono mb-2">Телефон</h3>
              <a href={`tel:${COMPANY_PHONE_RAW}`} className="text-primary hover:text-primary/80 transition-colors">
                {COMPANY_PHONE}
              </a>
            </div>
            <div className="border border-border bg-card/50 p-8">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-mono mb-2">Email</h3>
              <a href="mailto:info@kinorenta.ru" className="text-primary hover:text-primary/80 transition-colors">
                info@kinorenta.ru
              </a>
            </div>
            <div className="border border-border bg-card/50 p-8">
              <div className="w-12 h-12 border border-primary bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-mono mb-2">Адрес</h3>
              <p className="text-muted-foreground">
                {COMPANY_ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-24">
        <div className="container px-4 md:px-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono font-bold text-sm"><span className="font-bold">KINORENTA</span> © 2026</div>
            <div className="flex items-center gap-6 font-mono text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Главная</a>
              <a href="/contacts" className="hover:text-primary transition-colors">Контакты</a>
              <a href="/services" className="hover:text-primary transition-colors">Услуги</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

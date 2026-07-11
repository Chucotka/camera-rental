import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/jzBWMHOnpIwwVvcC.png" alt="KINORENTA" className="h-12 w-auto cursor-pointer" />
          </Link>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            <button onClick={() => {
              document.getElementById("equipment-section")?.scrollIntoView({ behavior: "smooth" });
            }} className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none">ОБОРУДОВАНИЕ</button>
            <Link href="/studio" className="hover:text-primary transition-colors">СТУДИЯ</Link>
            <a href="#" className="hover:text-primary transition-colors">УСЛУГИ</a>
            <Link href="/contacts" className="hover:text-primary transition-colors">КОНТАКТЫ</Link>
          </div>
          <Link href="/contacts" className="no-underline">
            <Button variant="outline" className="rounded-none font-mono text-xs border-primary/50 hover:bg-primary hover:text-primary-foreground">
              ЗАПРОСИТЬ СМЕТУ
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-mono">О НАС</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 font-mono text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Профессиональный прокат кинооборудования</h2>
              <p>
                KINORENTA — это ведущая компания по прокату профессионального кинооборудования в Рязани. 
                Мы специализируемся на предоставлении высокотехнологичного оборудования для кинопроизводства, 
                видеосъёмки и фотографии.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Наша история</h2>
              <p>
                С 2018 года мы помогаем творческим профессионалам и компаниям воплощать их видения в реальность. 
                Наша команда состоит из опытных специалистов, которые глубоко разбираются в технике и готовы 
                помочь вам выбрать оптимальное оборудование для вашего проекта.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Наши преимущества</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Широкий выбор профессионального оборудования</li>
                <li>Конкурентные цены на аренду</li>
                <li>Техническая поддержка 24/7</li>
                <li>Быстрая доставка и установка</li>
                <li>Гибкие условия аренды</li>
                <li>Страховка оборудования</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Наше оборудование</h2>
              <p>
                Мы предлагаем оборудование от ведущих мировых производителей:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Профессиональные кинокамеры (RED, Sony, Canon, Panasonic)</li>
                <li>Объективы различных фокусных расстояний</li>
                <li>Профессиональное освещение (LED, HMI, Tungsten)</li>
                <li>Звуковое оборудование</li>
                <li>Грип и стабилизация (штативы, гимбалы, краны)</li>
                <li>Дроны для аэросъёмки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Контактная информация</h2>
              <p>
                Адрес: Рязань, Россия<br/>
                Телефон: +7 (999) 000-00-00<br/>
                Email: rent@kinorenta.ru<br/>
                Режим работы: Пн-Вс, 9:00 - 22:00
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/jzBWMHOnpIwwVvcC.png" alt="KINORENTA" className="h-16 w-auto" />
              <p className="text-sm text-muted-foreground font-mono">
                Профессиональный прокат кинооборудования в Рязани. 
                Оснащаем творческие проекты с 2018 года.
              </p>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-4 uppercase text-sm">Оборудование</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                <li><a href="/" className="hover:text-primary">Камеры</a></li>
                <li><a href="/" className="hover:text-primary">Объективы</a></li>
                <li><a href="/" className="hover:text-primary">Освещение</a></li>
                <li><a href="/" className="hover:text-primary">Звук</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono font-bold mb-4 uppercase text-sm">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                <li><a href="/about" className="hover:text-primary">О нас</a></li>
                <li><a href="/terms" className="hover:text-primary">Условия аренды</a></li>
                <li><a href="/studio" className="hover:text-primary">Студия</a></li>
                <li><a href="/contacts" className="hover:text-primary">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono font-bold mb-4 uppercase text-sm">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                <li>Рязань, Россия</li>
                <li>+7 (999) 000-00-00</li>
                <li>rent@kinorenta.ru</li>
                <li className="pt-2 flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary">ВК</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">ТГ</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
            <div>© 2025 <span className="font-bold">KINORENTA</span>. Все права защищены.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

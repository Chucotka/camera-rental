import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <div className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2 cursor-pointer">
              <div className="w-3 h-3 bg-primary animate-pulse"></div>
              KINORENTA
            </div>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 font-mono">УСЛОВИЯ АРЕНДЫ</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 font-mono text-muted-foreground text-sm leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">ДОГОВОР ОБ АРЕНДЕ ОБОРУДОВАНИЯ</h2>
              <p className="text-xs text-muted-foreground italic">
                Последнее обновление: 01 февраля 2025 года
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h3>
              <p>
                Настоящий договор об аренде оборудования (далее — «Договор») заключается между компанией KINORENTA 
                (далее — «Арендодатель») и физическим или юридическим лицом (далее — «Арендатор»).
              </p>
              <p>
                Договор регулирует отношения между Арендодателем и Арендатором при аренде профессионального 
                кинооборудования и аксессуаров.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">2. ПРЕДМЕТ ДОГОВОРА</h3>
              <p>
                Арендодатель предоставляет Арендатору в аренду профессиональное кинооборудование, включая, 
                но не ограничиваясь:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Кинокамеры и видеокамеры</li>
                <li>Объективы и оптику</li>
                <li>Осветительное оборудование</li>
                <li>Звуковое оборудование</li>
                <li>Грип и стабилизацию</li>
                <li>Дроны и аксессуары</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">3. СРОКИ АРЕНДЫ</h3>
              <p>
                3.1. Минимальный срок аренды составляет 1 день (24 часа).
              </p>
              <p>
                3.2. Оборудование должно быть возвращено в установленный срок. Задержка возврата 
                оборудования влечёт за собой дополнительные расходы в размере 50% от суточной стоимости 
                аренды за каждый час задержки.
              </p>
              <p>
                3.3. При аренде на период более 7 дней предоставляется скидка 10%.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">4. СТОИМОСТЬ И ОПЛАТА</h3>
              <p>
                4.1. Стоимость аренды определяется в соответствии с прайс-листом Арендодателя и указывается 
                в договоре аренды.
              </p>
              <p>
                4.2. Оплата должна быть произведена до получения оборудования или в день получения 
                (по согласованию сторон).
              </p>
              <p>
                4.3. Принимаются следующие способы оплаты: банковский перевод, наличные, карта.
              </p>
              <p>
                4.4. При отмене аренды менее чем за 24 часа до начала периода аренды, Арендатор обязан 
                оплатить 50% от стоимости аренды.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">5. ЗАЛОГ И СТРАХОВКА</h3>
              <p>
                5.1. Арендатор обязан внести залог в размере 30% от стоимости арендуемого оборудования.
              </p>
              <p>
                5.2. Залог возвращается Арендатору после возврата оборудования в надлежащем состоянии 
                в течение 3 рабочих дней.
              </p>
              <p>
                5.3. Рекомендуется оформить страховку оборудования. Стоимость страховки составляет 5% 
                от суточной стоимости аренды.
              </p>
              <p>
                5.4. При наличии страховки Арендатель не несёт ответственность за повреждения и поломки 
                оборудования, произошедшие не по его вине.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">6. ОТВЕТСТВЕННОСТЬ АРЕНДАТОРА</h3>
              <p>
                6.1. Арендатор несёт полную ответственность за сохранность и надлежащее использование 
                арендуемого оборудования.
              </p>
              <p>
                6.2. При повреждении или потере оборудования Арендатор обязан возместить полную стоимость 
                ремонта или замены оборудования.
              </p>
              <p>
                6.3. Арендатор обязан использовать оборудование только в соответствии с его назначением 
                и инструкциями производителя.
              </p>
              <p>
                6.4. Арендатор не имеет права передавать оборудование третьим лицам без письменного 
                согласия Арендодателя.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">7. ТЕХНИЧЕСКАЯ ПОДДЕРЖКА</h3>
              <p>
                7.1. Арендодатель предоставляет техническую поддержку в течение всего периода аренды.
              </p>
              <p>
                7.2. При возникновении технических проблем Арендатор должен связаться с Арендодателем 
                по номеру телефона +7 (999) 000-00-00.
              </p>
              <p>
                7.3. В случае неисправности оборудования по вине Арендодателя, оборудование будет заменено 
                или отремонтировано бесплатно.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">8. ВОЗВРАТ ОБОРУДОВАНИЯ</h3>
              <p>
                8.1. Оборудование должно быть возвращено в состоянии, соответствующем его состоянию 
                при получении (с учётом нормального износа).
              </p>
              <p>
                8.2. Оборудование должно быть чистым и в полной комплектации.
              </p>
              <p>
                8.3. При возврате оборудования проводится проверка его состояния. Результаты проверки 
                фиксируются в акте приёма-передачи.
              </p>
              <p>
                8.4. Если оборудование возвращено не в полной комплектации, Арендатор обязан оплатить 
                стоимость недостающих предметов.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">9. ДОСТАВКА И САМОВЫВОЗ</h3>
              <p>
                9.1. Доставка оборудования осуществляется за дополнительную плату в размере 500 рублей 
                в пределах города Рязани.
              </p>
              <p>
                9.2. Самовывоз оборудования осуществляется бесплатно.
              </p>
              <p>
                9.3. Доставка за пределы города согласовывается отдельно.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">10. ПРЕКРАЩЕНИЕ ДОГОВОРА</h3>
              <p>
                10.1. Договор прекращается после возврата оборудования и расчёта между сторонами.
              </p>
              <p>
                10.2. Арендодатель имеет право расторгнуть договор в случае нарушения Арендатором 
                условий договора.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">11. КОНФИДЕНЦИАЛЬНОСТЬ</h3>
              <p>
                11.1. Обе стороны обязуются сохранять конфиденциальность информации, полученной в ходе 
                исполнения договора.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground mb-3">12. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h3>
              <p>
                12.1. Договор составляется в двух экземплярах, по одному для каждой стороны.
              </p>
              <p>
                12.2. Любые изменения в договор должны быть согласованы обеими сторонами в письменной форме.
              </p>
              <p>
                12.3. Договор регулируется законодательством Российской Федерации.
              </p>
              <p>
                12.4. Все споры разрешаются путём переговоров. При невозможности достичь согласия 
                споры рассматриваются в судебном порядке в соответствии с законодательством РФ.
              </p>
            </section>

            <section className="border-t border-border pt-6 mt-8">
              <p className="text-xs text-muted-foreground italic">
                Подписывая договор об аренде, Арендатор подтверждает, что ознакомился со всеми условиями 
                и согласен их выполнять.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/contacts" className="no-underline">
              <Button className="rounded-none font-mono">
                ЗАПРОСИТЬ ДОГОВОР
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2">
                <div className="w-3 h-3 bg-primary"></div>
                KINORENTA
              </div>
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
            <div>© 2025 KINORENTA. Все права защищены.</div>
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

import { useState } from "react";
// Standard HTML buttons with Tailwind are used instead of a separate Button component to ensure compatibility
import { Navigation } from "./Navigation";
import { ResponsiveImage } from "./ResponsiveImage";
import { ArrowRight, Play, FileText, Mail, Send, X, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function VsegdaZhivoy() {
  useEffect(() => {
    document.title = "Всегда живой — короткометражный фильм Михаила Малахова";
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Двое молодых людей впервые попадают в поисковый отряд и находят останки солдата Красной армии — после этого нельзя жить по-старому.");
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Всегда живой");
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", "Двое молодых людей впервые попадают в поисковый отряд и находят останки солдата Красной армии — после этого нельзя жить по-старому.");
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://innoko.ru/vsegda-zhivoy");
  }, []);
  const [, setLocation] = useLocation();
  const [isScreenerModalOpen, setIsScreenerModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const partners = [
    { name: "Рязанское областное отделение РГО", logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/partner_rgo.png" },
    { name: "Газпром трансгаз Москва", logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/partner_gazprom.png" },
    { name: "Innoko Films / Kinorenta", logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/partner_innoko.png" }
  ];

  const cast = [
    "Денис Коньяченко", "Никита Манец", "Александр Власенко", 
    "Мария Малиновская", "Роман Личутин", "Анастасия Мазеина", "Анастасия Брагина"
  ];

  const handleScreenerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsScreenerModalOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation />

      {/* A. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/vsegda_zhivoy_hero.jpg" 
            alt="Всегда живой - Кадр из фильма" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-0">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              короткометражный художественный фильм · драма · 12+
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none font-mono" style={{fontWeight: 900}}>
              ВСЕГДА<br/>ЖИВОЙ
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-mono leading-relaxed border-l-2 border-primary pl-6">
              «Двое молодых людей впервые попадают в поисковый отряд и находят останки солдата Красной армии — после этого нельзя жить по-старому.»
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-8">
              <button 
                onClick={() => document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono h-12 px-6 text-sm transition-all group"
              >
                <Play className="mr-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> СМОТРЕТЬ ТРЕЙЛЕР
              </button>
              <button 
                onClick={() => setIsScreenerModalOpen(true)}
                className="inline-flex items-center justify-center rounded-none border border-primary bg-transparent hover:bg-primary/10 text-primary font-mono h-12 px-6 text-sm transition-all"
              >
                ЗАПРОСИТЬ СКРИНЕР
              </button>
              <a 
                href="/press/vsegda-zhivoy-presskit.pdf"
                className="inline-flex items-center justify-center rounded-none border border-border bg-card/50 hover:bg-card text-foreground font-mono h-12 px-6 text-sm transition-all"
              >
                <FileText className="mr-2 w-4 h-4" /> PRESS KIT (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* B. Trailer Section */}
      <section id="trailer" className="py-20 border-t border-border bg-black">
        <div className="container px-4 md:px-0">
          <h2 className="text-sm font-mono tracking-widest text-primary mb-8 uppercase">Трейлер фильма «Всегда живой»</h2>
          <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group relative cursor-pointer">
            {/* Placeholder for video */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto group-hover:border-primary transition-colors">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="font-mono text-zinc-500">[ ССЫЛКА НА ВИДЕО СКОРО ПОЯВИТСЯ ]</p>
            </div>
            {/* When link is available, replace with iframe:
            <iframe 
              src="https://www.youtube.com/embed/[ID]" 
              className="w-full h-full" 
              allowFullScreen 
            />
            */}
          </div>
        </div>
      </section>

      {/* C. About the Film */}
      <section className="py-20 border-t border-border">
        <div className="container px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-mono mb-8" style={{fontWeight: 800}}>О ФИЛЬМЕ</h2>
            <div className="space-y-6 text-muted-foreground font-mono leading-relaxed">
              <p className="text-foreground text-lg">
                Фильм «Всегда живой» — это глубокая психологическая драма о столкновении современности с эхом прошлого. 
                История о том, как одна случайная находка в лесах под Рязанью меняет мировоззрение целого поколения.
              </p>
              <p>
                Главные герои, Артем и Лена, отправляются в свою первую экспедицию с поисковым отрядом скорее из любопытства, чем из чувства долга. 
                Однако, когда из-под слоев земли проступают личные вещи и останки солдата, погибшего восемьдесят лет назад, 
                их привычный мир комфорта и цифровых иллюзий начинает рушиться.
              </p>
              
              {showFullSynopsis && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <p>
                    Процесс эксгумации становится для них метафорой внутреннего очищения. Каждый найденный предмет — проржавевшая каска, 
                    солдатский медальон, обрывок письма — задает им немые вопросы о смысле жизни, о памяти и о том, что на самом деле 
                    остается после человека.
                  </p>
                  <p>
                    Михаил Малахов создает тягучую, атмосферную картину, где природа Солотчи выступает не просто фоном, а живым свидетелем, 
                    хранящим тайны тех, кто не вернулся с войны. Это кино о связи времен, которая никогда не прерывается, пока мы продолжаем искать.
                  </p>
                </div>
              )}
              
              <button 
                onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                className="text-primary hover:underline font-mono text-sm uppercase tracking-tighter"
              >
                {showFullSynopsis ? "Скрыть" : "Читать полностью"}
              </button>
            </div>
          </div>

          {/* D. Facts Table */}
          <div className="bg-card/30 border border-border p-8 md:p-12">
            <h3 className="text-xl font-bold font-mono mb-8 uppercase tracking-widest">Технические данные</h3>
            <div className="space-y-4 font-mono text-sm">
              {[
                { label: "Жанр", value: "Драма" },
                { label: "Страна", value: "Россия" },
                { label: "Возрастной рейтинг", value: "12+" },
                { label: "Хронометраж", value: "[УКАЗАТЬ] мин" },
                { label: "Год", value: "2026" },
                { label: "Премьера", value: "28 апреля 2026, кинотеатр «Кинолюкс», Рязань" },
                { label: "Локации", value: "Окрестности Солотчи, Рязанская область" },
                { label: "Режиссёр", value: "Михаил Малахов" },
              ].map((fact, i) => (
                <div key={i} className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{fact.label}</span>
                  <span className="text-right font-bold">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E. Partners */}
      <section className="py-20 border-t border-border bg-primary/5">
        <div className="container px-4 md:px-0">
          <h2 className="text-center text-sm font-mono tracking-widest text-muted-foreground mb-12 uppercase">При поддержке</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all">
            {partners.map((p, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-12 md:h-16 flex items-center justify-center font-bold font-mono text-sm md:text-lg">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Team and Cast */}
      <section className="py-20 border-t border-border">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-6">
              <h2 className="text-3xl font-bold font-mono uppercase tracking-widest">Режиссёр</h2>
              <div className="aspect-[3/4] bg-zinc-900 border border-border overflow-hidden">
                <ResponsiveImage 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/mikhail_malakhov.jpg" 
                  alt="Михаил Малахов" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-mono">Михаил Малахов</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  20 лет в кино. Основатель Innoko AI Creative Lab и Kinorenta. Создатель контента, усиленного ИИ.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-mono uppercase tracking-widest">В ролях</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cast.map((actor, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-border/50 bg-card/20 font-mono">
                      <span className="text-primary text-xs">0{i+1}</span>
                      <span className="text-lg">{actor}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* G. For Festivals / Media */}
              <div className="p-8 border border-primary/30 bg-primary/5 space-y-6">
                <h2 className="text-2xl font-bold font-mono text-primary">ДЛЯ ФЕСТИВАЛЕЙ / СМИ / ПРОДЮСЕРОВ</h2>
                <p className="text-sm font-mono text-muted-foreground">Вы можете запросить следующие материалы:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 font-mono text-sm list-disc list-inside">
                  <li>Скринер (полный фильм)</li>
                  <li>Трейлер (публичный)</li>
                  <li>Постер (высокое разрешение)</li>
                  <li>5 кадров (для прессы)</li>
                  <li>Press kit (PDF)</li>
                  <li>Q&A с режиссёром</li>
                  <li>Копродакшн следующего проекта</li>
                </ul>
                <button 
                  onClick={() => setIsScreenerModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-none bg-primary text-primary-foreground font-mono h-12 px-8 text-sm hover:bg-primary/90 transition-colors"
                >
                  ОТПРАВИТЬ ЗАПРОС
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. Next Step / Co-production */}
      <section className="py-20 border-t border-border bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 translate-x-1/2"></div>
        <div className="container px-4 md:px-0 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-black font-mono tracking-tighter" style={{fontWeight: 900}}>
              ОТКРЫТЫ К ПОКАЗАМ И КОПРОДАКШНУ
            </h2>
            <p className="text-xl text-zinc-400 font-mono leading-relaxed">
              Режиссёр + производственная база в Рязани (студия, RED, свет). 
              Мы ищем партнеров для дистрибуции и открыты к совместному производству будущих проектов.
            </p>
            <button 
              onClick={() => setIsScreenerModalOpen(true)}
              className="inline-flex items-center justify-center rounded-none border-2 border-white bg-white text-black font-mono h-14 px-10 text-sm hover:bg-transparent hover:text-white transition-all uppercase font-bold"
            >
              Обсудить показ / копродакшн
            </button>
          </div>
        </div>
      </section>

      {/* I. Contacts */}
      <section className="py-20 border-t border-border">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold font-mono">КОНТАКТЫ</h2>
              <div className="space-y-4 font-mono">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary"><Mail size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
                    <p className="text-lg">[УКАЗАТЬ]</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary"><Send size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Telegram</p>
                    <p className="text-lg">[УКАЗАТЬ]</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary"><Play size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">VK Kinorenta</p>
                    <a href="https://vk.ru/kinorenta" className="text-lg hover:text-primary transition-colors">vk.ru/kinorenta</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-8 border border-border space-y-4">
              <p className="font-mono text-sm text-muted-foreground">БАЗА ПРОИЗВОДСТВА:</p>
              <p className="font-mono text-xl font-bold">Рязань, пр. Яблочкова, 6</p>
              <p className="font-mono text-sm">Innoko AI Creative Lab</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border text-center font-mono text-xs text-muted-foreground">
        <div className="container">
          <p>© 2026 Innoko Films / Innoko AI Creative Lab. Все права защищены.</p>
        </div>
      </footer>

      {/* Screener Request Modal */}
      {isScreenerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsScreenerModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-background border border-border p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsScreenerModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-mono">ЗАЯВКА ОТПРАВЛЕНА</h3>
                  <p className="text-muted-foreground font-mono">Спасибо! Ваша заявка получена. Скринер отправим после проверки запроса.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-mono uppercase tracking-tighter">ЗАПРОСИТЬ СКРИНЕР</h3>
                  <p className="text-sm text-muted-foreground font-mono">Заполните форму, и мы свяжемся с вами в ближайшее время.</p>
                </div>

                <form className="space-y-4" onSubmit={handleScreenerSubmit}>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted-foreground">Имя *</label>
                    <input required className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors" placeholder="Иван Иванов" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted-foreground">Организация / фестиваль / СМИ *</label>
                    <input required className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors" placeholder="Название компании" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted-foreground">Email *</label>
                      <input required type="email" className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted-foreground">Telegram</label>
                      <input className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors" placeholder="@username" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted-foreground">Цель запроса *</label>
                    <select required className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors appearance-none">
                      <option value="festival">Показ на фестивале</option>
                      <option value="media">Пресса / СМИ</option>
                      <option value="production">Продюсирование / копродакшн</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted-foreground">Сообщение</label>
                    <textarea className="w-full bg-card border border-border p-3 font-mono text-sm focus:border-primary outline-none transition-colors min-h-[100px]" placeholder="Ваш комментарий..."></textarea>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input required type="checkbox" id="privacy" className="mt-1" />
                    <label htmlFor="privacy" className="text-[10px] font-mono text-muted-foreground leading-tight">
                      Согласен на обработку персональных данных в соответствии с политикой конфиденциальности.
                    </label>
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground font-mono h-12 text-sm font-bold hover:bg-primary/90 transition-colors mt-4">
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

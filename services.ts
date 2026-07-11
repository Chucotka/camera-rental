export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  currency: string;
  features: string[];
  duration?: string;
  deliverables?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'equipment' | 'studio' | 'ai-content' | 'professional-video';
  icon: string;
  packages: ServicePackage[];
  image?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  thumbnail?: string;
  videoUrl?: string;
  description?: string;
}

export const aiContentServices: Service[] = [
  {
    id: 'script-writing',
    title: 'Написание сценариев',
    description: 'Профессиональное написание сценариев для видео, рилсов и контента с помощью AI',
    category: 'ai-content',
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
    packages: [
      {
        id: 'script-short',
        name: 'Короткий сценарий',
        description: 'Сценарий для рилса или TikTok (15-30 сек)',
        icon: '📱',
        basePrice: 2500,
        currency: '₽',
        features: [
          'AI-генерация + редактирование',
          'Адаптация под платформу',
          'Включение ключевых слов',
          '1 вариант + 2 доработки'
        ],
        duration: '1-2 дня',
        deliverables: ['Текстовый сценарий', 'Рекомендации по съемке']
      },
      {
        id: 'script-medium',
        name: 'Средний сценарий',
        description: 'Сценарий для YouTube видео (3-5 минут)',
        icon: '🎬',
        basePrice: 5000,
        currency: '₽',
        features: [
          'Структурированный сценарий',
          'Разделение на сцены',
          'Включение переходов и эффектов',
          '2 варианта + 3 доработки'
        ],
        duration: '2-3 дня',
        deliverables: ['Полный сценарий', 'Раскадровка', 'Рекомендации по съемке']
      },
      {
        id: 'script-long',
        name: 'Полный сценарий',
        description: 'Развернутый сценарий для фильма или долгого видео',
        icon: '🎥',
        basePrice: 10000,
        currency: '₽',
        features: [
          'Полный сценарий с диалогами',
          'Детальная раскадровка',
          'Рекомендации по актерам',
          '3 варианта + неограниченные доработки'
        ],
        duration: '5-7 дней',
        deliverables: ['Полный сценарий', 'Раскадровка', 'Техническое описание']
      }
    ]
  },
  {
    id: 'video-generation',
    title: 'Генерация видео',
    description: 'Создание видеоконтента с помощью AI из текста и изображений',
    category: 'ai-content',
    icon: '🎞️',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop',
    packages: [
      {
        id: 'video-reel',
        name: 'Рил/Шорт',
        description: 'Готовый видеорил (15-60 сек)',
        icon: '📹',
        basePrice: 7500,
        currency: '₽',
        features: [
          'AI-генерация видео',
          'Профессиональный монтаж',
          'Музыка и звуковые эффекты',
          'Субтитры на русском'
        ],
        duration: '3-5 дней',
        deliverables: ['Видеофайл (MP4)', 'Вертикальная версия', 'Горизонтальная версия']
      },
      {
        id: 'video-youtube',
        name: 'YouTube видео',
        description: 'Полное видео для YouTube (3-10 минут)',
        icon: '📺',
        basePrice: 15000,
        currency: '₽',
        features: [
          'Сценарий + AI-генерация',
          'Профессиональный монтаж',
          'Цветокоррекция и эффекты',
          'Музыка и озвучка'
        ],
        duration: '7-10 дней',
        deliverables: ['Видеофайл (4K)', 'Превью', 'Субтитры']
      },
      {
        id: 'video-commercial',
        name: 'Коммерческое видео',
        description: 'Рекламное видео для продукта или услуги',
        icon: '🎯',
        basePrice: 25000,
        currency: '₽',
        features: [
          'Полное производство',
          'Брендирование',
          'Несколько вариантов',
          'Оптимизация для разных платформ'
        ],
        duration: '10-14 дней',
        deliverables: ['Видеофайл (4K)', 'Мобильная версия', 'Социальные сети версии']
      }
    ]
  },
  {
    id: 'content-production',
    title: 'Полное производство контента',
    description: 'От идеи до готового контента - полный цикл создания',
    category: 'ai-content',
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    packages: [
      {
        id: 'content-package-starter',
        name: 'Стартер пакет',
        description: '4 рилса в месяц',
        icon: '⭐',
        basePrice: 20000,
        currency: '₽',
        features: [
          '4 готовых рилса',
          'Сценарии + видео',
          'Редактирование и монтаж',
          'Публикация на социальные сети'
        ],
        duration: 'Ежемесячно',
        deliverables: ['4 видеорилса', 'Посты для соцсетей', 'Аналитика']
      },
      {
        id: 'content-package-pro',
        name: 'Про пакет',
        description: '2 YouTube видео + 8 рилсов в месяц',
        icon: '🏆',
        basePrice: 50000,
        currency: '₽',
        features: [
          '2 YouTube видео (5+ мин)',
          '8 рилсов/шортсов',
          'Полное производство',
          'Стратегия контента'
        ],
        duration: 'Ежемесячно',
        deliverables: ['2 YouTube видео', '8 рилсов', 'Контент-план', 'Аналитика']
      },
      {
        id: 'content-package-premium',
        name: 'Премиум пакет',
        description: 'Полное управление контентом',
        icon: '👑',
        basePrice: 100000,
        currency: '₽',
        features: [
          'Неограниченный контент',
          'Все форматы и платформы',
          'Персональный менеджер',
          'Стратегия и аналитика'
        ],
        duration: 'Ежемесячно',
        deliverables: ['Весь контент', 'Аналитика', 'Консультации']
      }
    ]
  },
  {
    id: 'voice-over',
    title: 'Озвучка и голос',
    description: 'Профессиональная озвучка видео с помощью AI и человеческих голосов',
    category: 'ai-content',
    icon: '🎤',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    packages: [
      {
        id: 'voiceover-ai',
        name: 'AI озвучка',
        description: 'Озвучка с использованием AI голосов',
        icon: '🤖',
        basePrice: 1500,
        currency: '₽',
        features: [
          'Выбор из 50+ голосов',
          'Любой язык',
          'Синхронизация с видео',
          'Неограниченные правки'
        ],
        duration: '1 день',
        deliverables: ['Озвученное видео', 'Аудиофайл']
      },
      {
        id: 'voiceover-pro',
        name: 'Профессиональная озвучка',
        description: 'Озвучка профессиональным диктором',
        icon: '🎙️',
        basePrice: 5000,
        currency: '₽',
        features: [
          'Профессиональный диктор',
          'Студийное качество',
          'Синхронизация',
          'Несколько вариантов'
        ],
        duration: '2-3 дня',
        deliverables: ['Озвученное видео', 'Аудиофайл высокого качества']
      }
    ]
  }
];

export const studioServices: Service[] = [
  {
    id: 'studio-rental',
    title: 'Аренда студии',
    description: 'Профессиональная студия для съемок',
    category: 'studio',
    icon: '🏢',
    packages: [
      {
        id: 'studio-hourly',
        name: 'Почасовая аренда',
        description: 'Аренда студии на час',
        icon: '⏰',
        basePrice: 2000,
        currency: '₽',
        features: ['Полное оборудование', 'Освещение', 'Фон', 'Помощь оператора'],
        duration: '1 час'
      },
      {
        id: 'studio-daily',
        name: 'Суточная аренда',
        description: 'Аренда студии на день (8 часов)',
        icon: '📅',
        basePrice: 12000,
        currency: '₽',
        features: ['Полное оборудование', 'Освещение', 'Фон', 'Помощь оператора'],
        duration: '8 часов'
      }
    ]
  }
];

export function getServiceById(id: string): Service | undefined {
  return allServices.find(service => service.id === id);
}

export function getServicePackageById(serviceId: string, packageId: string): ServicePackage | undefined {
  const service = getServiceById(serviceId);
  return service?.packages.find(pkg => pkg.id === packageId);
}

export const professionalVideoServices: Service[] = [
  {
    id: 'commercial-video',
    title: 'Рекламные ролики',
    description: 'Профессиональная съемка и производство рекламных видео для бизнеса',
    category: 'professional-video',
    icon: '📺',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop',
    packages: [
      {
        id: 'commercial-short',
        name: 'Короткий рекламный ролик',
        description: 'Ролик 15-30 секунд',
        icon: '⏱️',
        basePrice: 50000,
        currency: '₽',
        features: [
          'Профессиональная съемка',
          'Сценарий и режиссура',
          'Профессиональный монтаж',
          'Цветокоррекция и эффекты',
          '2 варианта + доработки'
        ],
        duration: '5-7 дней',
        deliverables: ['Видеофайл (4K)', 'Мобильная версия', 'Социальные сети версии']
      },
      {
        id: 'commercial-full',
        name: 'Полнометражный рекламный ролик',
        description: 'Ролик 1-3 минуты',
        icon: '🎬',
        basePrice: 100000,
        currency: '₽',
        features: [
          'Полное производство',
          'Профессиональная съемка',
          'Актеры и каскадеры',
          'Спецэффекты',
          'Профессиональный монтаж'
        ],
        duration: '10-14 дней',
        deliverables: ['Видеофайл (4K)', 'Все версии', 'Исходные файлы']
      }
    ]
  }
];

export const allServices = [...aiContentServices, ...studioServices, ...professionalVideoServices];

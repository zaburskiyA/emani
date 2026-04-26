import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import frontRestImage from './media/front_rest.webp';
import confectioneryImage from './media/conditery.webp';
import culinaryImage from './media/culinary.webp';
import tablesImage from './media/tables.webp';
import backlavaImage from './media/backlava.webp';
import frozenImage from './media/frozen.webp';
import tableHeroImage from './media/table3.webp';
import bakeryImage from './media/bakeryyy.webp';
import vkusvillLogo from './vkusvill.svg';
import dobrinynskyLogo from './media/dobrinynsky.webp';
import retailDessertLoungeImage from './media/sab_seb_pos.webp';
import retailPavlovaImage from './media/table_2.webp';
import retailPastryImage from './media/table_photo.webp';
import deliveryLogo from './media/delivery-icon-logo.svg';
import yandexEdaLogo from './media/yandex-eda-sign-logo.svg';
import contactPhoto1 from './фото 1.webp';
import contactPhoto2 from './фото 2.webp';
import contactPhoto4 from './фото 4.webp';
import contactPhoto5 from './фото 5.webp';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartItem, Product, Category } from './types';
import { CartContext } from './context';
import { MOCK_PRODUCTS } from './constants';
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  Factory,
  Coffee,
  ArrowRight,
  ArrowUpRight,
  X,
  Check,
  MessageCircle,
  CakeSlice,
  CookingPot,
  Croissant,
  Candy,
  Package,
  type LucideIcon,
} from 'lucide-react';

// --- Page Components ---

type HomeFeature = {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
};

const HOME_FEATURES: HomeFeature[] = [
  {
    title: 'Производство',
    description: (
      <>
        Наше производство находится в Новой Москве, в&nbsp;ЖК&nbsp;«Дубровка».
        <br />
        Площадь&nbsp;— 500&nbsp;м², все процессы выстроены в&nbsp;соответствии со&nbsp;стандартами HACCP.
      </>
    ),
    icon: Factory,
  },
  {
    title: 'Кафе',
    description: (
      <>
        Уютное кафе при производстве с&nbsp;полным ассортиментом свежих десертов и&nbsp;блюд.
        <br />
        Дегустация новинок и&nbsp;кофе&nbsp;— идеально для встреч или перекуса.
      </>
    ),
    icon: Coffee,
  },
  {
    title: 'Доставка',
    description: (
      <>
        Бесплатная доставка в&nbsp;ЖК&nbsp;«Дубровка», в&nbsp;другие районы города&nbsp;— через Яндекс.Еда.
        <br />
        Для удобства доступен самовывоз из&nbsp;кафе.
      </>
    ),
    icon: Truck,
  },
];

type AssortmentCard = {
  title: string;
  subtitle: string;
  aboutLine: string;
  menuSection: string;
  img: string;
  icon: LucideIcon;
};

const ASSORTMENT_CARDS: AssortmentCard[] = [
  {
    title: 'Кондитерские изделия',
    subtitle: 'Торты, пирожные, рулеты и\u00A0т.\u00A0д.',
    aboutLine: 'Кондитерские изделия — торты, пирожные, рулеты',
    menuSection: 'Кондитерские изделия',
    img: confectioneryImage,
    icon: CakeSlice,
  },
  {
    title: 'Кулинария',
    subtitle: 'Первые и\u00A0вторые блюда, салаты, гарниры и\u00A0т.\u00A0д.',
    aboutLine: 'Кулинария — первые и вторые блюда, салаты, гарниры',
    menuSection: 'Кулинария',
    img: culinaryImage,
    icon: CookingPot,
  },
  {
    title: 'Выпечка',
    subtitle: 'Пироги, булочки, слойки и\u00A0пирожки',
    aboutLine: 'Выпечка — пироги, булочки, слойки, пирожки',
    menuSection: 'Выпечка',
    img: bakeryImage,
    icon: Croissant,
  },
  {
    title: 'Восточные сладости',
    subtitle: 'Пахлава, пальчики, печенья и\u00A0т.\u00A0д.',
    aboutLine: 'Восточные сладости — пахлава, пальчики, печенья',
    menuSection: 'Восточные сладости',
    img: backlavaImage,
    icon: Candy,
  },
  {
    title: 'Полуфабрикаты',
    subtitle: 'Пельмени, котлеты, голубцы, вареники и\u00A0т.\u00A0д.',
    aboutLine: 'Полуфабрикаты — пельмени, котлеты, голубцы, вареники',
    menuSection: 'Полуфабрикаты',
    img: frozenImage,
    icon: Package,
  },
];

const MENU_SECTION_CATEGORY_MAP: Record<string, string[]> = {
  'Кондитерские изделия': ['Кондитерские изделия'],
  Кулинария: ['Блюда', 'Салаты', 'Суши и роллы'],
  Выпечка: ['Кондитерские изделия'],
  'Восточные сладости': ['Кондитерские изделия'],
  Полуфабрикаты: ['Полуфабрикаты'],
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const featureCardInitial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 22, scale: 0.985 };
  const featureCardInView = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const featureCardTransition = shouldReduceMotion
    ? { duration: 0.25, ease: 'easeOut' as const }
    : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] sm:min-h-[76vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${tableHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative text-center text-white px-4 py-16 max-w-4xl mx-auto animate-[fadeIn_1s_ease-out]">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 tracking-wide font-serif leading-tight">
            ЭМАНИ
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-8 sm:mb-10 font-light tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest text-gray-200 uppercase">
            Кондитерская & Кулинария
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/menu" 
              className="inline-flex min-h-[44px] items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-emani-gold text-white text-base sm:text-lg font-medium hover:bg-white hover:text-emani-gold transition-all duration-300 uppercase tracking-[0.14em] sm:tracking-widest"
            >
              Смотреть меню
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
            {HOME_FEATURES.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                className="p-6 sm:p-8"
                initial={featureCardInitial}
                whileInView={featureCardInView}
                viewport={{ once: true, amount: 0.32 }}
                transition={{
                  ...featureCardTransition,
                  delay: index * (shouldReduceMotion ? 0.04 : 0.09),
                }}
                style={{ willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity' }}
              >
                <div className="w-24 h-24 mx-auto mb-8 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                  <Icon size={44} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-5 text-emani-dark">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20 bg-white border-y border-emani-cream/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center mb-12 md:mb-16 text-emani-dark">Ассортимент</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {ASSORTMENT_CARDS.map((item, idx) => (
                <Link
                  to={`/menu?section=${encodeURIComponent(item.menuSection)}`}
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl shadow-md block ${
                    idx < 3
                    ? 'md:col-span-2 aspect-[4/3] sm:aspect-[16/10] md:h-[26rem] md:aspect-auto'
                    : 'md:col-span-3 aspect-[4/3] sm:aspect-[16/10] md:h-[22rem] md:aspect-auto'
                }`}
              >
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors z-10"></div>
                {idx === 0 && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                )}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${
                    idx === 0 ? 'object-[center_40%]' : ''
                  }`}
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className={`font-serif font-bold mb-2 ${idx === 0 ? 'text-3xl md:text-[2.5rem]' : 'text-2xl md:text-3xl'}`}>
                    {item.title}
                  </h3>
                  <p className={`mb-4 text-white/85 ${idx === 0 ? 'max-w-lg text-sm md:text-lg' : 'text-sm md:text-base'}`}>
                    {item.subtitle}
                  </p>
                  <span className="text-xs uppercase tracking-[0.22em] border-b border-transparent group-hover:border-white transition-all pb-1">
                    Перейти в раздел
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 sm:py-20 md:py-28 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-14">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-emani-dark">Хиты Продаж</h2>
           <Link to="/menu" className="hidden md:flex items-center gap-2 text-lg text-emani-gold hover:text-emani-brown transition-colors">
             Смотреть всё меню <ArrowRight size={22} />
           </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_PRODUCTS.filter(p => p.isPopular).slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromQuery = searchParams.get('section')?.trim() || 'Все';
  const categoryOrder = ['Кондитерские изделия', 'Блюда', 'Салаты', 'Суши и роллы', 'Полуфабрикаты'];
  const categoryPriority = new Map(categoryOrder.map((category, index) => [category, index]));
  const sortedProducts = [...MOCK_PRODUCTS].sort((a, b) => {
    const aPriority = categoryPriority.get(a.category) ?? Number.MAX_SAFE_INTEGER;
    const bPriority = categoryPriority.get(b.category) ?? Number.MAX_SAFE_INTEGER;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return 0;
  });
  const allProductCategories = Array.from(
    new Set(sortedProducts.map((product) => product.category).filter((category) => category !== Category.SPECIAL)),
  );
  const coveredMenuCategories = new Set(Object.values(MENU_SECTION_CATEGORY_MAP).flat());
  const sectionFilters = ASSORTMENT_CARDS.map(({ title }) => title).filter((title) => {
    const mappedCategories = MENU_SECTION_CATEGORY_MAP[title] ?? [title];
    return mappedCategories.some((category) => allProductCategories.includes(category));
  });
  const extraCategoryFilters = allProductCategories.filter((category) => !coveredMenuCategories.has(category));
  const categories = [
    'Все',
    ...sectionFilters,
    ...extraCategoryFilters,
  ];
  const filter = categories.includes(filterFromQuery) ? filterFromQuery : 'Все';
  const selectedCategories = filter === 'Все'
    ? null
    : (MENU_SECTION_CATEGORY_MAP[filter] ?? [filter]);
  const filteredProducts = selectedCategories
    ? sortedProducts.filter((product) => selectedCategories.includes(product.category))
    : sortedProducts;

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [filter]);

  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      <div className="pt-16 pb-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-emani-dark mb-4">Наше Меню</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light italic">Истинное удовольствие в каждом кусочке</p>
        </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams(cat === 'Все' ? {} : { section: cat })}
                className={`inline-flex min-h-[44px] items-center justify-center px-6 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-emani-dark text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emani-gold hover:text-emani-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-serif">В этой категории пока нет товаров.</p>
            <button onClick={() => setSearchParams({})} className="mt-4 text-emani-blue hover:underline">
              Показать все товары
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ABOUT_MEDIA = {
  hero: frontRestImage,
  feature: tablesImage,
} as const;

type AboutDirection = {
  title: string;
  line: string;
  imageBase: string;
};

const ABOUT_DIRECTIONS: AboutDirection[] = ASSORTMENT_CARDS.map(({ title, subtitle, img }) => ({
  title,
  line: subtitle,
  imageBase: img,
}));

const ABOUT_PRIMARY_TEXT = '«Эмани» — профессиональное производство премиальной выпечки и кулинарных изделий, работающее с 2016 года.';
const ABOUT_LOCATION_TITLE = 'Локация и производство:';
const ABOUT_LOCATION_POINTS = [
  'Расположение: Новая Москва',
  'Производственная площадь: 500 м²',
  'Статус помещения: Полное соответствие стандартам HACCP.',
];
const ABOUT_RETAIL_TITLE = 'Розничное присутствие';
const ABOUT_RETAIL_TEXT = 'На территории производства функционирует собственный магазин с полным ассортиментом продукции.';
const ABOUT_RETAIL_NOTE = 'Собственная розница помогает быстро тестировать новинки и переносить лучшие решения в федеральные поставки для сетей-партнёров.';
const ABOUT_RETAIL_GALLERY = [
  {
    src: ABOUT_MEDIA.feature,
    alt: 'Интерьер фирменного магазина и кафе «Эмани» при производстве.',
    className: 'about-retail-card-main',
    sizes: '(min-width: 1280px) 34vw, (min-width: 768px) 40vw, 88vw',
  },
  {
    src: retailDessertLoungeImage,
    alt: 'Десерты и кофе в зоне посадки собственного магазина «Эмани».',
    className: 'about-retail-card-tall',
    sizes: '(min-width: 1280px) 18vw, (min-width: 768px) 21vw, 46vw',
  },
  {
    src: retailPavlovaImage,
    alt: 'Фирменный десерт с ягодами в розничном пространстве «Эмани».',
    className: 'about-retail-card-square',
    sizes: '(min-width: 1280px) 16vw, (min-width: 768px) 19vw, 40vw',
  },
  {
    src: retailPastryImage,
    alt: 'Подача свежей выпечки в фирменном магазине «Эмани».',
    className: 'about-retail-card-detail',
    sizes: '(min-width: 1280px) 15vw, (min-width: 768px) 18vw, 42vw',
  },
] as const;
const ABOUT_PARTNERS_SECTION_LABEL = 'ПАРТНЕРЫ';
const ABOUT_PARTNERS_SECTION_TITLE = 'Нам доверяют сети, для которых важны качество и стабильность';
type AboutPartner = {
  name: string;
  logo: string;
  logoAlt: string;
  summary: string;
  logoClassName?: string;
};
const ABOUT_PARTNERS: AboutPartner[] = [
  {
    name: 'ВкусВилл',
    logo: vkusvillLogo,
    logoAlt: 'Логотип ВкусВилл',
    summary: 'Поставляем линейку изделий под требования сети и поддерживаем стабильное качество партий.',
    logoClassName: 'about-partner-logo-vkusvill',
  },
  {
    name: 'Добрынинский',
    logo: dobrinynskyLogo,
    logoAlt: 'Логотип Добрынинский',
    summary: 'Выпускаем продукцию под бренд партнёра с контролем качества на каждом этапе производства.',
    logoClassName: 'about-partner-logo-dobrinynsky',
  },
];
const ABOUT_DIRECTIONS_HEADING = 'Производственные направления';
const ABOUT_STM_TITLE = 'Производство под СТМ';
const ABOUT_STM_INTRO_TEXT = 'Кондитерская-кулинария «Эмани» обладает необходимыми мощностями и опытом для производства товаров под собственными брендами сетей и партнёров.';
const ABOUT_STM_EXPERIENCE_TITLE = 'Наш опыт:';
const ABOUT_STM_EXPERIENCE_POINTS: React.ReactNode[] = [
  'Успешное сотрудничество с сетями «Добрынинский» и «ВкусВилл»',
  <>
    Управляли 10 собственными розничными точками одновременно (
    <strong className="about-inline-emphasis">Центральный рынок</strong>,{' '}
    <strong className="about-inline-emphasis">Усаческий рынок</strong> и др.)
  </>,
];
const ABOUT_STM_OFFER_TITLE = 'Что мы можем предложить:';
const ABOUT_STM_POINTS = [
  'Разработка рецептур под требования клиента',
  'Производство под собственную упаковку и брендинг (СТМ)',
  'Полное соответствие стандартам качества и безопасности',
  'Гибкость в ассортименте и объёмах',
  'Быстрая адаптация и оперативная реакция на замечания',
];
const ABOUT_STM_ADVANTAGES_TITLE = 'Преимущества работы с нами:';
const ABOUT_STM_ADVANTAGES_POINTS = [
  'Контроль качества на каждом этапе',
  'Стабильные сроки доставки',
  'Конкурентные цены при высоком качестве',
];

const AboutPage = () => (
  <div className="about-editorial-page">
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-shell about-hero-grid">
        <div className="about-hero-content">
          <h1 id="about-hero-title" className="about-hero-title">{ABOUT_PRIMARY_TEXT}</h1>
          <article className="about-stm-card about-label-offset about-location-card">
            <p className="about-label">{ABOUT_LOCATION_TITLE}</p>
            <div className="about-hero-facts">
              {ABOUT_LOCATION_POINTS.map((point) => (
                <p key={point} className="about-body">{point}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="about-hero-media" aria-hidden="true" style={{ backgroundImage: `url(${ABOUT_MEDIA.hero})` }} />
      </div>
    </section>

    <section className="about-section about-section-cream" aria-labelledby="about-partners-title">
      <div className="about-shell pt-3 sm:pt-4 lg:pt-6">
        <div className="mb-5 sm:mb-7 lg:mb-8 flex justify-center -mt-8 sm:-mt-14 lg:-mt-20">
          <h2
            id="about-partners-title"
            className="about-section-title mx-auto max-w-full text-center leading-none tracking-tight text-[clamp(1.9rem,5.1vw,4.9rem)] whitespace-normal sm:whitespace-nowrap"
          >
            {ABOUT_STM_TITLE}
          </h2>
        </div>

        <div className="about-partners-layout">
          <p className="about-stm-intro">{ABOUT_STM_INTRO_TEXT}</p>
          <div className="about-partners-content">
            <article className="about-stm-card about-stm-card-offer">
              <p className="about-label">{ABOUT_STM_OFFER_TITLE}</p>
              <ul className="about-checklist about-checklist-compact">
                {ABOUT_STM_POINTS.map((point) => (
                  <li key={point} className="about-checklist-item">
                    <Check size={18} strokeWidth={2} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="about-stm-card">
              <p className="about-label">{ABOUT_STM_ADVANTAGES_TITLE}</p>
              <ul className="about-checklist about-checklist-compact">
                {ABOUT_STM_ADVANTAGES_POINTS.map((point) => (
                  <li key={point} className="about-checklist-item">
                    <Check size={18} strokeWidth={2} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="about-stm-second-block">
                <p className="about-label">{ABOUT_STM_EXPERIENCE_TITLE}</p>
                <ul className="about-checklist about-checklist-compact">
                  {ABOUT_STM_EXPERIENCE_POINTS.map((point, index) => (
                    <li key={`experience-${index}`} className="about-checklist-item">
                      <Check size={18} strokeWidth={2} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section className="about-section about-section-partners" aria-labelledby="about-partners-network-title">
      <div className="about-partners-showcase">
        <div className="about-section-head about-partners-showcase-head">
          <p className="about-label">{ABOUT_PARTNERS_SECTION_LABEL}</p>
          <h2 id="about-partners-network-title" className="about-section-title">{ABOUT_PARTNERS_SECTION_TITLE}</h2>
        </div>

        <div className="about-partners-logo-grid" role="list" aria-label="Партнёрские сети">
          {ABOUT_PARTNERS.map(({ name, logo, logoAlt, summary, logoClassName }) => (
            <article key={name} className="about-partner-card" role="listitem">
              <div className="about-partner-logo-wrap">
                <img
                  src={logo}
                  alt={logoAlt}
                  loading="lazy"
                  decoding="async"
                  className={`about-partner-logo${logoClassName ? ` ${logoClassName}` : ''}`}
                />
              </div>
              <h3 className="about-card-title about-partner-card-title">{name}</h3>
              <p className="about-body">{summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <div className="about-diagonal-divider about-diagonal-divider-reverse" aria-hidden="true" />

    <section className="about-section about-section-directions" aria-labelledby="about-directions-title">
      <div className="about-shell">
        <div className="about-section-head text-center">
          <h2
            id="about-directions-title"
            className="about-section-title mx-auto max-w-full text-center leading-none tracking-tight text-[clamp(1.8rem,4.8vw,4rem)] whitespace-normal sm:whitespace-nowrap"
          >
            {ABOUT_DIRECTIONS_HEADING}
          </h2>
        </div>

        <div className="about-directions-grid">
          {ABOUT_DIRECTIONS.map(({ title, line, imageBase }) => (
            <article key={title} className="about-direction-card">
              <div className="about-direction-media">
                <img src={imageBase} alt="" loading="lazy" decoding="async" />
              </div>
              <p className="about-body">
                <strong className="about-inline-emphasis">{title}</strong> — {line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="about-section about-section-warm about-section-first" aria-labelledby="about-production-title">
      <div className="about-shell about-feature-layout">
        <div className="about-feature-copy">
          <p className="about-label about-label-offset">{ABOUT_RETAIL_TITLE}</p>
          <h2 id="about-production-title" className="about-section-title">{ABOUT_RETAIL_TEXT}</h2>
        </div>

        <div className="about-feature-media-wrap">
          <div className="about-retail-collage" aria-label="Фотографии собственного магазина и кафе «Эмани»">
            {ABOUT_RETAIL_GALLERY.map(({ src, alt, className, sizes }) => (
              <figure key={src} className={`about-retail-card ${className}`}>
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  sizes={sizes}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

type ContactChannel = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  href?: string;
};

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Phone,
    label: 'Телефон',
    value: '+7 967 105-11-11',
    hint: 'Звонки и WhatsApp',
    href: 'tel:+79671051111',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'garifullina@emanis.ru',
    hint: 'Для заказов и сотрудничества',
    href: 'mailto:garifullina@emanis.ru',
  },
  {
    icon: MessageCircle,
    label: 'Telegram',
    value: '@emaniicafe',
    hint: 'Официальный телеграм-канал',
    href: 'https://t.me/emaniicafe',
  },
];

const CONTACT_SIDE_PHOTOS_LEFT = [
  {
    src: contactPhoto1,
    alt: 'Витрина с фирменными десертами «Эмани».',
    sizes: '(min-width: 1024px) 22vw, 46vw',
  },
  {
    src: contactPhoto2,
    alt: 'Подача десерта в кафе «Эмани».',
    sizes: '(min-width: 1024px) 22vw, 46vw',
  },
] as const;

const CONTACT_SIDE_PHOTOS_RIGHT = [
  {
    src: contactPhoto4,
    alt: 'Интерьер кафе и зоны посадки «Эмани».',
    sizes: '(min-width: 1024px) 22vw, 46vw',
  },
  {
    src: contactPhoto5,
    alt: 'Фирменная сервировка в кафе «Эмани».',
    sizes: '(min-width: 1024px) 22vw, 46vw',
  },
] as const;

const ContactPage = () => (
  <div className="bg-[#fcfaf7] px-4 pt-6 pb-4 sm:px-6 sm:pt-7 sm:pb-5 lg:px-8 lg:pt-8 lg:pb-6">
    <div className="mx-auto w-full max-w-[90rem]">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-emani-dark sm:text-4xl md:text-5xl">Контакты</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Свяжитесь с нами удобным способом — мы на связи каждый день.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.12fr)_minmax(0,0.94fr)] lg:items-stretch">
          <section className="order-2 rounded-[1.6rem] border border-emani-cream/65 bg-white p-2.5 shadow-[0_12px_36px_rgba(98,72,39,0.1)] sm:p-3 lg:order-1 lg:h-[31rem] xl:h-[33rem]">
            <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1 lg:grid-rows-2">
              {CONTACT_SIDE_PHOTOS_LEFT.map(({ src, alt, sizes }) => (
                <figure key={src} className="relative h-32 overflow-hidden rounded-[1.2rem] border border-emani-cream/50 bg-[#f7f1e4] sm:h-36 lg:h-full">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    sizes={sizes}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </section>

          <section className="order-1 rounded-[1.6rem] border border-emani-cream/65 bg-white px-4 py-5 shadow-[0_12px_36px_rgba(98,72,39,0.1)] sm:px-5 sm:py-6 lg:order-2 lg:flex lg:h-[31rem] lg:flex-col lg:px-5 lg:py-5 xl:h-[33rem]">
            <ul className="mt-1 grid grid-cols-1 gap-3 lg:min-h-0 lg:flex-1 lg:content-start">
              {CONTACT_CHANNELS.map(({ icon: Icon, label, value, hint, href }) => (
                <li key={label} className="min-w-0 rounded-xl border border-emani-cream/60 bg-[#fcfaf7] px-3 py-2.5 sm:px-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emani-cream/70 bg-white text-emani-gold">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="mt-0.5 block max-w-full whitespace-normal break-words text-base font-semibold leading-snug text-emani-dark transition-colors [overflow-wrap:anywhere] sm:text-lg hover:text-emani-gold"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 max-w-full whitespace-normal break-words text-base font-semibold leading-snug text-emani-dark [overflow-wrap:anywhere] sm:text-lg">{value}</p>
                      )}
                      {label === 'Телефон' ? <p className="mt-0.5 max-w-full whitespace-normal break-words text-sm leading-relaxed text-gray-500 [overflow-wrap:anywhere]">{hint}</p> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="order-3 rounded-[1.6rem] border border-emani-cream/65 bg-white p-2.5 shadow-[0_12px_36px_rgba(98,72,39,0.1)] sm:p-3 lg:h-[31rem] xl:h-[33rem]">
            <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1 lg:grid-rows-2">
              {CONTACT_SIDE_PHOTOS_RIGHT.map(({ src, alt, sizes }) => (
                <figure key={src} className="relative h-32 overflow-hidden rounded-[1.2rem] border border-emani-cream/50 bg-[#f7f1e4] sm:h-36 lg:h-full">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    sizes={sizes}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </section>
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-emani-cream/30">
      <div className="h-64 sm:h-72 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
        />
        <button 
           onClick={() => addToCart(product)}
           className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 min-h-[44px] bg-white text-emani-dark py-3 rounded-xl shadow-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 group-focus-within:opacity-100 transition-all font-bold text-xs uppercase tracking-widest"
        >
          В корзину
        </button>
      </div>
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-4">
           <h3 className="min-w-0 flex-1 font-serif text-xl text-emani-dark leading-tight">{product.name}</h3>
           <span className="shrink-0 whitespace-nowrap text-right font-bold text-lg text-emani-gold">{product.price} ₽</span>
        </div>
        {product.description.trim() ? (
          <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow italic">"{product.description}"</p>
        ) : null}
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { isCartOpen, toggleCart, items, updateQuantity, total } = useContext(CartContext);
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-emani-dark/40 backdrop-blur-sm" onClick={toggleCart}></div>
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform animate-[slideIn_0.3s_ease-out]">
        <div className="p-5 sm:p-8 border-b border-emani-cream/30 flex justify-between items-center bg-[#fcfaf7]">
          <h2 className="font-serif text-2xl sm:text-3xl text-emani-dark">Корзина</h2>
          <button onClick={toggleCart} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full hover:bg-emani-cream transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {items.length === 0 ? (
            <div className="text-center p-8">
              <p className="font-serif text-2xl text-emani-dark">Пока пусто</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 sm:gap-6 pb-8 border-b border-emani-cream/20">
                <img src={item.image} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover" alt={item.name} loading="lazy" decoding="async" />
                <div className="flex-1">
                  <h4 className="font-serif text-base sm:text-lg leading-snug">{item.name}</h4>
                  <div className="flex justify-between items-center mt-4 gap-4">
                    <span className="font-bold text-emani-gold">{item.price * item.quantity} ₽</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emani-cream text-lg leading-none text-emani-dark hover:bg-emani-cream/30 transition-colors"
                        aria-label={`Уменьшить количество ${item.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emani-cream text-lg leading-none text-emani-dark hover:bg-emani-cream/30 transition-colors"
                        aria-label={`Увеличить количество ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="rounded-3xl border border-emani-cream/40 bg-[#fcfaf7] p-5 sm:p-6 shadow-sm">
            <p className="font-serif text-xl sm:text-2xl text-emani-dark">Оформить доставку</p>
            <p className="mt-3 text-sm leading-relaxed text-emani-dark/75">
              Выберите удобный сервис, проверьте состав заказа и завершите оформление в приложении.
            </p>
            {items.length > 0 ? (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-emani-cream/50 bg-white px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emani-dark/70">Сумма в корзине</span>
                <span className="font-serif text-xl text-emani-dark">{total} ₽</span>
              </div>
            ) : null}
            <div className="mt-5 grid grid-cols-1 gap-3">
              <a
                href="https://eda.yandex.ru/restaurant/emani?utm_campaign=superapp_taxi_web&utm_medium=referral&utm_source=rst_shared_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-emani-cream bg-white px-4 py-2.5 text-sm font-semibold tracking-[0.04em] text-emani-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-emani-gold/30 hover:shadow-md"
                aria-label="Заказать в Яндекс Еде"
              >
                <img src={yandexEdaLogo} alt="Яндекс Еда" className="h-6 w-6 shrink-0 object-contain" />
                <span className="whitespace-nowrap">Яндекс Еда</span>
                <ArrowUpRight className="h-4 w-4 text-emani-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://dc.eda.yandex.net/restaurant/emani"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-emani-cream bg-white px-4 py-2.5 text-sm font-semibold tracking-[0.04em] text-emani-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-emani-gold/30 hover:shadow-md"
                aria-label="Заказать в Деливери Клаб"
              >
                <img src={deliveryLogo} alt="Деливери Клаб" className="h-6 w-6 shrink-0 object-contain" />
                <span className="whitespace-nowrap">Деливери Клаб</span>
                <ArrowUpRight className="h-4 w-4 text-emani-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('emani_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('emani_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, isCartOpen, toggleCart: () => setIsCartOpen(!isCartOpen) }}>
      <BrowserRouter>
        <div id="app-shell" className="app-shell flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <CartSidebar />
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

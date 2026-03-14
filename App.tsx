import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartItem, Product, Category } from './types';
import { CartContext } from './context';
import { MOCK_PRODUCTS } from './constants';
import { Phone, Mail, MapPin, Truck, Award, Factory, Coffee, Star, ArrowRight, X, Check, Instagram } from 'lucide-react';

// --- Page Components ---

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[url('/table3.jpg')] bg-cover bg-center md:bg-fixed">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative text-center text-white px-4 max-w-4xl mx-auto animate-[fadeIn_1s_ease-out]">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-wide font-serif leading-tight">
            ЭМАНИ
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light tracking-widest text-gray-200 uppercase">
            Кондитерская & Кулинария
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/menu" 
              className="px-10 py-4 bg-emani-gold text-white text-lg font-medium hover:bg-white hover:text-emani-gold transition-all duration-300 uppercase tracking-widest"
            >
              Смотреть меню
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-28 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="p-8">
              <div className="w-24 h-24 mx-auto mb-8 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Factory size={44} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-emani-dark">Производство</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">Наше производство находится в Новой Москве, в&nbsp;ЖК&nbsp;«Дубровка».<br />Площадь&nbsp;— 500&nbsp;м², все процессы выстроены в&nbsp;соответствии со&nbsp;стандартами HACCP.</p>
            </div>
            <div className="p-8">
              <div className="w-24 h-24 mx-auto mb-8 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Coffee size={44} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-emani-dark">Кафе</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">Уютное кафе при производстве с&nbsp;полным ассортиментом свежих десертов и&nbsp;блюд.<br />Дегустация новинок и&nbsp;кофе&nbsp;— идеально для встреч или перекуса.</p>
            </div>
            <div className="p-8">
              <div className="w-24 h-24 mx-auto mb-8 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Truck size={44} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-emani-dark">Доставка</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">Бесплатная доставка в&nbsp;ЖК&nbsp;«Дубровка», в&nbsp;другие районы города&nbsp;— через Яндекс.Еда.<br />Для удобства доступен самовывоз из&nbsp;кафе.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20 bg-white border-y border-emani-cream/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-emani-dark">Ассортимент</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {[
              { title: 'Кондитерские изделия', subtitle: 'Торты, пирожные, рулеты и\u00A0т.\u00A0д.', link: '/menu', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Кулинария', subtitle: 'Первые и\u00A0вторые блюда, салаты, гарниры и\u00A0т.\u00A0д.', link: '/menu', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Выпечка', subtitle: 'Пироги, булочки, слойки и\u00A0пирожки', link: '/menu', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Восточные сладости', subtitle: 'Пахлава, пальчики, печенья и\u00A0т.\u00A0д.', link: '/menu', img: '/backlava.png' },
              { title: 'Полуфабрикаты', subtitle: 'Пельмени, котлеты, голубцы, вареники и\u00A0т.\u00A0д.', link: '/menu', img: '/frozen.png' },
            ].map((item, idx) => (
              <Link
                to={item.link}
                key={idx}
                className={`group relative overflow-hidden rounded-xl shadow-md block ${
                  idx < 3 ? 'md:col-span-2 h-[26rem]' : 'md:col-span-3 h-[22rem]'
                }`}
              >
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors z-10"></div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">{item.title}</h3>
                  <p className="text-sm md:text-base text-white/80 mb-4 text-center">{item.subtitle}</p>
                  <span className="text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1">
                    Перейти в раздел
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-28 md:py-32 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-14">
           <h2 className="text-4xl md:text-5xl font-serif text-emani-dark">Хиты Продаж</h2>
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

      {/* Newsletter */}
      <section className="bg-white border-t border-emani-cream py-28 md:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-10 bg-[#fcfaf7] border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
            <Mail size={44} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-5 text-emani-dark">Сладкие новости</h2>
          <p className="text-gray-500 mb-12 font-light max-w-xl mx-auto leading-relaxed italic text-base md:text-lg">
            Подпишитесь на нашу рассылку, чтобы первыми узнавать о новинках, сезонных предложениях и мастер-классах.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Ваш Email" 
              className="flex-1 bg-[#fcfaf7] border border-gray-100 rounded-xl px-6 py-5 text-lg text-emani-dark placeholder-gray-400 focus:outline-none focus:border-emani-gold focus:bg-white transition-all shadow-sm"
            />
            <button className="bg-emani-gold text-white px-10 py-5 rounded-xl hover:bg-emani-dark transition-all duration-300 font-bold text-sm uppercase tracking-widest shadow-lg shadow-emani-gold/20">
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const MenuPage = () => {
  const [filter, setFilter] = useState<string>('Все');
  const categories = ['Все', ...Object.values(Category).filter(c => c !== Category.SPECIAL)];
  const filteredProducts = filter === 'Все' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

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
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
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
            <button onClick={() => setFilter('Все')} className="mt-4 text-emani-blue hover:underline">
              Показать все товары
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ABOUT_METRICS = [
  {
    icon: Award,
    value: 'С 2016',
    label: 'Работаем как профессиональное производство премиальной выпечки и кулинарии.',
  },
  {
    icon: Truck,
    value: 'Стабильно',
    label: 'Держим вкус, вид на витрине и качество каждой поставки на одном уровне.',
  },
  {
    icon: MapPin,
    value: '500 м²',
    label: 'Производственная площадка в Новой Москве, в ЖК «Дубровка».',
  },
  {
    icon: Check,
    value: 'HACCP',
    label: 'Контроль процессов, безопасность и предсказуемый результат в каждой партии.',
  },
];

const ABOUT_STORIES = [
  {
    eyebrow: 'Кто мы',
    title: 'Соединяем кондитерское мастерство и кулинарную технологичность.',
    description:
      '«Эмани» — команда, которая работает и с классическими десертами, и с изделиями в восточной традиции, и с удобными полуфабрикатами для дома. Мы собираем ассортимент так, чтобы он был сильным и для розничной витрины, и для регулярных поставок.',
    points: ['Кондитерские изделия', 'Кулинария', 'Выпечка', 'Восточные сладости', 'Полуфабрикаты'],
  },
  {
    eyebrow: 'Опыт и доверие',
    title: 'Растём вместе с сильными площадками и требовательными партнёрами.',
    description:
      'За плечами «Эмани» — работа на Усачёвском, Добрынинском и Центральном рынках. Сегодня мы — официальные поставщики сетей «ВкусВилл» и «Добрынинский», поэтому к вкусу добавляются дисциплина производства, стандарты и ответственность за каждую партию.',
    points: ['Усачёвский рынок', 'Добрынинский рынок', 'Центральный рынок', 'Сеть «ВкусВилл»', 'Сеть «Добрынинский»'],
  },
];

const ABOUT_DIRECTIONS = [
  {
    id: '01',
    title: 'Кондитерские изделия',
    description: 'Торты, пирожные, рулеты и десерты, созданные для премиальной подачи и стабильного вкуса.',
  },
  {
    id: '02',
    title: 'Кулинария',
    description: 'Первые и вторые блюда, салаты и гарниры для ежедневного спроса и уверенной оборачиваемости.',
  },
  {
    id: '03',
    title: 'Выпечка',
    description: 'Пироги, булочки, слойки и пирожки — свежая линейка, которая работает и на аромат, и на импульсную покупку.',
  },
  {
    id: '04',
    title: 'Восточные сладости',
    description: 'Пахлава, печенье и фирменные позиции в восточной традиции с узнаваемым характером бренда.',
  },
  {
    id: '05',
    title: 'Полуфабрикаты',
    description: 'Практичные решения для дома: пельмени, котлеты, голубцы, вареники и другие позиции.',
  },
];

const AboutPage = () => (
  <div className="min-h-screen bg-[#fcfaf7] overflow-hidden">
    <section className="relative border-b border-emani-cream/30 bg-[#fcfaf7]">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-emani-cream bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold shadow-sm">
              <Star size={14} />
              Премиальная кондитерская-кулинария
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl md:text-6xl font-serif leading-[1.05] text-emani-dark">
              «Эмани» создаёт продукты, которые одинаково уверенно работают на вкус, подачу и качество поставок.
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              Кондитерская-кулинария «Эмани» — профессиональное производство премиальной выпечки и кулинарных изделий, которое работает с 2016 года. Мы делаем продукты, которые одинаково хорошо смотрятся на витрине, сохраняют стабильное качество в поставках и радуют вкусом с первого кусочка.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emani-dark px-7 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-emani-gold hover:shadow-xl hover:shadow-emani-gold/15"
              >
                Смотреть меню
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-emani-cream bg-white/80 px-7 py-4 text-xs font-bold uppercase tracking-[0.24em] text-emani-dark transition-all duration-300 hover:border-emani-gold hover:text-emani-gold"
              >
                Связаться с нами
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_METRICS.map(({ icon: Icon, value, label }, idx) => (
                <div
                  key={value}
                  className={`hover-lift reveal-up rounded-3xl border border-emani-cream/50 bg-white/85 p-5 shadow-[0_16px_40px_rgba(32,31,22,0.05)] ${idx % 2 === 1 ? 'reveal-delay-1' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fcfaf7] text-emani-gold border border-emani-cream/40">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-lg font-serif text-emani-dark">{value}</div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up reveal-delay-2">
            <div className="soft-float relative overflow-hidden rounded-[32px] border border-emani-cream/60 bg-white p-3 shadow-[0_28px_80px_rgba(32,31,22,0.09)]">
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                  alt="Команда и производство Эмани"
                  className="h-[540px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emani-dark/75 via-emani-dark/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-lightGold">Новая Москва · ЖК «Дубровка»</p>
                  <h2 className="mt-3 text-3xl font-serif leading-tight">Производство, витрина и кафе работают как единая экосистема бренда.</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
                    Полный ассортимент доступен не только в поставках, но и прямо при производстве: можно попробовать новинки и забрать всё свежее — буквально из первых рук.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 py-20 md:py-24 space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {ABOUT_STORIES.map((item, idx) => (
          <article
            key={item.eyebrow}
            className={`hover-lift reveal-up rounded-[32px] border border-emani-cream/50 bg-white px-7 py-8 md:px-10 md:py-10 shadow-[0_18px_45px_rgba(32,31,22,0.05)] ${idx === 1 ? 'reveal-delay-1' : ''}`}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">{item.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-serif leading-tight text-emani-dark">{item.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {item.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-emani-cream/70 bg-[#fcfaf7] px-4 py-2 text-xs font-medium tracking-[0.08em] text-emani-dark"
                >
                  {point}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
        <div className="reveal-up relative">
          <div className="absolute -top-5 -left-5 hidden md:block h-24 w-24 rounded-full border border-emani-cream/50 bg-white/70"></div>
          <div className="hover-lift relative overflow-hidden rounded-[32px] border border-emani-cream/60 bg-white p-3 shadow-[0_24px_60px_rgba(32,31,22,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Производство Эмани"
              className="h-[520px] w-full rounded-[24px] object-cover"
            />
          </div>
        </div>

        <div className="reveal-up reveal-delay-1 space-y-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">Производство и локация</span>
            <h2 className="mt-4 text-4xl font-serif text-emani-dark leading-tight">Надёжная производственная база с понятными стандартами качества.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
              Наше производство находится в Новой Москве, в ЖК «Дубровка». Площадь площадки — 500 м², а все процессы выстроены в соответствии со стандартами HACCP: это про безопасность, контроль и стабильный результат от партии к партии.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Профессиональное производство премиальной выпечки и кулинарии.',
              'Контроль процессов на каждом этапе — от рецептуры до отгрузки.',
              'Ответственность за стабильность вкуса, внешнего вида и сроков поставки.',
              'Кафе при производстве с полным ассортиментом и свежей выкладкой каждый день.',
            ].map((point) => (
              <div key={point} className="rounded-3xl border border-emani-cream/50 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emani-gold"></div>
                  <p className="text-sm leading-relaxed text-gray-600">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="hover-lift rounded-[28px] border border-emani-cream/50 bg-white p-7 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">Кафе при производстве</p>
              <h3 className="mt-4 text-2xl font-serif text-emani-dark">Можно зайти за любимой выпечкой, попробовать новинки и забрать всё свежее сразу.</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Прямо на территории производства работает кафе с полным ассортиментом. Это делает знакомство с брендом более живым и удобным: гости получают свежий продукт, а команда видит мгновенную реакцию на новые позиции.
              </p>
            </div>

            <div className="hover-lift rounded-[28px] border border-emani-cream/50 bg-emani-dark p-7 text-white shadow-[0_20px_45px_rgba(32,31,22,0.16)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-lightGold">Партнёрства</p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/80">
                <p>Официальный поставщик сети «ВкусВилл».</p>
                <p>Официальный поставщик сети «Добрынинский».</p>
                <p>Опыт работы на сильных московских рынках и в требовательной рознице.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-up">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">Направления</span>
          <h2 className="mt-4 text-4xl font-serif text-emani-dark">Ассортимент, собранный под разные сценарии спроса.</h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600">
            От витринных десертов до повседневной кулинарии и полуфабрикатов — каждое направление усиливает бренд и делает линейку устойчивой для разных форматов продаж.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          {ABOUT_DIRECTIONS.map((item, idx) => (
            <article
              key={item.id}
              className={`hover-lift rounded-[28px] border border-emani-cream/50 bg-white p-6 shadow-sm ${idx > 1 ? 'reveal-delay-1' : ''}`}
            >
              <div className="text-emani-lightGold text-xs font-bold tracking-[0.32em]">{item.id}</div>
              <h3 className="mt-5 text-xl font-serif leading-snug text-emani-dark">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="hover-lift reveal-up rounded-[32px] border border-emani-cream/50 bg-white px-7 py-8 md:px-10 md:py-10 shadow-[0_18px_45px_rgba(32,31,22,0.05)]">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">Производство под СТМ</span>
          <h2 className="mt-4 text-3xl font-serif text-emani-dark">Готовы работать как производственный партнёр для брендов и сетей.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-emani-gold uppercase tracking-widest">Что мы предлагаем</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Разработка рецептур под требования клиента.</li>
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Производство под собственную упаковку и брендинг.</li>
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Гибкость в ассортименте и объёмах.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-emani-gold uppercase tracking-widest">Преимущества</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Контроль качества на каждом этапе.</li>
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Стабильные сроки доставки.</li>
                <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold" /> Конкурентные цены при высоком качестве.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hover-lift reveal-up reveal-delay-1 rounded-[32px] border border-emani-cream/50 bg-[#fcfaf7] px-7 py-8 md:px-10 md:py-10 shadow-[0_18px_45px_rgba(32,31,22,0.05)]">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-emani-gold">«Эмани» в Дубае</span>
          <h2 className="mt-4 text-3xl font-serif text-emani-dark">Международное развитие подтверждает силу продукта.</h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            В начале 2024 года мы открыли свою первую международную точку в Дубае. Это премиальная кондитерская, которая представляет фирменные десерты и кулинарную продукцию бренда.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Выход на рынок ОАЭ показывает, что продукты «Эмани» остаются востребованными и конкурентоспособными не только локально, но и на международном уровне.
          </p>
        </div>
      </section>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="bg-[#fcfaf7] min-h-screen py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-emani-dark mb-6">Контакты</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-emani-cream">
           <h3 className="text-3xl font-serif mb-10 text-emani-dark border-b border-emani-cream pb-6">Наши контакты</h3>
           <ul className="space-y-10">
             <li className="flex items-start gap-6">
               <Phone className="text-emani-gold shrink-0" size={28} />
               <div>
                 <p className="text-gray-900 text-xl font-medium mb-1">+7 967 105-11-11</p>
                 <p className="text-gray-400 text-sm">WhatsApp, Telegram</p>
               </div>
             </li>
             <li className="flex items-start gap-6">
               <Mail className="text-emani-gold shrink-0" size={28} />
               <p className="text-gray-900 text-xl font-medium">emanidubrovka@gmail.com</p>
             </li>
              <li className="flex items-start gap-6">
               <Instagram className="text-emani-gold shrink-0" size={28} />
               <a href="https://instagram.com/emani_house" target="_blank" rel="noopener noreferrer" className="text-gray-900 text-xl font-medium hover:text-emani-gold transition-colors">emani_house</a>
             </li>
             <li className="flex items-start gap-6">
               <MapPin className="text-emani-gold shrink-0" size={28} />
               <span className="text-gray-500 text-lg leading-relaxed">Коммунарка, ул. Ясеневая, 5к1</span>
             </li>
           </ul>
        </div>
        <div className="bg-white p-12 rounded-3xl border border-emani-cream shadow-xl">
          <h3 className="text-3xl font-serif mb-10 text-emani-dark">Напишите нам</h3>
          <form className="space-y-8">
            <input type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-[#fcfaf7] focus:border-emani-gold outline-none" placeholder="Имя" />
            <textarea rows={6} className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-[#fcfaf7] focus:border-emani-gold outline-none resize-none" placeholder="Сообщение"></textarea>
            <button type="button" className="w-full bg-emani-dark text-white py-6 rounded-xl hover:bg-emani-gold transition-all font-bold uppercase tracking-widest text-xs">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-emani-cream/30">
      <div className="h-72 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
        <button 
           onClick={() => addToCart(product)}
           className="absolute bottom-6 left-6 right-6 bg-white text-emani-dark py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all font-bold text-xs uppercase tracking-widest"
        >
          В корзину
        </button>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
           <h3 className="font-serif text-xl text-emani-dark leading-tight">{product.name}</h3>
           <span className="font-bold text-lg text-emani-gold">{product.price} ₽</span>
        </div>
        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow italic">"{product.description}"</p>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useContext(CartContext);
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-emani-dark/40 backdrop-blur-sm" onClick={toggleCart}></div>
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform animate-[slideIn_0.3s_ease-out]">
        <div className="p-8 border-b border-emani-cream/30 flex justify-between items-center bg-[#fcfaf7]">
          <h2 className="font-serif text-3xl text-emani-dark">Корзина</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-emani-cream rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="text-center p-8">Корзина пуста</div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-emani-cream/20">
                <img src={item.image} className="w-24 h-24 rounded-xl object-cover" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-serif text-lg">{item.name}</h4>
                  <div className="flex justify-between mt-4">
                    <span className="font-bold text-emani-gold">{item.price * item.quantity} ₽</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-8 border-t border-emani-cream/30 bg-[#fcfaf7]">
          <div className="flex justify-between mb-8">
            <span className="uppercase tracking-widest text-[10px] font-bold">Итого</span>
            <span className="text-4xl font-serif font-bold">{total} ₽</span>
          </div>
          <button disabled={items.length === 0} className="w-full bg-emani-dark text-white py-5 rounded-2xl uppercase text-xs font-bold tracking-widest">
            Оформить доставку
          </button>
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
      <HashRouter>
        <div className="flex flex-col min-h-screen">
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
      </HashRouter>
    </CartContext.Provider>
  );
}

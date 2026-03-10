import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiAssistant } from './components/GeminiAssistant';
import { CartItem, Product, Category } from './types';
import { CartContext } from './context';
import { MOCK_PRODUCTS } from './constants';
import { Phone, Mail, MapPin, Clock, Truck, Award, Heart, Star, Send, ArrowRight, X, Check, Instagram } from 'lucide-react';

// --- Page Components ---

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-emani-dark">Натуральные ингредиенты</h3>
              <p className="text-gray-600 leading-relaxed">Мы не используем смеси и консерванты. Только настоящее сливочное масло, фермерские яйца и премиальный шоколад.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-emani-dark">Ручная работа</h3>
              <p className="text-gray-600 leading-relaxed">Каждый круассан скручивается, а каждый торт декорируется вручную нашими мастерами-кондитерами.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-6 bg-white border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-emani-dark">Бережная доставка</h3>
              <p className="text-gray-600 leading-relaxed">Собственная курьерская служба гарантирует, что ваш десерт приедет к столу в идеальном состоянии.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-white border-y border-emani-cream/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-emani-dark">Наши Направления</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Кондитерские Изделия', link: '/menu', img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Свежая Выпечка', link: '/menu', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Восточные Сладости', link: '/menu', img: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group relative h-96 overflow-hidden rounded-lg shadow-md block">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10"></div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-3xl font-serif font-bold mb-2 text-center">{item.title}</h3>
                  <span className="text-sm uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1">
                    Перейти в раздел
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
           <h2 className="text-3xl md:text-4xl font-serif text-emani-dark">Хиты Продаж</h2>
           <Link to="/menu" className="hidden md:flex items-center gap-2 text-emani-gold hover:text-emani-brown transition-colors">
             Смотреть всё меню <ArrowRight size={20} />
           </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.filter(p => p.isPopular).slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white border-t border-emani-cream py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-[#fcfaf7] border border-emani-cream rounded-full flex items-center justify-center text-emani-gold">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-emani-dark">Сладкие новости</h2>
          <p className="text-gray-500 mb-10 font-light max-w-lg mx-auto leading-relaxed italic">
            Подпишитесь на нашу рассылку, чтобы первыми узнавать о новинках, сезонных предложениях и мастер-классах.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Ваш Email" 
              className="flex-1 bg-[#fcfaf7] border border-gray-100 rounded-xl px-6 py-4 text-emani-dark placeholder-gray-400 focus:outline-none focus:border-emani-gold focus:bg-white transition-all shadow-sm"
            />
            <button className="bg-emani-gold text-white px-8 py-4 rounded-xl hover:bg-emani-dark transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-lg shadow-emani-gold/20">
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

const AboutPage = () => (
  <div className="min-h-screen bg-[#fcfaf7]">
    {/* Header */}
    <div className="bg-white py-24 px-4 border-b border-emani-cream/30">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-emani-gold tracking-widest uppercase text-sm font-bold mb-4 block">Работаем с 2016 года</span>
        <h1 className="text-4xl md:text-5xl font-serif text-emani-dark mb-8">О Компании</h1>
        <p className="text-xl text-gray-600 leading-relaxed font-light italic">
          Профессиональное производство премиальной выпечки и кулинарных изделий.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
      {/* Production & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Production" className="rounded-lg shadow-2xl w-full" />
        </div>
        <div className="space-y-8">
          <h2 className="text-3xl font-serif text-emani-dark">Локация и Производство</h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>Расположение:</strong> Новая Москва</p>
            <p><strong>Площадь:</strong> 500 м² производственных мощностей</p>
            <p><strong>Стандарты:</strong> Полное соответствие стандартам HACCP</p>
          </div>
          <div className="pt-4">
             <h3 className="text-xl font-serif text-emani-dark mb-4">Наши Партнёры</h3>
             <ul className="list-disc list-inside text-gray-600 space-y-2">
               <li>Официальный поставщик сети «ВкусВилл»</li>
               <li>Официальный поставщик сети «Добрынинский»</li>
             </ul>
          </div>
        </div>
      </div>

      {/* Dubai Section */}
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-emani-cream/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-emani-dark mb-6">«Эмани» в Дубае</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            В начале 2024 года мы открыли свою первую международную точку в Дубае. 
            Это премиальная кондитерская, представляющая весь ассортимент фирменных десертов и кулинарной продукции бренда.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Выход на рынок ОАЭ подтверждает, что продукция «Эмани» востребована и конкурентоспособна на международном уровне.
          </p>
        </div>
      </div>

      {/* Directions */}
      <div>
        <h2 className="text-3xl font-serif text-emani-dark text-center mb-12">Производственные Направления</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: '🎂', title: 'Кондитерские изделия', desc: 'Торты, пирожные, рулеты и т.д.' },
            { icon: '🍲', title: 'Кулинария', desc: 'Первые и вторые блюда, салаты, гарниры и т.д.' },
            { icon: '🥐', title: 'Выпечка', desc: 'Пироги, булочки, слойки, пирожки и т.д.' },
            { icon: '🍯', title: 'Восточные сладости', desc: 'Пахлава, пальчики, печенья и т.д.' },
            { icon: '🥟', title: 'Полуфабрикаты', desc: 'Пельмени, котлеты, голубцы, вареники и т.д.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-emani-cream/30 hover:shadow-lg transition-all text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-emani-dark mb-2 text-sm uppercase tracking-wide">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* B2B / STM */}
      <div className="bg-[#fcfaf7] border border-emani-cream rounded-3xl p-12">
        <h2 className="text-3xl font-serif text-emani-dark mb-8 text-center">Производство под СТМ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-bold text-lg mb-4 text-emani-gold uppercase tracking-widest">Что мы предлагаем</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Разработка рецептур под требования клиента</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Производство под собственную упаковку и брендинг</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Гибкость в ассортименте и объёмах</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-emani-gold uppercase tracking-widest">Преимущества</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Контроль качества на каждом этапе</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Стабильные сроки доставки</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-1 text-emani-gold"/> Конкурентные цены при высоком качестве</li>
            </ul>
          </div>
        </div>
      </div>
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
          <GeminiAssistant />
        </div>
      </HashRouter>
    </CartContext.Provider>
  );
}
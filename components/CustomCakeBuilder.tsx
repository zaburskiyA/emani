import React, { useState, useContext } from 'react';
import { CartContext } from '../context';
import { Category } from '../types';
import { Check, Info } from 'lucide-react';

interface CakeConfig {
  shape: 'round' | 'square' | 'heart';
  tiers: 1 | 2 | 3;
  flavor: string;
  filling: string;
  decor: string;
  inscription: string;
}

const OPTIONS = {
  shapes: [
    { id: 'round', label: 'Круг', price: 0 },
    { id: 'square', label: 'Квадрат', price: 500 },
    { id: 'heart', label: 'Сердце', price: 800 },
  ],
  tiers: [
    { id: 1, label: '1 Ярус (2 кг)', price: 4000 },
    { id: 2, label: '2 Яруса (4.5 кг)', price: 8500 },
    { id: 3, label: '3 Яруса (7 кг)', price: 13000 },
  ],
  flavors: [
    { id: 'vanilla', label: 'Ванильный', price: 0 },
    { id: 'chocolate', label: 'Шоколадный', price: 0 },
    { id: 'red_velvet', label: 'Красный бархат', price: 200 },
    { id: 'carrot', label: 'Морковный', price: 300 },
  ],
  fillings: [
    { id: 'cream_cheese', label: 'Крем-чиз', price: 0 },
    { id: 'berry', label: 'Ягодное конфи', price: 400 },
    { id: 'caramel', label: 'Соленая карамель', price: 300 },
    { id: 'ganache', label: 'Шоколадный ганаш', price: 500 },
  ],
  decors: [
    { id: 'minimal', label: 'Минимализм', price: 0 },
    { id: 'berries', label: 'Свежие ягоды', price: 1500 },
    { id: 'flowers', label: 'Живые цветы', price: 2000 },
    { id: 'print', label: 'Фотопечать', price: 800 },
  ]
};

export const CustomCakeBuilder: React.FC = () => {
  const { addToCart } = useContext(CartContext);
  const [config, setConfig] = useState<CakeConfig>({
    shape: 'round',
    tiers: 1,
    flavor: 'vanilla',
    filling: 'cream_cheese',
    decor: 'minimal',
    inscription: ''
  });

  const calculatePrice = () => {
    let total = 0;
    total += OPTIONS.shapes.find(s => s.id === config.shape)?.price || 0;
    total += OPTIONS.tiers.find(t => t.id === config.tiers)?.price || 0;
    total += OPTIONS.flavors.find(f => f.id === config.flavor)?.price || 0;
    total += OPTIONS.fillings.find(f => f.id === config.filling)?.price || 0;
    total += OPTIONS.decors.find(d => d.id === config.decor)?.price || 0;
    return total;
  };

  const handleAddToCart = () => {
    const price = calculatePrice();
    const description = `
      Форма: ${OPTIONS.shapes.find(s => s.id === config.shape)?.label}, 
      Ярусов: ${config.tiers}, 
      Коржи: ${OPTIONS.flavors.find(f => f.id === config.flavor)?.label}, 
      Начинка: ${OPTIONS.fillings.find(f => f.id === config.filling)?.label}, 
      Декор: ${OPTIONS.decors.find(d => d.id === config.decor)?.label}
      ${config.inscription ? `| Надпись: "${config.inscription}"` : ''}
    `;

    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Авторский торт (Спецзаказ)',
      description: description.replace(/\s+/g, ' ').trim(),
      price: price,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: Category.SPECIAL,
      tags: ['custom']
    });
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-emani-dark mb-6">Ваш Идеальный Торт</h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light italic">Выберите параметры, которые сделают ваше торжество незабываемым.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Configuration Form */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Shape & Tiers */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl mb-8 text-emani-brown flex items-center gap-3">
                <span className="bg-emani-gold text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-sans">1</span>
                Размер и Форма
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Форма основы</label>
                  <div className="grid grid-cols-3 gap-4">
                    {OPTIONS.shapes.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setConfig({ ...config, shape: option.id as any })}
                        className={`py-4 px-2 rounded-2xl border text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                          config.shape === option.id 
                            ? 'border-emani-blue bg-blue-50 text-emani-blue ring-2 ring-emani-blue/20' 
                            : 'border-gray-100 bg-[#fcfaf7]/50 hover:bg-white hover:border-gray-200'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        {option.price > 0 && <span className="text-[10px] text-gray-400">+{option.price}₽</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Вес и Ярусы</label>
                  <div className="space-y-3">
                    {OPTIONS.tiers.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setConfig({ ...config, tiers: option.id as any })}
                        className={`w-full py-4 px-6 rounded-2xl border text-sm flex justify-between items-center transition-all ${
                          config.tiers === option.id 
                            ? 'border-emani-blue bg-blue-50 text-emani-blue ring-2 ring-emani-blue/20' 
                            : 'border-gray-100 bg-[#fcfaf7]/50 hover:bg-white hover:border-gray-200'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className="font-bold opacity-80">{option.price} ₽</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Taste */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="font-serif text-2xl mb-8 text-emani-brown flex items-center gap-3">
                <span className="bg-emani-gold text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-sans">2</span>
                Вкусовая Палитра
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Тип бисквита</label>
                  <div className="space-y-2">
                    {OPTIONS.flavors.map(option => (
                      <div 
                        key={option.id}
                        onClick={() => setConfig({...config, flavor: option.id})}
                        className={`cursor-pointer p-4 rounded-2xl border flex items-center justify-between transition-all ${
                          config.flavor === option.id ? 'border-emani-blue bg-blue-50' : 'border-gray-100 bg-[#fcfaf7]/50 hover:bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                        {config.flavor === option.id && <Check size={18} className="text-emani-blue"/>}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Начинка и Крем</label>
                  <div className="space-y-2">
                    {OPTIONS.fillings.map(option => (
                      <div 
                        key={option.id}
                        onClick={() => setConfig({...config, filling: option.id})}
                        className={`cursor-pointer p-4 rounded-2xl border flex items-center justify-between transition-all ${
                          config.filling === option.id ? 'border-emani-blue bg-blue-50' : 'border-gray-100 bg-[#fcfaf7]/50 hover:bg-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{option.label}</span>
                          {option.price > 0 && <span className="text-[10px] text-gray-400">+{option.price} ₽</span>}
                        </div>
                        {config.filling === option.id && <Check size={18} className="text-emani-blue"/>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Decoration */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl mb-8 text-emani-brown flex items-center gap-3">
                <span className="bg-emani-gold text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-sans">3</span>
                Финальные Штрихи
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {OPTIONS.decors.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setConfig({ ...config, decor: option.id })}
                    className={`p-5 rounded-2xl border text-center transition-all flex flex-col gap-1 ${
                      config.decor === option.id 
                        ? 'border-emani-blue bg-blue-50 ring-2 ring-emani-blue/20' 
                        : 'border-gray-100 bg-[#fcfaf7]/50 hover:bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-emani-dark">{option.label}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">{option.price === 0 ? 'Вкл.' : `+${option.price} ₽`}</div>
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Текст надписи (до 30 символов)</label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="С Днем Рождения, Эмани!"
                  value={config.inscription}
                  onChange={(e) => setConfig({...config, inscription: e.target.value})}
                  className="w-full p-5 bg-[#fcfaf7] border border-gray-100 rounded-2xl focus:outline-none focus:border-emani-gold focus:bg-white transition-all text-emani-dark font-medium"
                />
              </div>
            </section>

          </div>

          {/* Summary Card - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50">
              <h3 className="font-serif text-2xl mb-8 text-emani-dark border-b border-gray-50 pb-6">Итог заказа</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Формат</span>
                  <span className="font-serif text-emani-dark">{OPTIONS.tiers.find(t => t.id === config.tiers)?.label}</span>
                </div>
                <div className="flex justify-between text-sm items-start">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] pt-1">Вкусы</span>
                  <span className="font-serif text-emani-dark text-right leading-relaxed">
                    {OPTIONS.flavors.find(f => f.id === config.flavor)?.label}<br/>
                    <span className="text-gray-400 italic font-sans text-xs">с {OPTIONS.fillings.find(f => f.id === config.filling)?.label}</span>
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Декор</span>
                  <span className="font-serif text-emani-dark">{OPTIONS.decors.find(d => d.id === config.decor)?.label}</span>
                </div>
                {config.inscription && (
                  <div className="bg-[#fcfaf7] p-4 rounded-xl border border-emani-cream/30">
                    <span className="text-[10px] font-bold text-emani-gold uppercase block mb-1">Надпись</span>
                    <span className="text-sm font-serif italic text-emani-dark">"{config.inscription}"</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8 pt-6 border-t border-gray-50">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Стоимость</span>
                <span className="text-4xl font-serif font-bold text-emani-blue">{calculatePrice()} ₽</span>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-emani-dark text-white py-5 rounded-2xl hover:bg-emani-blue transition-all font-bold tracking-[0.2em] uppercase text-xs shadow-xl active:scale-[0.98]"
              >
                Добавить в корзину
              </button>
              
              <div className="mt-6 flex gap-3 text-[10px] text-gray-400 leading-relaxed font-medium">
                <Info size={16} className="shrink-0 text-emani-gold" />
                <p>Предварительная стоимость. Точный расчет предоставит менеджер после уточнения всех деталей декора.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
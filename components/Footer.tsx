import React from 'react';
import { Send, Phone, MapPin, Clock, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-emani-cream text-emani-dark overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Contact Info Column */}
        <div className="p-8 lg:p-16 flex flex-col justify-between">
          <div className="space-y-10">
            
            {/* Address */}
            <section>
              <h4 className="text-emani-gold font-bold uppercase tracking-widest text-[10px] mb-3">Адрес</h4>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emani-gold/60" />
                <p className="text-xl font-serif">Коммунарка, ул. Ясеневая, 5к1</p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Phone & Socials */}
              <section>
                <h4 className="text-emani-gold font-bold uppercase tracking-widest text-[10px] mb-3">Звоните нам</h4>
                <div className="space-y-4">
                  <a href="tel:+79671051111" className="text-xl font-serif hover:text-emani-gold transition-colors flex items-center gap-3">
                    <Phone size={18} className="text-emani-gold/60" />
                    +7 (967) 105-11-11
                  </a>
                  <div className="flex items-center gap-4 pt-1">
                    <a href="https://instagram.com/emani_house" target="_blank" rel="noopener noreferrer" className="p-2 border border-emani-cream rounded-full hover:bg-emani-cream/30 transition-all text-emani-gold">
                      <Instagram size={16} />
                    </a>
                    <a href="#" className="px-3 py-1.5 border border-emani-cream rounded-full hover:bg-emani-cream/30 transition-all text-[10px] font-bold uppercase tracking-tighter text-emani-gold">
                      VKontakte
                    </a>
                  </div>
                </div>
              </section>

              {/* Opening Hours */}
              <section>
                <h4 className="text-emani-gold font-bold uppercase tracking-widest text-[10px] mb-3">Время работы</h4>
                <div className="space-y-2 text-sm text-gray-500 font-light">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-emani-gold/40" />
                    Ежедневно: 12:00 – 00:00
                  </p>
                  <p className="pl-5 italic">Завтраки: 9:00 – 12:00</p>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom Legal */}
          <div className="mt-12 pt-8 border-t border-emani-cream/30">
            <div className="text-[10px] text-gray-400 space-y-2 font-medium uppercase tracking-wider">
              <p>© 2025 Эмани Кондитерская | Все права защищены</p>
              <p className="opacity-60">ООО «Эмани Кондитер», ИНН 7720648581</p>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div className="relative min-h-[300px] lg:min-h-full bg-[#fcfaf7]">
          <iframe 
            src="https://yandex.ru/map-widget/v1/?text=%D0%9A%D0%BE%D0%BC%D0%BC%D1%83%D0%BD%D0%B0%D1%80%D0%BA%D0%B0%2C+%D1%83%D0%BB.+%D0%AF%D1%81%D0%B5%D0%BD%D0%B5%D0%B2%D0%B0%D1%8F%2C+5%D0%BA1&z=16" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            className="absolute inset-0 grayscale contrast-75 opacity-70 hover:opacity-100 transition-opacity duration-700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
          
          {/* Subtle Branding Overlay */}
          <div className="absolute bottom-6 right-6 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-emani-cream/50 flex items-center gap-2">
               <div className="w-2 h-2 bg-emani-gold rounded-full"></div>
               <span className="text-emani-dark font-serif text-xs font-bold">Эмани в Коммунарке</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
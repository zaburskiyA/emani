import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import deliveryLogo from '../media/delivery-icon-logo.svg';
import telegramLogo from '../media/telegram-logo.svg';
import yandexEdaLogo from '../media/yandex-eda-sign-logo.svg';

const YANDEX_MAPS_SCRIPT_ID = 'yandex-maps-script';
const YANDEX_MAPS_SRC = 'https://api-maps.yandex.ru/2.1/?apikey=5a4e4c52-6196-4467-8f97-499126a7174f&lang=ru_RU';
const MAP_CENTER = [55.568385, 37.441218] as const;

let yandexMapsLoader: Promise<void> | null = null;

const loadYandexMaps = () => {
  if ((window as any).ymaps) {
    return Promise.resolve();
  }

  if (!yandexMapsLoader) {
    yandexMapsLoader = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById(YANDEX_MAPS_SCRIPT_ID) as HTMLScriptElement | null;

      const handleLoad = () => resolve();
      const handleError = () => reject(new Error('Failed to load Yandex Maps script'));

      if (existingScript) {
        existingScript.addEventListener('load', handleLoad, { once: true });
        existingScript.addEventListener('error', handleError, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = YANDEX_MAPS_SCRIPT_ID;
      script.src = YANDEX_MAPS_SRC;
      script.async = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.body.appendChild(script);
    });
  }

  return yandexMapsLoader;
};

export const Footer: React.FC = () => {
  const mapShellRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const shell = mapShellRef.current;
    if (!shell || shouldLoadMap) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px', threshold: 0.1 },
    );

    observer.observe(shell);

    return () => observer.disconnect();
  }, [shouldLoadMap]);

  useEffect(() => {
    if (!shouldLoadMap) {
      return;
    }

    let isCancelled = false;

    const initMap = () => {
      const ymaps = (window as any).ymaps;
      if (!ymaps || isCancelled || mapInstanceRef.current || !mapContainerRef.current) {
        return;
      }

      ymaps.ready(() => {
        if (isCancelled || mapInstanceRef.current || !mapContainerRef.current) {
          return;
        }

        const map = new ymaps.Map(mapContainerRef.current, {
          center: MAP_CENTER,
          zoom: 16,
          controls: ['zoomControl'],
        });

        map.behaviors.disable('scrollZoom');

        const placemark = new ymaps.Placemark(
          MAP_CENTER,
          {
            hintContent: 'Эмани',
            balloonContent: 'Ясеневая улица, 5к1',
          },
          {
            preset: 'islands#blueRestaurantIcon',
          },
        );

        map.geoObjects.add(placemark);
        mapInstanceRef.current = map;
        setIsMapReady(true);
      });
    };

    loadYandexMaps().then(initMap).catch(() => {
      setIsMapReady(false);
    });

    return () => {
      isCancelled = true;
      mapInstanceRef.current?.destroy?.();
      mapInstanceRef.current = null;
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, [shouldLoadMap]);

  return (
    <footer className="w-full bg-white border-t border-emani-cream text-emani-dark overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Contact Info Column */}
        <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-between">
          <div className="space-y-10">
            
            {/* Address */}
            <section>
              <h4 className="text-emani-gold font-bold uppercase tracking-[0.12em] sm:tracking-widest text-xs mb-3">Адрес</h4>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-emani-gold/60" />
                <p className="text-base sm:text-lg font-serif leading-relaxed break-words">ул. Ясеневая, 5к1, ЖК Дубровка</p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Phone & Socials */}
              <section className="space-y-4">
                <h4 className="text-emani-gold font-bold uppercase tracking-[0.12em] sm:tracking-widest text-xs">Звоните нам</h4>
                <a
                  href="tel:+79671051111"
                  className="inline-flex min-h-[52px] items-center gap-3 text-base sm:text-lg lg:text-xl font-serif leading-none whitespace-nowrap hover:text-emani-gold transition-colors"
                >
                  <Phone className="h-5 w-5 shrink-0 text-emani-gold/60" />
                  +7 (967) 105-11-11
                </a>
              </section>

              {/* Opening Hours */}
              <section className="space-y-4">
                <h4 className="text-emani-gold font-bold uppercase tracking-[0.12em] sm:tracking-widest text-xs">Время работы</h4>
                <div className="space-y-1.5">
                  <p className="flex min-h-[52px] items-center gap-3 text-base sm:text-lg lg:text-xl font-serif leading-none whitespace-nowrap">
                    <Clock className="h-5 w-5 shrink-0 text-emani-gold/60" />
                    Ежедневно: 09:00 — 21:00
                  </p>
                </div>
              </section>

              <section className="space-y-4 md:col-span-2">
                <h4 className="text-emani-gold font-bold uppercase tracking-[0.12em] sm:tracking-widest text-xs">Онлайн-заказ</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  <a
                    href="https://eda.yandex.ru/restaurant/emani?utm_campaign=superapp_taxi_web&utm_medium=referral&utm_source=rst_shared_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[50px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 max-[360px]:gap-2 rounded-full border border-emani-cream bg-[#fcfaf7] px-3.5 max-[360px]:px-3 py-2.5 text-xs max-[360px]:text-[11px] sm:text-sm font-semibold tracking-[0.04em] text-emani-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-emani-gold/30 hover:bg-white hover:shadow-md"
                    aria-label="Заказать в Яндекс Еде"
                  >
                    <img src={yandexEdaLogo} alt="Яндекс Еда" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
                    <span className="whitespace-nowrap normal-case tracking-[0.04em] max-[360px]:tracking-[0.02em]">Яндекс Еда</span>
                    <ArrowUpRight className="h-3.5 w-3.5 max-[360px]:h-3 max-[360px]:w-3 sm:h-4 sm:w-4 text-emani-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href="https://dc.eda.yandex.net/restaurant/emani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[50px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 max-[360px]:gap-2 rounded-full border border-emani-cream bg-[#fcfaf7] px-3.5 max-[360px]:px-3 py-2.5 text-xs max-[360px]:text-[11px] sm:text-sm font-semibold tracking-[0.04em] text-emani-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-emani-gold/30 hover:bg-white hover:shadow-md"
                    aria-label="Заказать в Деливери Клаб"
                  >
                    <img src={deliveryLogo} alt="Деливери Клаб" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
                    <span className="whitespace-nowrap normal-case tracking-[0.04em] max-[360px]:tracking-[0.02em]">Деливери Клаб</span>
                    <ArrowUpRight className="h-3.5 w-3.5 max-[360px]:h-3 max-[360px]:w-3 sm:h-4 sm:w-4 text-emani-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href="https://t.me/emaniicafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[50px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 max-[360px]:gap-2 rounded-full border border-emani-cream bg-[#fcfaf7] px-3.5 max-[360px]:px-3 py-2.5 text-xs max-[360px]:text-[11px] sm:text-sm font-semibold tracking-[0.04em] text-emani-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-emani-gold/30 hover:bg-white hover:shadow-md"
                    aria-label="Телеграм-канал Эмани"
                  >
                    <img src={telegramLogo} alt="Телеграм" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
                    <span className="whitespace-nowrap normal-case tracking-[0.04em] max-[360px]:tracking-[0.02em]">Телеграм</span>
                    <ArrowUpRight className="h-3.5 w-3.5 max-[360px]:h-3 max-[360px]:w-3 sm:h-4 sm:w-4 text-emani-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom Legal */}
          <div className="mt-12 pt-8 border-t border-emani-cream/30">
            <div className="text-xs text-gray-400 space-y-2 font-medium uppercase tracking-[0.08em]">
              <p>ИП ГАРИФУЛЛИНА, ИНН 772972892688</p>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div ref={mapShellRef} className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-[#fcfaf7]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f7f1e4] via-[#fbf7ef] to-[#f3eadc]" />
          <div
            ref={mapContainerRef}
            id="map"
            className={`absolute inset-0 transition-opacity duration-500 ${isMapReady ? 'opacity-100' : 'opacity-0'}`}
          />
          {!isMapReady ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-xs rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
                <p className="text-sm font-medium text-emani-dark">Карта загружается</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">Эмани, Ясеневая улица, 5к1</p>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </footer>
  );
};

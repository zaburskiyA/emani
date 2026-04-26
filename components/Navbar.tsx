import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { CartContext } from '../context';
import logo from '../media/logo.webp';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const { toggleCart, items } = useContext(CartContext);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = 'mobile-navigation';

  useEffect(() => {
    const appShell = document.getElementById('app-shell');

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      setIsMenuMounted(true);
      appShell?.classList.add('mobile-drawer-open');
      window.addEventListener('keydown', handleEscape);
    }

    if (!isMenuOpen && isMenuMounted) {
      const timeoutId = window.setTimeout(() => setIsMenuMounted(false), 220);

      return () => {
        window.clearTimeout(timeoutId);
        appShell?.classList.remove('mobile-drawer-open');
        window.removeEventListener('keydown', handleEscape);
      };
    }

    return () => {
      appShell?.classList.remove('mobile-drawer-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, isMenuMounted]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-emani-cream transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
              <img
                 src={logo}
                alt="Эмани — Кондитерская & Кулинария"
                className="h-14 md:h-16 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `inline-flex min-h-[48px] items-center px-6 border-b-2 border-transparent pb-1 text-base font-medium transition-colors hover:text-emani-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emani-blue/35 ${
                    isActive ? 'text-emani-blue border-emani-blue' : 'text-emani-dark'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
             <button 
               onClick={toggleCart}
               className="relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-emani-dark transition-colors hover:text-emani-blue hover:bg-emani-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emani-blue/35"
               aria-label="Корзина"
             >
               <ShoppingBag size={24} />
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emani-blue rounded-full">
                   {cartCount}
                 </span>
               )}
             </button>

             {/* Mobile Menu Button */}
             <button
               ref={menuButtonRef}
                className="md:hidden inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-emani-dark transition-colors hover:text-emani-blue hover:bg-emani-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emani-blue/35"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               aria-expanded={isMenuOpen}
               aria-controls={mobileMenuId}
               aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
             >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuMounted && (
        <div
          id={mobileMenuId}
          className="md:hidden fixed inset-0 z-50 flex justify-end"
        >
          <button
            type="button"
            className={`absolute inset-0 bg-emani-dark/35 transition-opacity duration-200 ease-out ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Закрыть меню"
          />
          <div className={`mobile-drawer-panel relative z-10 h-dvh max-h-dvh w-[min(86vw,360px)] bg-[#fcfaf7] border-l border-emani-cream shadow-2xl overflow-y-auto overscroll-contain transition-transform duration-220 ease-out will-change-transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="space-y-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block min-h-[48px] rounded-xl px-4 py-3.5 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emani-blue/35 active:scale-[0.99] ${
                      isActive ? 'bg-emani-cream text-emani-blue' : 'text-emani-dark hover:bg-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

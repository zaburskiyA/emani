import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { CartContext } from '../context';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, items } = useContext(CartContext);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-emani-cream transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
             <img
               src="/logo.png"
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
                  `text-sm font-medium transition-colors hover:text-emani-blue ${
                    isActive ? 'text-emani-blue border-b-2 border-emani-blue' : 'text-emani-dark'
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
               className="relative p-2 text-emani-dark hover:text-emani-blue transition-colors"
               aria-label="Cart"
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
               className="md:hidden p-2 text-emani-dark hover:text-emani-blue transition-colors"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium ${
                    isActive ? 'bg-emani-cream text-emani-blue' : 'text-emani-dark hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
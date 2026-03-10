import { createContext } from 'react';
import { CartContextType } from './types';

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  isCartOpen: false,
  toggleCart: () => {},
});
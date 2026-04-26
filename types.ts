
export enum Category {
  CONFECTIONERY = 'Кондитерские изделия',
  CULINARY = 'Кулинария',
  BAKERY = 'Выпечка',
  EASTERN_SWEETS = 'Восточные сладости',
  SEMI_FINISHED = 'Полуфабрикаты',
  SPECIAL = 'Спецзаказ'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imagePosition?: string;
  category: Category | string;
  tags: string[]; // e.g., 'vegan', 'gluten-free'
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  decoration?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

export interface AiResponse {
  recommendation: string;
  products: string[];
}

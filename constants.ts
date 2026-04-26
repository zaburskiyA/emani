import { Product } from './types';
import PRICE_LIST_RAW from './price.txt?raw';

const FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f7f3eb"/>
        <stop offset="100%" stop-color="#efe6d7"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)"/>
    <rect x="60" y="60" width="1080" height="680" rx="32" fill="none" stroke="#d9c8ae" stroke-width="6"/>
    <text x="600" y="390" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="#9a835f">Emani</text>
    <text x="600" y="455" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#a18f72">Image unavailable</text>
  </svg>`,
)}`;

const ITEM_LINE_REGEX = /^(.*?)\s*-\s*(.*?)\s*-\s*(\d+)\s*$/;
const FILE_EXTENSION_REGEX = /\.[^.]+$/;
const POPULAR_PRODUCT_NAMES = new Set(['Фисташковый рулет', 'Сан-Себастьян']);
const POPULAR_PRODUCT_PREFIXES = ['Курзе'];
const IMAGE_POSITION_BY_BASENAME = new Map<string, string>([
  ['pie1', 'center 65%'],
  ['pie2', 'center 65%'],
  ['pie3', 'center 65%'],
]);

const isPopularProduct = (name: string): boolean => {
  if (POPULAR_PRODUCT_NAMES.has(name)) {
    return true;
  }

  return POPULAR_PRODUCT_PREFIXES.some((prefix) => name.startsWith(prefix));
};

const photoModules = (import.meta as any).glob('./media/photos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const photoByFilename = new Map<string, string>();
const photoByBasename = new Map<string, string>();

for (const [modulePath, imageUrl] of Object.entries(photoModules)) {
  const filename = modulePath.split('/').pop()?.toLowerCase();
  if (!filename) {
    continue;
  }
  photoByFilename.set(filename, imageUrl);

  const basename = filename.replace(FILE_EXTENSION_REGEX, '');
  if (!photoByBasename.has(basename)) {
    photoByBasename.set(basename, imageUrl);
  }
}

const resolvePhotoUrl = (rawFilename: string): string => {
  const normalizedFilename = rawFilename.trim().toLowerCase();
  const exactMatch = photoByFilename.get(normalizedFilename);
  if (exactMatch) {
    return exactMatch;
  }

  const basename = normalizedFilename.replace(FILE_EXTENSION_REGEX, '');
  const basenameMatch = photoByBasename.get(basename);
  if (basenameMatch) {
    return basenameMatch;
  }

  return FALLBACK_IMAGE;
};

const parseProductsFromPriceList = (rawPriceList: string): Product[] => {
  const lines = rawPriceList.split(/\r?\n/);
  const products: Product[] = [];
  let currentSection = 'Меню';
  let itemCounter = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (!line.includes(' - ') && line.endsWith(':')) {
      currentSection = line.slice(0, -1).trim() || currentSection;
      continue;
    }

    const itemMatch = line.match(ITEM_LINE_REGEX);
    if (!itemMatch) {
      continue;
    }

    const [, photoFilename, name, priceValue] = itemMatch;
    const price = Number(priceValue);
    const cleanName = name.trim();
    const photoBasename = photoFilename.trim().toLowerCase().replace(FILE_EXTENSION_REGEX, '');

    if (!cleanName || Number.isNaN(price)) {
      continue;
    }

    itemCounter += 1;
    products.push({
      id: `menu-${itemCounter}`,
      name: cleanName,
      description: '',
      price,
      image: resolvePhotoUrl(photoFilename),
      imagePosition: IMAGE_POSITION_BY_BASENAME.get(photoBasename),
      category: currentSection,
      tags: [],
      isPopular: isPopularProduct(cleanName),
    });
  }

  return products;
};

export const MOCK_PRODUCTS: Product[] = parseProductsFromPriceList(PRICE_LIST_RAW);

export const NAV_LINKS = [
  { name: 'Главная', path: '/' },
  { name: 'Меню', path: '/menu' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contact' },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  color: ProductColor;
  imageUrl: string;
  imageHoverUrl?: string;
  createdAt: string;
}

export type ProductCategory = 'snapback' | 'dad-hat' | 'trucker' | 'fitted';

export type ProductColor = 'negro' | 'blanco' | 'azul' | 'rojo' | 'verde' | 'beige' | 'multicolor';

export const BRANDS = ['New Era', '47 Brand', 'Mitchell & Ness', 'Nike', 'Adidas', 'Otro'] as const;

export const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'snapback', label: 'Snapback' },
  { value: 'dad-hat', label: 'Dad Hat' },
  { value: 'trucker', label: 'Trucker' },
  { value: 'fitted', label: 'Fitted' },
];

export const COLORS: { value: ProductColor; label: string; hex: string }[] = [
  { value: 'negro', label: 'Negro', hex: '#1a1a1a' },
  { value: 'blanco', label: 'Blanco', hex: '#f5f5f5' },
  { value: 'azul', label: 'Azul', hex: '#1e40af' },
  { value: 'rojo', label: 'Rojo', hex: '#dc2626' },
  { value: 'verde', label: 'Verde', hex: '#16a34a' },
  { value: 'beige', label: 'Beige', hex: '#d4a574' },
  { value: 'multicolor', label: 'Multicolor', hex: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffe66d)' },
];

export type Brand = typeof BRANDS[number];

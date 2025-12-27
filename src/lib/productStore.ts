import { Product, ProductCategory, ProductColor } from '@/types/product';

const STORAGE_KEY = 'viclu_store_products';

// Sample products for initial load
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NY Yankees Classic',
    brand: 'New Era',
    price: 85000,
    category: 'snapback',
    color: 'negro',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'LA Dodgers Heritage',
    brand: '47 Brand',
    price: 72000,
    category: 'dad-hat',
    color: 'azul',
    imageUrl: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Chicago Bulls Retro',
    brand: 'Mitchell & Ness',
    price: 95000,
    category: 'snapback',
    color: 'rojo',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Street Essential',
    brand: 'Nike',
    price: 68000,
    category: 'trucker',
    color: 'blanco',
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Urban Classic Fitted',
    brand: 'New Era',
    price: 110000,
    category: 'fitted',
    color: 'negro',
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Sox Heritage',
    brand: '47 Brand',
    price: 78000,
    category: 'dad-hat',
    color: 'beige',
    imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&q=80',
    createdAt: new Date().toISOString(),
  },
];

export const getProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with sample products
    saveProducts(SAMPLE_PRODUCTS);
    return SAMPLE_PRODUCTS;
  } catch {
    return SAMPLE_PRODUCTS;
  }
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
};

export interface ProductFilters {
  brand?: string;
  category?: ProductCategory;
  color?: ProductColor;
  search?: string;
}

export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  return products.filter((product) => {
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.color && product.color !== filters.color) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(search);
      const matchesBrand = product.brand.toLowerCase().includes(search);
      if (!matchesName && !matchesBrand) return false;
    }
    return true;
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppLink = (productName: string): string => {
  const phoneNumber = '573001234567'; // Replace with actual WhatsApp number
  const message = encodeURIComponent(
    `Hola Viclu Store, me interesa la gorra ${productName} que vi en el catálogo`
  );
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

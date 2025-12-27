import { useState } from 'react';
import { Product, BRANDS, CATEGORIES, COLORS, ProductCategory, ProductColor } from '@/types/product';
import { X, ImageIcon } from 'lucide-react';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  brand: z.string().min(1, 'La marca es requerida'),
  price: z.number().min(1000, 'El precio mínimo es $1.000').max(10000000, 'El precio máximo es $10.000.000'),
  category: z.enum(['snapback', 'dad-hat', 'trucker', 'fitted'] as const, {
    errorMap: () => ({ message: 'Selecciona una categoría' }),
  }),
  color: z.enum(['negro', 'blanco', 'azul', 'rojo', 'verde', 'beige', 'multicolor'] as const, {
    errorMap: () => ({ message: 'Selecciona un color' }),
  }),
  imageUrl: z.string().url('Ingresa una URL válida').or(z.literal('')),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price || 0,
    category: product?.category || 'snapback',
    color: product?.color || 'negro',
    imageUrl: product?.imageUrl || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = productSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProductFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ProductFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit({
      name: formData.name.trim(),
      brand: formData.brand,
      price: formData.price,
      category: formData.category,
      color: formData.color,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
    });
  };

  const updateField = <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card border border-border rounded p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-foreground">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Nombre del producto
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="Ej: NY Yankees Classic"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Marca
            </label>
            <select
              value={formData.brand}
              onChange={(e) => updateField('brand', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">Seleccionar marca</option>
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            {errors.brand && <p className="mt-1 text-xs text-destructive">{errors.brand}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Precio (COP)
            </label>
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => updateField('price', Number(e.target.value))}
              className="w-full px-4 py-3 bg-surface border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="Ej: 85000"
              min="0"
            />
            {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price}</p>}
          </div>

          {/* Category & Color Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Tipo
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value as ProductCategory)}
                className="w-full px-4 py-3 bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Color
              </label>
              <select
                value={formData.color}
                onChange={(e) => updateField('color', e.target.value as ProductColor)}
                className="w-full px-4 py-3 bg-surface border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {COLORS.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
              {errors.color && <p className="mt-1 text-xs text-destructive">{errors.color}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              URL de imagen
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => updateField('imageUrl', e.target.value)}
                className="flex-1 px-4 py-3 bg-surface border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="https://..."
              />
              {formData.imageUrl && (
                <div className="w-12 h-12 bg-surface border border-border rounded overflow-hidden flex-shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              {!formData.imageUrl && (
                <div className="w-12 h-12 bg-surface border border-border rounded flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
            {errors.imageUrl && <p className="mt-1 text-xs text-destructive">{errors.imageUrl}</p>}
            <p className="mt-1 text-xs text-muted-foreground">
              Deja vacío para usar imagen por defecto
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-border text-foreground font-body font-medium text-sm uppercase tracking-wide hover:bg-surface transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              {product ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

import { useState, useMemo } from 'react';
import { Product, BRANDS, CATEGORIES, COLORS, ProductCategory, ProductColor } from '@/types/product';
import { filterProducts, ProductFilters } from '@/lib/productStore';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
}

const FilterBar = ({ products, onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilters = (newFilters: ProductFilters) => {
    const updated = { ...filters, ...newFilters };
    // Remove empty values
    Object.keys(updated).forEach((key) => {
      if (!updated[key as keyof ProductFilters]) {
        delete updated[key as keyof ProductFilters];
      }
    });
    setFilters(updated);
    onFilterChange(filterProducts(products, updated));
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange(products);
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key as keyof ProductFilters]
  ).length;

  const FilterContent = () => (
    <>
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar gorras..."
          value={filters.search || ''}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-3 bg-surface border border-border/50 text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Brand Filter */}
      <select
        value={filters.brand || ''}
        onChange={(e) => updateFilters({ brand: e.target.value || undefined })}
        className="px-4 py-3 bg-surface border border-border/50 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none min-w-[140px]"
      >
        <option value="">Todas las marcas</option>
        {BRANDS.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={filters.category || ''}
        onChange={(e) => updateFilters({ category: (e.target.value as ProductCategory) || undefined })}
        className="px-4 py-3 bg-surface border border-border/50 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none min-w-[130px]"
      >
        <option value="">Todos los tipos</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Color Filter */}
      <select
        value={filters.color || ''}
        onChange={(e) => updateFilters({ color: (e.target.value as ProductColor) || undefined })}
        className="px-4 py-3 bg-surface border border-border/50 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none min-w-[130px]"
      >
        <option value="">Todos los colores</option>
        {COLORS.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-4 py-3 text-primary font-body text-sm font-medium hover:text-primary/80 transition-colors"
        >
          <X className="w-4 h-4" />
          Limpiar ({activeFiltersCount})
        </button>
      )}
    </>
  );

  return (
    <div className="w-full">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3 flex-wrap">
        <FilterContent />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-surface border border-border/50 text-foreground font-body text-sm w-full justify-center"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="mt-3 p-4 bg-surface border border-border/50 space-y-3">
            <FilterContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

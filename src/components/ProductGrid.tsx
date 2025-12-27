import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProducts } from '@/lib/productStore';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

const ProductGrid = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-wider mb-4">
            COLECCIÓN
          </h2>
          <p className="font-editorial text-lg text-muted-foreground italic">
            Descubre nuestra selección premium de gorras
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar products={allProducts} onFilterChange={setFilteredProducts} />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-body">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-muted-foreground mb-2">
              No se encontraron productos
            </p>
            <p className="text-muted-foreground font-body">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;

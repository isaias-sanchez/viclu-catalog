import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProducts, addProduct, updateProduct, deleteProduct, formatPrice } from '@/lib/productStore';
import { Plus, Pencil, Trash2, ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleAdd = (data: Omit<Product, 'id' | 'createdAt'>) => {
    addProduct(data);
    loadProducts();
    setShowForm(false);
    toast({
      title: 'Producto creado',
      description: `${data.name} se ha añadido al catálogo`,
    });
  };

  const handleEdit = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      loadProducts();
      setEditingProduct(undefined);
      setShowForm(false);
      toast({
        title: 'Producto actualizado',
        description: `${data.name} se ha actualizado correctamente`,
      });
    }
  };

  const handleDelete = (id: string) => {
    const product = products.find((p) => p.id === id);
    deleteProduct(id);
    loadProducts();
    setDeleteConfirm(null);
    toast({
      title: 'Producto eliminado',
      description: product ? `${product.name} se ha eliminado del catálogo` : 'Producto eliminado',
      variant: 'destructive',
    });
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline font-body text-sm">Volver al catálogo</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="font-display text-2xl sm:text-3xl text-foreground tracking-wider">
                ADMIN PANEL
              </h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nuevo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-card border border-border rounded">
            <p className="text-sm text-muted-foreground font-body mb-1">Total productos</p>
            <p className="font-display text-3xl text-foreground">{products.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded">
            <p className="text-sm text-muted-foreground font-body mb-1">Marcas</p>
            <p className="font-display text-3xl text-foreground">
              {new Set(products.map((p) => p.brand)).size}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded">
            <p className="text-sm text-muted-foreground font-body mb-1">Precio promedio</p>
            <p className="font-display text-2xl text-primary">
              {products.length > 0
                ? formatPrice(products.reduce((acc, p) => acc + p.price, 0) / products.length)
                : '$0'}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded">
            <p className="text-sm text-muted-foreground font-body mb-1">Último agregado</p>
            <p className="font-body text-sm text-foreground truncate">
              {products.length > 0
                ? products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
                    .name
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Products Table */}
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-2 font-body font-medium text-muted-foreground text-sm uppercase tracking-wide">
                    Producto
                  </th>
                  <th className="text-left py-4 px-2 font-body font-medium text-muted-foreground text-sm uppercase tracking-wide hidden sm:table-cell">
                    Marca
                  </th>
                  <th className="text-left py-4 px-2 font-body font-medium text-muted-foreground text-sm uppercase tracking-wide hidden md:table-cell">
                    Tipo
                  </th>
                  <th className="text-right py-4 px-2 font-body font-medium text-muted-foreground text-sm uppercase tracking-wide">
                    Precio
                  </th>
                  <th className="text-right py-4 px-2 font-body font-medium text-muted-foreground text-sm uppercase tracking-wide">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-surface rounded overflow-hidden flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&q=80';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-body font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <span className="font-body text-sm text-foreground">{product.brand}</span>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <span className="px-2 py-1 bg-surface text-xs font-body uppercase text-muted-foreground">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className="font-display text-lg text-primary">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(product)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface rounded transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-body rounded"
                            >
                              Sí
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-surface text-foreground text-xs font-body rounded"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-surface rounded transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="font-display text-2xl text-muted-foreground mb-2">Sin productos</p>
            <p className="text-muted-foreground font-body mb-6">
              Comienza agregando tu primer producto al catálogo
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar producto
            </button>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEdit : handleAdd}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default AdminPanel;

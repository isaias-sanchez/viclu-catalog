import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice, generateWhatsAppLink } from '@/lib/productStore';
import { MessageCircle } from 'lucide-react';
import { ASSETS } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleWhatsAppClick = () => {
    const link = generateWhatsAppLink(product.name);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const displayImage = imageError ? ASSETS.placeholder : product.imageUrl;

  return (
    <article
      className="group relative bg-card rounded overflow-hidden card-hover platinum-border-animated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden bg-muted relative img-zoom">
        <img
          src={isHovered && product.imageHoverUrl ? product.imageHoverUrl : displayImage}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />

        {/* Brand Badge */}
        <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-sm px-3 py-1 border border-brand-platinum/20">
          <span className="text-xs font-display tracking-widest text-brand-platinum uppercase">
            {product.brand}
          </span>
        </div>

        {/* Quick Buy Overlay */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-6 py-3 bg-brand-platinum text-brand-dark font-body font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 pulse-platinum"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 space-y-2 relative bg-gradient-to-b from-card to-brand-dark/50">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-body font-bold text-lg text-foreground leading-tight mb-1 group-hover:text-brand-platinum transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">{product.category} • {product.color}</p>
          </div>
          <span className="font-display text-xl tracking-wide text-brand-platinum">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

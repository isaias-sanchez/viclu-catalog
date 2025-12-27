import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice, generateWhatsAppLink } from '@/lib/productStore';
import { MessageCircle } from 'lucide-react';

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

  const displayImage = imageError 
    ? 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80'
    : isHovered && product.imageHoverUrl 
      ? product.imageHoverUrl 
      : product.imageUrl;

  return (
    <article 
      className="group relative bg-card rounded overflow-hidden card-hover gold-border-animated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square img-zoom bg-surface">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        
        {/* Brand Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-background/80 backdrop-blur-sm text-xs font-body font-medium uppercase tracking-wider text-foreground">
          {product.brand}
        </div>
        
        {/* Quick Buy Overlay */}
        <div 
          className={`absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 pulse-gold"
          >
            <MessageCircle className="w-5 h-5" />
            Comprar
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-medium text-foreground leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-body uppercase text-muted-foreground tracking-wide">
            {product.category}
          </span>
          <span className="font-display text-xl text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
      
      {/* Bottom WhatsApp Bar (Mobile) */}
      <button
        onClick={handleWhatsAppClick}
        className="w-full py-3 bg-primary text-primary-foreground font-body font-semibold uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-primary/90 md:hidden"
      >
        <MessageCircle className="w-4 h-4" />
        Comprar por WhatsApp
      </button>
    </article>
  );
};

export default ProductCard;

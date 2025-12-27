import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden noise-texture">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated/60 backdrop-blur-sm rounded-full border border-border/30 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-body text-muted-foreground tracking-wide uppercase">
              Envíos a toda Colombia
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wider animate-slide-up stagger-1">
            <span className="text-foreground">VICLU</span>
            <br />
            <span className="text-gold-gradient">STORE</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-editorial text-xl sm:text-2xl text-muted-foreground italic max-w-xl mx-auto animate-slide-up stagger-2">
            Comodidad deportiva, estilo urbano
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up stagger-3">
            <button
              onClick={scrollToProducts}
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-lg tracking-wide uppercase transition-all duration-300 hover:bg-primary/90 hover:scale-105 gold-glow-hover"
            >
              <span className="relative z-10">Explorar Colección</span>
            </button>
            
            <Link
              to="/admin"
              className="px-8 py-4 border border-border/50 text-foreground font-body font-medium text-lg tracking-wide uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Panel Admin
            </Link>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 pt-8 animate-slide-up stagger-4">
            <div className="text-center">
              <p className="font-display text-3xl text-foreground">180+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Seguidores</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <p className="font-display text-3xl text-foreground">64+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Productos</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <p className="font-display text-3xl text-primary">100%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Original</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

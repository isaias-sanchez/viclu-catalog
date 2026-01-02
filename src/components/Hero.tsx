import { ArrowRight } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background z-10" />
        <img
          src={heroBanner}
          alt="Urban Streetwear"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 pt-20 text-center">
        <div className="inline-block mb-4 opacity-0 animate-slide-up stagger-1">
          <span className="px-4 py-1.5 border border-brand-platinum/30 rounded-full text-sm font-body uppercase tracking-widest text-brand-platinum/90 backdrop-blur-sm">
            Nueva Colección 2025
          </span>
        </div>

        <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.9] tracking-tighter opacity-0 animate-slide-up stagger-2">
          Viclu <span className="text-platinum-gradient platinum-glow">Store</span>
        </h1>

        <p className="max-w-xl mx-auto mb-10 text-lg md:text-xl font-body font-light text-muted-foreground opacity-0 animate-slide-up stagger-3">
          Redefiniendo el estilo urbano. Calidad premium, diseño exclusivo y la esencia del streetwear en cada prenda.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up stagger-4">
          <a
            href="#catalogo"
            className="group relative px-8 py-4 bg-brand-platinum text-brand-dark font-body font-bold uppercase tracking-wider overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Catálogo <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>

          <a
            href="#contacto"
            className="px-8 py-4 border border-white/10 text-foreground font-body font-medium uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center p-2">
          <div className="w-1 h-1 bg-brand-platinum rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

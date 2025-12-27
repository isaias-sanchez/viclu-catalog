import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-3xl text-gold-gradient">VICLU STORE</h3>
            <p className="font-editorial text-muted-foreground italic">
              Comodidad deportiva, estilo urbano
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Barranquilla - Soledad, Colombia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-foreground uppercase tracking-wide text-sm">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#products"
                  className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                >
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-foreground uppercase tracking-wide text-sm">
              Contáctanos
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/viclustore07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface-elevated border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface-elevated border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Envíos a toda Colombia 🇨🇴
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-body">
            © {currentYear} Viclu Store. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Hecho con ❤️ en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

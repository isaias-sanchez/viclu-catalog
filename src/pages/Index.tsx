import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Viclu Store | Gorras Premium Streetwear en Colombia</title>
        <meta
          name="description"
          content="Descubre la colección premium de gorras streetwear en Viclu Store. New Era, 47 Brand, Nike y más. Envíos a toda Colombia. Comodidad deportiva, estilo urbano."
        />
        <meta name="keywords" content="gorras, snapback, dad hat, New Era, 47 Brand, streetwear, Colombia, Barranquilla" />
        <link rel="canonical" href="https://viclustore.com" />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        <Hero />
        <ProductGrid />
        <Footer />
      </main>
    </>
  );
};

export default Index;

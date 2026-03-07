import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Truck, ShieldCheck, HeartPulse, ChevronRight, ShoppingCart } from 'lucide-react';
import { categories } from '@/data/products';
import { productApi } from '@/db/api';
import { Product } from '@/types/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const all = await productApi.getAll();
        setFeaturedProducts(all.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary/30 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6 text-left">
            <Badge variant="outline" className="border-primary/30 text-primary-foreground bg-primary px-4 py-1.5 font-bold uppercase tracking-wider text-xs">
              Natural & Organic
            </Badge>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1]">
              Fuel Your Day with <br />
              <span className="text-primary italic">Nature\'s Finest</span>
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
              Explore our premium collection of handpicked organic nuts, seeds, and healthy superfoods. 
              Pure ingredients, uncompromising quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/products">
                <Button size="lg" className="h-14 px-10 text-lg rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-bold">
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?category=Healthy%20Organic%20Products">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-2xl border-2 font-bold hover:bg-secondary transition-colors">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto overflow-hidden rounded-3xl shadow-2xl group">
             <img
              src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7143a5c5-d21a-497b-8dec-191a4be2dcc7.jpg"
              alt="Premium organic products display"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold tracking-widest uppercase text-xs">Certified Organic</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Medjool Dates & California Almonds</h2>
              <p className="text-white/80 line-clamp-2">Direct from farms to your table. Experience the richness of nature with Spicy Kart.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4 text-center p-8 rounded-3xl bg-white dark:bg-card border-none shadow-sm hover:shadow-md transition-shadow">
          <div className="rounded-full bg-primary/10 p-5 text-primary">
            <Truck className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold">Fast Delivery</h3>
          <p className="text-muted-foreground leading-relaxed">Swift delivery across India. Get your favorite snacks fresh at your doorstep.</p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center p-8 rounded-3xl bg-white dark:bg-card border-none shadow-sm hover:shadow-md transition-shadow">
          <div className="rounded-full bg-primary/10 p-5 text-primary">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold">Premium Quality</h3>
          <p className="text-muted-foreground leading-relaxed">Stringent quality checks. Only the finest organic ingredients make the cut.</p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center p-8 rounded-3xl bg-white dark:bg-card border-none shadow-sm hover:shadow-md transition-shadow">
          <div className="rounded-full bg-primary/10 p-5 text-primary">
            <HeartPulse className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold">Health First</h3>
          <p className="text-muted-foreground leading-relaxed">Natural energy boosters. Nutrient-dense foods for your balanced lifestyle.</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Browse By</span>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Featured Categories</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col gap-4 overflow-hidden rounded-3xl bg-white dark:bg-card p-4 transition-all hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-primary/10 shadow-sm"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-center font-bold text-sm lg:text-base group-hover:text-primary transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Trending</span>
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">Featured Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-primary font-bold hover:underline">
            Shop Store <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-24 shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 hidden md:block">
             <div className="h-full w-full bg-white rotate-45 translate-x-1/2 translate-y-1/2 rounded-full" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-8 text-center md:items-start md:text-left max-w-3xl">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-6 py-2 text-sm font-bold tracking-widest uppercase">Special Offer</Badge>
            <h2 className="text-4xl font-black md:text-6xl leading-[1.1]">
              Healthy Snacking <br />
              Made Easy & Delicious
            </h2>
            <p className="text-lg opacity-90 max-w-[500px] leading-relaxed">
              Join thousands of happy customers who trust Spicy Kart for their daily dose of organic goodness. Get free shipping on orders over $50!
            </p>
            <Link to="/products">
              <Button size="lg" className="h-16 px-12 text-xl rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-black shadow-xl shadow-black/10 transition-all scale-100 hover:scale-105">
                <ShoppingCart className="mr-3 h-6 w-6" />
                Claim Offer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Star, Heart, Check, Truck, ShieldCheck, HeartPulse, Sparkles, Minus, Plus } from 'lucide-react';
import { productApi } from '@/db/api';
import { Product } from '@/types/products';
import { categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await productApi.getById(id);
        setProduct(data);
        
        if (data) {
          const allProducts = await productApi.getAll();
          const related = allProducts
            .filter(p => p.category === data.category && p.id !== data.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-32 flex justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-32 flex flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-3xl font-black text-foreground">Product Not Found</h2>
        <p className="text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products">
          <Button variant="default" className="rounded-2xl h-14 px-10 text-lg font-bold bg-primary shadow-xl">Back to All Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  const p = product as Product;
  const discount = p.discountPrice 
    ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
    : null;

  return (
    <div className="container py-12 md:py-24 flex flex-col gap-24">
      {/* Breadcrumbs and back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(p.category)}`} className="hover:text-primary">{p.category}</Link>
          <span>/</span>
          <span className="text-foreground font-bold">{p.name}</span>
        </div>
      </div>

      {/* Main product view */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
        <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-secondary/30 shadow-2xl group border-none">
          {discount && (
            <Badge className="absolute top-6 left-6 z-10 bg-accent text-accent-foreground font-black px-6 py-2 text-lg shadow-xl border-none">
              {discount}% OFF
            </Badge>
          )}
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Button variant="ghost" size="icon" className="absolute top-6 right-6 z-10 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white hover:text-red-500 transition-colors h-14 w-14 shadow-lg border-none">
            <Heart className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-none text-xs font-black px-4 py-1 tracking-widest uppercase">{p.category}</Badge>
              {p.stockStatus === 'in-stock' && (
                <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">In Stock</Badge>
              )}
              {p.stockStatus === 'low-stock' && (
                <Badge variant="outline" className="text-orange-600 border-orange-600/30 bg-orange-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">Low Stock</Badge>
              )}
              {p.stockStatus === 'out-of-stock' && (
                <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-4xl font-black text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">{p.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-accent fill-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-6 w-6 ${i < Math.floor(p.rating) ? 'fill-current' : 'text-muted-foreground/30'}`} />
                ))}
                <span className="ml-2 font-black text-xl">{p.rating}</span>
              </div>
              <span className="text-muted-foreground font-bold hover:text-primary cursor-pointer hover:underline transition-all">({p.reviewsCount} Customer Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 py-4 border-y border-dashed">
            {p.discountPrice ? (
              <>
                <span className="text-5xl font-black text-primary">${p.discountPrice.toFixed(2)}</span>
                <span className="text-2xl text-muted-foreground line-through font-bold">${p.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-5xl font-black text-primary">${p.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">{p.description}</p>

          <div className="flex flex-col gap-6 p-8 bg-secondary/30 rounded-[2.5rem] border-none shadow-sm">
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Quantity</span>
                <div className="flex items-center h-14 bg-white dark:bg-card rounded-2xl p-1 border shadow-sm">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-xl text-primary font-bold hover:bg-secondary/50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-12 text-center font-black text-xl">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-xl text-primary font-bold hover:bg-secondary/50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Action</span>
                <Button 
                  className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
                  onClick={handleAddToCart}
                  disabled={p.stockStatus === 'out-of-stock'}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {p.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Truck className="h-4 w-4" />
                </div>
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>100% Quality Guaranteed</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {p.features?.map((feature) => (
              <Badge key={feature} variant="outline" className="px-4 py-2 rounded-2xl font-bold bg-white dark:bg-card border-primary/20 text-primary">
                <Check className="h-3 w-3 mr-2" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container max-w-5xl mx-auto">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-16 rounded-[2rem] p-2 bg-secondary/50 border-none mb-12">
            <TabsTrigger value="description" className="rounded-[1.5rem] font-black text-lg data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl">Product Description</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-[1.5rem] font-black text-lg data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl">Customer Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="flex flex-col gap-10 bg-white dark:bg-card p-12 rounded-[3rem] shadow-sm border border-primary/5">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-black text-foreground">Why choose Spicy Kart's {p.name}?</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our {p.name} are sourced directly from the finest organic farms. We ensure that every batch is checked for quality, freshness, and nutritional value. 
                Whether you're looking for a healthy snack or a versatile ingredient for your recipes, our products are the perfect choice for the health-conscious consumer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 text-center">
                <Sparkles className="h-10 w-10 text-accent mx-auto" />
                <h4 className="font-bold text-xl">100% Organic</h4>
                <p className="text-sm text-muted-foreground">No pesticides, no chemicals. Pure nature in every bite.</p>
              </div>
              <div className="flex flex-col gap-4 text-center">
                <HeartPulse className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-bold text-xl">Nutrition Dense</h4>
                <p className="text-sm text-muted-foreground">Packed with essential vitamins, minerals, and healthy fats.</p>
              </div>
               <div className="flex flex-col gap-4 text-center">
                <Truck className="h-10 w-10 text-primary mx-auto" />
                <h4 className="font-bold text-xl">Eco-Friendly Packaging</h4>
                <p className="text-sm text-muted-foreground">Minimal impact on the environment. Sustainable sourcing.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="flex flex-col gap-8 bg-white dark:bg-card p-12 rounded-[3rem] shadow-sm border border-primary/5">
            <div className="flex flex-col gap-2">
               <h3 className="text-3xl font-black text-foreground">What our customers say</h3>
               <p className="text-muted-foreground font-bold">Based on {p.reviewsCount} verified purchases</p>
            </div>
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-4 p-8 rounded-3xl bg-secondary/20 border-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">JD</div>
                      <div className="flex flex-col">
                        <span className="font-bold">John Doe</span>
                        <span className="text-xs text-muted-foreground">March 2026 • Verified Buyer</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-accent fill-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"Exceptional quality! The {p.name.toLowerCase()} are incredibly fresh and crunchy. I've tried many brands, but Spicy Kart is definitely the best."</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-10">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">More from {p.category}</span>
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">Related Products</h2>
            </div>
            <Link to={`/products?category=${encodeURIComponent(p.category)}`} className="text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/types/products';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-card">
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        {discount && (
          <Badge className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground font-bold">
            {discount}% OFF
          </Badge>
        )}
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-full hover:bg-white hover:text-red-500 transition-colors">
          <Heart className="h-4 w-4" />
        </Button>
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {product.category}
        </div>
        <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 text-accent fill-accent">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-bold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-black text-primary">₹{product.discountPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-xl font-black text-primary">₹{product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2 rounded-xl font-bold bg-primary hover:bg-primary/90 transition-all shadow-sm"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

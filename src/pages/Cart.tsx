import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { processPayment } from '@/lib/razorpay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user, profile } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      return;
    }

    setIsProcessing(true);
    try {
      const shipping = totalPrice > 50 ? 0 : 5.99;
      const tax = totalPrice * 0.05;
      const finalPrice = totalPrice + shipping + tax;
      const finalTotal = Math.round(finalPrice * 100); // Razorpay expects amount in paise

      await processPayment({
        amount: finalTotal,
        currency: 'USD',
        name: 'Spicy Kart',
        description: `Payment for ${totalItems} organic items`,
        prefill: {
          name: profile?.fullName || user.displayName || '',
          email: user.email || '',
        },
        handler: (response: any) => {
          toast.success('Payment Successful! Order ID: ' + response.razorpay_payment_id);
          clearCart();
        }
      });
    } catch (e: any) {
      toast.error('Checkout failed: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-32 flex flex-col items-center justify-center gap-10">
        <div className="rounded-full bg-secondary/50 p-16 animate-pulse">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/40" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-black text-foreground text-center">Your Cart is Empty</h2>
          <p className="text-lg text-muted-foreground text-center max-w-md">Looks like you haven't added any organic goodness to your cart yet. Let's change that!</p>
        </div>
        <Link to="/products">
          <Button className="rounded-2xl h-16 px-12 text-xl font-black bg-primary shadow-2xl shadow-primary/30 transition-all hover:scale-105">
            Start Shopping
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="container py-12 md:py-24 flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <Badge variant="outline" className="w-fit px-4 py-1 text-xs font-black bg-primary/5 border-primary/20 text-primary uppercase tracking-widest">
          Checkout Ready
        </Badge>
        <h1 className="text-5xl font-black text-foreground tracking-tight sm:text-6xl">Shopping Cart</h1>
        <p className="text-lg text-muted-foreground font-bold">You have <span className="text-primary">{totalItems} items</span> in your cart.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart items list */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow rounded-[2rem]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-6 md:gap-10">
                    <Link to={`/products/${item.id}`} className="shrink-0 aspect-square w-24 md:w-36 overflow-hidden rounded-2xl bg-secondary/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </Link>
                    <div className="flex flex-grow flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <Link to={`/products/${item.id}`} className="hover:text-primary transition-colors">
                            <h3 className="text-lg md:text-2xl font-black leading-tight">{item.name}</h3>
                          </Link>
                          <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">{item.category}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10 shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <div className="flex items-center h-12 bg-secondary/50 rounded-xl p-1 w-fit border border-primary/5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-lg text-primary font-black hover:bg-white dark:hover:bg-black/40 shadow-none hover:shadow-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-lg text-primary font-black hover:bg-white dark:hover:bg-black/40 shadow-none hover:shadow-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-black text-primary">
                            ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground font-bold">
                            (${(item.discountPrice || item.price).toFixed(2)} / unit)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 p-8 rounded-[2.5rem] bg-secondary/20 border border-primary/5 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-white p-3 text-primary shadow-sm"><Truck className="h-6 w-6" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Free Delivery over $50</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-white p-3 text-primary shadow-sm"><ShieldCheck className="h-6 w-6" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified Quality</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-white p-3 text-primary shadow-sm"><RefreshCw className="h-6 w-6" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">7-Day Easy Returns</span>
              </div>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="font-bold text-primary hover:text-primary hover:underline gap-2">
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="lg:col-span-1">
          <div className="flex flex-col gap-8 p-10 rounded-[3rem] bg-white dark:bg-card border-none shadow-xl sticky top-24">
            <h3 className="text-3xl font-black text-foreground">Order Summary</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-muted-foreground">Estimated Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-primary/5 h-0.5" />

            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-foreground">Order Total</span>
              <span className="text-4xl font-black text-primary">${finalTotal.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground pl-2">Coupon Code</span>
                <div className="flex gap-2">
                  <Input placeholder="SPICYKART20" className="h-12 rounded-xl bg-secondary/30 border-none font-bold placeholder:font-medium focus-visible:ring-primary" />
                  <Button variant="outline" className="h-12 rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5 px-6">Apply</Button>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="h-16 w-full rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4 py-4 px-6 rounded-2xl bg-secondary/20 border-none">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Safe & Secure Payment</span>
              </div>
              <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="font-black text-xs border border-muted-foreground p-1 rounded">VISA</div>
                <div className="font-black text-xs border border-muted-foreground p-1 rounded">MASTERCARD</div>
                <div className="font-black text-xs border border-muted-foreground p-1 rounded">UPI</div>
                <div className="font-black text-xs border border-muted-foreground p-1 rounded">PAYPAL</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;

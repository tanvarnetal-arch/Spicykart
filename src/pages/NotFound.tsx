import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-primary rounded-full" />
        <img src="/logo.png" alt="Spicy Kart Logo" className="h-24 w-24 relative z-10 animate-bounce object-contain" />
        <div className="absolute -top-4 -right-4 text-6xl font-black text-primary/10 select-none">404</div>
      </div>

      <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
        Oops! Page Not Found
      </h1>

      <p className="mb-10 max-w-md text-lg text-muted-foreground font-medium leading-relaxed">
        It seems this organic goodness hasn\'t grown yet, or it\'s been moved to a different garden.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-bold text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Browse Products
          </Button>
        </Link>
      </div>

      <div className="mt-16 flex items-center gap-2 text-sm text-muted-foreground font-bold">
        <ArrowLeft className="h-4 w-4" />
        <span>Try searching for something else above</span>
      </div>
    </div>
  );
};

export default NotFound;

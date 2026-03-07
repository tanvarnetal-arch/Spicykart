import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-secondary/50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Spicy Kart Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold tracking-tight text-primary">Spicy Kart</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Premium healthy organic products delivered straight to your door. Quality you can trust, flavor you\'ll love.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/products?category=Badam" className="text-sm text-muted-foreground hover:text-primary transition-colors">Badam</Link>
              <Link to="/products?category=Khajur" className="text-sm text-muted-foreground hover:text-primary transition-colors">Khajur</Link>
              <Link to="/products?category=Mixed Seeds" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mixed Seeds</Link>
              <Link to="/products?category=Pumpkin Seeds" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pumpkin Seeds</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">View Cart</Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Organic Street, Wellness City, 560001</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@spicykart.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Spicy Kart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

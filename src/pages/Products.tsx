import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, X, SearchX } from 'lucide-react';
import { categories } from '@/data/products';
import { productApi } from '@/db/api';
import { Product } from '@/types/products';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const price = product.discountPrice || product.price;
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 50]);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="container py-12 md:py-20 flex flex-col gap-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Explore Our Range</span>
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">Our Products</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm font-bold bg-primary/5 border-primary/20 text-primary">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
          </Badge>
          {(searchQuery || selectedCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < 50) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-destructive flex items-center gap-1">
              <X className="h-4 w-4" /> Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:flex w-72 flex-col gap-10 sticky top-24 self-start">
          <div className="flex flex-col gap-6 p-8 rounded-[2rem] bg-white dark:bg-card border border-primary/5 shadow-sm">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg border-b pb-4">Categories</h3>
              <div className="flex flex-col gap-3">
                <div 
                  className={`cursor-pointer text-sm py-2 px-4 rounded-xl transition-all font-semibold ${selectedCategory === 'All' ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'}`}
                  onClick={() => handleCategoryChange('All')}
                >
                  All Categories
                </div>
                {categories.map((cat) => (
                  <div 
                    key={cat.id}
                    className={`cursor-pointer text-sm py-2 px-4 rounded-xl transition-all font-semibold ${selectedCategory === cat.name ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/5 text-muted-foreground hover:text-primary'}`}
                    onClick={() => handleCategoryChange(cat.name)}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg border-b pb-4">Price Range</h3>
              <div className="px-2">
                <Slider 
                  value={priceRange} 
                  max={50} 
                  step={1} 
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-sm font-black text-primary">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Button 
              className="mt-4 rounded-2xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold h-12"
              onClick={clearFilters}
            >
              Reset Filters
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-8">
          {/* Controls Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-primary/5">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 h-10 rounded-xl bg-secondary/50 border-none focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-10 rounded-xl border-none bg-secondary/50 font-semibold focus:ring-primary">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Trigger */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-secondary/50 border-none">
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-8 mt-8">
                     <div className="flex flex-col gap-4">
                      <h3 className="font-bold border-b pb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {['All', ...categories.map(c => c.name)].map((cat) => (
                          <Badge 
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold ${selectedCategory === cat ? 'bg-primary' : ''}`}
                            onClick={() => handleCategoryChange(cat)}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-bold border-b pb-2">Price Range</h3>
                      <Slider 
                        value={priceRange} 
                        max={50} 
                        step={1} 
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Min: ${priceRange[0]}</span>
                        <span>Max: ${priceRange[1]}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 rounded-xl bg-primary" onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 rounded-[2rem] bg-secondary/20 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8 animate-fade-in">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-6 bg-white dark:bg-card rounded-[3rem] shadow-sm border border-dashed border-primary/20">
              <div className="rounded-full bg-secondary/50 p-10">
                <SearchX className="h-20 w-20 text-muted-foreground/40" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-2xl font-black text-foreground">No Products Found</h3>
                <p className="text-muted-foreground text-center max-w-sm">We couldn't find any products matching your current filters. Try adjusting them!</p>
              </div>
              <Button onClick={clearFilters} className="rounded-2xl px-10 h-14 bg-primary text-white font-bold text-lg">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

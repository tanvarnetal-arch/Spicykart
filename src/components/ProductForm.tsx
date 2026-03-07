import React, { useState, useEffect } from 'react';
import { productApi } from '@/db/api';
import { Product } from '@/types/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { categories } from '@/data/products';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, onOpenChange, product, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    category: 'Badam',
    stockStatus: 'in-stock',
    image: '',
    features: [],
    rating: 4.5,
    reviewsCount: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        features: product.features || []
      });
      setImagePreview(product.image || '');
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        discountPrice: 0,
        category: 'Badam',
        stockStatus: 'in-stock',
        image: '',
        features: [],
        rating: 4.5,
        reviewsCount: 0
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await productApi.uploadImage(imageFile);
      }

      const finalData = { ...formData, image: imageUrl };

      if (product) {
        await productApi.update(product.id, finalData);
        toast.success('Product updated successfully');
      } else {
        await productApi.create(finalData);
        toast.success('Product created successfully');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Failed to save product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-bold">Product Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl bg-secondary/30 border-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={val => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="rounded-xl bg-secondary/30 border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Price ($)</Label>
              <Input 
                type="number" 
                step="0.01"
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
                className="rounded-xl bg-secondary/30 border-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Discount Price ($)</Label>
              <Input 
                type="number" 
                step="0.01"
                value={formData.discountPrice} 
                onChange={e => setFormData({ ...formData, discountPrice: parseFloat(e.target.value) })}
                className="rounded-xl bg-secondary/30 border-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="font-bold">Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
                className="rounded-xl bg-secondary/30 border-none min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Stock Status</Label>
              <Select 
                value={formData.stockStatus} 
                onValueChange={(val: any) => setFormData({ ...formData, stockStatus: val })}
              >
                <SelectTrigger className="rounded-xl bg-secondary/30 border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Product Image</Label>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-video rounded-xl bg-secondary/30 overflow-hidden group">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(''); setFormData({ ...formData, image: '' }); }}
                        className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <Upload className="h-8 w-8" />
                      <span className="text-xs font-bold">Upload Image</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-6">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="rounded-xl bg-primary hover:bg-primary/90 text-white font-black px-8"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;

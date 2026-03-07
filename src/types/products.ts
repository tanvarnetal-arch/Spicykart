export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
}

export type Category = {
  id: string;
  name: string;
  image: string;
};

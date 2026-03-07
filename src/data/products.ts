import { Product, Category } from '@/types/products';

export const categories: Category[] = [
  { id: 'badam', name: 'Badam', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_f7b1904e-1843-4ccc-8df8-8de601c87881.jpg' },
  { id: 'kaju', name: 'Kaju', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_a9e78677-4f91-4b8b-ac34-13ff1205e873.jpg' },
  { id: 'khajur', name: 'Khajur', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0c67ce39-6c1b-4186-8c9a-ca952cd2f116.jpg' },
  { id: 'kishmish', name: 'Kishmish', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_3c77cf5d-0f69-4fb0-affe-a3c78aa4406a.jpg' },
  { id: 'mixed-seeds', name: 'Mixed Seeds', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4ba0e341-4ea4-40df-882c-9275105a38ad.jpg' },
  { id: 'pumpkin-seeds', name: 'Pumpkin Seeds', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_8a98dd9d-8b98-4492-8a45-ff9b6379b401.jpg' },
  { id: 'sunflower-seeds', name: 'Sunflower Seeds', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0a4d85e9-5bf3-4205-b2c3-ae082393be3d.jpg' },
  { id: 'healthy-organic', name: 'Healthy Organic Products', image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_82a0c324-5d85-493f-87a5-320c807091c1.jpg' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium California Almonds (Badam)',
    description: 'Crispy, crunchy, and packed with nutrients. Our California almonds are handpicked for the highest quality.',
    price: 15.99,
    discountPrice: 12.99,
    stockStatus: 'in-stock',
    category: 'Badam',
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7b393288-b2ed-4eb2-a92c-81eabb2e9fbb.jpg',
    features: ['High in Protein', 'Good for Heart', 'Rich in Vitamin E']
  },
  {
    id: '2',
    name: 'Medjool Dates (Khajur)',
    description: 'Large, sweet, and succulent Medjool dates. Nature\'s candy, perfect for a quick energy boost.',
    price: 18.99,
    discountPrice: 16.50,
    stockStatus: 'in-stock',
    category: 'Khajur',
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b7302f55-346d-4af9-a0a3-9ac39ae90015.jpg',
    features: ['Naturally Sweet', 'Rich in Fiber', 'No Added Sugar']
  },
  {
    id: '3',
    name: 'Superfood Mixed Seeds',
    description: 'A nutritional powerhouse blend of sunflower, pumpkin, flax, and watermelon seeds.',
    price: 9.99,
    discountPrice: 8.49,
    stockStatus: 'in-stock',
    category: 'Mixed Seeds',
    rating: 4.6,
    reviewsCount: 210,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d767830f-7963-41bd-9368-f7ef54de3cfd.jpg',
    features: ['Omega-3 Rich', 'Roasted & Salted', 'Perfect Snack']
  },
  {
    id: '4',
    name: 'Roasted Pumpkin Seeds',
    description: 'Lightly roasted pumpkin seeds with a pinch of sea salt. Great for salads or snacking.',
    price: 7.99,
    discountPrice: 6.99,
    stockStatus: 'low-stock',
    category: 'Pumpkin Seeds',
    rating: 4.7,
    reviewsCount: 56,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d1219967-b590-488e-af22-c638bc0e8983.jpg',
    features: ['Zinc Rich', 'Magnesium Source', 'Plant-based Protein']
  },
  {
    id: '5',
    name: 'Organic Chia Seeds',
    description: '100% organic chia seeds. High in fiber and omega-3 fatty acids. Versatile for any dish.',
    price: 12.99,
    discountPrice: 10.99,
    stockStatus: 'in-stock',
    category: 'Healthy Organic Products',
    rating: 4.5,
    reviewsCount: 145,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_bc079eb8-7378-4255-a15c-79e36e8be931.jpg',
    features: ['Non-GMO', 'Gluten Free', 'Superfood']
  },
  {
    id: '6',
    name: 'Persian Pistachios',
    description: 'Exquisite roasted pistachios with a hint of saffron. A premium snacking experience.',
    price: 22.99,
    discountPrice: 19.99,
    stockStatus: 'in-stock',
    category: 'Badam',
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4b73bc10-ab53-4e76-8d15-5b79a0678f2b.jpg',
    features: ['Premium Quality', 'Saffron Infused', 'Low Sodium']
  },
  {
    id: '7',
    name: 'Kashmiri Walnuts',
    description: 'Shelled kashmiri walnuts, rich in antioxidants and healthy fats.',
    price: 14.99,
    discountPrice: 11.99,
    stockStatus: 'in-stock',
    category: 'Badam',
    rating: 4.4,
    reviewsCount: 112,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_48b451a3-57c4-426b-8d0f-8a118279d1ac.jpg',
    features: ['Brain Health', 'Antioxidant Rich', 'Premium Kashmiri']
  },
  {
    id: '8',
    name: 'Organic Flax Seeds',
    description: 'Cold-milled flax seeds for maximum nutrient absorption. Perfect for smoothies.',
    price: 6.99,
    discountPrice: 5.49,
    stockStatus: 'in-stock',
    category: 'Healthy Organic Products',
    rating: 4.3,
    reviewsCount: 88,
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4a4a64a3-7e7f-41e5-97bf-a872bf85efa3.jpg',
    features: ['Lignans Rich', 'Fiber Source', 'Vegan']
  }
];

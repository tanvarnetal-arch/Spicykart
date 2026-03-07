export interface Profile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin' | 'owner' | 'developer';
  createdAt: string;
}

export interface OrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  profileId: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
}

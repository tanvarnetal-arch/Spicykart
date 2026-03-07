import React, { useState, useEffect } from 'react';
import { db } from '@/db/firebase';
import { collection, getDocs, updateDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { productApi, orderApi } from '@/db/api';
import { Profile } from '@/types/types';
import { Product } from '@/types/products';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Package, TrendingUp, DollarSign, ShoppingBag, Plus, Edit2, Trash2, Search, RefreshCw, CheckCircle2, Clock, Truck, XCircle, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ProductForm from '@/components/ProductForm';
import { demoProducts } from '@/data/demoProducts';

const Admin: React.FC = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles from Firestore
      const profilesSnapshot = await getDocs(
        query(collection(db, 'profiles'), orderBy('role', 'desc'))
      );
      const usersData = profilesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Profile));

      const productsData = await productApi.getAll();
      const ordersData = await orderApi.getAll();

      // Try to fetch feedbacks if collection exists
      try {
        const { feedbackApi } = await import('@/db/api');
        const feedbackData = await feedbackApi.getAll();
        setFeedbacks(feedbackData);
      } catch (e) {
        console.log('Feedback collection not ready yet');
      }

      setUsers(usersData);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error: any) {
      toast.error('Failed to fetch data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'owner' | 'developer') => {
    try {
      const profileRef = doc(db, 'profiles', userId);
      await updateDoc(profileRef, { role: newRole });
      toast.success('User role updated successfully');
      fetchData();
    } catch (error: any) {
      toast.error('Failed to update role: ' + error.message);
    }
  };

  // Check for specific admin credentials or roles
  const hasAccess = profile?.email === 'admin_6666@kart.com' ||
    ['owner', 'developer'].includes(profile?.role || '');

  if (!hasAccess) {
    return (
      <div className="container py-32 flex flex-col items-center justify-center gap-6 text-center">
        <Shield className="h-20 w-20 text-destructive animate-pulse" />
        <h2 className="text-4xl font-black">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">You do not have the required permissions to access the administrative control panel.</p>
        <Button asChild className="rounded-2xl h-14 px-10 text-lg font-bold bg-primary shadow-xl">
          <a href="/">Return to Store</a>
        </Button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-blue-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.delete(id);
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error('Failed to delete product: ' + error.message);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await orderApi.updateStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
      fetchData();
    } catch (error: any) {
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const { feedbackApi } = await import('@/db/api');
      await feedbackApi.delete(id);
      toast.success('Feedback deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error('Failed to delete feedback');
    }
  };

  const filteredUsers = users.filter((u: any) =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter((o: any) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.profile?.username?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFeedbacks = feedbacks.filter((f: any) =>
    f.comment?.toLowerCase().includes(search.toLowerCase()) ||
    f.profile?.username?.toLowerCase().includes(search.toLowerCase()) ||
    f.product?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum: number, o: any) => sum + (Number(o.totalAmount) || 0), 0);

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="container py-12 md:py-24 flex flex-col gap-12 max-w-[1400px]">
      <div className="flex flex-col gap-4">
        <Badge variant="outline" className="w-fit px-4 py-1 text-xs font-black bg-primary/5 border-primary/20 text-primary uppercase tracking-widest">
          Store Management
        </Badge>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-black text-foreground tracking-tight sm:text-6xl">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground font-bold leading-relaxed">Control everything from products to users in your organic marketplace.</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={async () => {
                if (!confirm('Clear all current products?')) return;
                setIsLoading(true);
                try {
                  const snapshot = await getDocs(collection(db, 'products'));
                  await Promise.all(snapshot.docs.map(d => deleteDoc(d.ref)));
                  toast.success('Database cleared');
                  fetchData();
                } catch (e) {
                  toast.error('Clear failed');
                } finally {
                  setIsLoading(false);
                }
              }}
              className="h-14 px-6 rounded-2xl border-destructive/20 text-destructive font-bold hover:bg-destructive/5"
            >
              Clear All
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                setIsLoading(true);
                try {
                  let count = 0;
                  for (const p of demoProducts) {
                    await productApi.create(p);
                    count++;
                  }
                  toast.success(`Successfully added ${count} demo products!`);
                  fetchData();
                } catch (e: any) {
                  toast.error('Seeding failed: ' + e.message);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="h-14 px-8 rounded-2xl border-primary/20 text-primary font-black hover:bg-primary/5 shadow-none"
            >
              Seed 50 Products
            </Button>
            <Button
              onClick={() => { setEditingProduct(null); setIsProductFormOpen(true); }}
              className="w-fit h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
            >
              <Plus className="h-6 w-6" />
              Add New Product
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-lg rounded-[2.5rem] bg-white dark:bg-card overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                <span className="text-3xl font-black text-foreground tracking-tight">{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-20 rounded-[2.5rem] p-2 bg-secondary/50 border-none mb-10 max-w-5xl">
          <TabsTrigger value="products" className="rounded-[1.8rem] font-black text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl flex items-center gap-2">
            <Package className="h-5 w-5" /> Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-[1.8rem] font-black text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Orders
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-[1.8rem] font-black text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl flex items-center gap-2">
            <Users className="h-5 w-5" /> Users
          </TabsTrigger>
          <TabsTrigger value="feedback" className="rounded-[1.8rem] font-black text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl flex items-center gap-2">
            <Shield className="h-5 w-5" /> Feedback
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-[1.8rem] font-black text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white shadow-none data-[state=active]:shadow-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Analytics
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-white dark:bg-card border border-primary/10 focus-visible:ring-primary font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSearch('')} className="text-muted-foreground font-bold hover:text-primary">Clear Filter</Button>
              <Button variant="outline" size="sm" onClick={fetchData} className="rounded-xl font-bold border-primary/10 flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
            </div>
          </div>

          <TabsContent value="products" className="mt-0">
            <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-secondary/50">
                      <TableRow className="border-none">
                        <TableHead className="px-10 h-20 font-black uppercase text-xs tracking-widest">Product</TableHead>
                        <TableHead className="font-black uppercase text-xs tracking-widest">Category</TableHead>
                        <TableHead className="font-black uppercase text-xs tracking-widest">Price</TableHead>
                        <TableHead className="font-black uppercase text-xs tracking-widest">Stock</TableHead>
                        <TableHead className="font-black uppercase text-xs tracking-widest text-right px-10">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow><TableCell colSpan={5} className="h-64 text-center">Loading...</TableCell></TableRow>
                      ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id} className="border-b border-primary/5 hover:bg-secondary/20 transition-colors">
                            <TableCell className="px-10 py-6">
                              <div className="flex items-center gap-4 min-w-[300px]">
                                <img src={product.image} className="h-14 w-14 rounded-xl object-cover" />
                                <div className="flex flex-col">
                                  <span className="font-black text-foreground leading-tight">{product.name}</span>
                                  <span className="text-xs text-muted-foreground font-bold line-clamp-1">{product.description}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="font-bold border-primary/10 bg-primary/5">{product.category}</Badge></TableCell>
                            <TableCell className="font-black text-primary">${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className={
                                product.stockStatus === 'in-stock' ? 'bg-green-100 text-green-700 font-bold border-none' :
                                  product.stockStatus === 'low-stock' ? 'bg-orange-100 text-orange-700 font-bold border-none' :
                                    'bg-red-100 text-red-700 font-bold border-none'
                              }>
                                {product.stockStatus.replace('-', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right px-10">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                                  onClick={() => { setEditingProduct(product); setIsProductFormOpen(true); }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full hover:bg-red-100 hover:text-red-600"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow><TableCell colSpan={5} className="h-64 text-center">No products found.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow className="border-none">
                      <TableHead className="px-10 h-20 font-black uppercase text-xs tracking-widest">Order ID</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Customer</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Amount</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Status</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest px-10 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="h-64 text-center">Loading...</TableCell></TableRow>
                    ) : filteredOrders.length > 0 ? (
                      filteredOrders.map((order: any) => (
                        <TableRow key={order.id} className="border-b border-primary/5 hover:bg-secondary/20 transition-colors">
                          <TableCell className="px-10 py-6">
                            <span className="font-black text-xs text-muted-foreground uppercase">#{order.id.slice(0, 8)}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-foreground">{order.profile?.fullName || order.profile?.username}</span>
                              <span className="text-xs text-muted-foreground font-bold">{order.profile?.email}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-black text-primary">${Number(order.totalAmount).toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className="font-bold capitalize">{order.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-10 text-right">
                            <Select
                              value={order.status}
                              onValueChange={(val) => handleUpdateOrderStatus(order.id, val)}
                            >
                              <SelectTrigger className="w-40 ml-auto h-10 rounded-xl border-primary/10 bg-white dark:bg-card font-bold">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} className="h-64 text-center">No orders found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow className="border-none">
                      <TableHead className="px-10 h-20 font-black uppercase text-xs tracking-widest">User</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Email</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Role</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest px-10 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={4} className="h-64 text-center">Loading...</TableCell></TableRow>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user: any) => (
                        <TableRow key={user.id} className="border-b border-primary/5 hover:bg-secondary/20 transition-colors">
                          <TableCell className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                                {user.username?.[0] || 'U'}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-black text-foreground">@{user.username}</span>
                                <span className="text-xs text-muted-foreground font-bold">{user.fullName || 'No Name'}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge className={user.role === 'admin' ? 'bg-accent text-accent-foreground font-black' : 'bg-secondary text-secondary-foreground font-bold'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-10 text-right">
                            <Select
                              value={user.role}
                              onValueChange={(val: 'user' | 'admin' | 'owner' | 'developer') => handleRoleChange(user.id, val)}
                              disabled={user.id === profile?.id}
                            >
                              <SelectTrigger className="w-32 ml-auto h-10 rounded-xl border-primary/10 bg-white dark:bg-card font-bold">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="owner">Owner</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={4} className="h-64 text-center">No users found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-0">
            <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow className="border-none">
                      <TableHead className="px-10 h-20 font-black uppercase text-xs tracking-widest">Customer</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Product</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Rating</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest">Comment</TableHead>
                      <TableHead className="font-black uppercase text-xs tracking-widest px-10 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="h-64 text-center">Loading...</TableCell></TableRow>
                    ) : filteredFeedbacks.length > 0 ? (
                      filteredFeedbacks.map((feedback: any) => (
                        <TableRow key={feedback.id} className="border-b border-primary/5 hover:bg-secondary/20 transition-colors">
                          <TableCell className="px-10 py-6">
                            <div className="flex flex-col">
                              <span className="font-black text-foreground">{feedback.profile?.username || 'Anonymous'}</span>
                              <span className="text-xs text-muted-foreground font-bold">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">{feedback.product?.name || 'Deleted Product'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-accent fill-accent">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-black">{feedback.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate font-medium text-muted-foreground italic">"{feedback.comment}"</TableCell>
                          <TableCell className="px-10 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full hover:bg-red-100 hover:text-red-600"
                              onClick={() => handleDeleteFeedback(feedback.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} className="h-64 text-center">No feedback found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card p-10">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-black">Sales Performance</CardTitle>
                  <CardDescription className="font-bold">Order volume trends</CardDescription>
                </CardHeader>
                <div className="h-80 flex flex-col justify-end gap-1">
                  <div className="flex items-end gap-2 h-full px-4">
                    {[40, 60, 30, 80, 50, 90, 70, 45, 85, 65].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-lg" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between px-2 text-[10px] font-black uppercase text-muted-foreground mt-4">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </Card>
              <Card className="border-none shadow-xl rounded-[3rem] bg-white dark:bg-card p-10">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-black">Category Distribution</CardTitle>
                  <CardDescription className="font-bold">Popular product segments</CardDescription>
                </CardHeader>
                <div className="h-80 flex flex-col gap-6 pt-6">
                  {['Badam', 'Khajur', 'Seeds', 'Organic'].map((cat, i) => {
                    const percentage = Math.floor(Math.random() * 40 + 20);
                    return (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm font-black uppercase tracking-wider">
                          <span>{cat}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full bg-primary rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <ProductForm
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
        product={editingProduct}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default Admin;

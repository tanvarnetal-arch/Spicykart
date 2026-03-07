import { db, storage } from './firebase';
import { Product } from '@/types/products';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

export const productApi = {
  async getAll() {
    try {
      const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          price: data.price,
          discountPrice: data.discountPrice || data.discount_price,
          stockStatus: data.stockStatus || data.stock_status,
          category: data.category,
          rating: data.rating,
          reviewsCount: data.reviewsCount || data.reviews_count,
          image: data.image,
          features: data.features || [],
        } as Product;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        discountPrice: data.discountPrice || data.discount_price,
        stockStatus: data.stockStatus || data.stock_status,
        reviewsCount: data.reviewsCount || data.reviews_count,
      } as Product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async create(product: Partial<Product>) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: product.name || 'Unnamed Product',
        description: product.description || '',
        price: Number(product.price) || 0,
        discountPrice: product.discountPrice ?? null,
        stockStatus: product.stockStatus || 'in-stock',
        category: product.category || 'General',
        rating: Number(product.rating) || 0,
        reviewsCount: Number(product.reviewsCount) || 0,
        image: product.image || 'https://via.placeholder.com/400',
        features: product.features || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return {
        id: docRef.id,
        ...product,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async update(id: string, product: Partial<Product>) {
    try {
      const docRef = doc(db, 'products', id);
      const updateData: any = {
        updatedAt: new Date().toISOString(),
      };

      if (product.name !== undefined) updateData.name = product.name;
      if (product.description !== undefined) updateData.description = product.description;
      if (product.price !== undefined) updateData.price = Number(product.price);
      if (product.discountPrice !== undefined) updateData.discountPrice = product.discountPrice;
      if (product.stockStatus !== undefined) updateData.stockStatus = product.stockStatus;
      if (product.category !== undefined) updateData.category = product.category;
      if (product.rating !== undefined) updateData.rating = Number(product.rating);
      if (product.reviewsCount !== undefined) updateData.reviewsCount = Number(product.reviewsCount);
      if (product.image !== undefined) updateData.image = product.image;
      if (product.features !== undefined) updateData.features = product.features;

      await updateDoc(docRef, updateData);

      return {
        id,
        ...product,
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async uploadImage(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `product_images/${fileName}`;

      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

export const orderApi = {
  async getAll() {
    try {
      const q = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const orders = [];
      for (const docSnap of querySnapshot.docs) {
        const orderData = docSnap.data();
        const userRef = doc(db, 'profiles', orderData.userId);
        const userSnap = await getDoc(userRef);

        orders.push({
          id: docSnap.id,
          profileId: orderData.userId || orderData.profileId || orderData.profile_id,
          totalAmount: orderData.totalAmount || orderData.total_amount || 0,
          status: orderData.status,
          items: orderData.items || [],
          shippingAddress: orderData.shippingAddress || orderData.shipping_address || '',
          createdAt: orderData.createdAt || orderData.created_at || new Date().toISOString(),
          updatedAt: orderData.updatedAt || orderData.updated_at || new Date().toISOString(),
          profile: userSnap.exists() ? userSnap.data() : null,
        });
      }

      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async updateStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

export const feedbackApi = {
  async getAll() {
    try {
      const q = query(
        collection(db, 'reviews'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const feedbacks = [];
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const userRef = doc(db, 'profiles', data.userId);
        const userSnap = await getDoc(userRef);
        const productRef = doc(db, 'products', data.productId);
        const productSnap = await getDoc(productRef);

        feedbacks.push({
          id: docSnap.id,
          ...data,
          profile: userSnap.exists() ? userSnap.data() : null,
          product: productSnap.exists() ? productSnap.data() : null,
        });
      }
      return feedbacks;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  }
};

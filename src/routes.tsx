import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import Layout from '@/components/Layout';
import { RouteGuard } from '@/components/common/RouteGuard';
import { AuthProvider } from '@/contexts/AuthContext';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Cart = lazy(() => import('@/pages/Cart'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Profile = lazy(() => import('@/pages/Profile'));
const Admin = lazy(() => import('@/pages/Admin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const routes: RouteConfig[] = [
  {
    name: 'Main Layout',
    path: '/',
    element: (
      <AuthProvider>
        <RouteGuard>
          <Layout />
        </RouteGuard>
      </AuthProvider>
    ),
    children: [
      {
        name: 'Home',
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        name: 'Products',
        path: 'products',
        element: (
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        ),
      },
      {
        name: 'Product Details',
        path: 'products/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        name: 'Cart',
        path: 'cart',
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        name: 'Login',
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        name: 'Signup',
        path: 'signup',
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        name: 'Profile',
        path: 'profile',
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        name: 'Admin',
        path: 'admin',
        element: (
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        ),
      },
    ],
  },
  {
    name: 'Not Found',
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;

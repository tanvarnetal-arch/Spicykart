import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import routes, { RouteConfig } from './routes';

const App: React.FC = () => {
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <Router>
      <CartProvider>
        <IntersectObserver />
        <Routes>
          {renderRoutes(routes)}
        </Routes>
        <Toaster position="top-center" richColors />
      </CartProvider>
    </Router>
  );
};

export default App;

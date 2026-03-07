# Task: Spicy Kart - Organic eCommerce Showcase

## Plan
- [x] Setup Project Structure & Theme
  - [x] Analyze requirements
  - [x] Define color palette (Organic Green: #2D5A27, Earthy: #F4F1EA)
  - [x] Update `tailwind.config.js` and `src/index.css`
- [x] Data & State Management
  - [x] Create `src/data/products.ts` with mock data (categories: Badam, Khajur, Mixed Seeds, Pumpkin Seeds, Healthy Organic Products)
  - [x] Create `src/contexts/CartContext.tsx` for cart logic and localStorage persistence
- [x] Common Components
  - [x] `Navbar`: Logo, Search, Cart Badge, Theme Toggle
  - [x] `Footer`: Simple professional footer
  - [x] `ProductCard`: Premium card design with "Add to Cart" button
- [x] Pages Implementation
  - [x] `HomePage`: Hero section + Category quick links + Featured products
  - [x] `ProductsPage`: Main listing with filtering (category, price range) and sorting
  - [x] `ProductDetailsPage`: Product info, related products
  - [x] `CartPage`: Cart items list, subtotal, checkout button (mock)
  - [x] `NotFoundPage`: 404 error
- [x] Final Polish
  - [x] Image search for real product photos
  - [x] Responsive design check
  - [x] Lint and fix errors
- [ ] Authentication & Profile
  - [ ] Setup Supabase Auth and Profiles table
  - [ ] Implement Login page with Username/Password & Google SSO
  - [ ] Implement Signup page
  - [ ] Implement Profile page (View/Edit)
  - [ ] Update Navbar with Auth status
  - [ ] Add Route Protection

## Notes
- Supabase is excluded per requirements.
- Cart persistence using `localStorage`.
- Theme persistence using `localStorage` or `next-themes` (standard in the template).

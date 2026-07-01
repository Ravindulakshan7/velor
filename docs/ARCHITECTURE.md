# VELOR - System Architecture & Development Plan

## 1. System Architecture

VELOR will be built as a Full-Stack Web Application to securely handle products, inventory, and orders.

*   **Frontend (Client)**: 
    *   **Framework**: React 19 with Vite for fast bundling and optimized assets.
    *   **Language**: TypeScript for strict type safety and interface definitions.
    *   **Styling**: Tailwind CSS for a highly customizable, utility-first design system (Apple/Zara luxury minimalist aesthetic).
    *   **State Management**: React Context / Hooks for Cart and Wishlist state.
    *   **Animations**: Framer Motion for smooth, premium transitions (fade-ins, route transitions, product image swaps).
*   **Backend (Server)**:
    *   **Framework**: Express.js (Node.js) to serve API endpoints and proxy external requests.
    *   **Role**: Handles admin authentication, database queries, inventory validation, and secure checkout processing.
*   **Database**:
    *   Relational database (PostgreSQL via Cloud SQL) or structured document store (Firestore) to handle complex product variants, changing prices, and inventory tracking.

## 2. Folder Structure (Updated)

```text
/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx # For Admin routes
│   ├── pages/               # Route-level components
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Wishlist.tsx     # NEW: Wishlist Page
│   │   ├── Checkout.tsx     # NEW: Checkout Flow
│   │   ├── Success.tsx      # NEW: Order Success Page
│   │   ├── Login.tsx        # NEW: Authentication
│   │   ├── Register.tsx     # NEW: Authentication
│   │   └── admin/
│   │       ├── Admin.tsx    # Enhanced Admin Dashboard
│   │       ├── Products.tsx # Manage Products
│   │       ├── Orders.tsx   # Manage Orders
│   │       ├── Customers.tsx# Manage Customers
│   │       └── Analytics.tsx# Analytics Dashboard
│   ├── lib/                 # Utility functions
│   ├── types.ts             # Shared TypeScript interfaces
│   ├── data.ts              # Mock data
│   ├── store.ts             # Zustand state management (enhanced)
│   ├── authStore.ts         # NEW: Auth state management
│   └── main.tsx             # Client entry point
```

## 5. New Modules Architecture

*   **Wishlist System**: Managed via Zustand store, persisting product IDs. Wishlist page renders products based on these IDs.
*   **Checkout System**: Multi-step or single-page form for shipping/billing. Integrates with Zustand store to clear cart on success.
*   **Authentication**: Client-side auth store using Zustand for prototyping. Protected routes using a wrapper component for Admin access.
*   **Product Variant System**: Enhanced to support image arrays per variant, strict stock tracking, and dynamic pricing (partially implemented, will be refined).
*   **Admin Dashboard**: Tabbed interface expanded into dedicated sub-views for Products (CRUD), Orders, Customers, and Analytics (using Recharts).
*   **CJ Dropshipping Integration (Planned)**:
    *   **Architecture**: When an order is placed on VELOR, a background job (or serverless function) will format the order payload and send it via the CJ Dropshipping API.
    *   **Sync**: Webhooks from CJ Dropshipping will update order status (e.g., 'Processing' -> 'Shipped') and sync inventory levels back to the VELOR database.

## 3. Database Design

To handle multiple variants (Size/Color) with distinct pricing and inventory, the database will be structured as follows:

*   **Users**
    *   `id` (PK)
    *   `email`
    *   `password_hash`
    *   `role` (enum: 'admin', 'customer')
*   **Products**
    *   `id` (PK)
    *   `name`
    *   `description`
    *   `category` (Watches, Rings, Apparel, Accessories)
    *   `base_price`
    *   `created_at`
*   **ProductVariants**
    *   `id` (PK)
    *   `product_id` (FK to Products)
    *   `color` (e.g., 'Black', 'Blue')
    *   `size` (e.g., 'Small', 'Medium')
    *   `price` (Absolute price for this specific variant)
    *   `stock_quantity` (Inventory tracking)
    *   `image_urls` (Array of images specific to this variant)
*   **Orders**
    *   `id` (PK)
    *   `customer_id` (FK to Users)
    *   `total_amount`
    *   `status` (enum: 'pending', 'processing', 'shipped', 'delivered')
    *   `created_at`
*   **OrderItems**
    *   `id` (PK)
    *   `order_id` (FK to Orders)
    *   `variant_id` (FK to ProductVariants)
    *   `quantity`
    *   `price_at_purchase`
*   **Coupons**
    *   `id` (PK)
    *   `code` (e.g., 'LUXURY20')
    *   `discount_percentage`
    *   `is_active` (boolean)

## 4. Development Roadmap

*   **Phase 1: Project Setup & Design System**
    *   Initialize React, Vite, and Tailwind.
    *   Establish the "Luxury Minimal" theme (light cream backgrounds, crisp typography, clean spacing).
    *   Set up routing for the Customer and Admin sides.
*   **Phase 2: Customer Experience (Frontend)**
    *   Build the Homepage (Hero banner, featured categories).
    *   Build the Shop page with category filtering.
    *   Build the Product Detail Page with variant selection (dynamic price/image/stock updates).
    *   Implement Cart and Wishlist state management.
*   **Phase 3: Backend & Database Integration**
    *   Set up the Express server and database connection.
    *   Create CRUD endpoints for Products, Variants, and Coupons.
    *   Implement the Admin Dashboard UI to manage inventory, update variant prices, and view orders.
*   **Phase 4: Checkout & Order Flow**
    *   Build the Checkout form and summary.
    *   Implement coupon validation API.
    *   Process orders, decrement variant stock, and generate order records.
*   **Phase 5: Polish & Final Review**
    *   Add Framer Motion micro-interactions.
    *   Ensure strict responsive design (mobile-first scaling to desktop).
    *   Final end-to-end testing of the purchase flow and admin controls.

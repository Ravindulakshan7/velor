import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--color-velor-bg)] relative">
      <Navigation />
      <main className="flex-1 flex flex-col w-full overflow-x-hidden pt-[100px] lg:pt-[120px]">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

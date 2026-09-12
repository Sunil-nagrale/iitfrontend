import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-arena-bg text-light-text flex relative overflow-x-hidden">
      {/* Background RPG Grid & Particle Ambience */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-teal-electric/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-gold-amber/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Desktop Sidebar (hidden on mobile and small tablets) */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer & Bottom Quick Nav */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8 relative z-10">
        <Topbar onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
};

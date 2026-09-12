import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Swords, 
  ShoppingBag, 
  History, 
  Trophy, 
  Settings, 
  LogOut, 
  X,
  User
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const MobileNav = ({ isOpen, onClose }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quests', path: '/quests', icon: Swords },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'History', path: '/history', icon: History },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const bottomBarItems = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quests', path: '/quests', icon: Swords },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* 1. Slide-out Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Drawer Menu */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-arena-surface border-r border-arena-border z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-arena-border flex items-center justify-between">
            <Logo size="sm" to="/dashboard" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-light-muted hover:text-white hover:bg-arena-card"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini badge */}
          <div 
            onClick={() => { onClose(); navigate('/profile'); }}
            className="mx-4 my-3 p-3 rounded-xl bg-arena-card border border-teal-electric/20 flex items-center gap-3 cursor-pointer"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-lg object-cover border border-teal-electric/40"
            />
            <div>
              <p className="text-sm font-bold text-light-text">{user.name}</p>
              <p className="text-xs text-teal-electric font-mono">Level {user.level} · {user.coins} Coins</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-teal-electric/15 text-teal-electric border-l-2 border-teal-electric'
                        : 'text-light-muted hover:text-light-text hover:bg-arena-card'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-arena-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-coral-warm bg-coral-warm/10 hover:bg-coral-warm/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* 2. Sleek Bottom Navigation Bar for Mobile (Hidden on lg+) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-arena-surface/95 backdrop-blur-xl border-t border-arena-border z-30 flex items-center justify-around px-2 lg:hidden">
        {bottomBarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full py-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-teal-electric' : 'text-light-subtle hover:text-light-muted'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-110' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

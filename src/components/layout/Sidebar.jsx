import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Swords, 
  ShoppingBag, 
  History, 
  Trophy, 
  Settings, 
  LogOut,
  Flame,
  Coins
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ className = "" }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quests', path: '/quests', icon: Swords },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'History', path: '/history', icon: History },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`w-64 bg-arena-surface/95 border-r border-arena-border flex flex-col justify-between shrink-0 h-screen sticky top-0 backdrop-blur-xl z-30 select-none ${className}`}>
      {/* Top Branding Section */}
      <div>
        <div className="p-6 border-b border-arena-border/80">
          <Logo size="md" to="/dashboard" />
        </div>

        {/* Quick Character Summary Chip (non-profile link) */}
        <div className="px-5 py-4">
          <div className="p-3 rounded-xl bg-arena-card/80 border border-arena-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-electric animate-pulse shadow-glow-teal" />
              <span className="text-xs font-mono font-medium text-light-muted">Rank: Lvl {user.level}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gold-amber">
              <Coins className="w-3.5 h-3.5" />
              <span>{user.coins}</span>
            </div>
          </div>
        </div>

        {/* Navigation Items (Strictly NO Character/Profile item!) */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-electric/15 to-transparent text-teal-electric border-l-2 border-teal-electric shadow-sm'
                      : 'text-light-muted hover:text-light-text hover:bg-arena-card/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-teal-electric' : 'text-light-muted group-hover:text-teal-electric'
                    }`} />
                    <span className="tracking-wide">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-electric shadow-glow-teal" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Arena Status & Logout */}
      <div className="p-4 border-t border-arena-border space-y-2">
        <div className="px-3 py-2 rounded-lg bg-arena-bg/60 border border-arena-border/50 text-[11px] text-light-muted flex items-center justify-between">
          <span className="font-mono">Active Streak</span>
          <span className="flex items-center gap-1 font-mono font-bold text-coral-warm">
            <Flame className="w-3.5 h-3.5 fill-coral-warm" />
            {user.streak} {user.streak === 1 ? 'Day' : 'Days'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-light-muted hover:text-coral-warm hover:bg-coral-warm/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

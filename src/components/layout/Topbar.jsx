import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Coins, 
  Menu, 
  User, 
  CheckCircle2, 
  Sparkles,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Topbar = ({ onToggleMobileMenu }) => {
  const { user, history } = useApp();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentNotifications = history.slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/quests?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 md:h-20 bg-arena-bg/85 backdrop-blur-xl border-b border-arena-border px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left Area: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-light-muted hover:text-white hover:bg-arena-card border border-arena-border"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-teal-electric" />
        </button>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search quests, skills, or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-arena-card/80 border border-arena-border rounded-xl pl-9 pr-12 py-2 text-sm text-light-text placeholder-light-subtle focus:outline-none focus:border-teal-electric/60 transition-all font-medium"
          />
          <kbd className="hidden md:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-arena-surface border border-arena-border text-light-subtle">
            Enter
          </kbd>
        </form>
      </div>

      {/* Right Area: Stats Badges, Notification & Profile Trigger */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Coin Wealth Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-amber/10 border border-gold-amber/30 text-gold-amber shadow-glow-gold/20 font-mono font-bold text-xs sm:text-sm">
          <Coins className="w-4 h-4 fill-gold-amber text-gold-amber" />
          <span>{user.coins}</span>
        </div>

        {/* Level Indicator Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-electric/10 border border-teal-electric/30 text-teal-electric font-mono font-bold text-xs sm:text-sm">
          <Shield className="w-3.5 h-3.5" />
          <span>LVL {user.level}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 sm:p-2.5 rounded-xl bg-arena-card/80 border border-arena-border hover:border-teal-electric/40 text-light-muted hover:text-light-text transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {recentNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-electric shadow-glow-teal animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-arena-card border border-teal-electric/30 rounded-2xl shadow-2xl shadow-black/80 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-arena-border flex items-center justify-between">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-light-muted">
                  Recent Activities
                </span>
                <span className="text-[10px] font-mono text-teal-electric">Live Arena Log</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-arena-border/50">
                {recentNotifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-light-muted">
                    No recent events yet. Complete a quest to see updates here!
                  </div>
                ) : (
                  recentNotifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-arena-hover/40 transition-colors flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-teal-electric/10 text-teal-electric shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-light-text truncate">{notif.title}</p>
                        <p className="text-[11px] text-light-muted">
                          {notif.type === 'quest_completed' ? `+${notif.xpEarned} XP · +${notif.coinsEarned} Coins` : `Item purchased`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-arena-border text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/history');
                  }}
                  className="text-xs font-semibold text-teal-electric hover:underline"
                >
                  View Full History →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* IMPORTANT: User Profile / Character Clickable Area */}
        {/* Clicking this navigates to the CHARACTER / PROFILE PAGE as requested! */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-arena-card/80 hover:bg-arena-hover border border-arena-border hover:border-teal-electric/50 transition-all duration-200 group cursor-pointer"
          title="View Character Profile"
          aria-label="User Profile"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-teal-electric/40 bg-arena-bg group-hover:border-teal-electric transition-colors">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-arena-card border border-arena-border flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-bright" />
            </div>
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <p className="text-xs font-bold text-light-text group-hover:text-teal-electric transition-colors truncate max-w-[100px] md:max-w-[130px]">
                {user.name}
              </p>
            </div>
            <p className="text-[10px] text-light-muted font-mono truncate">
              {user.title || "Adventurer"}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  User, 
  Mail, 
  Palette, 
  Bell, 
  LogOut, 
  RotateCcw, 
  Sparkles, 
  ShieldAlert,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';

export const Settings = () => {
  const navigate = useNavigate();
  const { 
    user, 
    updateUserProfile, 
    logout, 
    seedDemoQuests, 
    resetAllData 
  } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [theme, setTheme] = useState('dark-teal'); // 'dark-teal' | 'high-contrast'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAccount = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-light-text flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-teal-electric" />
          Settings
        </h1>
        <p className="text-sm text-light-muted mt-1">
          Manage your account preferences and arena configuration.
        </p>
      </div>

      {/* 1. Account Information */}
      <div className="rounded-3xl bg-arena-card/80 border border-arena-border p-6 sm:p-8 space-y-6 shadow-card-glass">
        <div className="flex items-center gap-3 border-b border-arena-border pb-4">
          <div className="p-2 rounded-xl bg-teal-electric/10 text-teal-electric">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-light-text">
              Account Information
            </h3>
            <p className="text-xs text-light-muted">
              Update your adventurer profile and contact details.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
                Adventurer Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-light-text font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-light-text"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-bright font-medium">
                <Check className="w-4 h-4" /> Changes saved successfully
              </span>
            ) : <div />}

            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Preferences (Theme & Notifications) */}
      <div className="rounded-3xl bg-arena-card/80 border border-arena-border p-6 sm:p-8 space-y-6 shadow-card-glass">
        <div className="flex items-center gap-3 border-b border-arena-border pb-4">
          <div className="p-2 rounded-xl bg-gold-amber/10 text-gold-amber">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-light-text">
              Visual & Notification Preferences
            </h3>
            <p className="text-xs text-light-muted">
              Tailor the atmosphere of your Life Arena HUD.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Theme Mode */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-light-text">Color Scheme</p>
              <p className="text-xs text-light-muted">Deep Charcoal + Teal + Emerald + Gold</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-electric bg-teal-electric/10 px-3 py-1.5 rounded-xl border border-teal-electric/30">
              Emerald Void (Active)
            </span>
          </div>

          {/* Level Up Audio / Confetti */}
          <div className="flex items-center justify-between py-2 border-t border-arena-border/50">
            <div>
              <p className="text-sm font-semibold text-light-text">Celebration Particle Effects</p>
              <p className="text-xs text-light-muted">Display arena confetti upon leveling up or completing quests</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-teal-electric' : 'bg-arena-surface border border-arena-border'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-arena-bg transition-transform absolute top-1 ${
                soundEnabled ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Quest Reminders */}
          <div className="flex items-center justify-between py-2 border-t border-arena-border/50">
            <div>
              <p className="text-sm font-semibold text-light-text">Daily Quest Notifications</p>
              <p className="text-xs text-light-muted">Receive reminders for uncompleted daily bounties</p>
            </div>
            <button
              onClick={() => setRemindersEnabled(!remindersEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                remindersEnabled ? 'bg-teal-electric' : 'bg-arena-surface border border-arena-border'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-arena-bg transition-transform absolute top-1 ${
                remindersEnabled ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Demo & Testing Tools (Convenient for Hackathon Evaluation) */}
      <div className="rounded-3xl bg-arena-card/80 border border-teal-electric/25 p-6 sm:p-8 space-y-4 shadow-card-glass">
        <div className="flex items-center gap-3 border-b border-arena-border pb-3">
          <div className="p-2 rounded-xl bg-teal-electric/10 text-teal-electric">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-light-text">
              Demo & Evaluation Controls
            </h3>
            <p className="text-xs text-light-muted">
              Quickly test quest workflows and reset the arena state.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={seedDemoQuests}
            className="text-xs flex-1 border-teal-electric/30 hover:border-teal-electric"
          >
            Load 4 Starter Quests (Demo)
          </Button>

          <Button
            variant="danger"
            size="sm"
            icon={RotateCcw}
            onClick={resetAllData}
            className="text-xs flex-1"
          >
            Reset All Data to Zero
          </Button>
        </div>
      </div>

      {/* 4. Logout Section */}
      <div className="rounded-3xl bg-arena-card/80 border border-arena-border p-6 sm:p-8 flex items-center justify-between shadow-card-glass">
        <div>
          <h3 className="text-base font-bold text-light-text">Sign Out of Arena</h3>
          <p className="text-xs text-light-muted mt-0.5">End your current session safely.</p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={LogOut}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

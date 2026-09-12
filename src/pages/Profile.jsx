import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Zap, 
  Coins, 
  Flame, 
  Brain, 
  Dumbbell, 
  HeartPulse, 
  Target, 
  Edit3, 
  Sparkles, 
  Award, 
  Check, 
  X,
  Camera,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const Profile = () => {
  const { user, updateUserProfile, shopItems } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [titleInput, setTitleInput] = useState(user.title || 'Novice Challenger');

  const handleOpenEdit = () => {
    setNameInput(user.name);
    setTitleInput(user.title || 'Novice Challenger');
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    updateUserProfile({
      name: nameInput.trim(),
      title: titleInput.trim()
    });
    setIsEditModalOpen(false);
  };

  // Get owned relics / badges
  const ownedItems = shopItems.filter(item => user.inventory?.includes(item.id));

  // Determine character rank badge
  const getHeroRank = (level) => {
    if (level >= 20) return "Grand Arena Champion";
    if (level >= 10) return "Elite Vanguard";
    if (level >= 5) return "Seasoned Challenger";
    return "Novice Adventurer";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* 1. RPG Character Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-arena-card via-arena-surface to-arena-card border border-teal-electric/30 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-electric/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-amber/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
          {/* Avatar with RPG border & glowing rank badge */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-teal-electric p-1 bg-arena-bg shadow-glow-teal/40">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-arena-bg border border-teal-electric text-[10px] font-mono font-black uppercase text-teal-electric tracking-wider shadow-sm whitespace-nowrap">
              LVL {user.level}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-electric/10 border border-teal-electric/25 text-teal-electric text-xs font-mono font-semibold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{getHeroRank(user.level)}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-black text-light-text tracking-tight truncate">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-light-muted mt-0.5">
                  {user.title || "Novice Challenger"} · {user.email}
                </p>
              </div>

              {/* Edit Name / Edit Profile Button */}
              <Button
                variant="secondary"
                size="sm"
                icon={Edit3}
                onClick={handleOpenEdit}
                className="self-center sm:self-start border-teal-electric/30 hover:border-teal-electric text-xs"
              >
                Edit Name
              </Button>
            </div>

            {/* XP Level Bar */}
            <div className="pt-2 max-w-lg">
              <ProgressBar
                value={user.xp}
                max={user.xpToNextLevel}
                variant="teal"
                size="md"
                showLabel={true}
                label="Ascension Progress"
                valueText={`${user.xp} / ${user.xpToNextLevel} XP`}
              />
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-arena-bg/80 border border-arena-border">
                <Coins className="w-4 h-4 text-gold-amber fill-gold-amber" />
                <span className="text-light-text font-bold">{user.coins}</span>
                <span className="text-light-subtle">Coins</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-arena-bg/80 border border-arena-border">
                <Flame className="w-4 h-4 text-coral-warm fill-coral-warm" />
                <span className="text-light-text font-bold">{user.streak}</span>
                <span className="text-light-subtle">Day Streak</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-arena-bg/80 border border-arena-border">
                <Zap className="w-4 h-4 text-emerald-bright" />
                <span className="text-light-text font-bold">{user.totalXp || user.xp}</span>
                <span className="text-light-subtle">Total XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full Attributes Breakdown */}
      <div className="rounded-3xl bg-arena-card/80 border border-arena-border p-6 sm:p-8 space-y-6 shadow-card-glass">
        <div>
          <h2 className="text-xl font-display font-bold text-light-text flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-electric" />
            Character Attributes
          </h2>
          <p className="text-xs text-light-muted mt-1">
            Permanent combat ratings accrued by completing categorized real-life quests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "Intelligence",
              score: user.attributes?.intelligence || 0,
              icon: Brain,
              color: "text-teal-electric",
              barColor: "teal",
              desc: "Gained from coding problems, architectural studies, non-fiction reading, and complex logic.",
              perk: "Enhances mental clarity & problem decomposition."
            },
            {
              name: "Strength",
              score: user.attributes?.strength || 0,
              icon: Dumbbell,
              color: "text-coral-warm",
              barColor: "coral",
              desc: "Gained from weight training, calisthenics, athletic conditioning, and cardiovascular endurance.",
              perk: "Boosts physical resilience & raw stamina."
            },
            {
              name: "Vitality",
              score: user.attributes?.vitality || 0,
              icon: HeartPulse,
              color: "text-emerald-bright",
              barColor: "emerald",
              desc: "Nourished by 8+ hours of deep sleep, balanced nutrition, daily hydration, and active recovery.",
              perk: "Accelerates daily energy restoration."
            },
            {
              name: "Focus",
              score: user.attributes?.focus || 0,
              icon: Target,
              color: "text-gold-amber",
              barColor: "gold",
              desc: "Cultivated through mindfulness meditation, deep undistracted work blocks, and digital minimalism.",
              perk: "Sharpens concentration & reduces habit decay."
            }
          ].map((attr) => {
            const Icon = attr.icon;
            return (
              <div key={attr.name} className="p-5 rounded-2xl bg-arena-surface border border-arena-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl bg-arena-bg border border-arena-border ${attr.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-light-text">{attr.name}</h4>
                      <span className="text-[11px] font-mono text-light-subtle">
                        {attr.score} Rating Points
                      </span>
                    </div>
                  </div>

                  <span className="text-lg font-mono font-black text-light-text">
                    {attr.score} <span className="text-xs text-light-subtle font-normal">PTS</span>
                  </span>
                </div>

                <ProgressBar
                  value={attr.score}
                  max={50}
                  variant={attr.barColor}
                  size="xs"
                />

                <p className="text-xs text-light-muted leading-relaxed">
                  {attr.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Unlocked Relics & Badges Inventory */}
      <div className="rounded-3xl bg-arena-card/80 border border-arena-border p-6 sm:p-8 space-y-4 shadow-card-glass">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-light-text flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-amber" />
              Equipped Relics & Badges
            </h2>
            <p className="text-xs text-light-muted mt-1">
              Items and insignias acquired from the Arena Item Shop.
            </p>
          </div>
        </div>

        {ownedItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-arena-surface border border-dashed border-arena-border text-center space-y-2">
            <ShoppingBag className="w-8 h-8 text-light-subtle mx-auto" />
            <p className="text-sm font-semibold text-light-text">No relics owned yet</p>
            <p className="text-xs text-light-muted max-w-sm mx-auto">
              Complete quests to earn coins, then visit the Item Shop to customize your hero.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ownedItems.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-arena-surface border border-teal-electric/25 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-electric/10 text-teal-electric shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-light-text truncate">{item.name}</h4>
                  <p className="text-[11px] text-light-muted font-mono">{item.tag} · Owned</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Edit Name / Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Character Profile"
        subtitle="Customize your adventurer persona in the Arena"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
              Adventurer Name <span className="text-coral-warm">*</span>
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. PhoenixBlade"
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-light-text font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
              Title / Clan Motto
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="e.g. Master of Dynamic Programming"
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-light-text"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-arena-border">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

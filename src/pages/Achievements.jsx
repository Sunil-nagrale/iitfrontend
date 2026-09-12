import React, { useState } from 'react';
import { Trophy, Sparkles, Filter, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AchievementCard } from '../components/achievements/AchievementCard';

export const Achievements = () => {
  const { achievements } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const categories = ['All', 'Milestones', 'Attributes', 'Streaks', 'Progression', 'Economy'];

  const filteredAchievements = achievements.filter(ach => {
    if (activeTab === 'All') return true;
    return ach.category === activeTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-arena-card via-arena-surface to-arena-card border border-teal-electric/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/80 overflow-hidden">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-electric/10 border border-teal-electric/25 text-teal-electric text-xs font-mono font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Trophy Room</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-light-text">
            Hall of Achievements
          </h1>
          <p className="text-xs sm:text-sm text-light-muted max-w-md">
            Unlock combat insignias and claim prestige as you conquer real-life quests.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-arena-bg/90 border border-arena-border shrink-0">
          <div className="text-right">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-light-subtle">
              Total Unlocked
            </span>
            <div className="text-2xl font-mono font-black text-gold-amber">
              {unlockedCount} / {totalCount}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-amber/15 text-gold-amber border border-gold-amber/30 flex items-center justify-center font-mono font-black text-sm">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all shrink-0 ${
              activeTab === cat
                ? 'bg-teal-electric text-arena-bg font-bold shadow-glow-teal/20'
                : 'bg-arena-card/80 text-light-muted hover:text-light-text border border-arena-border hover:border-teal-electric/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Plus, Sparkles, Swords, Compass } from 'lucide-react';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../context/AppContext';

export const WelcomeBanner = ({ onCreateQuest }) => {
  const { user } = useApp();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-arena-card via-arena-surface to-arena-card border border-teal-electric/25 p-6 sm:p-8 shadow-card-glass">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-electric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-20 w-60 h-60 bg-gold-amber/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-electric/10 border border-teal-electric/25 text-teal-electric text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Season 1: Awakening</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-light-text tracking-tight">
            Welcome to Life Arena,{' '}
            <span className="text-gradient-teal">{user.name}</span>!
          </h1>

          <p className="text-sm sm:text-base text-light-muted leading-relaxed">
            Your real life is your arena. Complete quests to sharpen your mind, fortify your body, and forge unbreakable habits.
          </p>

          {/* XP Progress Bar to next level */}
          <div className="pt-2 max-w-md">
            <ProgressBar
              value={user.xp}
              max={user.xpToNextLevel}
              variant="teal"
              size="sm"
              showLabel={true}
              label={`Level ${user.level} Progression`}
              valueText={`${user.xp} / ${user.xpToNextLevel} XP`}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="lg"
            icon={Plus}
            onClick={onCreateQuest}
            className="whitespace-nowrap shadow-glow-teal"
          >
            + Create New Quest
          </Button>
        </div>
      </div>
    </div>
  );
};

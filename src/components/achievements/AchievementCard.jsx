import React from 'react';
import { 
  Award, 
  Flame, 
  CheckCircle2, 
  Terminal, 
  Dumbbell, 
  Zap, 
  Brain, 
  Coins, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const AchievementCard = ({ achievement }) => {
  const iconMap = {
    Award,
    Flame,
    CheckCircle2,
    Terminal,
    Dumbbell,
    Zap,
    Brain,
    Coins
  };

  const IconComponent = iconMap[achievement.icon] || Award;
  const isUnlocked = achievement.isUnlocked;

  return (
    <div className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 shadow-card-glass ${
      isUnlocked
        ? 'bg-arena-card/90 border-gold-amber/40 shadow-glow-gold/15'
        : 'bg-arena-card/50 border-arena-border opacity-70'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl border ${
            isUnlocked
              ? 'bg-gold-amber/15 text-gold-amber border-gold-amber/30 shadow-glow-gold/20'
              : 'bg-arena-bg text-light-subtle border-arena-border'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-light-subtle">
              {achievement.category}
            </span>
            <h4 className="text-base font-display font-bold text-light-text flex items-center gap-2">
              {achievement.title}
            </h4>
          </div>
        </div>

        {/* Lock/Unlock Badge */}
        <div>
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-gold-amber bg-gold-amber/10 border border-gold-amber/30">
              <Unlock className="w-3 h-3" />
              Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-light-subtle bg-arena-bg border border-arena-border">
              <Lock className="w-3 h-3" />
              Locked
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-light-muted mb-4 leading-relaxed">
        {achievement.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <ProgressBar
          value={achievement.current}
          max={achievement.target}
          variant={isUnlocked ? "gold" : "teal"}
          size="xs"
          showLabel={true}
          label="Progress"
          valueText={`${achievement.current} / ${achievement.target}`}
        />
      </div>

      {/* Rewards Row */}
      <div className="flex items-center gap-3 pt-3 border-t border-arena-border text-xs font-mono">
        <span className="text-light-subtle text-[11px]">Bounty:</span>
        <span className="text-teal-electric font-semibold">+{achievement.xpReward} XP</span>
        <span className="text-gold-amber font-semibold">+{achievement.coinReward} Coins</span>
      </div>
    </div>
  );
};

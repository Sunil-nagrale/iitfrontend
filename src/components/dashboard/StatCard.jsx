import React from 'react';
import { Shield, Zap, Coins, Flame, TrendingUp } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  iconType,
  accentColor = "teal",
  badgeText = null
}) => {
  const icons = {
    level: Shield,
    xp: Zap,
    coins: Coins,
    streak: Flame,
    progress: TrendingUp
  };

  const IconComponent = icons[iconType] || Shield;

  const colorStyles = {
    teal: {
      border: "hover:border-teal-electric/50",
      glow: "group-hover:shadow-glow-teal",
      iconBg: "bg-teal-electric/10 text-teal-electric border-teal-electric/25",
      badge: "bg-teal-electric/10 text-teal-electric border-teal-electric/20",
    },
    gold: {
      border: "hover:border-gold-amber/50",
      glow: "group-hover:shadow-glow-gold",
      iconBg: "bg-gold-amber/10 text-gold-amber border-gold-amber/25",
      badge: "bg-gold-amber/10 text-gold-amber border-gold-amber/20",
    },
    emerald: {
      border: "hover:border-emerald-bright/50",
      glow: "group-hover:shadow-glow-emerald",
      iconBg: "bg-emerald-bright/10 text-emerald-bright border-emerald-bright/25",
      badge: "bg-emerald-bright/10 text-emerald-bright border-emerald-bright/20",
    },
    coral: {
      border: "hover:border-coral-warm/50",
      glow: "group-hover:shadow-glow-coral",
      iconBg: "bg-coral-warm/10 text-coral-warm border-coral-warm/25",
      badge: "bg-coral-warm/10 text-coral-warm border-coral-warm/20",
    }
  };

  const currentTheme = colorStyles[accentColor] || colorStyles.teal;

  return (
    <div className={`group relative p-5 sm:p-6 rounded-2xl bg-arena-card/80 border border-arena-border transition-all duration-300 ${currentTheme.border} ${currentTheme.glow} shadow-card-glass`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl border ${currentTheme.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {badgeText && (
          <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${currentTheme.badge}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-light-text tracking-tight flex items-baseline gap-1.5">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-light-subtle mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'teal',
  size = 'md',
  showLabel = false,
  label = '',
  valueText = '',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const heights = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantColors = {
    teal: 'bg-gradient-to-r from-teal-electric to-emerald-bright shadow-glow-teal',
    gold: 'bg-gradient-to-r from-gold-amber to-amber-500 shadow-glow-gold',
    emerald: 'bg-gradient-to-r from-emerald-rpg to-emerald-deep shadow-glow-emerald',
    coral: 'bg-gradient-to-r from-coral-warm to-orange-500 shadow-glow-coral',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label || valueText) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          {label && <span className="text-light-muted">{label}</span>}
          <span className="text-light-text font-mono font-semibold">
            {valueText || `${Math.round(value)} / ${max}`}
          </span>
        </div>
      )}
      
      <div className={`w-full bg-arena-bg/90 rounded-full overflow-hidden border border-arena-border p-0.5 ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden ${variantColors[variant]}`}
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle light shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
};

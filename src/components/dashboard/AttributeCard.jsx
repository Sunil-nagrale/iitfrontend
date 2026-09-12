import React from 'react';
import { Brain, Dumbbell, HeartPulse, Target } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const AttributeCard = ({
  attribute,
  value = 0,
  max = 50,
  description
}) => {
  const meta = {
    intelligence: {
      name: "Intelligence",
      icon: Brain,
      color: "teal",
      tag: "Logic & Knowledge",
      accent: "text-teal-electric",
      bg: "bg-teal-electric/10 border-teal-electric/25",
      bar: "teal"
    },
    strength: {
      name: "Strength",
      icon: Dumbbell,
      color: "coral",
      tag: "Physical Mastery",
      accent: "text-coral-warm",
      bg: "bg-coral-warm/10 border-coral-warm/25",
      bar: "coral"
    },
    vitality: {
      name: "Vitality",
      icon: HeartPulse,
      color: "emerald",
      tag: "Health & Stamina",
      accent: "text-emerald-bright",
      bg: "bg-emerald-bright/10 border-emerald-bright/25",
      bar: "emerald"
    },
    focus: {
      name: "Focus",
      icon: Target,
      color: "gold",
      tag: "Mental Stillness",
      accent: "text-gold-amber",
      bg: "bg-gold-amber/10 border-gold-amber/25",
      bar: "gold"
    }
  };

  const current = meta[attribute.toLowerCase()] || meta.focus;
  const IconComponent = current.icon;

  // Derive rank title based on attribute score
  const getRank = (val) => {
    if (val >= 40) return "Master";
    if (val >= 25) return "Expert";
    if (val >= 10) return "Adept";
    if (val > 0) return "Apprentice";
    return "Untrained";
  };

  return (
    <div className="p-5 rounded-2xl bg-arena-card/70 border border-arena-border hover:border-arena-borderLight transition-all duration-300 shadow-card-glass flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl border ${current.bg} group-hover:scale-110 transition-transform`}>
            <IconComponent className={`w-5 h-5 ${current.accent}`} />
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-arena-bg border border-arena-border text-light-subtle">
            {getRank(value)}
          </span>
        </div>

        <h4 className="text-base font-display font-bold text-light-text mb-0.5">
          {current.name}
        </h4>
        <p className="text-xs text-light-subtle mb-3">
          {description || current.tag}
        </p>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-mono text-light-muted">Rating</span>
          <span className="text-xl font-mono font-extrabold text-light-text">
            {value} <span className="text-xs font-normal text-light-subtle">PTS</span>
          </span>
        </div>

        <ProgressBar
          value={value}
          max={max}
          variant={current.bar}
          size="xs"
        />
      </div>
    </div>
  );
};

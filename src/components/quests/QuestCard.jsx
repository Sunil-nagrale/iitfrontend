import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2, 
  Zap, 
  Coins, 
  Brain, 
  Dumbbell, 
  HeartPulse, 
  Target,
  Sparkles,
  BookOpen,
  Code2,
  Heart,
  Smile,
  HelpCircle
} from 'lucide-react';
import { Button } from '../common/Button';

export const QuestCard = ({
  quest,
  onComplete,
  onEdit,
  onDelete,
  isCompact = false
}) => {
  const isCompleted = quest.status === 'completed';

  // Category visual mapping
  const categoryConfig = {
    Coding: { icon: Code2, color: "text-teal-electric bg-teal-electric/10 border-teal-electric/25" },
    Fitness: { icon: Dumbbell, color: "text-coral-warm bg-coral-warm/10 border-coral-warm/25" },
    Reading: { icon: BookOpen, color: "text-emerald-bright bg-emerald-bright/10 border-emerald-bright/25" },
    Learning: { icon: Brain, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/25" },
    Health: { icon: Heart, color: "text-rose-400 bg-rose-400/10 border-rose-400/25" },
    Mind: { icon: Target, color: "text-gold-amber bg-gold-amber/10 border-gold-amber/25" },
    Personal: { icon: Smile, color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25" },
    Other: { icon: HelpCircle, color: "text-gray-400 bg-gray-400/10 border-gray-400/25" }
  };

  const diffColors = {
    Easy: "text-emerald-bright border-emerald-bright/30 bg-emerald-bright/10",
    Medium: "text-gold-amber border-gold-amber/30 bg-gold-amber/10",
    Hard: "text-coral-warm border-coral-warm/30 bg-coral-warm/10"
  };

  const attrIcons = {
    Intelligence: Brain,
    Strength: Dumbbell,
    Vitality: HeartPulse,
    Focus: Target
  };

  const category = categoryConfig[quest.category] || categoryConfig.Other;
  const CategoryIcon = category.icon;
  const AttrIcon = attrIcons[quest.rewards?.attribute] || Sparkles;

  return (
    <div
      className={`group relative rounded-2xl bg-arena-card/85 border transition-all duration-300 p-5 sm:p-6 shadow-card-glass ${
        isCompleted
          ? 'border-emerald-deep/40 opacity-75 bg-arena-surface/60'
          : 'border-arena-border hover:border-teal-electric/40 hover:shadow-glow-teal/10'
      }`}
    >
      {/* Top row: Badges, Difficulty, and Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Pill */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${category.color}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{quest.category}</span>
          </span>

          {/* Difficulty Pill */}
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase border ${diffColors[quest.difficulty] || diffColors.Medium}`}>
            {quest.difficulty}
          </span>

          {/* Time Estimate */}
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-light-subtle bg-arena-bg/80 px-2 py-0.5 rounded border border-arena-border">
            <Clock className="w-3 h-3" />
            {quest.estimatedTime}
          </span>
        </div>

        {/* Status Indicator */}
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-emerald-bright bg-emerald-bright/10 border border-emerald-bright/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        ) : (
          <span className="text-[11px] font-mono font-medium text-teal-electric/80 bg-teal-electric/5 px-2 py-0.5 rounded border border-teal-electric/15">
            Active Quest
          </span>
        )}
      </div>

      {/* Quest Title & Description */}
      <div className="mb-4">
        <h4 className={`text-lg font-display font-bold mb-1.5 transition-colors ${
          isCompleted ? 'text-light-muted line-through' : 'text-light-text group-hover:text-teal-electric'
        }`}>
          {quest.title}
        </h4>
        <p className="text-xs sm:text-sm text-light-muted leading-relaxed line-clamp-2">
          {quest.description || "No specific instructions specified. Conquer with discipline."}
        </p>
      </div>

      {/* Rewards Pill Row */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-arena-bg/60 border border-arena-border/80 mb-5 text-xs font-mono">
        <span className="text-[10px] uppercase font-bold text-light-subtle tracking-wider mr-1">
          Rewards:
        </span>

        {/* XP */}
        <span className="inline-flex items-center gap-1 text-teal-electric font-bold bg-teal-electric/10 px-2 py-0.5 rounded border border-teal-electric/20">
          <Zap className="w-3 h-3" />
          +{quest.rewards?.xp} XP
        </span>

        {/* Coins */}
        <span className="inline-flex items-center gap-1 text-gold-amber font-bold bg-gold-amber/10 px-2 py-0.5 rounded border border-gold-amber/20">
          <Coins className="w-3 h-3" />
          +{quest.rewards?.coins} Coins
        </span>

        {/* Attribute */}
        {quest.rewards?.attribute && (
          <span className="inline-flex items-center gap-1 text-emerald-bright font-bold bg-emerald-bright/10 px-2 py-0.5 rounded border border-emerald-bright/20">
            <AttrIcon className="w-3 h-3" />
            +{quest.rewards?.attributeAmount} {quest.rewards?.attribute}
          </span>
        )}
      </div>

      {/* Actions Row */}
      <div className="flex items-center justify-between pt-2 border-t border-arena-border/60">
        <div className="flex items-center gap-1.5">
          {onEdit && !isCompleted && (
            <button
              onClick={() => onEdit(quest)}
              className="p-2 rounded-lg text-light-muted hover:text-white hover:bg-arena-hover transition-colors"
              title="Edit Quest"
              aria-label="Edit Quest"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(quest.id)}
              className="p-2 rounded-lg text-light-subtle hover:text-coral-warm hover:bg-coral-warm/10 transition-colors"
              title="Delete Quest"
              aria-label="Delete Quest"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div>
          {isCompleted ? (
            <span className="text-xs font-mono text-emerald-bright/80 italic">
              Conquered ✓
            </span>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              onClick={() => onComplete(quest.id)}
              className="shadow-glow-teal"
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

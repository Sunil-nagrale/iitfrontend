import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Zap, Coins, Sparkles, Brain, Dumbbell, HeartPulse, Target } from 'lucide-react';

const CATEGORIES = [
  "Coding",
  "Fitness",
  "Reading",
  "Learning",
  "Health",
  "Mind",
  "Personal",
  "Other"
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const ESTIMATED_TIMES = [
  "10 min",
  "20 min",
  "30 min",
  "45 min",
  "1 hour",
  "2+ hours"
];

const ATTRIBUTES = [
  { name: "Intelligence", icon: Brain, desc: "Coding, logic, studying" },
  { name: "Strength", icon: Dumbbell, desc: "Workouts, athletics, endurance" },
  { name: "Vitality", icon: HeartPulse, desc: "Sleep, nutrition, hydration" },
  { name: "Focus", icon: Target, desc: "Meditation, deep concentration" }
];

export const QuestModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null
}) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Coding',
    difficulty: 'Medium',
    estimatedTime: '30 min',
    xp: 40,
    coins: 20,
    attribute: 'Intelligence',
    attributeAmount: 5
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Coding',
        difficulty: initialData.difficulty || 'Medium',
        estimatedTime: initialData.estimatedTime || '30 min',
        xp: initialData.rewards?.xp ?? 40,
        coins: initialData.rewards?.coins ?? 20,
        attribute: initialData.rewards?.attribute || 'Intelligence',
        attributeAmount: initialData.rewards?.attributeAmount ?? 5
      });
    } else {
      // Default new quest
      setFormData({
        title: '',
        description: '',
        category: 'Coding',
        difficulty: 'Medium',
        estimatedTime: '30 min',
        xp: 40,
        coins: 20,
        attribute: 'Intelligence',
        attributeAmount: 5
      });
    }
  }, [initialData, isOpen]);

  // Adjust default rewards dynamically when difficulty changes
  const handleDifficultyChange = (diff) => {
    let xp = 30;
    let coins = 10;
    let attrAmount = 3;
    if (diff === 'Medium') {
      xp = 50;
      coins = 20;
      attrAmount = 5;
    } else if (diff === 'Hard') {
      xp = 80;
      coins = 35;
      attrAmount = 8;
    }

    setFormData(prev => ({
      ...prev,
      difficulty: diff,
      xp,
      coins,
      attributeAmount: attrAmount
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      difficulty: formData.difficulty,
      estimatedTime: formData.estimatedTime,
      rewards: {
        xp: Number(formData.xp),
        coins: Number(formData.coins),
        attribute: formData.attribute,
        attributeAmount: Number(formData.attributeAmount)
      }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Quest" : "Create New Quest"}
      subtitle={isEditing ? "Refine quest parameters and bounty" : "Forge a new task to conquer in the real world"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
            Quest Title <span className="text-coral-warm">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Solve 3 DSA Problems or Workout for 45 Minutes"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full glass-input rounded-xl px-4 py-3 text-sm focus:border-teal-electric text-light-text font-medium"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
            Description / Clear Victory Condition
          </label>
          <textarea
            rows="2"
            placeholder="What exact benchmark must you achieve to claim this bounty?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full glass-input rounded-xl px-4 py-2.5 text-sm focus:border-teal-electric text-light-text"
          />
        </div>

        {/* Category & Estimated Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-light-text bg-arena-card cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-arena-card text-light-text">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1.5">
              Estimated Time
            </label>
            <select
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-light-text bg-arena-card cursor-pointer"
            >
              {ESTIMATED_TIMES.map((time) => (
                <option key={time} value={time} className="bg-arena-card text-light-text">
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-2">
            Difficulty Tier
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DIFFICULTIES.map((diff) => {
              const isSelected = formData.difficulty === diff;
              let borderActive = isSelected ? "border-teal-electric bg-teal-electric/15 text-teal-electric shadow-glow-teal/20" : "border-arena-border text-light-muted bg-arena-bg/70 hover:border-light-subtle";
              if (isSelected && diff === "Medium") borderActive = "border-gold-amber bg-gold-amber/15 text-gold-amber shadow-glow-gold/20";
              if (isSelected && diff === "Hard") borderActive = "border-coral-warm bg-coral-warm/15 text-coral-warm shadow-glow-coral/20";

              return (
                <button
                  type="button"
                  key={diff}
                  onClick={() => handleDifficultyChange(diff)}
                  className={`py-2 px-3 rounded-xl border text-center font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 ${borderActive}`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rewards Configuration */}
        <div className="p-4 rounded-xl bg-arena-bg/80 border border-arena-border space-y-4">
          <div className="flex items-center justify-between border-b border-arena-border/70 pb-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-light-text flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-electric" />
              Configure Quest Rewards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Attribute Target */}
            <div>
              <label className="block text-[11px] font-mono text-light-muted mb-1">
                Attribute Trained
              </label>
              <select
                value={formData.attribute}
                onChange={(e) => setFormData({ ...formData, attribute: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs bg-arena-card text-light-text cursor-pointer"
              >
                {ATTRIBUTES.map((attr) => (
                  <option key={attr.name} value={attr.name} className="bg-arena-card">
                    {attr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Attribute Points */}
            <div>
              <label className="block text-[11px] font-mono text-light-muted mb-1">
                Attribute Points (+{formData.attributeAmount})
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.attributeAmount}
                onChange={(e) => setFormData({ ...formData, attributeAmount: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-light-text font-mono"
              />
            </div>

            {/* XP */}
            <div>
              <label className="block text-[11px] font-mono text-light-muted mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-teal-electric" /> XP Bounty
              </label>
              <input
                type="number"
                min="5"
                max="500"
                step="5"
                value={formData.xp}
                onChange={(e) => setFormData({ ...formData, xp: Math.max(5, parseInt(e.target.value) || 5) })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-light-text font-mono"
              />
            </div>

            {/* Coins */}
            <div>
              <label className="block text-[11px] font-mono text-light-muted mb-1 flex items-center gap-1">
                <Coins className="w-3 h-3 text-gold-amber" /> Coin Bounty
              </label>
              <input
                type="number"
                min="0"
                max="250"
                step="5"
                value={formData.coins}
                onChange={(e) => setFormData({ ...formData, coins: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-light-text font-mono"
              />
            </div>
          </div>

          {/* Live Preview Rewards Box */}
          <div className="mt-3 p-3 rounded-lg bg-arena-card border border-teal-electric/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-electric font-bold">
                Preview Rewards
              </span>
              <span className="text-[10px] font-mono text-light-muted">On completion</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-electric/15 text-teal-electric border border-teal-electric/30">
                <Zap className="w-3 h-3" />
                +{formData.xp} XP
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gold-amber/15 text-gold-amber border border-gold-amber/30">
                <Coins className="w-3 h-3" />
                +{formData.coins} Coins
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-bright/15 text-emerald-bright border border-emerald-bright/30">
                <Sparkles className="w-3 h-3" />
                +{formData.attributeAmount} {formData.attribute}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
          >
            {isEditing ? "Save Changes" : "Create Quest"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

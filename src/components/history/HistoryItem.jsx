import React from 'react';
import { CheckCircle2, ShoppingBag, Zap, Coins, Sparkles, Clock } from 'lucide-react';

export const HistoryItem = ({ item }) => {
  const isQuest = item.type === 'quest_completed';

  // Format time (e.g. 10:24 AM)
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-arena-card/70 border border-arena-border hover:border-teal-electric/30 transition-all">
      {/* Icon */}
      <div className={`p-2 rounded-xl shrink-0 ${
        isQuest 
          ? 'bg-teal-electric/10 text-teal-electric border border-teal-electric/25' 
          : 'bg-gold-amber/10 text-gold-amber border border-gold-amber/25'
      }`}>
        {isQuest ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-sm font-semibold text-light-text truncate">
            {isQuest ? `Completed: ${item.title}` : item.title}
          </h5>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-light-subtle shrink-0">
            <Clock className="w-3 h-3" />
            {formatTime(item.timestamp)}
          </span>
        </div>

        {/* Rewards / Transaction pills */}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono">
          {isQuest ? (
            <>
              <span className="inline-flex items-center gap-1 text-teal-electric font-semibold bg-teal-electric/10 px-2 py-0.5 rounded border border-teal-electric/20">
                <Zap className="w-3 h-3" />
                +{item.xpEarned} XP
              </span>
              <span className="inline-flex items-center gap-1 text-gold-amber font-semibold bg-gold-amber/10 px-2 py-0.5 rounded border border-gold-amber/20">
                <Coins className="w-3 h-3" />
                +{item.coinsEarned} Coins
              </span>
              {item.attributeEarned && (
                <span className="inline-flex items-center gap-1 text-emerald-bright font-semibold bg-emerald-bright/10 px-2 py-0.5 rounded border border-emerald-bright/20">
                  <Sparkles className="w-3 h-3" />
                  +{item.attributeAmount} {item.attributeEarned}
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-1 text-coral-warm font-semibold bg-coral-warm/10 px-2 py-0.5 rounded border border-coral-warm/20">
              <Coins className="w-3 h-3" />
              -{item.coinsSpent} Coins
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Check, 
  Coins, 
  Sparkles, 
  ShieldAlert, 
  Cpu, 
  Wand2, 
  Swords, 
  Crown, 
  Medal, 
  Target, 
  Zap, 
  Sword, 
  Hourglass, 
  Flame 
} from 'lucide-react';
import { Button } from '../common/Button';

export const ShopCard = ({
  item,
  isOwned = false,
  canAfford = true,
  onBuy
}) => {
  const iconMap = {
    ShieldAlert,
    Cpu,
    Sparkles,
    Wand2,
    Swords,
    Crown,
    Medal,
    Target,
    Zap,
    Sword,
    Hourglass,
    Flame
  };

  const IconComponent = iconMap[item.icon] || Sparkles;

  const rarityColors = {
    Common: "text-gray-300 border-gray-500/30 bg-gray-500/10",
    Rare: "text-teal-electric border-teal-electric/40 bg-teal-electric/10",
    Epic: "text-purple-400 border-purple-400/40 bg-purple-400/10",
    Legendary: "text-gold-amber border-gold-amber/40 bg-gold-amber/10 shadow-glow-gold/20"
  };

  return (
    <div className={`group rounded-2xl bg-arena-card/80 border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-card-glass ${
      isOwned 
        ? 'border-emerald-bright/40 bg-arena-surface/80' 
        : 'border-arena-border hover:border-teal-electric/40 hover:shadow-glow-teal/10'
    }`}>
      <div>
        {/* Visual Showcase Banner */}
        <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-arena-bg to-arena-surface border border-arena-border flex items-center justify-center mb-4 group-hover:border-teal-electric/30 transition-colors">
          {item.avatarUrl ? (
            <img 
              src={item.avatarUrl} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${item.previewColor || 'from-teal-electric/20 to-arena-card'}`}>
              <IconComponent className="w-12 h-12 text-light-text/90 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
            </div>
          )}

          {/* Rarity Badge Overlay */}
          <div className="absolute top-2.5 right-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${rarityColors[item.rarity] || rarityColors.Common}`}>
              {item.rarity}
            </span>
          </div>

          {/* Category Tag Overlay */}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-light-muted bg-arena-bg/80 border border-arena-border">
              {item.category}
            </span>
          </div>
        </div>

        {/* Item Info */}
        <h4 className="text-base font-display font-bold text-light-text group-hover:text-teal-electric transition-colors mb-1.5">
          {item.name}
        </h4>
        <p className="text-xs text-light-muted leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Bottom: Price & Buy Action */}
      <div className="pt-3 border-t border-arena-border/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-mono">
          <Coins className="w-4 h-4 text-gold-amber fill-gold-amber" />
          <span className="text-sm font-bold text-gold-amber">
            {item.price}
          </span>
          <span className="text-[11px] text-light-subtle">Coins</span>
        </div>

        <div>
          {isOwned ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-bright/15 border border-emerald-bright/40 text-emerald-bright text-xs font-mono font-bold">
              <Check className="w-3.5 h-3.5" />
              Owned
            </span>
          ) : (
            <Button
              variant={canAfford ? "gold" : "secondary"}
              size="sm"
              onClick={() => onBuy(item)}
              className={canAfford ? "shadow-glow-gold text-arena-bg" : "opacity-80"}
            >
              Buy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

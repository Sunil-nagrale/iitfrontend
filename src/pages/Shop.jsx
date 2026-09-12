import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShopCard } from '../components/shop/ShopCard';

export const Shop = () => {
  const { user, shopItems, buyItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ["All", "Themes", "Avatars", "Badges", "Items"];

  // const filteredItems = shopItems.filter(item => {
  //   if (selectedCategory === 'All') return true;
  //   return item.category === selectedCategory;
  // });

  const filteredItems = shopItems.filter(item => {
  if (selectedCategory === 'All') return true;
  return !item.category || item.category === selectedCategory;
});

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner with Prominent Coin Balance */}
      <div className="relative rounded-3xl bg-gradient-to-r from-arena-card via-arena-surface to-arena-card border border-gold-amber/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-amber/10 border border-gold-amber/25 text-gold-amber text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arena Relic Vault</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-light-text">
            Item Shop
          </h1>
          <p className="text-xs sm:text-sm text-light-muted max-w-md">
            Spend your coins. Customize your journey.
          </p>
        </div>

        {/* Prominent Coin Balance Display */}
        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-arena-bg/90 border border-gold-amber/40 shadow-glow-gold/20 shrink-0">
          <div className="p-2.5 rounded-xl bg-gold-amber/15 text-gold-amber">
            <Coins className="w-6 h-6 fill-gold-amber" />
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-light-subtle">
              Your Coin Balance
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-gold-amber flex items-baseline gap-1">
              <span>{user.coins}</span>
              <span className="text-xs font-semibold text-light-muted font-sans">Coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-200 shrink-0 ${
              selectedCategory === cat
                ? 'bg-teal-electric text-arena-bg font-bold shadow-glow-teal/20'
                : 'bg-arena-card/80 text-light-muted hover:text-light-text border border-arena-border hover:border-teal-electric/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
         // const isOwned = user.inventory?.includes(item.id);
         const isOwned = user.inventory?.some(
  ownedItem =>
    ownedItem.itemId === item.itemId ||
    ownedItem.itemId === item.id
);
          const canAfford = user.coins >= item.price;

          return (
            <ShopCard
             // key={item.id}
             key={item.itemId || item.id}
              item={item}
              isOwned={isOwned}
              canAfford={canAfford}
              onBuy={buyItem}
              //onBuy={() => buyItem(item.itemId || item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

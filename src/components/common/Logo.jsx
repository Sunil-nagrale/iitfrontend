import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ className = "", size = "md", to = "/" }) => {
  const sizeClasses = {
    sm: "h-7 text-lg",
    md: "h-9 text-xl",
    lg: "h-12 text-2xl",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const content = (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Custom RPG Arena Shield Crest */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-teal-electric/20 blur-md rounded-lg group-hover:bg-teal-electric/40 transition-all"></div>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Hex Shield Frame */}
          <polygon
            points="16,2 29,8.5 29,23.5 16,30 3,23.5 3,8.5"
            className="fill-arena-card stroke-teal-electric"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Arena Rune Core */}
          <polygon
            points="16,7 24,11.5 24,20.5 16,25 8,20.5 8,11.5"
            className="fill-teal-electric/15 stroke-emerald-bright"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Center Crossed Swords / Arena Diamond */}
          <path
            d="M11 11L21 21M21 11L11 21"
            className="stroke-gold-amber"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2.5" className="fill-gold-amber" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5 font-display font-black tracking-wider">
          <span className="text-light-text tracking-widest text-shadow">LIFE</span>
          <span className="text-teal-electric group-hover:text-emerald-bright transition-colors">ARENA</span>
        </div>
        <span className="text-[9px] tracking-[0.25em] text-teal-electric/70 uppercase font-mono font-semibold">
          Level Up Real Life
        </span>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>;
  }

  return content;
};

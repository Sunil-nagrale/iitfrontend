import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-arena-bg disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 tracking-wide",
    md: "text-sm px-4 py-2.5 gap-2 font-semibold",
    lg: "text-base px-6 py-3.5 gap-2.5 font-bold tracking-wide",
    xl: "text-lg px-8 py-4 gap-3 font-extrabold tracking-wider"
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-teal-electric to-emerald-deep text-arena-bg hover:from-teal-glow hover:to-emerald-rpg shadow-glow-teal hover:shadow-glow-teal-lg focus:ring-teal-electric font-bold",
    emerald: "bg-gradient-to-r from-emerald-bright to-emerald-deep text-arena-bg hover:brightness-110 shadow-glow-emerald focus:ring-emerald-bright font-bold",
    gold: "bg-gradient-to-r from-gold-amber to-amber-600 text-arena-bg hover:brightness-110 shadow-glow-gold focus:ring-gold-amber font-bold",
    coral: "bg-gradient-to-r from-coral-warm to-coral-dark text-white hover:brightness-110 shadow-glow-coral focus:ring-coral-warm font-bold",
    secondary: "bg-arena-card/80 hover:bg-arena-hover text-light-text border border-arena-borderLight hover:border-teal-electric/60 hover:text-white shadow-sm focus:ring-teal-electric/50",
    outline: "bg-transparent hover:bg-teal-electric/10 text-teal-electric border border-teal-electric/40 hover:border-teal-electric focus:ring-teal-electric",
    ghost: "bg-transparent hover:bg-white/5 text-light-muted hover:text-light-text focus:ring-gray-600",
    danger: "bg-coral-warm/20 hover:bg-coral-warm/30 text-coral-warm border border-coral-warm/40 focus:ring-coral-warm"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

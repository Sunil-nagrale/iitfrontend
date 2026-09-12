import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map((toast) => {
        let borderGlow = "border-teal-electric/40 shadow-glow-teal";
        let IconComponent = Info;
        let iconColor = "text-teal-electric";

        if (toast.type === "success") {
          borderGlow = "border-emerald-bright/50 shadow-glow-emerald";
          IconComponent = CheckCircle2;
          iconColor = "text-emerald-bright";
        } else if (toast.type === "achievement") {
          borderGlow = "border-gold-amber/60 shadow-glow-gold";
          IconComponent = Trophy;
          iconColor = "text-gold-amber";
        } else if (toast.type === "warning") {
          borderGlow = "border-gold-amber/40";
          IconComponent = AlertCircle;
          iconColor = "text-gold-amber";
        } else if (toast.type === "error") {
          borderGlow = "border-coral-warm/50 shadow-glow-coral";
          IconComponent = AlertCircle;
          iconColor = "text-coral-warm";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-arena-card/95 backdrop-blur-xl border ${borderGlow} text-light-text shadow-2xl transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5`}
          >
            <div className={`p-1.5 rounded-lg bg-arena-bg shrink-0 ${iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              {toast.title && (
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-light-muted mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm font-medium leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-light-subtle hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

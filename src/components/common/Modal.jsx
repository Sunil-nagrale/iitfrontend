import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${maxWidth} bg-arena-card border border-teal-electric/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden transform transition-all duration-300 z-10 my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle glowing accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-electric via-emerald-bright to-gold-amber" />

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-arena-border">
          <div>
            <h3 className="text-xl font-display font-bold text-light-text flex items-center gap-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-light-muted mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {showClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-light-muted hover:text-white hover:bg-arena-hover transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

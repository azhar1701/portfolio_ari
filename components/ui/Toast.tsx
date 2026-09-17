import React, { useEffect, useState } from 'react';
import type { ToastItem } from '../../contexts/ToastContext';

interface ToastProps {
  item: ToastItem;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ item, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!item.duration || item.duration <= 0) return;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDismiss, 200);
    }, item.duration);

    return () => clearTimeout(timer);
  }, [item.duration, onDismiss]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onDismiss, 200);
  };

  const getThemeConfig = () => {
    switch (item.type) {
      case 'success':
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-950/80',
          iconColor: 'text-emerald-400',
          icon: 'fas fa-check-circle',
          barColor: 'bg-emerald-500',
        };
      case 'error':
        return {
          border: 'border-rose-500/40',
          bg: 'bg-rose-950/80',
          iconColor: 'text-rose-400',
          icon: 'fas fa-circle-exclamation',
          barColor: 'bg-rose-500',
        };
      case 'warning':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-amber-950/80',
          iconColor: 'text-amber-400',
          icon: 'fas fa-triangle-exclamation',
          barColor: 'bg-amber-500',
        };
      case 'info':
      default:
        return {
          border: 'border-sky-500/40',
          bg: 'bg-slate-900/90',
          iconColor: 'text-sky-400',
          icon: 'fas fa-circle-info',
          barColor: 'bg-sky-500',
        };
    }
  };

  const config = getThemeConfig();

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl text-slate-100 transition-all duration-200 ${
        config.bg
      } ${config.border} ${
        isExiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
      }`}
      role="alert"
    >
      <div className={`text-lg mt-0.5 shrink-0 ${config.iconColor}`}>
        <i className={config.icon}></i>
      </div>
      <div className="flex-1 text-sm font-medium leading-snug break-words">
        {item.message}
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="text-slate-400 hover:text-slate-200 transition-colors p-1 -mr-1 -mt-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
        aria-label="Dismiss notification"
      >
        <i className="fas fa-xmark text-sm"></i>
      </button>
    </div>
  );
};

export default Toast;

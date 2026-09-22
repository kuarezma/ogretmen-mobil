import React from 'react';
import { CheckCircle2, AlertCircle, Copy } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-900 shadow-xl backdrop-blur-md border border-white/10 dark:border-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-top-4 active-scale"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'info' && <Copy className="w-5 h-5 text-sky-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span className="text-xs font-semibold leading-snug">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};

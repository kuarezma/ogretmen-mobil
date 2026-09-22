import React from 'react';
import { Home, BookOpen, CalendarDays, FileText, Settings } from 'lucide-react';

export type ActiveTab = 'home' | 'notebook' | 'plans' | 'documents' | 'settings';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems = [
    { id: 'home' as ActiveTab, label: 'Ana Sayfa', icon: Home },
    { id: 'notebook' as ActiveTab, label: 'Deftere Yaz', icon: BookOpen, badge: 'Hızlı' },
    { id: 'plans' as ActiveTab, label: 'Planlar', icon: CalendarDays },
    { id: 'documents' as ActiveTab, label: 'Evraklar', icon: FileText },
    { id: 'settings' as ActiveTab, label: 'Ayarlar', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 shadow-mobile-nav transition-colors no-print">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 active-scale ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {/* Aktif Arka Plan Parıltısı */}
              {isActive && (
                <span className="absolute -top-1.5 w-8 h-1 rounded-full bg-brand-600 dark:bg-brand-400 shadow-sm shadow-brand-500/50" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'scale-100'}`} />
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] font-bold bg-amber-500 text-white rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

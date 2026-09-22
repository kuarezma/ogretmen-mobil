import React from 'react';
import { Sparkles, Calendar, Moon, Sun } from 'lucide-react';
import { TeacherProfile } from '../services/storage';
import { AcademicWeek } from '../data/academicCalendar';

interface NavbarProps {
  currentWeek: AcademicWeek;
  profile: TeacherProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWeek,
  profile,
  darkMode,
  onToggleDarkMode,
  onOpenSettings
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors pt-safe">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Sol: Logo ve Uygulama Adı */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 active-scale">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
              Öğretmen Asistanı
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                Mobil
              </span>
            </h1>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-none mt-0.5">
              {profile.schoolName}
            </p>
          </div>
        </div>

        {/* Sağ: Aktif Hafta Rozeti & Ayarlar/Kullanıcı */}
        <div className="flex items-center gap-2">
          {/* Aktif Hafta Hapı */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{currentWeek.weekNumber}. Hafta</span>
          </div>

          {/* Dark Mode Butonu */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Karanlık mod değiştir"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active-scale"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Profil Seçici Butonu */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition active-scale border border-slate-200/60 dark:border-slate-700"
          >
            <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold">
              {profile.name.charAt(0)}
            </div>
            <span className="hidden sm:inline max-w-[100px] truncate">{profile.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

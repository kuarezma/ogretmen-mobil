import React, { useState } from 'react';
import { Calendar, Clock, Copy, Check, BookOpen, FileText, Award, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AcademicWeek } from '../../data/academicCalendar';
import { TeacherProfile, TimetableSlot } from '../../services/storage';
import { getCurriculumItem } from '../../data/curriculumData';
import { ActiveTab } from '../BottomNav';

interface HomeViewProps {
  currentWeekInfo: {
    week: AcademicWeek;
    dayName: string;
    formattedDate: string;
    isWeekend: boolean;
    schoolDayNumber: number;
  };
  profile: TeacherProfile;
  timetable: TimetableSlot[];
  onNavigateTab: (tab: ActiveTab) => void;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentWeekInfo,
  profile,
  timetable,
  onNavigateTab,
  showToast
}) => {
  const [copiedSlotId, setCopiedSlotId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(currentWeekInfo.schoolDayNumber);

  const days = [
    { num: 1, name: 'Pazartesi' },
    { num: 2, name: 'Salı' },
    { num: 3, name: 'Çarşamba' },
    { num: 4, name: 'Perşembe' },
    { num: 5, name: 'Cuma' }
  ];

  // Seçili güne ait dersler
  const todayLessons = timetable
    .filter(t => t.dayIndex === selectedDay)
    .sort((a, b) => a.period - b.period);

  const handleCopyNotebook = (slot: TimetableSlot) => {
    const curriculum = getCurriculumItem(slot.grade, slot.subjectKey, currentWeekInfo.week.weekNumber);
    const slotKey = `${slot.dayIndex}_${slot.period}`;

    let copyText = '';
    if (curriculum) {
      copyText = `${slot.className} - ${slot.subject}: ${curriculum.notebookSnippet}`;
    } else {
      copyText = `${slot.className} - ${slot.subject}: ${currentWeekInfo.week.weekNumber}. Hafta müfredat kazanımları işlendi ve pekiştirildi.`;
    }

    navigator.clipboard.writeText(copyText);
    setCopiedSlotId(slotKey);
    showToast(`"${slot.className}" sınıf defteri metni kopyalandı!`, 'success');

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => {
      setCopiedSlotId(null);
    }, 2500);
  };

  return (
    <div className="space-y-5 pb-20 pt-2 animate-in fade-in duration-300">
      {/* Üst Kart: Güncel MEB Takvimi ve Karşılama */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1F4E79] via-brand-700 to-sky-600 text-white p-5 shadow-lg shadow-brand-900/10">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase border border-white/20">
              MEB {currentWeekInfo.week.semester}. Dönem
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[11px] font-bold">
              {currentWeekInfo.week.title}
            </span>
          </div>
          <span className="text-xs text-brand-100 font-medium">
            {currentWeekInfo.week.displayRange}
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight">
          Hoş Geldiniz, {profile.name} 👋
        </h2>
        <p className="text-xs text-brand-100 mt-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>{currentWeekInfo.formattedDate}, {currentWeekInfo.dayName}</span>
        </p>

        {currentWeekInfo.week.specialEvents && currentWeekInfo.week.specialEvents.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center gap-2 text-xs text-amber-200 font-medium">
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="truncate">Önemli: {currentWeekInfo.week.specialEvents.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Gün Seçim Şeridi (Pzt - Cuma) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {days.map((d) => {
          const isSelected = selectedDay === d.num;
          const isToday = currentWeekInfo.schoolDayNumber === d.num && !currentWeekInfo.isWeekend;

          return (
            <button
              key={d.num}
              onClick={() => setSelectedDay(d.num)}
              className={`flex-1 min-w-[68px] py-2 px-1 rounded-2xl text-xs font-semibold text-center transition-all duration-200 active-scale ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <div className="text-[10px] opacity-80 uppercase tracking-tighter">
                {isToday ? 'Bugün' : `${d.num}. Gün`}
              </div>
              <div className="text-xs font-bold mt-0.5">{d.name}</div>
            </button>
          );
        })}
      </div>

      {/* Bugünkü Dersler ve Hızlı Sınıf Defteri Kartları */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {days.find(d => d.num === selectedDay)?.name} Ders Programı
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {todayLessons.length} Ders
          </span>
        </div>

        {todayLessons.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Bu gün için ders kaydı bulunmuyor.</p>
            <button
              onClick={() => onNavigateTab('settings')}
              className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Ders Programı Ayarla &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayLessons.map((slot) => {
              const slotKey = `${slot.dayIndex}_${slot.period}`;
              const isCopied = copiedSlotId === slotKey;
              const curriculum = getCurriculumItem(slot.grade, slot.subjectKey, currentWeekInfo.week.weekNumber);

              return (
                <div
                  key={slotKey}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft hover:shadow-md transition-all duration-200 flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800 text-xs font-bold flex items-center justify-center">
                        {slot.period}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white mr-1.5">
                          {slot.className}
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {slot.subject}
                        </span>
                      </div>
                    </div>

                    {curriculum && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {curriculum.code}
                      </span>
                    )}
                  </div>

                  {/* Defter Kazanım Metni Önizleme */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                      {curriculum?.notebookSnippet || `${currentWeekInfo.week.weekNumber}. Hafta ders kazanımları işlendi ve deftere aktarıldı.`}
                    </p>
                  </div>

                  {/* Tek Tıkla Sınıf Defterine Yaz Butonu */}
                  <button
                    onClick={() => handleCopyNotebook(slot)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 active-scale ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Kazanım Defter Formatında Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        <span>Sınıf Defterine Yaz (Kopyala)</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hızlı Kısayol Menüsü */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Hızlı İşlemler</span>
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onNavigateTab('notebook')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft cursor-pointer hover:border-brand-300 dark:hover:border-brand-700 transition active-scale flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Tüm Kazanımlar</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">36 hafta & tüm dersler</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('plans')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft cursor-pointer hover:border-brand-300 dark:hover:border-brand-700 transition active-scale flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Yıllık Plan İndir</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Word (.docx) ve PDF</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('documents')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft cursor-pointer hover:border-brand-300 dark:hover:border-brand-700 transition active-scale flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Zümre & Evraklar</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">15+ Resmi Şablon</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('plans')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft cursor-pointer hover:border-brand-300 dark:hover:border-brand-700 transition active-scale flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">40 Dk Günlük Plan</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Ders Akış Şablonu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Günün Pedagojik Notu */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded-lg bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Türkiye Yüzyılı Maarif Modeli Notu
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-1 leading-relaxed">
              Derslerinizde kavramsal öğrenmeyi desteklemek amacıyla öğrencilere formülleri ezberletmek yerine somut modeller ve günlük hayat senaryoları ile keşfettiriniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

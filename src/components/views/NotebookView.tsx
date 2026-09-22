import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Copy, Check, Sparkles, BookOpen, Calendar, Layers, ChevronLeft, ChevronRight, ArrowLeftRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA, SUBJECT_OPTIONS, CurriculumItem, getCurriculumForWeek } from '../../data/curriculumData';
import { ACADEMIC_WEEKS, AcademicWeek } from '../../data/academicCalendar';
import { TeacherProfile } from '../../services/storage';

interface NotebookViewProps {
  currentWeek: AcademicWeek;
  profile?: TeacherProfile;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  onSelectForDailyPlan?: (item: CurriculumItem) => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  currentWeek,
  showToast,
  onSelectForDailyPlan
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'İlkokul' | 'Ortaokul' | 'Lise'>('Ortaokul');
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>('matematik');
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek.weekNumber);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Swipe & Scroll referansları
  const weekStripRef = useRef<HTMLDivElement>(null);
  const activeWeekBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Seviyeye göre uygun sınıflar
  const gradeOptions = useMemo(() => {
    if (selectedLevel === 'İlkokul') return [1, 2, 3, 4];
    if (selectedLevel === 'Ortaokul') return [5, 6, 7, 8];
    return [9, 10, 11, 12];
  }, [selectedLevel]);

  // Seviyeye göre branşlar
  const subjectOptions = useMemo(() => {
    return SUBJECT_OPTIONS.filter(s => s.level === selectedLevel);
  }, [selectedLevel]);

  // Seviye değiştiğinde varsayılan sınıf ve dersi güncelle
  const handleLevelChange = (lvl: 'İlkokul' | 'Ortaokul' | 'Lise') => {
    setSelectedLevel(lvl);
    if (lvl === 'İlkokul') {
      setSelectedGrade(4);
      setSelectedSubjectKey('ilkokul_matematik');
    } else if (lvl === 'Ortaokul') {
      setSelectedGrade(5);
      setSelectedSubjectKey('matematik');
    } else {
      setSelectedGrade(9);
      setSelectedSubjectKey('lise_matematik');
    }
  };

  // Aktif hafta butonunu yatay şeridin merkezine kaydır
  useEffect(() => {
    if (activeWeekBtnRef.current && weekStripRef.current) {
      activeWeekBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [selectedWeek]);

  // Seçili haftanın akademik takvim objesi
  const currentWeekObj = useMemo(() => {
    return ACADEMIC_WEEKS.find(w => w.weekNumber === selectedWeek) || ACADEMIC_WEEKS[0];
  }, [selectedWeek]);

  // Filtrelenmiş kazanımlar
  const filteredCurriculum = useMemo(() => {
    // Eğer arama sorgusu varsa genel arama yap
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return CURRICULUM_DATA.filter((item) => {
        return (
          item.description.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.unitTitle.toLowerCase().includes(q) ||
          item.notebookSnippet.toLowerCase().includes(q)
        );
      });
    }

    // 36 haftanın tamamında dolu ve zengin MEB kazanımı getir
    return getCurriculumForWeek(selectedGrade, selectedSubjectKey, selectedWeek);
  }, [selectedGrade, selectedSubjectKey, selectedWeek, searchQuery]);

  // Hafta Değiştirme Fonksiyonu
  const changeWeek = (targetWeek: number, direction: 'left' | 'right') => {
    if (targetWeek < 1 || targetWeek > 36) return;
    setSwipeDirection(direction);
    setSelectedWeek(targetWeek);
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setTimeout(() => setSwipeDirection(null), 350);
  };

  const handlePrevWeek = () => {
    if (selectedWeek > 1) {
      changeWeek(selectedWeek - 1, 'right');
    }
  };

  const handleNextWeek = () => {
    if (selectedWeek < 36) {
      changeWeek(selectedWeek + 1, 'left');
    }
  };

  // Dokunmatik Swipe / Sola-Sağa Kaydırma Algılayıcıları
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;

    // Yatay hareket dikey hareketten belirgin derecede büyük ve eşik (40px) aşılmışsa
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Sola kaydırdı -> Sonraki hafta
        handleNextWeek();
      } else {
        // Sağa kaydırdı -> Önceki hafta
        handlePrevWeek();
      }
    }

    // Sıfırla
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
    touchEndY.current = 0;
  };

  const handleCopySnippet = (item: CurriculumItem) => {
    const formattedSnippet = `${item.grade}/... ${item.subject}: ${item.notebookSnippet}`;
    navigator.clipboard.writeText(formattedSnippet);
    setCopiedId(item.id);
    showToast(`"${item.code}" sınıf defteri formatında kopyalandı!`, 'success');

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className="space-y-3.5 pb-24 pt-2 animate-in fade-in duration-300">
      {/* Üst Filtreler & Arama Kutusu */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Sınıf Defteri Kazanım Sihirbazı
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Haftaları kaydırarak anında deftere yaz
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              changeWeek(currentWeek.weekNumber, currentWeek.weekNumber > selectedWeek ? 'left' : 'right');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold active-scale"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ Aktif Hafta</span>
          </button>
        </div>

        {/* Arama Girişi */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kazanım veya konu ara (örn: üslü, çarpan, doğal sayı)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Kademe & Sınıf & Branş Seçiciler */}
        <div className="space-y-2">
          {/* Kademe Seçici Sekmeler */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900">
            {(['İlkokul', 'Ortaokul', 'Lise'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`py-1 text-xs font-bold rounded-xl transition-all ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Sınıf Düğmeleri */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Sınıf:
            </span>
            {gradeOptions.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active-scale ${
                  selectedGrade === g
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {g}. Sınıf
              </button>
            ))}
          </div>

          {/* Branş Düğmeleri */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Ders:
            </span>
            {subjectOptions.map((sub) => (
              <button
                key={sub.key}
                onClick={() => setSelectedSubjectKey(sub.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active-scale ${
                  selectedSubjectKey === sub.key
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 YATAY KAYDIRMALI HAFTA ŞERİDİ (CAROUSEL TRACK) */}
      <div className="bg-white dark:bg-slate-800 p-2.5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Eğitim Haftaları (36 Hafta)
            </span>
          </div>
          <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
            {selectedWeek} / 36. Hafta
          </span>
        </div>

        {/* Kaydırılabilir Hafta Kartları Şeridi */}
        <div
          ref={weekStripRef}
          className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-0.5 no-scrollbar snap-x snap-mandatory"
        >
          {ACADEMIC_WEEKS.map((w) => {
            const isSelected = selectedWeek === w.weekNumber;
            const isAcademicActive = currentWeek.weekNumber === w.weekNumber;

            return (
              <button
                key={w.weekNumber}
                ref={isSelected ? activeWeekBtnRef : null}
                onClick={() => {
                  changeWeek(
                    w.weekNumber,
                    w.weekNumber > selectedWeek ? 'left' : 'right'
                  );
                }}
                className={`snap-center flex flex-col items-center justify-center shrink-0 min-w-[82px] py-2 px-2.5 rounded-2xl transition-all duration-200 active-scale ${
                  isSelected
                    ? 'bg-gradient-to-br from-brand-600 to-sky-500 text-white shadow-md shadow-brand-500/25 scale-[1.03] ring-2 ring-brand-400/40'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/70 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px] font-extrabold leading-none">
                  <span>{w.weekNumber}. Hafta</span>
                  {isAcademicActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300 animate-ping' : 'bg-amber-500'}`} />
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-medium leading-none ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                  {w.displayRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🧭 HAFTA NAVİGASYON BAŞLIĞI VE SWIPE İPUCU */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-3.5 rounded-3xl shadow-md flex items-center justify-between gap-2">
        <button
          onClick={handlePrevWeek}
          disabled={selectedWeek <= 1}
          aria-label="Önceki Hafta"
          className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition active-scale text-xs font-bold text-slate-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Geri</span>
        </button>

        <div className="flex flex-col items-center text-center px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-tight text-white">
              {currentWeekObj.title}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-brand-200">
              {currentWeekObj.semester}. Dönem
            </span>
          </div>

          <span className="text-[11px] text-slate-300 font-medium mt-0.5">
            {currentWeekObj.displayRange}
          </span>

          <div className="flex items-center gap-1 mt-1 text-[10px] text-brand-300 font-medium">
            <ArrowLeftRight className="w-3 h-3 text-brand-300 animate-pulse" />
            <span>Sağa / sola kaydırarak haftayı değiştirin</span>
          </div>
        </div>

        <button
          onClick={handleNextWeek}
          disabled={selectedWeek >= 36}
          aria-label="Sonraki Hafta"
          className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition active-scale text-xs font-bold text-slate-200"
        >
          <span className="hidden xs:inline">İleri</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 📱 DOKUNMATİK SAĞA/SOLA KAYDIRILABİLİR KAZANIM KARTLARI ALANI */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`space-y-3 min-h-[300px] transition-all duration-200 select-none ${
          swipeDirection === 'left'
            ? 'animate-in fade-in slide-in-from-right-8 duration-200'
            : swipeDirection === 'right'
            ? 'animate-in fade-in slide-in-from-left-8 duration-200'
            : ''
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {selectedGrade}. Sınıf Kazanımları ({filteredCurriculum.length})
          </span>
          {currentWeekObj.specialEvents && currentWeekObj.specialEvents.length > 0 && (
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-900/60 truncate max-w-[200px]">
              {currentWeekObj.specialEvents[0]}
            </span>
          )}
        </div>

        {filteredCurriculum.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">
              Bu Hafta İçin Özel Kazanım Bulunamadı
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {selectedWeek}. Hafta için ders programı hazırlığı veya ara tatil/sınav dönemi olabilir.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={handlePrevWeek}
                disabled={selectedWeek <= 1}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold"
              >
                &larr; Önceki Hafta
              </button>
              <button
                onClick={handleNextWeek}
                disabled={selectedWeek >= 36}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold"
              >
                Sonraki Hafta &rarr;
              </button>
            </div>
          </div>
        ) : (
          filteredCurriculum.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3 hover:shadow-md transition-all duration-200"
              >
                {/* Rozetler ve Hafta */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800 text-[11px] font-bold">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                      {item.grade}. Sınıf {item.subject}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-bold shrink-0">
                    {item.weekNumber}. Hafta
                  </span>
                </div>

                {/* Ünite ve Tam Açıklama */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    {item.unitTitle}
                  </h4>
                  <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Sınıf Defterine Yazılacak Metin Kutusu (Vurgulu) */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    <span>Sınıf Defterine Yazılacak Metin</span>
                    <span className="text-slate-400">MEB Formatı</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {item.notebookSnippet}
                  </p>
                </div>

                {/* Kök Değerler / Yöntem Etiketleri */}
                {item.values && item.values.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-slate-400 mr-1">Kök Değerler:</span>
                    {item.values.map((val) => (
                      <span
                        key={val}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-medium"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                )}

                {/* Aksiyon Düğmeleri */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopySnippet(item)}
                    className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 active-scale ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-500/30'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Defter Metni Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Defter Formatında Kopyala</span>
                      </>
                    )}
                  </button>

                  {onSelectForDailyPlan && (
                    <button
                      onClick={() => onSelectForDailyPlan(item)}
                      title="Bu kazanım için 40 dk ders planı oluştur"
                      className="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold active-scale whitespace-nowrap"
                    >
                      Ders Planı
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alt İlerleme Çubuğu (1-36 Hafta İlerlemesi) */}
      <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 shrink-0">
          1. Hafta
        </span>
        <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-600 to-sky-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(selectedWeek / 36) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-slate-400 shrink-0">
          36. Hafta
        </span>
      </div>
    </div>
  );
};

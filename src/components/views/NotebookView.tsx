import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Sparkles, BookOpen, Calendar, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA, SUBJECT_OPTIONS, CurriculumItem } from '../../data/curriculumData';
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

  // Filtrelenmiş kazanımlar
  const filteredCurriculum = useMemo(() => {
    return CURRICULUM_DATA.filter((item) => {
      // Eğer arama sorgusu varsa genel arama yap
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return (
          item.description.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.unitTitle.toLowerCase().includes(q) ||
          item.notebookSnippet.toLowerCase().includes(q)
        );
      }

      // Normal filtreleme: Kademe, sınıf, branş ve hafta
      const matchGrade = item.grade === selectedGrade;
      const matchSubject = item.subjectKey === selectedSubjectKey;
      const matchWeek = selectedWeek === 0 || item.weekNumber === selectedWeek;

      return matchGrade && matchSubject && matchWeek;
    });
  }, [selectedGrade, selectedSubjectKey, selectedWeek, searchQuery]);

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
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-300">
      {/* Üst Başlık & Arama */}
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
                Tek dokunuşla MEB formatında panoya kopyala
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedWeek(currentWeek.weekNumber)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold active-scale"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{currentWeek.weekNumber}. Hafta</span>
          </button>
        </div>

        {/* Arama Girişi */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kazanım kodu veya konu ara (örn: üslü, çarpan, doğal sayı)..."
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

        {/* Kademe Seçici Sekmeler */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900">
          {(['İlkokul', 'Ortaokul', 'Lise'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedLevel === lvl
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Sınıf & Branş & Hafta Seçim Filtreleri */}
        <div className="flex flex-col gap-2.5 pt-1">
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

          {/* Hafta Seçici */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>Hafta:</span>
            </div>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              aria-label="Öğretim haftası seçin"
              className="py-1 px-3 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200 border-none focus:ring-2 focus:ring-brand-500"
            >
              <option value={0}>Tüm Haftalar (36 Hafta)</option>
              {ACADEMIC_WEEKS.map((w) => (
                <option key={w.weekNumber} value={w.weekNumber}>
                  {w.weekNumber}. Hafta ({w.displayRange}) {w.weekNumber === currentWeek.weekNumber ? '⚡ Aktif' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kazanım Sonuç Kartları */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Bulunan Kazanımlar ({filteredCurriculum.length})
          </span>
          {selectedWeek > 0 && (
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              {selectedWeek}. Hafta
            </span>
          )}
        </div>

        {filteredCurriculum.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Kazanım Bulunamadı</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Seçilen filtreler veya arama terimi için kazanım listelenemedi. "Tüm Haftalar" seçeneğini deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedWeek(0);
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Tüm Haftaları Göster
            </button>
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
    </div>
  );
};

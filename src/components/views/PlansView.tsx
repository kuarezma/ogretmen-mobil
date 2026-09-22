import React, { useState, useMemo } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import { CURRICULUM_DATA, SUBJECT_OPTIONS, CurriculumItem } from '../../data/curriculumData';
import { AcademicWeek } from '../../data/academicCalendar';
import { TeacherProfile } from '../../services/storage';
import { DocxGenerator } from '../../services/docxGenerator';
import { PdfGenerator } from '../../services/pdfGenerator';

interface PlansViewProps {
  currentWeek: AcademicWeek;
  profile: TeacherProfile;
  selectedCurriculumItem?: CurriculumItem | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PlansView: React.FC<PlansViewProps> = ({
  currentWeek,
  profile,
  selectedCurriculumItem,
  showToast
}) => {
  const [activePlanType, setActivePlanType] = useState<'annual' | 'daily'>('annual');
  const [selectedGrade, setSelectedGrade] = useState<number>(selectedCurriculumItem ? selectedCurriculumItem.grade : 5);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(selectedCurriculumItem ? selectedCurriculumItem.subjectKey : 'matematik');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(selectedCurriculumItem ? selectedCurriculumItem.weekNumber : currentWeek.weekNumber);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);

  const currentSubjectObj = useMemo(() => {
    return SUBJECT_OPTIONS.find(s => s.key === selectedSubjectKey) || SUBJECT_OPTIONS[0];
  }, [selectedSubjectKey]);

  // Seçili branş ve sınıfa ait tüm 36 haftalık kazanımlar
  const annualItems = useMemo(() => {
    return CURRICULUM_DATA.filter(c => c.grade === selectedGrade && c.subjectKey === selectedSubjectKey);
  }, [selectedGrade, selectedSubjectKey]);

  // Seçili haftanın kazanımı
  const activeDailyItem = useMemo(() => {
    return annualItems.find(c => c.weekNumber === selectedWeekNum) || annualItems[0] || CURRICULUM_DATA[0];
  }, [annualItems, selectedWeekNum]);

  // Word (.docx) İndirme
  const handleDownloadDocx = async () => {
    try {
      setIsGeneratingDocx(true);
      showToast('Word (.docx) yıllık planı oluşturuluyor...', 'info');
      await DocxGenerator.generateAnnualPlanDocx(
        annualItems.length > 0 ? annualItems : [activeDailyItem],
        currentSubjectObj.name,
        selectedGrade,
        profile
      );
      showToast('Word belgesi başarıyla indirildi!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Word oluşturulurken bir hata oluştu.', 'error');
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  // PDF İndirme
  const handleDownloadPdf = () => {
    try {
      showToast('PDF yıllık planı oluşturuluyor...', 'info');
      PdfGenerator.generateAnnualPlanPdf(
        annualItems.length > 0 ? annualItems : [activeDailyItem],
        currentSubjectObj.name,
        selectedGrade,
        profile
      );
      showToast('PDF belgesi başarıyla indirildi!', 'success');
    } catch (e) {
      console.error(e);
      showToast('PDF oluşturulurken bir hata oluştu.', 'error');
    }
  };

  // Günlük Plan PDF İndirme
  const handleDownloadDailyPdf = () => {
    try {
      showToast('Günlük ders planı PDF oluşturuluyor...', 'info');
      PdfGenerator.generateDailyPlanPdf(
        activeDailyItem,
        profile,
        selectedWeekNum,
        new Date().toLocaleDateString('tr-TR')
      );
      showToast('Günlük plan PDF indirildi!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Günlük plan oluşturulamadı.', 'error');
    }
  };

  // Günlük Planı Panoya Kopyalama
  const handleCopyDailyPlanText = () => {
    const text = `GÜNLÜK DERS PLANI (40 DAKİKA)\n\nOkul: ${profile.schoolName}\nÖğretmen: ${profile.name}\nDers: ${activeDailyItem.subject} (${activeDailyItem.grade}. Sınıf)\nÜnite: ${activeDailyItem.unitTitle}\nKazanım: ${activeDailyItem.code} - ${activeDailyItem.description}\n\n1. Giriş & Dikkat Çekme (5 dk): Önceki ders tekrarı ve günlük hayat sorusu.\n2. Keşfetme & Etkinlik (15 dk): Somut modelleme ve interaktif akıllı tahta uygulaması.\n3. Açıklama & Kavramlaştırma (10 dk): Temel kuralların işlenmesi ve not alımı.\n4. Derinleştirme (7 dk): 2 adet beceri temelli soru çözümü.\n5. Değerlendirme & Özet (3 dk): Ders özeti ve sınıf defterine kazanım yazımı.`;
    navigator.clipboard.writeText(text);
    showToast('Günlük ders akış metni kopyalandı!', 'success');
  };

  return (
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-300">
      {/* Plan Türü Seçici (Yıllık vs Günlük) */}
      <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center">
        <button
          onClick={() => setActivePlanType('annual')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlanType === 'annual'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          📂 36 Haftalık Yıllık Plan
        </button>
        <button
          onClick={() => setActivePlanType('daily')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activePlanType === 'daily'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          📝 40 Dk Günlük Ders Planı
        </button>
      </div>

      {/* Sınıf & Branş Seçici Kart */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Ders ve Sınıf Seçimi
          </h3>
          <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
            {profile.schoolName}
          </span>
        </div>

        {/* Sınıf Seçimi */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active-scale ${
                selectedGrade === g
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {g}. Sınıf
            </button>
          ))}
        </div>

        {/* Branş Seçimi */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SUBJECT_OPTIONS.slice(0, 8).map((sub) => (
            <button
              key={sub.key}
              onClick={() => setSelectedSubjectKey(sub.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active-scale ${
                selectedSubjectKey === sub.key
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {activePlanType === 'daily' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Hafta Seçimi:</span>
            <select
              value={selectedWeekNum}
              onChange={(e) => setSelectedWeekNum(Number(e.target.value))}
              aria-label="Günlük plan için hafta seçin"
              className="py-1 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              {Array.from({ length: 36 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  {w}. Hafta {w === currentWeek.weekNumber ? '⚡ Aktif' : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 1. YILLIK PLAN GÖRÜNÜMÜ */}
      {activePlanType === 'annual' && (
        <div className="space-y-3">
          {/* İndirme Butonları */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleDownloadDocx}
              disabled={isGeneratingDocx}
              className="py-2.5 px-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active-scale"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Word (.docx)</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="py-2.5 px-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active-scale"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF İndir</span>
            </button>

            <button
              onClick={() => window.print()}
              className="py-2.5 px-2 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active-scale"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır (A4)</span>
            </button>
          </div>

          {/* Yıllık Plan Canlı Önizleme Kartı */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft overflow-hidden">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                MEB & Maarif Modeli Formatı
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                {profile.schoolName.toUpperCase()}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {selectedGrade}. Sınıf {currentSubjectObj.name} Yıllık Planı (36 Hafta)
              </p>
            </div>

            {/* Hafta Hafta Tablo Önizlemesi */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[460px] overflow-y-auto custom-scrollbar p-2">
              {Array.from({ length: 36 }, (_, i) => i + 1).map((w) => {
                const match = annualItems.find(c => c.weekNumber === w) || annualItems[0];
                const isCurrent = w === currentWeek.weekNumber;

                return (
                  <div
                    key={w}
                    className={`p-3 rounded-2xl transition ${
                      isCurrent
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-brand-600 dark:text-brand-400">
                        {w}. Hafta
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-900 text-[10px] font-bold">
                          Şu Anki Hafta
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {match ? match.unitTitle : 'Ünite / Öğrenme Alanı'}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{match?.code}: </span>
                      {match?.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* İmza Bloğu */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-center text-xs">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{profile.name}</div>
                <div className="text-[10px] text-slate-500">{profile.branch}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">UYGUNDUR</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{profile.principalName}</div>
                <div className="text-[10px] text-slate-500">Okul Müdürü</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GÜNLÜK DERS AKIŞ PLANI GÖRÜNÜMÜ */}
      {activePlanType === 'daily' && (
        <div className="space-y-3">
          {/* İndirme & Kopyalama Butonları */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadDailyPdf}
              className="py-2.5 px-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active-scale"
            >
              <Download className="w-4 h-4" />
              <span>Ders Planı PDF İndir</span>
            </button>

            <button
              onClick={handleCopyDailyPlanText}
              className="py-2.5 px-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active-scale"
            >
              <FileText className="w-4 h-4" />
              <span>Plan Metnini Kopyala</span>
            </button>
          </div>

          {/* 40 Dakikalık Akış Kartı */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-600">40 Dakika Ders Akışı</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {activeDailyItem.grade}. Sınıf {activeDailyItem.subject}
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
                {activeDailyItem.code}
              </span>
            </div>

            {/* Aşamalar Listesi */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">
                  <span>1. Giriş ve Dikkat Çekme</span>
                  <span className="text-[11px]">5 Dakika</span>
                </div>
                <p className="text-xs text-blue-800/90 dark:text-blue-200/90 leading-relaxed">
                  Önceki derste öğrenilen kavramlar kısaca hatırlatılır. Günlük hayattan dikkat çekici bir soru veya görsel paylaşılarak öğrencilerin merak duygusu uyandırılır.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900 dark:text-purple-300 mb-1">
                  <span>2. Keşfetme ve Etkinlik</span>
                  <span className="text-[11px]">15 Dakika</span>
                </div>
                <p className="text-xs text-purple-800/90 dark:text-purple-200/90 leading-relaxed">
                  Kazanım (<span className="font-semibold">{activeDailyItem.code}</span>) doğrultusunda somut modelleme veya örnek olay incelemesi yapılır. Akıllı tahta üzerinden etkileşimli içerikler çözdürülür.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  <span>3. Açıklama ve Kavramlaştırma</span>
                  <span className="text-[11px]">10 Dakika</span>
                </div>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-200/90 leading-relaxed">
                  Öğretmen tarafından temel tanım ve kurallar tahtaya özetlenir. Olası kavram yanılgıları giderilir.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
                  <span>4. Derinleştirme & Soru Çözümü</span>
                  <span className="text-[11px]">7 Dakika</span>
                </div>
                <p className="text-xs text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
                  Farklı zorluk seviyelerinde 2 adet beceri temelli soru çözülür. Öğrencilerin çalışma kağıtları üzerindeki işlemleri kontrol edilir.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  <span>5. Değerlendirme & Deftere Yazım</span>
                  <span className="text-[11px]">3 Dakika</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dersin kilit kazanımı öğrencilerle özetlenir. Sınıf defterine "{activeDailyItem.notebookSnippet}" yazılarak ders tamamlanır.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

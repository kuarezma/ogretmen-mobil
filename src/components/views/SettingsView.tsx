import React, { useState } from 'react';
import { User, School, Clock, Save, Smartphone, Check, Trash2 } from 'lucide-react';
import { TeacherProfile, TimetableSlot, PRESET_PROFILES } from '../../services/storage';

interface SettingsViewProps {
  profile: TeacherProfile;
  timetable: TimetableSlot[];
  onUpdateProfile: (p: TeacherProfile) => void;
  onUpdateTimetable: (slots: TimetableSlot[]) => void;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  timetable,
  onUpdateProfile,
  onUpdateTimetable,
  showToast
}) => {
  const [editingProfile, setEditingProfile] = useState<TeacherProfile>(profile);
  const [selectedDay, setSelectedDay] = useState<number>(1); // 1: Pzt ... 5: Cuma
  const [editingTimetable, setEditingTimetable] = useState<TimetableSlot[]>(timetable);

  const days = [
    { num: 1, name: 'Pazartesi' },
    { num: 2, name: 'Salı' },
    { num: 3, name: 'Çarşamba' },
    { num: 4, name: 'Perşembe' },
    { num: 5, name: 'Cuma' }
  ];

  // Hazır profili uygula
  const handleSelectPreset = (preset: TeacherProfile) => {
    setEditingProfile(preset);
    onUpdateProfile(preset);
    showToast(`"${preset.name}" profili aktif edildi!`, 'success');
  };

  // Profil Formunu Kaydet
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editingProfile);
    showToast('Öğretmen profili başarıyla kaydedildi!', 'success');
  };

  // Ders Programı Güncelleme
  const handleSlotChange = (dayIndex: number, period: number, className: string, grade: number) => {
    const updated = editingTimetable.filter(s => !(s.dayIndex === dayIndex && s.period === period));
    if (className.trim().length > 0) {
      updated.push({
        dayIndex,
        period,
        className: className.trim(),
        grade: grade || 5,
        subject: editingProfile.branch.replace(' Öğretmeni', '').trim() || 'Matematik',
        subjectKey: 'matematik'
      });
    }
    setEditingTimetable(updated);
  };

  const handleSaveTimetable = () => {
    onUpdateTimetable(editingTimetable);
    showToast('Haftalık ders programınız güncellendi!', 'success');
  };

  return (
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-300">
      {/* 1. HIZLI PROFİL SEÇİCİ */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Hızlı Profil Değiştir
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tek tıkla hazır öğretmen profilini seçin
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {PRESET_PROFILES.map((preset) => {
            const isSelected = profile.id === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-2xl border text-left transition active-scale ${
                  isSelected
                    ? 'bg-brand-50/80 dark:bg-brand-950/50 border-brand-500 text-brand-900 dark:text-brand-200 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">{preset.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {preset.schoolName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PROFİL DETAY FORMU */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <School className="w-4 h-4 text-brand-600" />
          <span>Öğretmen ve Kurum Bilgileri</span>
        </h3>

        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Ad Soyad</label>
              <input
                type="text"
                value={editingProfile.name}
                onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Branş</label>
              <input
                type="text"
                value={editingProfile.branch}
                onChange={(e) => setEditingProfile({ ...editingProfile, branch: e.target.value })}
                className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Okul Adı</label>
              <input
                type="text"
                value={editingProfile.schoolName}
                onChange={(e) => setEditingProfile({ ...editingProfile, schoolName: e.target.value })}
                className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Okul Müdürü</label>
              <input
                type="text"
                value={editingProfile.principalName}
                onChange={(e) => setEditingProfile({ ...editingProfile, principalName: e.target.value })}
                className="w-full mt-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center justify-center gap-2 active-scale shadow-sm shadow-brand-500/30"
        >
          <Save className="w-4 h-4" />
          <span>Profil Bilgilerini Kaydet</span>
        </button>
      </form>

      {/* 3. HAFTALIK DERS PROGRAMI EDİTÖRÜ */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Haftalık Ders Programınız
            </h3>
          </div>
          <button
            onClick={handleSaveTimetable}
            className="px-3 py-1 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1 active-scale shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Kaydet</span>
          </button>
        </div>

        {/* Günler Seçici */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {days.map((d) => (
            <button
              key={d.num}
              onClick={() => setSelectedDay(d.num)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-center transition ${
                selectedDay === d.num
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {d.name.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* 1 - 8. Saatler Listesi */}
        <div className="space-y-2 pt-1">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((period) => {
            const slot = editingTimetable.find(s => s.dayIndex === selectedDay && s.period === period);
            const className = slot ? slot.className : '';
            const grade = slot ? slot.grade : 5;

            return (
              <div
                key={period}
                className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800"
              >
                <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                  {period}
                </span>

                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Sınıf (Örn: 5/A veya Boş)"
                    value={className}
                    onChange={(e) => {
                      const val = e.target.value;
                      const parsedGrade = parseInt(val) || 5;
                      handleSlotChange(selectedDay, period, val, parsedGrade);
                    }}
                    className="flex-1 p-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                  />

                  {className && (
                    <select
                      value={grade}
                      onChange={(e) => handleSlotChange(selectedDay, period, className, Number(e.target.value))}
                      aria-label={`${period}. ders sınıf kademesi`}
                      className="p-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold"
                    >
                      <option value={5}>5. Sınıf</option>
                      <option value={6}>6. Sınıf</option>
                      <option value={7}>7. Sınıf</option>
                      <option value={8}>8. Sınıf</option>
                      <option value={9}>9. Sınıf</option>
                      <option value={10}>10. Sınıf</option>
                      <option value={11}>11. Sınıf</option>
                      <option value={12}>12. Sınıf</option>
                    </select>
                  )}
                </div>

                {className && (
                  <button
                    onClick={() => handleSlotChange(selectedDay, period, '', 5)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 active-scale"
                    title="Dersi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ÇEVRİMDIŞI & PWA BİLGİSİ */}
      <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span>Çevrimdışı (Offline-First) & Sıfır Gecikme</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Bu uygulama internet bağlantısı gerektirmez. Tüm verileriniz tarayıcınızın yerel depolama alanında (LocalStorage) saklanır.
        </p>
        <div className="text-[11px] pt-1 text-slate-500 dark:text-slate-400 font-medium">
          💡 <strong>Telefona Kurma:</strong> iPhone Safari'de <em>"Paylaş &gt; Ana Ekrana Ekle"</em>, Android Chrome'da <em>"Üç Nokta &gt; Uygulamayı Yükle"</em> butonuna dokunarak telefonunuza uygulama olarak ekleyebilirsiniz.
        </div>
      </div>
    </div>
  );
};

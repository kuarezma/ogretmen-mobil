import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { ToastContainer, ToastMessage } from './components/Toast';
import { HomeView } from './components/views/HomeView';
import { NotebookView } from './components/views/NotebookView';
import { PlansView } from './components/views/PlansView';
import { DocumentsView } from './components/views/DocumentsView';
import { SettingsView } from './components/views/SettingsView';
import { getCurrentAcademicWeek } from './data/academicCalendar';
import { StorageService, TeacherProfile, TimetableSlot } from './services/storage';
import { CurriculumItem } from './data/curriculumData';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [profile, setProfile] = useState<TeacherProfile>(() => StorageService.getProfile());
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => StorageService.getTimetable());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedPlanItem, setSelectedPlanItem] = useState<CurriculumItem | null>(null);

  const currentWeekInfo = getCurrentAcademicWeek();

  // Dark mode sınıfını html etiketine uygula
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast Bildirimi Ekle
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateProfile = (newProfile: TeacherProfile) => {
    setProfile(newProfile);
    StorageService.setProfile(newProfile);
  };

  const handleUpdateTimetable = (newSlots: TimetableSlot[]) => {
    setTimetable(newSlots);
    StorageService.setTimetable(newSlots);
  };

  // Kazanım listesinden doğrudan ders planına gitme
  const handleSelectForDailyPlan = (item: CurriculumItem) => {
    setSelectedPlanItem(item);
    setActiveTab('plans');
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Toast Bildirim Konteyneri */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Üst Gezinti / Başlık Barı */}
      <Navbar
        currentWeek={currentWeekInfo.week}
        profile={profile}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSettings={() => setActiveTab('settings')}
      />

      {/* Ana Mobil İçerik Alanı */}
      <main className="flex-1 max-w-lg w-full mx-auto px-3 sm:px-4 py-2">
        {activeTab === 'home' && (
          <HomeView
            currentWeekInfo={currentWeekInfo}
            profile={profile}
            timetable={timetable}
            onNavigateTab={setActiveTab}
            showToast={showToast}
          />
        )}

        {activeTab === 'notebook' && (
          <NotebookView
            currentWeek={currentWeekInfo.week}
            profile={profile}
            showToast={showToast}
            onSelectForDailyPlan={handleSelectForDailyPlan}
          />
        )}

        {activeTab === 'plans' && (
          <PlansView
            currentWeek={currentWeekInfo.week}
            profile={profile}
            selectedCurriculumItem={selectedPlanItem}
            showToast={showToast}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsView
            profile={profile}
            showToast={showToast}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            timetable={timetable}
            onUpdateProfile={handleUpdateProfile}
            onUpdateTimetable={handleUpdateTimetable}
            showToast={showToast}
          />
        )}
      </main>

      {/* Mobil Alt Gezinti Çubuğu */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
export default App;

// LocalStorage Kalıcılık ve Durum Yönetimi Servisi

export interface TeacherProfile {
  id: string;
  name: string;
  branch: string;
  schoolName: string;
  principalName: string;
  phone?: string;
  tcNo?: string;
}

export interface TimetableSlot {
  dayIndex: number; // 1: Pazartesi, 2: Salı, 3: Çarşamba, 4: Perşembe, 5: Cuma
  period: number;   // 1 - 8. Ders
  className: string; // Örn: '5/A'
  grade: number;    // 5
  subject: string;  // 'Matematik'
  subjectKey: string;
}

export const PRESET_PROFILES: TeacherProfile[] = [
  {
    id: 'ugur_hoca',
    name: 'Uğur YAŞAYAN',
    branch: 'Matematik Öğretmeni',
    schoolName: 'Alparslan Ortaokulu',
    principalName: 'Mustafa ÖZKAN',
    phone: '0505 123 45 67',
    tcNo: '12345678901'
  },
  {
    id: 'demet_hoca',
    name: 'Demet GÜRHAN YAŞAYAN',
    branch: 'Matematik Öğretmeni',
    schoolName: 'Yavuz Selim Ortaokulu',
    principalName: 'Ali Rıza HACIOĞLU',
    phone: '0505 987 65 43',
    tcNo: '98765432109'
  }
];

const DEFAULT_TIMETABLE: TimetableSlot[] = [
  // Pazartesi
  { dayIndex: 1, period: 1, className: '5/A', grade: 5, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 1, period: 2, className: '5/A', grade: 5, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 1, period: 3, className: '6/B', grade: 6, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 1, period: 4, className: '6/B', grade: 6, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 1, period: 5, className: '8/A', grade: 8, subject: 'Matematik', subjectKey: 'matematik' },

  // Salı
  { dayIndex: 2, period: 1, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 2, period: 2, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 2, period: 3, className: '5/A', grade: 5, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 2, period: 5, className: '8/A', grade: 8, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 2, period: 6, className: '8/A', grade: 8, subject: 'Matematik', subjectKey: 'matematik' },

  // Çarşamba
  { dayIndex: 3, period: 1, className: '6/B', grade: 6, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 3, period: 2, className: '6/B', grade: 6, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 3, period: 3, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 3, period: 4, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' },

  // Perşembe
  { dayIndex: 4, period: 1, className: '8/A', grade: 8, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 4, period: 2, className: '8/A', grade: 8, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 4, period: 3, className: '5/A', grade: 5, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 4, period: 4, className: '5/A', grade: 5, subject: 'Matematik', subjectKey: 'matematik' },

  // Cuma
  { dayIndex: 5, period: 1, className: '6/B', grade: 6, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 5, period: 2, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' },
  { dayIndex: 5, period: 3, className: '7/A', grade: 7, subject: 'Matematik', subjectKey: 'matematik' }
];

const STORAGE_KEYS = {
  PROFILE: 'ogretmen_active_profile',
  TIMETABLE: 'ogretmen_timetable',
  FAVORITES: 'ogretmen_favorites',
  THEME: 'ogretmen_dark_mode'
};

export const StorageService = {
  getProfile(): TeacherProfile {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRESET_PROFILES[0]; // Uğur Hoca varsayılan
  },

  setProfile(profile: TeacherProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  getTimetable(): TimetableSlot[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TIMETABLE;
  },

  setTimetable(slots: TimetableSlot[]): void {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(slots));
  },

  getFavorites(): string[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  toggleFavorite(id: string): string[] {
    const list = this.getFavorites();
    const index = list.indexOf(id);
    let updated: string[];
    if (index >= 0) {
      updated = list.filter(i => i !== id);
    } else {
      updated = [...list, id];
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  }
};

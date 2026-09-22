// MEB Eğitim Öğretim Takvimi ve Hafta Hesaplama Motoru

export interface AcademicWeek {
  weekNumber: number; // 1 - 36
  semester: 1 | 2;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  displayRange: string;
  specialEvents?: string[];
  isBreak?: boolean;
}

// 2024-2025 / 2025-2026 MEB Takvimi referans tablosu (Öğretim haftaları)
export const ACADEMIC_WEEKS: AcademicWeek[] = [
  { weekNumber: 1, semester: 1, title: "1. Hafta", startDate: "2024-09-09", endDate: "2024-09-13", displayRange: "09 - 13 Eylül", specialEvents: ["İlköğretim Haftası", "Uyum Haftası"] },
  { weekNumber: 2, semester: 1, title: "2. Hafta", startDate: "2024-09-16", endDate: "2024-09-20", displayRange: "16 - 20 Eylül", specialEvents: ["Gaziler Günü (19 Eylül)"] },
  { weekNumber: 3, semester: 1, title: "3. Hafta", startDate: "2024-09-23", endDate: "2024-09-27", displayRange: "23 - 27 Eylül", specialEvents: ["Avrupa Diller Günü"] },
  { weekNumber: 4, semester: 1, title: "4. Hafta", startDate: "2024-09-30", endDate: "2024-10-04", displayRange: "30 Eylül - 04 Ekim", specialEvents: ["Hayvanları Koruma Günü (4 Ekim)"] },
  { weekNumber: 5, semester: 1, title: "5. Hafta", startDate: "2024-10-07", endDate: "2024-10-11", displayRange: "07 - 11 Ekim", specialEvents: ["Ahilik Kültürü Haftası"] },
  { weekNumber: 6, semester: 1, title: "6. Hafta", startDate: "2024-10-14", endDate: "2024-10-18", displayRange: "14 - 18 Ekim", specialEvents: ["Dünya Afet Azaltma Günü"] },
  { weekNumber: 7, semester: 1, title: "7. Hafta", startDate: "2024-10-21", endDate: "2024-10-25", displayRange: "21 - 25 Ekim", specialEvents: ["Birleşmiş Milletler Günü"] },
  { weekNumber: 8, semester: 1, title: "8. Hafta", startDate: "2024-10-28", endDate: "2024-11-01", displayRange: "28 Ekim - 01 Kasım", specialEvents: ["29 Ekim Cumhuriyet Bayramı", "Kızılay Haftası"] },
  { weekNumber: 9, semester: 1, title: "9. Hafta", startDate: "2024-11-04", endDate: "2024-11-08", displayRange: "04 - 08 Kasım", specialEvents: ["Lösemili Çocuklar Haftası", "1. Dönem 1. Yazılılar"] },
  // 1. Ara Tatil (11-15 Kasım)
  { weekNumber: 10, semester: 1, title: "10. Hafta", startDate: "2024-11-18", endDate: "2024-11-22", displayRange: "18 - 22 Kasım", specialEvents: ["Dünya Çocuk Hakları Günü", "24 Kasım Öğretmenler Günü Hazırlığı"] },
  { weekNumber: 11, semester: 1, title: "11. Hafta", startDate: "2024-11-25", endDate: "2024-11-29", displayRange: "25 - 29 Kasım", specialEvents: ["24 Kasım Öğretmenler Günü Haftası"] },
  { weekNumber: 12, semester: 1, title: "12. Hafta", startDate: "2024-12-02", endDate: "2024-12-06", displayRange: "02 - 06 Aralık", specialEvents: ["Dünya Engelliler Günü (3 Aralık)"] },
  { weekNumber: 13, semester: 1, title: "13. Hafta", startDate: "2024-12-09", endDate: "2024-12-13", displayRange: "09 - 13 Aralık", specialEvents: ["İnsan Hakları ve Demokrasi Haftası"] },
  { weekNumber: 14, semester: 1, title: "14. Hafta", startDate: "2024-12-16", endDate: "2024-12-20", displayRange: "16 - 20 Aralık", specialEvents: ["Tutum, Yatırım ve Türk Malları Haftası"] },
  { weekNumber: 15, semester: 1, title: "15. Hafta", startDate: "2024-12-23", endDate: "2024-12-27", displayRange: "23 - 27 Aralık", specialEvents: ["1. Dönem 2. Ortak Yazılılar"] },
  { weekNumber: 16, semester: 1, title: "16. Hafta", startDate: "2024-12-30", endDate: "2025-01-03", displayRange: "30 Aralık - 03 Ocak", specialEvents: ["Yılbaşı Tatili (1 Ocak)"] },
  { weekNumber: 17, semester: 1, title: "17. Hafta", startDate: "2025-01-06", endDate: "2025-01-10", displayRange: "06 - 10 Ocak", specialEvents: ["Enerji Tasarrufu Haftası"] },
  { weekNumber: 18, semester: 1, title: "18. Hafta", startDate: "2025-01-13", endDate: "2025-01-17", displayRange: "13 - 17 Ocak", specialEvents: ["1. Dönem Sonu - Karne Haftası"] },
  
  // 2. Dönem
  { weekNumber: 19, semester: 2, title: "19. Hafta", startDate: "2025-02-03", endDate: "2025-02-07", displayRange: "03 - 07 Şubat", specialEvents: ["2. Dönem Başlangıcı"] },
  { weekNumber: 20, semester: 2, title: "20. Hafta", startDate: "2025-02-10", endDate: "2025-02-14", displayRange: "10 - 14 Şubat", specialEvents: ["Güvenli İnternet Günü"] },
  { weekNumber: 21, semester: 2, title: "21. Hafta", startDate: "2025-02-17", endDate: "2025-02-21", displayRange: "17 - 21 Şubat", specialEvents: ["Sivil Savunma Günü"] },
  { weekNumber: 22, semester: 2, title: "22. Hafta", startDate: "2025-02-24", endDate: "2025-02-28", displayRange: "24 - 28 Şubat", specialEvents: ["Yeşilay Haftası Başlangıcı", "Vergi Haftası"] },
  { weekNumber: 23, semester: 2, title: "23. Hafta", startDate: "2025-03-03", endDate: "2025-03-07", displayRange: "03 - 07 Mart", specialEvents: ["Yeşilay Haftası (1-7 Mart)", "Girişimcilik Haftası"] },
  { weekNumber: 24, semester: 2, title: "24. Hafta", startDate: "2025-03-10", endDate: "2025-03-14", displayRange: "10 - 14 Mart", specialEvents: ["12 Mart İstiklâl Marşı'nın Kabulü", "Pi Günü (14 Mart)"] },
  { weekNumber: 25, semester: 2, title: "25. Hafta", startDate: "2025-03-17", endDate: "2025-03-21", displayRange: "17 - 21 Mart", specialEvents: ["18 Mart Çanakkale Zaferi", "Nevruz Bayramı"] },
  { weekNumber: 26, semester: 2, title: "26. Hafta", startDate: "2025-03-24", endDate: "2025-03-28", displayRange: "24 - 28 Mart", specialEvents: ["Orman Haftası", "Kütüphaneler Haftası", "2. Dönem 1. Yazılılar"] },
  // 2. Ara Tatil (31 Mart - 4 Nisan)
  { weekNumber: 27, semester: 2, title: "27. Hafta", startDate: "2025-04-07", endDate: "2025-04-11", displayRange: "07 - 11 Nisan", specialEvents: ["Dünya Sağlık Günü"] },
  { weekNumber: 28, semester: 2, title: "28. Hafta", startDate: "2025-04-14", endDate: "2025-04-18", displayRange: "14 - 18 Nisan", specialEvents: ["Turizm Haftası"] },
  { weekNumber: 29, semester: 2, title: "29. Hafta", startDate: "2025-04-21", endDate: "2025-04-25", displayRange: "21 - 25 Nisan", specialEvents: ["23 Nisan Ulusal Egemenlik ve Çocuk Bayramı"] },
  { weekNumber: 30, semester: 2, title: "30. Hafta", startDate: "2025-04-28", endDate: "2025-05-02", displayRange: "28 Nisan - 02 Mayıs", specialEvents: ["1 Mayıs Emek ve Dayanışma Günü", "Bilişim Haftası"] },
  { weekNumber: 31, semester: 2, title: "31. Hafta", startDate: "2025-05-05", endDate: "2025-05-09", displayRange: "05 - 09 Mayıs", specialEvents: ["Trafik ve İlkyardım Haftası", "Anneler Günü"] },
  { weekNumber: 32, semester: 2, title: "32. Hafta", startDate: "2025-05-12", endDate: "2025-05-16", displayRange: "12 - 16 Mayıs", specialEvents: ["Engelliler Haftası"] },
  { weekNumber: 33, semester: 2, title: "33. Hafta", startDate: "2025-05-19", endDate: "2025-05-23", displayRange: "19 - 23 Mayıs", specialEvents: ["19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı", "2. Dönem 2. Yazılılar"] },
  { weekNumber: 34, semester: 2, title: "34. Hafta", startDate: "2025-05-26", endDate: "2025-05-30", displayRange: "26 - 30 Mayıs", specialEvents: ["İstanbul'un Fethi (29 Mayıs)"] },
  { weekNumber: 35, semester: 2, title: "35. Hafta", startDate: "2025-06-02", endDate: "2025-06-06", displayRange: "02 - 06 Haziran", specialEvents: ["Çevre Koruma Haftası"] },
  { weekNumber: 36, semester: 2, title: "36. Hafta", startDate: "2025-06-09", endDate: "2025-06-13", displayRange: "09 - 13 Haziran", specialEvents: ["Sene Sonu Kapanış ve Karne Haftası"] }
];

// Bugünkü tarihi baz alarak aktif MEB haftasını bulan akıllı fonksiyon
export function getCurrentAcademicWeek(inputDate?: Date): {
  week: AcademicWeek;
  dayName: string;
  formattedDate: string;
  isWeekend: boolean;
  schoolDayNumber: number; // 1: Pazartesi ... 5: Cuma
} {
  const now = inputDate || new Date();
  
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dayIndex = now.getDay();
  const dayName = dayNames[dayIndex];
  const isWeekend = dayIndex === 0 || dayIndex === 6;
  
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = now.toLocaleDateString('tr-TR', options);

  // Günümüz tarihinin YYYY-MM-DD formatı
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${now.getFullYear()}-${month}-${day}`;

  // Hafta aralığı kontrolü
  let matched = ACADEMIC_WEEKS.find(w => dateStr >= w.startDate && dateStr <= w.endDate);

  if (!matched) {
    // Eğer tatil veya takvim dışıysa mevsime/tarihe göre en mantıklı aktif haftayı seç
    const currentMonth = now.getMonth() + 1; // 1-12
    if (currentMonth >= 9 && currentMonth <= 11) {
      // 1. Dönem başı/ortası
      matched = ACADEMIC_WEEKS[2]; // Örnek 3. hafta
    } else if (currentMonth === 12 || currentMonth === 1) {
      matched = ACADEMIC_WEEKS[13]; // 14. hafta
    } else if (currentMonth >= 2 && currentMonth <= 4) {
      matched = ACADEMIC_WEEKS[23]; // 24. hafta
    } else {
      matched = ACADEMIC_WEEKS[33]; // 34. hafta
    }
  }

  // 1: Pzt, 2: Salı, 3: Çarş, 4: Perş, 5: Cuma, hafta sonu ise Pazartesiye yuvarla
  const schoolDayNumber = isWeekend ? 1 : dayIndex;

  return {
    week: matched,
    dayName,
    formattedDate,
    isWeekend,
    schoolDayNumber
  };
}

// Öğretmen Resmi Evrak ve Belge Şablonları Kataloğu

export interface DocumentTemplate {
  id: string;
  category: 'Zümre & ŞÖK' | 'Kulüp & Rehberlik' | 'Sınav & Ölçek' | 'BEP & Özel Eğitim' | 'Dilekçeler & Nöbet';
  title: string;
  shortDesc: string;
  filenamePrefix: string;
  tags: string[];
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'select' | 'number';
    defaultValue?: string;
    options?: string[];
  }[];
  contentGenerator: (data: Record<string, string>) => {
    title: string;
    header: string[];
    agendaItems?: string[];
    decisions?: string[];
    bodyText?: string;
    tableColumns?: string[];
    tableRows?: string[][];
    signatures: { role: string; name: string }[];
  };
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  // ================= 1. ZÜMRE TUTANAĞI =================
  {
    id: 'zumre_1_donem',
    category: 'Zümre & ŞÖK',
    title: '1. Dönem Zümre Öğretmenler Kurulu Tutanağı',
    shortDesc: 'Eğitim-öğretim yılı başı branş zümresi gündem maddeleri ve kararları',
    filenamePrefix: '1_Donem_Zumre_Tutanagi',
    tags: ['Zümre', 'Sene Başı', 'Resmi Tutanak', 'MEB'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'academicYear', label: 'Eğitim Öğretim Yılı', type: 'text', defaultValue: '2024-2025' },
      { key: 'subject', label: 'Ders / Branş', type: 'text', defaultValue: 'Matematik' },
      { key: 'meetingDate', label: 'Toplantı Tarihi', type: 'date', defaultValue: '2024-09-06' },
      { key: 'meetingNumber', label: 'Toplantı No', type: 'number', defaultValue: '1' },
      { key: 'meetingChair', label: 'Zümre Başkanı', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'meetingMembers', label: 'Katılımcı Öğretmenler', type: 'textarea', defaultValue: 'Uğur YAŞAYAN (Zümre Başkanı), Demet GÜRHAN YAŞAYAN (Üye)' },
      { key: 'principalName', label: 'Okul Müdürü', type: 'text', defaultValue: 'Mustafa ÖZKAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.academicYear || '2024-2025'} EĞİTİM ÖĞRETİM YILI ${data.schoolName?.toUpperCase() || 'OKULU'}`,
      header: [
        `${data.subject?.toUpperCase() || 'MATEMATİK'} DERSİ 1. DÖNEM ZÜMRE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI`,
        `Toplantı No: ${data.meetingNumber || '1'} | Tarih: ${data.meetingDate || '06.09.2024'} | Saat: 10:00 | Yer: Öğretmenler Odası`
      ],
      agendaItems: [
        '1. Açılış ve yoklama, zümre başkanı ve yazman seçimi.',
        '2. Bir önceki eğitim ve öğretim yılı zümre kararlarının değerlendirilmesi.',
        '3. MEB Eğitim Öğretim Müfredatı ve Türkiye Yüzyılı Maarif Modeli çerçeve öğretim programının incelenmesi.',
        '4. Yıllık planların ve ders işleniş stratejilerinin hazırlanması.',
        '5. Ortak yazılı sınavlar, ölçme değerlendirme araçları ve puanlama kriterlerinin belirlenmesi.',
        '6. Ders araç-gereçleri, akıllı tahta ve dijital eğitim platformlarının (EBA vb.) etkin kullanımı.',
        '7. Özel eğitim ihtiyacı olan (BEP) öğrencilere yönelik planlamalar ve alınacak tedbirler.',
        '8. Başarıyı artırıcı tedbirler ve veli işbirliği protokolleri.',
        '9. Dilek, temenniler ve kapanış.'
      ],
      decisions: [
        `1. Toplantı Zümre Başkanı ${data.meetingChair || 'Uğur YAŞAYAN'} başkanlığında tüm zümre öğretmenlerinin eksiksiz katılımıyla açılmıştır.`,
        '2. Geçen yılın LGS ve dönem sonu başarı oranları incelenmiş; problem çözme ve yeni nesil soru analizine daha fazla ağırlık verilmesine karar verilmiştir.',
        '3. Türkiye Yüzyılı Maarif Modeli pedagojik ilkeleri doğrultusunda ezberden uzak, süreç odaklı ve kavramsal öğrenme yaklaşımı benimsenmiştir.',
        '4. Yıllık planların 36 haftalık MEB çalışma takvimine göre hazırlanması ve okul müdürlüğüne süresi içinde teslim edilmesi kararlaştırılmıştır.',
        '5. Her dönem 2 adet ortak yazılı sınav yapılması, sınavların açık uçlu ve kısa cevaplı maddelerden oluşması ve soru dağılım tablolarının önceden ilan edilmesi kararlaştırılmıştır.',
        '6. Akıllı tahta materyalleri ve somut modellerin her derste aktif olarak kullanılması uygun görülmüştür.',
        '7. BEP’li öğrencilerin bireysel gelişim raporları doğrultusunda kazanımlarının sadeleştirilmesine ve sınavlarının özel hazırlanmasına karar verilmiştir.'
      ],
      signatures: [
        { role: 'Zümre Başkanı', name: data.meetingChair || 'Uğur YAŞAYAN' },
        { role: 'Zümre Öğretmeni', name: 'Demet GÜRHAN YAŞAYAN' },
        { role: 'Okul Müdürü (Uygundur)', name: data.principalName || 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 2. ŞÖK TUTANAĞI =================
  {
    id: 'sok_tutanagi',
    category: 'Zümre & ŞÖK',
    title: 'Şube Öğretmenler Kurulu (ŞÖK) Tutanağı',
    shortDesc: 'Şube bazında öğrencilerin akademik ve davranışsal durumlarının tespiti',
    filenamePrefix: 'Sube_Ogretmenler_Kurulu_Tutanagi',
    tags: ['ŞÖK', 'Rehberlik', 'Şube Başarısı'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'academicYear', label: 'Eğitim Yılı', type: 'text', defaultValue: '2024-2025' },
      { key: 'branchClass', label: 'Sınıf / Şube', type: 'text', defaultValue: '6/A' },
      { key: 'classTeacher', label: 'Sınıf Rehber Öğretmeni', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'counselorTeacher', label: 'Okul Rehber Öğretmeni', type: 'text', defaultValue: 'Fatma ÇELİK' },
      { key: 'principalName', label: 'Okul Müdürü', type: 'text', defaultValue: 'Mustafa ÖZKAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU'}`,
      header: [
        `${data.academicYear || '2024-2025'} EĞİTİM ÖĞRETİM YILI ${data.branchClass || '6/A'} ŞUBESİ`,
        'ŞUBE ÖĞRETMENLER KURULU (ŞÖK) TOPLANTI TUTANAĞI'
      ],
      agendaItems: [
        '1. Açılış ve kurul üyelerinin tespiti.',
        '2. Şubenin genel başarı durumu ve ders bazlı not ortalamalarının analizi.',
        '3. Devamsızlık sorunu yaşayan öğrencilerin tespiti ve nedenlerinin araştırılması.',
        '4. Özel ilgiye, rehberliğe ve BEP desteğine ihtiyacı olan öğrencilerin durumu.',
        '5. Veli-okul iletişiminin güçlendirilmesi için alınacak önlemler.',
        '6. Kararların özetlenmesi ve onay.'
      ],
      decisions: [
        `1. ${data.branchClass || '6/A'} şubesinin akademik başarısının tatmin edici düzeyde olduğu, ders içi katılımın genel olarak yüksek seyrettiği gözlenmiştir.`,
        '2. Matematik ve Fen derslerinde problem çözme becerilerinin geliştirilmesi için ek çalışma kağıtları verilmesi kararlaştırılmıştır.',
        '3. Sürekli devamsızlık riski taşıyan öğrencilerin velileri ile okul rehberlik servisi koordinasyonunda görüşme yapılmasına karar verilmiştir.',
        '4. Sınıftaki kaynaştırma/BEP öğrencilerinin ders içi uyumu olumlu olup bireysel hedeflerine ulaştıkları saptanmıştır.'
      ],
      signatures: [
        { role: 'Sınıf Rehber Öğretmeni', name: data.classTeacher || 'Uğur YAŞAYAN' },
        { role: 'Okul Rehber Öğretmeni', name: data.counselorTeacher || 'Fatma ÇELİK' },
        { role: 'Okul Müdürü', name: data.principalName || 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 3. SOSYAL KULÜP DOSYASI =================
  {
    id: 'kulup_plani',
    category: 'Kulüp & Rehberlik',
    title: 'Sosyal Kulüp Yıllık Çalışma Planı',
    shortDesc: 'Öğrenci kulübü aylık faaliyet ve etkinlik takvimi',
    filenamePrefix: 'Sosyal_Kulup_Yillik_Plani',
    tags: ['Sosyal Kulüp', 'Faaliyet Planı', 'EBA', 'Maarif'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'academicYear', label: 'Eğitim Yılı', type: 'text', defaultValue: '2024-2025' },
      { key: 'clubName', label: 'Kulüp Adı', type: 'text', defaultValue: 'Matematik ve Zeka Oyunları Kulübü' },
      { key: 'consultantTeacher', label: 'Danışman Öğretmen', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'principalName', label: 'Okul Müdürü', type: 'text', defaultValue: 'Mustafa ÖZKAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU'}`,
      header: [
        `${data.academicYear || '2024-2025'} EĞİTİM ÖĞRETİM YILI`,
        `${data.clubName?.toUpperCase() || 'MATEMATİK VE ZEKA OYUNLARI KULÜBÜ'} YILLIK ÇALIŞMA PLANI`
      ],
      tableColumns: ['Ay', 'Yapılacak Çalışmalar ve Faaliyetler', 'Sorumlular', 'İşbirliği Yapılacak Birimler'],
      tableRows: [
        ['Eylül', 'Kulüp tüzüğünün hazırlanması, yönetim ve denetim kurulu öğrenci seçimlerinin yapılması.', 'Danışman Öğretmen & Kulüp Öğrencileri', 'Okul İdaresi'],
        ['Ekim', 'Zeka oyunları tanıtım sergisi, okul panosunun hazırlanması (29 Ekim Cumhuriyet Bayramı).', 'Kulüp Yönetim Kurulu', 'Tüm Branşlar'],
        ['Kasım', 'Sudoku ve Mangala turnuvası eleme müsabakalarının düzenlenmesi (Öğretmenler Günü panosu).', 'Danışman Öğretmen & Hakem Öğrenciler', 'Beden Eğitimi'],
        ['Aralık', 'Kazanım pekiştirici matematik oyunlarının sınıflarda uygulanması.', 'Kulüp Üyeleri', 'Matematik Zümresi'],
        ['Ocak', '1. Dönem kulüp faaliyet raporunun hazırlanması ve okul müdürlüğüne sunulması.', 'Danışman Öğretmen', 'Okul Yönetimi'],
        ['Şubat', '2. Dönem çalışma planının gözden geçirilmesi ve yeni üyelerin oryantasyonu.', 'Kulüp Yönetimi', 'Rehberlik Servisi'],
        ['Mart', '14 Mart Pi Günü Şenliği ve Okul İçi Pi Sayısı Ezberleme Yarışması düzenlenmesi.', 'Kulüp Başkanı & Üyeler', 'Görsel Sanatlar & Müzik'],
        ['Nisan', '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlama etkinliklerine katılım.', 'Tüm Kulüp', 'Kültür Edebiyat Kulübü'],
        ['Mayıs', 'Yıl Sonu Akıl ve Zeka Oyunları Şampiyonası finali ve kupa töreni.', 'Danışman Öğretmen', 'Okul Aile Birliği'],
        ['Haziran', 'Yıl sonu faaliyet raporunun düzenlenmesi ve kulüp evraklarının arşivlenmesi.', 'Danışman Öğretmen', 'Okul Müdürü']
      ],
      signatures: [
        { role: 'Danışman Öğretmen', name: data.consultantTeacher || 'Uğur YAŞAYAN' },
        { role: 'Kulüp Temsilcisi Öğrenci', name: 'Ahmet YILMAZ' },
        { role: 'Okul Müdürü (Onay)', name: data.principalName || 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 4. VELİ TOPLANTISI TUTANAĞI =================
  {
    id: 'veli_toplantisi',
    category: 'Kulüp & Rehberlik',
    title: '1. Dönem Veli Toplantısı Tutanağı ve İmza Sirküsü',
    shortDesc: 'Sınıf veli toplantısı gündem maddeleri, alınan kararlar ve veli imza tablosu',
    filenamePrefix: '1_Donem_Veli_Toplantisi_Tutanagi',
    tags: ['Veli Toplantısı', 'İmza Sirküsü', 'Sınıf Rehberliği'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'academicYear', label: 'Eğitim Yılı', type: 'text', defaultValue: '2024-2025' },
      { key: 'className', label: 'Sınıf / Şube', type: 'text', defaultValue: '5/A' },
      { key: 'meetingDate', label: 'Toplantı Tarihi', type: 'date', defaultValue: '2024-10-12' },
      { key: 'classTeacher', label: 'Sınıf Rehber Öğretmeni', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'principalName', label: 'Okul Müdürü', type: 'text', defaultValue: 'Mustafa ÖZKAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU'}`,
      header: [
        `${data.academicYear || '2024-2025'} EĞİTİM ÖĞRETİM YILI`,
        `${data.className || '5/A'} SINIFI 1. DÖNEM VELİ TOPLANTISI TOPLANTI VE KARAR TUTANAĞI`,
        `Tarih: ${data.meetingDate || '12.10.2024'} | Yer: 5/A Dersliği | Toplantı Başkanı: ${data.classTeacher || 'Uğur YAŞAYAN'}`
      ],
      agendaItems: [
        '1. Açılış, yoklama ve veli tanışması.',
        '2. Okul kuralları, kılık-kıyafet düzeni ve ders giriş-çıkış saatleri hakkında bilgilendirme.',
        '3. Öğrenci devam-devamsızlık durumları ve MEB yönetmelik hükümleri.',
        '4. Beslenme, uyku düzeni ve dijital ekran/telefon kullanımının sınırlandırılması.',
        '5. Ders çalışma alışkanlıkları, ödev takibi ve veli-öğretmen iletişim saatleri.',
        '6. Sınıf veli temsilcisi seçimi.',
        '7. Dilek ve temenniler.'
      ],
      decisions: [
        '1. Velilerin sabah ders başlama saatinden en az 10 dakika önce öğrencilerini okula göndermeleri hususunda mutabık kalındı.',
        '2. Akıllı telefonların ders saatlerinde idareye teslim edildiği hatırlatıldı; evde tablet/telefon süresinin 1 saat ile sınırlandırılması tavsiye edildi.',
        '3. Öğrencilerin her gün düzenli 30 dakika kitap okumalarının veli tarafından teşvik edilmesi kararlaştırıldı.',
        '4. Sınıf veli temsilcisi olarak oy birliğiyle Sayın Ayşe KAYA seçilmiştir.'
      ],
      signatures: [
        { role: 'Sınıf Rehber Öğretmeni', name: data.classTeacher || 'Uğur YAŞAYAN' },
        { role: 'Sınıf Veli Temsilcisi', name: 'Ayşe KAYA' },
        { role: 'Okul Müdürü', name: data.principalName || 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 5. SINAV ANALİZ ÖLÇEĞİ =================
  {
    id: 'sinav_analizi',
    category: 'Sınav & Ölçek',
    title: 'MEB Ortak Yazılı Sınav Kazanım Başarı Analiz Ölçeği',
    shortDesc: 'Soru bazlı kazanım başarı yüzdesi ve öğrenilemeyen konuların analizi',
    filenamePrefix: 'Yazili_Sinav_Analiz_Formu',
    tags: ['Sınav Analizi', 'Ölçme Değerlendirme', 'MEB Ortak Sınav'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'academicYear', label: 'Eğitim Yılı', type: 'text', defaultValue: '2024-2025' },
      { key: 'examName', label: 'Sınav Adı', type: 'text', defaultValue: '1. Dönem 1. Ortak Yazılı Sınavı' },
      { key: 'subject', label: 'Ders', type: 'text', defaultValue: 'Matematik' },
      { key: 'className', label: 'Sınıf / Şube', type: 'text', defaultValue: '7/B' },
      { key: 'totalStudents', label: 'Sınava Giren Öğrenci Sayısı', type: 'number', defaultValue: '28' },
      { key: 'classAverage', label: 'Sınıf Not Ortalaması', type: 'text', defaultValue: '76.4' },
      { key: 'teacherName', label: 'Ders Öğretmeni', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'principalName', label: 'Okul Müdürü', type: 'text', defaultValue: 'Mustafa ÖZKAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU'}`,
      header: [
        `${data.academicYear || '2024-2025'} EĞİTİM ÖĞRETİM YILI ${data.className || '7/B'} ŞUBESİ`,
        `${data.subject?.toUpperCase() || 'MATEMATİK'} DERSİ ${data.examName?.toUpperCase() || '1. DÖNEM 1. YAZILI'} KAZANIM ANALİZ FORMU`,
        `Sınava Giren: ${data.totalStudents || '28'} | Sınıf Ortalaması: ${data.classAverage || '76.4'} | Tarih: ${new Date().toLocaleDateString('tr-TR')}`
      ],
      tableColumns: ['Soru No', 'İlgili Kazanım Kodu ve Açıklaması', 'Soru Puanı', 'Doğru Yapan (%)', 'Başarı Seviyesi', 'Alınacak Tedbir'],
      tableRows: [
        ['1', 'M.7.1.1.1. Tam sayılarla toplama ve çıkarma işlemlerini yapar.', '10', '%88', 'Çok Yüksek', 'Pekiştirildi.'],
        ['2', 'M.7.1.1.2. Tam sayılarla çarpma ve bölme işlemlerini yapar.', '10', '%82', 'Yüksek', 'İşlem hatası yapanlara dönüt verildi.'],
        ['3', 'M.7.1.1.3. Tam sayıların tekrarlı çarpımını üslü nicelik olarak yazar.', '10', '%68', 'Orta', 'Negatif üsler tekrar edilecek.'],
        ['4', 'M.7.1.1.4. Tam sayılarla işlemler gerektiren problemleri çözer.', '15', '%54', 'Geliştirilmeli', 'Problem kurma ve modelleme yapılacak.'],
        ['5', 'M.7.1.2.1. Rasyonel sayıları tanır ve sayı doğrusunda gösterir.', '15', '%75', 'Yüksek', 'Kesir çizgisi ayrımı sağlandı.'],
        ['6', 'M.7.1.2.2. Rasyonel sayıların ondalık gösterimlerini belirler.', '20', '%79', 'Yüksek', 'Devirli sayılar kavratıldı.'],
        ['7', 'M.7.1.2.3. Rasyonel sayıları sıralar ve karşılaştırır.', '20', '%71', 'İyi', 'Payda eşitleme pratikleri artırılacak.']
      ],
      decisions: [
        '1. Sınıf genel başarı ortalaması %76.4 ile MEB hedef başarı bandı dahilindedir.',
        '2. En düşük başarı oranı (%54) 4. soruda (Tam sayılarla çok adımlı problemler) görülmüştür.',
        '3. Bu kazanım için önümüzdeki 2 hafta boyunca ders başlangıcında 5 dakikalık "Günün Problemi" mikro-etkinliği uygulanacaktır.'
      ],
      signatures: [
        { role: 'Ders Öğretmeni', name: data.teacherName || 'Uğur YAŞAYAN' },
        { role: 'Zümre Başkanı', name: 'Uğur YAŞAYAN' },
        { role: 'Okul Müdürü (İnceledi)', name: data.principalName || 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 6. PROJE / PERFORMANS ÖLÇEĞİ =================
  {
    id: 'proje_rubrik',
    category: 'Sınav & Ölçek',
    title: 'Proje ve Performans Görevi Değerlendirme Rubriği',
    shortDesc: 'Analitik dereceli puanlama anahtarı (Kriter bazlı puanlama)',
    filenamePrefix: 'Performans_Proje_Degerlendirme_Olcegi',
    tags: ['Proje Ölçeği', 'Performans', 'Rubrik', 'Notlandırma'],
    fields: [
      { key: 'schoolName', label: 'Okul Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu' },
      { key: 'subject', label: 'Ders', type: 'text', defaultValue: 'Matematik' },
      { key: 'taskTitle', label: 'Görev Konusu', type: 'text', defaultValue: 'Geometrik Cisimler ve Günlük Hayat Modellemesi' },
      { key: 'teacherName', label: 'Ders Öğretmeni', type: 'text', defaultValue: 'Uğur YAŞAYAN' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU'}`,
      header: [
        `${data.subject?.toUpperCase() || 'MATEMATİK'} DERSİ PERFORMANS / PROJE DEĞERLENDİRME ÖLÇEĞİ`,
        `Görev: ${data.taskTitle || 'Geometrik Modeller'} | Değerlendiren: ${data.teacherName || 'Uğur YAŞAYAN'}`
      ],
      tableColumns: ['Ölçüt No', 'Değerlendirme Kriteri', 'Maks. Puan', 'Öğrenci Puanı', 'Açıklama / Gözlem'],
      tableRows: [
        ['1', 'Araştırma ve Veri Toplama: Konuya uygun kaynakların incelenmesi', '15', '', ''],
        ['2', 'Matematiksel Doğruluk: İşlem ve formüllerin hatasız uygulanması', '25', '', ''],
        ['3', 'Özgünlük ve Yaratıcılık: Modelin kendine has tasarım özellikleri', '20', '', ''],
        ['4', 'Zaman Yönetimi: Belirlenen teslim takvimine tam uyum', '15', '', ''],
        ['5', 'Sunum ve Rapor Düzeni: Temiz, okunaklı ve estetik dokümantasyon', '15', '', ''],
        ['6', 'Ders İçi Süreç ve İşbirliği: Öğrencinin süreçteki gayreti ve ilgisi', '10', '', ''],
        ['TOPLAM', 'TÜM KRİTERLER TOPLAMI', '100', '', '']
      ],
      signatures: [
        { role: 'Ders Öğretmeni', name: data.teacherName || 'Uğur YAŞAYAN' },
        { role: 'Okul Müdürü', name: 'Mustafa ÖZKAN' }
      ]
    })
  },

  // ================= 7. DİLEKÇE VE NÖBET =================
  {
    id: 'mazeret_izni',
    category: 'Dilekçeler & Nöbet',
    title: 'Öğretmen Mazeret İzni Dilekçesi',
    shortDesc: '657 Sayılı DMK gereği mazeret izin talep dilekçesi',
    filenamePrefix: 'Mazeret_Izni_Dilekcesi',
    tags: ['Dilekçe', 'Mazeret İzni', '657', 'Resmi Başvuru'],
    fields: [
      { key: 'schoolName', label: 'Okul Müdürlüğü Adı', type: 'text', defaultValue: 'Alparslan Ortaokulu Müdürlüğüne' },
      { key: 'teacherName', label: 'Öğretmen Adı Soyadı', type: 'text', defaultValue: 'Uğur YAŞAYAN' },
      { key: 'tcNo', label: 'T.C. Kimlik No', type: 'text', defaultValue: '12345678901' },
      { key: 'branch', label: 'Branşı / Görevi', type: 'text', defaultValue: 'Matematik Öğretmeni' },
      { key: 'leaveDays', label: 'İzin İstenen Gün Sayısı', type: 'number', defaultValue: '2' },
      { key: 'startDate', label: 'İzin Başlangıç Tarihi', type: 'date', defaultValue: '2024-10-21' },
      { key: 'reason', label: 'Mazeret Açıklaması', type: 'textarea', defaultValue: 'Özel ailevi mazeretim sebebiyle' }
    ],
    contentGenerator: (data) => ({
      title: `${data.schoolName?.toUpperCase() || 'ALPARSLAN ORTAOKULU MÜDÜRLÜĞÜNE'}`,
      header: ['KONU: Mazeret İzni Talebi'],
      bodyText: `657 Sayılı Devlet Memurları Kanunu'nun 104. maddesinin (C) fıkrası uyarınca, ${data.reason || 'özel mazeretim'} nedeniyle ${data.startDate || '21.10.2024'} tarihinden itibaren ${data.leaveDays || '2'} gün süreyle mazeret izni kullanmak istiyorum.\n\nGereğini bilgilerinize arz ederim.`,
      signatures: [
        { role: `Adres: Okul İdaresi\nTel: 0500 000 00 00`, name: '' },
        { role: `${data.branch || 'Matematik Öğretmeni'}\nT.C: ${data.tcNo || '...'}\nTarih: ${new Date().toLocaleDateString('tr-TR')}`, name: data.teacherName || 'Uğur YAŞAYAN' }
      ]
    })
  }
];

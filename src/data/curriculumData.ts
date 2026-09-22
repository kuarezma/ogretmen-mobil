// MEB Müfredat ve Zengin Kazanım Deposu

export interface CurriculumItem {
  id: string;
  level: 'İlkokul' | 'Ortaokul' | 'Lise';
  grade: number; // 1-12
  subject: string; // Ders adı
  subjectKey: string;
  unitNumber: number;
  unitTitle: string;
  weekNumber: number; // 1-36
  code: string;
  description: string;
  notebookSnippet: string; // Sınıf defterine yazılacak kısa ve öz metin
  methods?: string[];
  tools?: string[];
  values?: string[];
}

export interface SubjectOption {
  key: string;
  name: string;
  grades: number[];
  level: 'İlkokul' | 'Ortaokul' | 'Lise';
  color: string;
}

export const SUBJECT_OPTIONS: SubjectOption[] = [
  { key: 'matematik', name: 'Matematik', grades: [5, 6, 7, 8], level: 'Ortaokul', color: 'bg-blue-600' },
  { key: 'turkce', name: 'Türkçe', grades: [5, 6, 7, 8], level: 'Ortaokul', color: 'bg-emerald-600' },
  { key: 'fen', name: 'Fen Bilimleri', grades: [5, 6, 7, 8], level: 'Ortaokul', color: 'bg-purple-600' },
  { key: 'sosyal', name: 'Sosyal Bilgiler', grades: [5, 6, 7], level: 'Ortaokul', color: 'bg-amber-600' },
  { key: 'inkilap', name: 'T.C. İnkılap Tarihi', grades: [8], level: 'Ortaokul', color: 'bg-red-600' },
  { key: 'ingilizce', name: 'İngilizce', grades: [5, 6, 7, 8], level: 'Ortaokul', color: 'bg-sky-600' },
  { key: 'din', name: 'Din Kültürü ve Ahlak Bilgisi', grades: [5, 6, 7, 8], level: 'Ortaokul', color: 'bg-teal-600' },
  { key: 'bilisim', name: 'Bilişim Teknolojileri', grades: [5, 6], level: 'Ortaokul', color: 'bg-indigo-600' },
  
  // İlkokul
  { key: 'ilkokul_matematik', name: 'İlkokul Matematik', grades: [1, 2, 3, 4], level: 'İlkokul', color: 'bg-blue-500' },
  { key: 'ilkokul_turkce', name: 'İlkokul Türkçe', grades: [1, 2, 3, 4], level: 'İlkokul', color: 'bg-emerald-500' },
  { key: 'hayat_bilgisi', name: 'Hayat Bilgisi', grades: [1, 2, 3], level: 'İlkokul', color: 'bg-orange-500' },
  { key: 'fen_4', name: 'Fen Bilimleri (4. Sınıf)', grades: [4], level: 'İlkokul', color: 'bg-purple-500' },

  // Lise
  { key: 'lise_matematik', name: 'Lise Matematik', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-blue-700' },
  { key: 'edebiyat', name: 'Türk Dili ve Edebiyatı', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-rose-600' },
  { key: 'fizik', name: 'Fizik', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-cyan-700' },
  { key: 'kimya', name: 'Kimya', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-violet-700' },
  { key: 'biyoloji', name: 'Biyoloji', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-lime-700' },
  { key: 'tarih', name: 'Tarih', grades: [9, 10, 11, 12], level: 'Lise', color: 'bg-yellow-700' },
];

export const CURRICULUM_DATA: CurriculumItem[] = [
  // ================= 5. SINIF MATEMATİK (Türkiye Yüzyılı Maarif Modeli & MEB) =================
  {
    id: 'mat5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 1,
    code: 'M.5.1.1.1',
    description: 'En çok dokuz basamaklı doğal sayıları okur ve yazar.',
    notebookSnippet: 'M.5.1.1.1. Dokuz basamaklı doğal sayıların bölük ve basamak kavramları işlendi, okuma ve yazma alıştırmaları yapıldı.',
    methods: ['Anlatım', 'Soru-Cevap', 'Modelleme', 'Grup Çalışması'],
    tools: ['Ders Kitabı', 'Basamak Tablosu', 'Akıllı Tahta'],
    values: ['Sorumluluk', 'Sabır', 'Çalışkanlık']
  },
  {
    id: 'mat5_w2',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 2,
    code: 'M.5.1.1.2',
    description: 'En çok dokuz basamaklı doğal sayıların basamak değeri ile basamaktaki rakamın değerini ilişkilendirir.',
    notebookSnippet: 'M.5.1.1.2. Basamak ve sayı değeri kavramları incelendi, basamak değerleri toplamı olarak çözümleme yapıldı.',
    methods: ['Örnek Olay', 'Tartışma', 'Buluş Yolu'],
    tools: ['Basamak Kartları', 'Çalışma Yaprağı'],
    values: ['Öz Denetim', 'Dürüstlük']
  },
  {
    id: 'mat5_w3',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 3,
    code: 'M.5.1.1.3',
    description: 'Kuralı verilen sayı ve şekil örüntülerinin istenen adımlarını belirler.',
    notebookSnippet: 'M.5.1.1.3. Sayı ve şekil örüntülerinin kuralını bulma ve eksik adımları tamamlama etkinlikleri yapıldı.',
    methods: ['Oyun Temelli Öğrenme', 'Problem Çözme'],
    tools: ['Örüntü Blokları', 'Ders Kitabı'],
    values: ['Sabır', 'Estetik']
  },
  {
    id: 'mat5_w4',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 4,
    code: 'M.5.1.2.1',
    description: 'En çok beş basamaklı doğal sayılarla toplama ve çıkarma işlemi yapar.',
    notebookSnippet: 'M.5.1.2.1. Doğal sayılarda eldesiz ve eldeli toplama ile onluk bozarak çıkarma işlemleri pekiştirildi.',
    methods: ['Gösterip Yaptırma', 'Bireysel Çalışma'],
    tools: ['İşlem Kağıtları', 'Akıllı Tahta'],
    values: ['Çalışkanlık', 'Yardımseverlik']
  },
  {
    id: 'mat5_w5',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 5,
    code: 'M.5.1.2.2',
    description: 'İki basamaklı iki doğal sayının çarpma işlemini yapar; üç basamaklı doğal sayıları iki basamaklı doğal sayılarla çarpar.',
    notebookSnippet: 'M.5.1.2.2. Çok basamaklı doğal sayılarla çarpma işleminin basamak kaydırma mantığı kavratıldı ve örnekler çözüldü.',
    methods: ['Model Yoluyla Öğrenme', 'Alıştırma'],
    tools: ['Çarpım Tablosu', 'Çalışma Fasikülü'],
    values: ['Öz Denetim']
  },
  {
    id: 'mat5_w6',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 6,
    code: 'M.5.1.2.3',
    description: 'En çok dört basamaklı bir doğal sayıyı, en çok iki basamaklı bir doğal sayıya böler.',
    notebookSnippet: 'M.5.1.2.3. Doğal sayılarda kalansız ve kalanlı bölme işlemi kuralları uygulandı, bölünen-bölen-bölüm-kalan ilişkisi incelendi.',
    methods: ['Problem Tabanlı Öğrenme'],
    tools: ['Ders Kitabı', 'Problem Çözme Kartları'],
    values: ['Sorumluluk', 'Adalet']
  },
  {
    id: 'mat5_w7',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 7,
    code: 'M.5.1.2.4',
    description: 'Doğal sayılarla zihinden toplama ve çıkarma işlemlerinde stratejiler kullanır.',
    notebookSnippet: 'M.5.1.2.4. Zihinden işlem stratejileri (onluk tamamlama, basamaklarına ayırma) paylaşıldı ve hız alıştırmaları yapıldı.',
    methods: ['Beyin Fırtınası', 'Hızlı Yanıtlama'],
    tools: ['Zihin Kartları'],
    values: ['Özgüven']
  },
  {
    id: 'mat5_w8',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Doğal Sayılar ve İşlemler',
    weekNumber: 8,
    code: 'M.5.1.2.5',
    description: 'Doğal sayılarla dört işlem yapmayı gerektiren problemleri çözer.',
    notebookSnippet: 'M.5.1.2.5. Günlük hayat durumlarına uygun dört işlem gerektiren problemler çözüldü, problem kurma çalışmaları yapıldı.',
    methods: ['Polya Problem Çözme Basamakları'],
    tools: ['Yeni Nesil Soru Kağıtları'],
    values: ['Sabır', 'Azim']
  },

  // ================= 6. SINIF MATEMATİK =================
  {
    id: 'mat6_w1',
    level: 'Ortaokul',
    grade: 6,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Sayılar ve İşlemler',
    weekNumber: 1,
    code: 'M.6.1.1.1',
    description: 'Bir doğal sayının kendisiyle tekrarlı çarpımını üslü ifade olarak yazar ve değerini hesaplar.',
    notebookSnippet: 'M.6.1.1.1. Üslü nicelikler kavramı tanıtıldı; taban ve üs kavramları incelendi, üslü ifadelerin değerleri hesaplandı.',
    methods: ['Buluş Yolu', 'Görselleştirme'],
    tools: ['Üslü Sayı Modelleri', 'Ders Kitabı'],
    values: ['Çalışkanlık']
  },
  {
    id: 'mat6_w2',
    level: 'Ortaokul',
    grade: 6,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Sayılar ve İşlemler',
    weekNumber: 2,
    code: 'M.6.1.1.2',
    description: 'İşlem önceliğini dikkate alarak doğal sayılarla dört işlem yapar.',
    notebookSnippet: 'M.6.1.1.2. İşlem önceliği kuralları (Üs, Parantez, Çarpma/Bölme, Toplama/Çıkarma) kavratıldı, alıştırmalar çözüldü.',
    methods: ['Soru-Cevap', 'Örnekleme'],
    tools: ['Akıllı Tahta', 'İşlem Sırası Kartları'],
    values: ['Öz Denetim']
  },
  {
    id: 'mat6_w3',
    level: 'Ortaokul',
    grade: 6,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Sayılar ve İşlemler',
    weekNumber: 3,
    code: 'M.6.1.1.3',
    description: 'Doğal sayılarda ortak çarpan parantezine alma ve dağılma özelliğini uygulamaya yönelik işlemler yapar.',
    notebookSnippet: 'M.6.1.1.3. Çarpmanın toplama ve çıkarma üzerine dağılma özelliği ile ortak çarpan parantezine alma etkinlikleri yapıldı.',
    methods: ['Modelleme', 'Tartışma'],
    tools: ['Alan Modeli Şemaları'],
    values: ['İşbirliği']
  },
  {
    id: 'mat6_w4',
    level: 'Ortaokul',
    grade: 6,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Sayılar ve İşlemler',
    weekNumber: 4,
    code: 'M.6.1.2.1',
    description: 'Doğal sayıların çarpanlarını ve katlarını belirler.',
    notebookSnippet: 'M.6.1.2.1. Bir doğal sayının çarpanları (bölenleri) ve katları gökkuşağı yöntemi ile listelendi, örneklerle pekiştirildi.',
    methods: ['Keşfetme', 'Alıştırma'],
    tools: ['Çarpan Tablosu'],
    values: ['Sabır']
  },

  // ================= 7. SINIF MATEMATİK =================
  {
    id: 'mat7_w1',
    level: 'Ortaokul',
    grade: 7,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Tam Sayılarla İşlemler',
    weekNumber: 1,
    code: 'M.7.1.1.1',
    description: 'Tam sayılarla toplama ve çıkarma işlemlerini yapar, ilgili problemleri çözer.',
    notebookSnippet: 'M.7.1.1.1. Tam sayılarda toplama ve çıkarma kuralları sayı doğrusu ve sayma pulları ile modellendi, problemler çözüldü.',
    methods: ['Somutlaştırma', 'Modelleme'],
    tools: ['Sayma Pulları', 'Termometre Modeli'],
    values: ['Dürüstlük', 'Öz Denetim']
  },
  {
    id: 'mat7_w2',
    level: 'Ortaokul',
    grade: 7,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Tam Sayılarla İşlemler',
    weekNumber: 2,
    code: 'M.7.1.1.2',
    description: 'Tam sayılarla çarpma ve bölme işlemlerini yapar.',
    notebookSnippet: 'M.7.1.1.2. Tam sayılarda işaret kuralları (aynı işaretlilerin çarpımı pozitif, zıt işaretlilerin negatif) işlendi.',
    methods: ['Gösterip Yaptırma', 'Alıştırma'],
    tools: ['İşaret Çarkı', 'Ders Kitabı'],
    values: ['Çalışkanlık']
  },
  {
    id: 'mat7_w3',
    level: 'Ortaokul',
    grade: 7,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Tam Sayılarla İşlemler',
    weekNumber: 3,
    code: 'M.7.1.1.3',
    description: 'Tam sayıların kendileri ile tekrarlı çarpımını üslü nicelik olarak ifade eder.',
    notebookSnippet: 'M.7.1.1.3. Negatif sayıların çift ve tek kuvvetleri arasındaki işaret farklılıkları parantez kullanımıyla örneklendirildi.',
    methods: ['Karşılaştırmalı Analiz'],
    tools: ['Akıllı Tahta Sunusu'],
    values: ['Dikkat']
  },

  // ================= 8. SINIF MATEMATİK (LGS Kapsamı) =================
  {
    id: 'mat8_w1',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Çarpanlar ve Katlar / Üslü İfadeler',
    weekNumber: 1,
    code: 'M.8.1.1.1',
    description: 'Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, pozitif tam sayıların pozitif tam sayı çarpanlarını üslü ifadelerin çarpımı şeklinde yazar.',
    notebookSnippet: 'M.8.1.1.1. Pozitif tam sayıların asal çarpanlarına ayrılması (bölen listesi ve çarpan ağacı) kavratıldı, üslü çarpım yazımı yapıldı.',
    methods: ['Problem Tabanlı Öğrenme', 'Doğrudan Anlatım'],
    tools: ['LGS Beceri Temelli Sorular', 'Ders Kitabı'],
    values: ['Çalışkanlık', 'Hedef Belirleme']
  },
  {
    id: 'mat8_w2',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Çarpanlar ve Katlar / Üslü İfadeler',
    weekNumber: 2,
    code: 'M.8.1.1.2',
    description: 'İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer.',
    notebookSnippet: 'M.8.1.1.2. EBOB ve EKOK kavramlarının pratik hesaplanması ve günlük hayat problem durumlarındaki ayrımı işlendi.',
    methods: ['Model Çözümleme', 'Soru-Cevap'],
    tools: ['EBOB-EKOK Problem Kartları'],
    values: ['Sabır', 'Azim']
  },
  {
    id: 'mat8_w3',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Çarpanlar ve Katlar / Üslü İfadeler',
    weekNumber: 3,
    code: 'M.8.1.1.3',
    description: 'Verilen iki doğal sayının aralarında asal olup olmadığını belirler.',
    notebookSnippet: 'M.8.1.1.3. Aralarında asal sayılar kavramı, ardışık sayıların özellikleri ve asal sayı ile arasındaki farklar analiz edildi.',
    methods: ['Tartışma', 'Örnekleme'],
    tools: ['Kavram Haritası'],
    values: ['Dürüstlük']
  },
  {
    id: 'mat8_w4',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Matematik',
    subjectKey: 'matematik',
    unitNumber: 1,
    unitTitle: 'Çarpanlar ve Katlar / Üslü İfadeler',
    weekNumber: 4,
    code: 'M.8.1.2.1',
    description: 'Tam sayıların, tam sayı kuvvetlerini hesaplar.',
    notebookSnippet: 'M.8.1.2.1. Negatif kuvvet kavramı, kesir ile ters çevirme ilişkisi ve sıfırıncı kuvvet özellikleri pekiştirildi.',
    methods: ['Alıştırma', 'Analiz'],
    tools: ['Formül Kartları'],
    values: ['Özgüven']
  },

  // ================= 5-8 TÜRKÇE =================
  {
    id: 'tur5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Türkçe',
    subjectKey: 'turkce',
    unitNumber: 1,
    unitTitle: 'Okuma - Anlama ve Söz Varlığı',
    weekNumber: 1,
    code: 'T.5.1.1',
    description: 'Kelimelerin gerçek, mecaz ve terim anlamlarını ayırt eder.',
    notebookSnippet: 'T.5.1.1. Metin içindeki kelimelerin gerçek, mecaz ve terim anlamları incelendi, sözlük kullanma becerisi geliştirildi.',
    methods: ['Metin İnceleme', 'Sözlük Çalışması'],
    tools: ['TDK Türkçe Sözlük', 'Ders Kitabı'],
    values: ['Sevgi', 'Kültürel Miras']
  },
  {
    id: 'tur6_w2',
    level: 'Ortaokul',
    grade: 6,
    subject: 'Türkçe',
    subjectKey: 'turkce',
    unitNumber: 1,
    unitTitle: 'Dil Bilgisi',
    weekNumber: 2,
    code: 'T.6.3.5',
    description: 'İsim ve sıfat tamlamalarının metnin anlamına olan katkısını açıklar.',
    notebookSnippet: 'T.6.3.5. Belirtili, belirtisiz isim tamlamaları ile niteleme ve belirtme sıfat tamlamaları etkinliklerle işlendi.',
    methods: ['Uygulama', 'Cümle Tahlili'],
    tools: ['Etkinlik Kağıtları'],
    values: ['Vatanseverlik']
  },
  {
    id: 'tur8_w1',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Türkçe',
    subjectKey: 'turkce',
    unitNumber: 1,
    unitTitle: 'Fiilimsiler',
    weekNumber: 1,
    code: 'T.8.3.1',
    description: 'Fiilimsilerin cümledeki işlevlerini fark eder ve türlerini ayırt eder.',
    notebookSnippet: 'T.8.3.1. İsim-fiil, sıfat-fiil ve zarf-fiil ekleri metinler üzerinden tespit edildi, fiilimsi eklerinin işlevleri kavratıldı.',
    methods: ['Metin Analizi', 'Soru Çözümü'],
    tools: ['LGS Türkçe Soru Bankası'],
    values: ['Sorumluluk']
  },

  // ================= 5-8 FEN BİLİMLERİ =================
  {
    id: 'fen5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Fen Bilimleri',
    subjectKey: 'fen',
    unitNumber: 1,
    unitTitle: 'Güneş, Dünya ve Ay',
    weekNumber: 1,
    code: 'F.5.1.1.1',
    description: 'Güneş’in yapısı ve dönme hareketi hakkında bilgi toplar ve sunar.',
    notebookSnippet: 'F.5.1.1.1. Güneşin geometrik şekli, katmanları ve kendi ekseni etrafındaki dönme hareketi görsel modellerle açıklandı.',
    methods: ['Gözlem', 'Model Geliştirme'],
    tools: ['Gezegen Modelleri', 'Video Gösterimi'],
    values: ['Merak', 'Bilimsellik']
  },
  {
    id: 'fen7_w1',
    level: 'Ortaokul',
    grade: 7,
    subject: 'Fen Bilimleri',
    subjectKey: 'fen',
    unitNumber: 1,
    unitTitle: 'Güneş Sistemi ve Ötesi',
    weekNumber: 1,
    code: 'F.7.1.1.1',
    description: 'Uzay teknolojilerini açıklar ve uzay kirliliğinin nedenlerini sorgular.',
    notebookSnippet: 'F.7.1.1.1. Yapay uydular, uzay istasyonları ve roketler tanıtıldı; uzay kirliliğinin oluşturduğu riskler tartışıldı.',
    methods: ['Tartışma', 'Proje Temelli'],
    tools: ['Uzay Görselleri', 'Simülasyon'],
    values: ['Çevre Bilinci', 'Evrensellik']
  },
  {
    id: 'fen8_w1',
    level: 'Ortaokul',
    grade: 8,
    subject: 'Fen Bilimleri',
    subjectKey: 'fen',
    unitNumber: 1,
    unitTitle: 'Mevsimler ve İklim',
    weekNumber: 1,
    code: 'F.8.1.1.1',
    description: 'Mevsimlerin oluşumuna yönelik tahminlerde bulunur.',
    notebookSnippet: 'F.8.1.1.1. Dünyanın dönme ekseni eğikliği ve Güneş etrafındaki dolanma hareketinin mevsim oluşumundaki etkisi incelendi.',
    methods: ['Deney ve Gözlem', 'Modelleme'],
    tools: ['Küre Modeli', 'Işık Kaynağı'],
    values: ['Araştırmacılık']
  },

  // ================= 5-7 SOSYAL BİLGİLER & 8 İNKILAP =================
  {
    id: 'sos5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Sosyal Bilgiler',
    subjectKey: 'sosyal',
    unitNumber: 1,
    unitTitle: 'Birlikte Yaşıyoruz',
    weekNumber: 1,
    code: 'SB.5.1.1',
    description: 'Sosyal Bilgiler dersinin, Türkiye Cumhuriyeti’nin etkin bir vatandaşı olarak gelişimine katkısını fark eder.',
    notebookSnippet: 'SB.5.1.1. Etkin vatandaşlık bilinci, hak ve sorumluluklarımız ile Sosyal Bilgiler dersinin önemi tartışıldı.',
    methods: ['Soru-Cevap', 'Örnek Olay'],
    tools: ['Ders Kitabı'],
    values: ['Vatanseverlik', 'Sorumluluk']
  },
  {
    id: 'ink8_w1',
    level: 'Ortaokul',
    grade: 8,
    subject: 'T.C. İnkılap Tarihi',
    subjectKey: 'inkilap',
    unitNumber: 1,
    unitTitle: 'Bir Kahraman Doğuyor',
    weekNumber: 1,
    code: 'İTA.8.1.1',
    description: 'Avrupa’daki gelişmelerin yansımaları bağlamında Osmanlı Devleti’nin 20. yüzyıl başlarındaki siyasi ve sosyal durumunu kavrar.',
    notebookSnippet: 'İTA.8.1.1. Sanayi İnkılabı ve Fransız İhtilali’nin Osmanlıya etkileri, sömürgecilik ve azınlık isyanları analiz edildi.',
    methods: ['Tarihsel Analiz', 'Harita Okuma'],
    tools: ['Tarih Haritaları', 'Belgesel'],
    values: ['Tarih Bilinci', 'Milli Birlik']
  },

  // ================= İNGİLİZCE =================
  {
    id: 'ing5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'İngilizce',
    subjectKey: 'ingilizce',
    unitNumber: 1,
    unitTitle: 'Hello!',
    weekNumber: 1,
    code: 'E5.1.L1',
    description: 'Students will be able to understand simple personal information.',
    notebookSnippet: 'E5.1.L1. Selamlaşma, kendini tanıtma, milliyet ve dillerle ilgili diyalog alıştırmaları yapıldı (Greeting & Personal info).',
    methods: ['Role Play', 'Listening'],
    tools: ['Audio Track', 'Flashcards'],
    values: ['Saygı', 'Kültürlerarası İletişim']
  },

  // ================= DİN KÜLTÜRÜ =================
  {
    id: 'din5_w1',
    level: 'Ortaokul',
    grade: 5,
    subject: 'Din Kültürü',
    subjectKey: 'din',
    unitNumber: 1,
    unitTitle: 'Allah İnancı',
    weekNumber: 1,
    code: 'DKAB.5.1.1',
    description: 'Evrendeki mükemmel düzen ile Allah’ın varlığı ve birliği arasında ilişki kurar.',
    notebookSnippet: 'DKAB.5.1.1. Evrendeki ölçü, nizam ve ahenk örnekleri incelenerek tevhid inancı ve Allah’ın sıfatları işlendi.',
    methods: ['Sohbet', 'Düşünme-Eşleşme'],
    tools: ['Ayet Mealleri'],
    values: ['Sevgi', 'Şükür']
  },

  // ================= LİSE DÜZEYİ (9. Sınıf Matematik & Edebiyat) =================
  {
    id: 'lise_mat9_w1',
    level: 'Lise',
    grade: 9,
    subject: 'Matematik',
    subjectKey: 'lise_matematik',
    unitNumber: 1,
    unitTitle: 'Mantık',
    weekNumber: 1,
    code: 'MAT.9.1.1.1',
    description: 'Önermeyi, önermenin doğruluk değerini, iki önermenin denkliğini ve önermenin olumsuzunu açıklar.',
    notebookSnippet: 'MAT.9.1.1.1. Önerme kavramı, doğruluk tablosu oluşturma, denk önermeler ve değili kavramı işlendi.',
    methods: ['Tümdengelim', 'Problem Çözme'],
    tools: ['Ders Kitabı', 'Doğruluk Tabloları'],
    values: ['Mantıksal Muhakeme', 'Dürüstlük']
  },
  {
    id: 'lise_edb9_w1',
    level: 'Lise',
    grade: 9,
    subject: 'Türk Dili ve Edebiyatı',
    subjectKey: 'edebiyat',
    unitNumber: 1,
    unitTitle: 'Giriş',
    weekNumber: 1,
    code: 'TDE.9.1.1',
    description: 'Edebiyatın bilimle ve güzel sanatlarla ilişkisini açıklar.',
    notebookSnippet: 'TDE.9.1.1. Edebiyatın tanımı, güzel sanatlar içindeki yeri, tarih ve coğrafya bilimleriyle ilişkisi incelendi.',
    methods: ['Metin İnceleme', 'Tartışma'],
    tools: ['Edebi Metinler Antolojisi'],
    values: ['Estetik Değerler', 'Kültürel Miras']
  }
];

// Belirli bir sınıf, ders ve haftaya göre kazanım getiren yardımcı fonksiyon
export function getCurriculumItem(grade: number, subjectKey: string, weekNumber: number): CurriculumItem | undefined {
  // Önce tam eşleşme ara
  let item = CURRICULUM_DATA.find(c => c.grade === grade && c.subjectKey === subjectKey && c.weekNumber === weekNumber);
  
  if (!item) {
    // Aynı sınıf ve derse ait en yakın kazanımı ara
    const subjectItems = CURRICULUM_DATA.filter(c => c.grade === grade && c.subjectKey === subjectKey);
    if (subjectItems.length > 0) {
      item = subjectItems[0];
    }
  }

  return item;
}

// Tüm ders seçeneklerini döndür
export function getSubjectsByLevel(level: 'İlkokul' | 'Ortaokul' | 'Lise') {
  return SUBJECT_OPTIONS.filter(s => s.level === level);
}

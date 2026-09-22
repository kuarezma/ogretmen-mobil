# 📱 Öğretmen Asistanı Mobil

> **Sınıf Defteri Kazanım Sihirbazı, Yıllık & Günlük Plan Kütüphanesi ve Resmi Evrak Merkezi**  
> MEB Müfredatı ve Türkiye Yüzyılı Maarif Modeline %100 Uyumlu, Sıfır Gecikmeli (0ms Client-Side), Çevrimdışı (PWA) Çalışabilen Mobil Öncelikli Web Uygulaması.

---

## 🌟 Öne Çıkan Özellikler

### 1. 📖 Sınıf Defteri Kazanım Sihirbazı (Kazanım Cepte)
- **Akıllı Takvim Algoritması:** MEB 36 haftalık çalışma takvimine göre aktif haftayı (örn. 3. Hafta, 1. Dönem) otomatik tespit eder.
- **Haftalık Ders Programı Entegrasyonu:** Kaydedilen ders programına göre "Bugünkü Dersiniz: 5/A Matematik" kartı anında ekranda belirir.
- **Tek Tıkla Kopyala:** Defter formatına uygun kısa ve öz metni (`5/A Matematik: M.5.1.1.1. Doğal sayılarda basamak kavramı işlendi...`) panoya kopyalar.
- **Zengin Filtreleme:** Kademe (İlkokul, Ortaokul, Lise), Sınıf (1-12) ve Branş bazında anında arama ve filtreleme.

### 2. 📂 36 Haftalık Yıllık ve Günlük Planlar
- **Kişiselleştirilmiş Çıktı:** Öğretmenin adı, branşı, okulu ve okul müdürü bilgileri otomatik olarak plan tablolarına ve imza bloklarına işlenir.
- **Microsoft Word (.docx) Desteği:** Saf istemci taraflı Word belgesi üretimi ile doğrudan bilgisayarınızda veya telefonunuzda açıp düzenleyebilirsiniz.
- **A4 PDF & Yazdırma:** MEB standartlarında yatay A4 tablolu PDF oluşturma ve tek tıkla yazdırma.
- **40 Dakikalık Günlük Ders Akış Planı:** Giriş, Keşfetme, Açıklama, Derinleştirme ve Değerlendirme aşamalarıyla MEB / 5E ders planı.

### 3. 📁 Resmi Öğretmen Evrak Merkezi
- **Zümre & ŞÖK Tutanakları:** 1. Dönem, 2. Dönem ve Sene Sonu Zümre Öğretmenler Kurulu ve ŞÖK hazır şablonları.
- **Sosyal Kulüp Dosyası:** Yıllık çalışma planı, karar defteri ve belirli gün/haftalar takvimi.
- **Veli Toplantısı:** Gündem maddeleri, kararlar ve veli imza sirküsü tablosu.
- **Ölçme ve Değerlendirme:** MEB Ortak Yazılı Sınav kazanım başarı analiz ölçeği ve analitik proje değerlendirme rubriği.
- **Resmi Dilekçeler:** Mazeret izni ve görev bildirim dilekçeleri.

### 4. ⚡ Sıfır Gecikme ve Çevrimdışı (Offline) PWA Mimarisi
- **Tam Bağımsızlık:** Veriler cihazınızın yerel depolama alanında (`LocalStorage`) saklanır. İnternetsiz ortamda (sınıfta, köy okulunda, bodrum katta) kesintisiz 0ms gecikmeyle çalışır.
- **Mobil Ergonomi:** iOS ve Android tasarım diline uygun alt gezinti çubuğu (Bottom Navigation Bar), dokunsal geri bildirim (haptic feeling) ve karanlık mod (Dark Mode) desteği.
- **Ana Ekrana Ekleme:** Tarayıcıdan "Ana Ekrana Ekle" seçeneğiyle yerel mobil uygulama gibi kullanılabilir.

---

## 🚀 Kurulum ve Geliştirme

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim için derleyin
npm run build

# Canlı önizleme
npm run preview
```

---

## 🛠️ Teknoloji Yığını

- **Çekirdek:** React 18 / 19, TypeScript, Vite
- **Tasarım:** Tailwind CSS, Lucide React Icons, Canvas Confetti
- **Belge Motoru:** `docx` (Word), `jspdf`, `jspdf-autotable`
- **Dağıtım:** GitHub Pages (Automated CI/CD & gh-pages)

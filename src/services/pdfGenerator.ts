// PDF Oluşturma ve Tarayıcı Yazdırma Servisi
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CurriculumItem } from '../data/curriculumData';
import { TeacherProfile } from './storage';

export const PdfGenerator = {
  // Yıllık Plan PDF'i Oluşturma (A4 Yatay Tablo)
  generateAnnualPlanPdf(
    items: CurriculumItem[],
    subjectName: string,
    grade: number,
    profile: TeacherProfile,
    academicYear = '2024-2025'
  ) {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Başlık
    doc.setFontSize(14);
    doc.setTextColor(31, 78, 121); // MEB lacivert
    doc.text(profile.schoolName.toUpperCase(), 148, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(`${academicYear} EĞİTİM-ÖĞRETİM YILI ${grade}. SINIF ${subjectName.toUpperCase()} DERSİ YILLIK ÇALIŞMA PLANI`, 148, 22, { align: 'center' });

    const tableData = [];
    for (let w = 1; w <= 36; w++) {
      const match = items.find(i => i.weekNumber === w) || items[0];
      tableData.push([
        `${w}. Hafta`,
        match.unitTitle,
        `${match.code}\n${match.description}`,
        (match.methods || ['Anlatım', 'Soru-Cevap']).join(', '),
        (match.tools || ['Ders Kitabı', 'Akıllı Tahta']).join(', ')
      ]);
    }

    autoTable(doc, {
      startY: 28,
      head: [['Hafta', 'Ünite / Konu', 'Kazanım ve Açıklamaları', 'Yöntem & Teknik', 'Araç & Gereç']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [31, 78, 121],
        textColor: 255,
        fontSize: 9,
        halign: 'center'
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 40 },
        2: { cellWidth: 120 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 }
      }
    });

    // İmza Bloğu
    const finalY = (doc as any).lastAutoTable.finalY + 12;
    if (finalY < 180) {
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(profile.name, 60, finalY, { align: 'center' });
      doc.text(profile.branch, 60, finalY + 5, { align: 'center' });
      doc.text('Ders Öğretmeni', 60, finalY + 10, { align: 'center' });

      doc.text('UYGUNDUR', 230, finalY, { align: 'center' });
      doc.text(profile.principalName, 230, finalY + 5, { align: 'center' });
      doc.text('Okul Müdürü', 230, finalY + 10, { align: 'center' });
    }

    doc.save(`${grade}_Sinif_${subjectName}_Yillik_Plani.pdf`);
  },

  // 40 Dakikalık Günlük Ders Planı PDF'i (A4 Dikey)
  generateDailyPlanPdf(
    item: CurriculumItem,
    profile: TeacherProfile,
    weekNumber: number,
    dateStr: string
  ) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(13);
    doc.setTextColor(31, 78, 121);
    doc.text(profile.schoolName.toUpperCase(), 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(`GÜNLÜK DERS AKIŞ PLANI (40 DAKİKA)`, 105, 22, { align: 'center' });

    const infoData = [
      ['Ders:', item.subject, 'Tarih / Hafta:', `${dateStr} / ${weekNumber}. Hafta`],
      ['Sınıf / Şube:', `${item.grade}. Sınıf`, 'Süre:', '40 Dakika (1 Ders Saati)'],
      ['Öğrenme Alanı:', item.unitTitle, 'Öğretmen:', profile.name],
      ['Kazanım Kodu:', item.code, 'Kazanım Metni:', item.description]
    ];

    autoTable(doc, {
      startY: 28,
      body: infoData,
      theme: 'plain',
      styles: { fontSize: 8.5, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 32 },
        1: { cellWidth: 60 },
        2: { fontStyle: 'bold', cellWidth: 32 },
        3: { cellWidth: 60 }
      }
    });

    const flowData = [
      [
        'GİRİŞ / DİKKAT ÇEKME\n(5 Dakika)',
        'Önceki derste öğrenilen kavramlar kısaca hatırlatılır.\nGünlük hayattan dikkat çekici bir soru veya görsel paylaşılarak öğrencilerin merak duygusu uyandırılır.'
      ],
      [
        'KEŞFETME & ETKİNLİK\n(15 Dakika)',
        `Kazanım (${item.code}) doğrultusunda somut modelleme veya örnek olay incelemesi yapılır.\nÖğrencilerin akıllı tahta üzerinden etkileşimli soruları çözmeleri sağlanır.`
      ],
      [
        'AÇIKLAMA & KAVRAMLAŞTIRMA\n(10 Dakika)',
        'Öğretmen tarafından temel tanım ve formüller tahtaya not ettirilir.\nKavram yanılgılarına değinilerek doğru matematiksel/bilimsel dil pekiştirilir.'
      ],
      [
        'DERİNLEŞTİRME & SORU ÇÖZÜMÜ\n(7 Dakika)',
        'Farklı zorluk seviyelerinde 2 adet açık uçlu veya beceri temelli soru çözülür.\nÖğrencilerin bağımsız çalışma kağıtları üzerindeki işlemleri kontrol edilir.'
      ],
      [
        'DEĞERLENDİRME & ÖZET\n(3 Dakika)',
        'Dersin kilit kavramları öğrencilerle birlikte 1 dakikada özetlenir.\nSınıf defterine kazanım işlenir ve sonraki ders hazırlığı belirtilir.'
      ]
    ];

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 6,
      head: [['Ders Aşaması & Süre', 'Pedagojik Etkinlik ve Öğretmen Yönergesi']],
      body: flowData,
      theme: 'striped',
      headStyles: { fillColor: [31, 78, 121], textColor: 255 },
      styles: { fontSize: 8.5, cellPadding: 3 }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(9);
    doc.text(profile.name, 50, finalY, { align: 'center' });
    doc.text(profile.branch, 50, finalY + 5, { align: 'center' });
    doc.text('(İmza)', 50, finalY + 10, { align: 'center' });

    doc.text(profile.principalName, 160, finalY, { align: 'center' });
    doc.text('Okul Müdürü', 160, finalY + 5, { align: 'center' });
    doc.text('(Onay)', 160, finalY + 10, { align: 'center' });

    doc.save(`${item.grade}_Sinif_${item.subject}_Gunluk_Plani.pdf`);
  }
};

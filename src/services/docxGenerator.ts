// Microsoft Word (.docx) Otomatik Belge Üretim Motoru
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType, BorderStyle, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { CurriculumItem } from '../data/curriculumData';
import { TeacherProfile } from './storage';

export const DocxGenerator = {
  // Yıllık Plan Word (.docx) Çıktısı Üretme
  async generateAnnualPlanDocx(
    items: CurriculumItem[],
    subjectName: string,
    grade: number,
    profile: TeacherProfile,
    academicYear = '2024-2025'
  ) {
    const tableHeader = new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hafta", bold: true, size: 20 })] })],
          shading: { fill: "1F4E79" }
        }),
        new TableCell({
          width: { size: 15, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ünite / Konu", bold: true, size: 20 })] })],
          shading: { fill: "1F4E79" }
        }),
        new TableCell({
          width: { size: 45, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Kazanım ve Açıklamaları", bold: true, size: 20 })] })],
          shading: { fill: "1F4E79" }
        }),
        new TableCell({
          width: { size: 15, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Yöntem & Teknik", bold: true, size: 20 })] })],
          shading: { fill: "1F4E79" }
        }),
        new TableCell({
          width: { size: 15, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Araç & Gereç", bold: true, size: 20 })] })],
          shading: { fill: "1F4E79" }
        })
      ]
    });

    const rows: TableRow[] = [tableHeader];

    for (let w = 1; w <= 36; w++) {
      const match = items.find(i => i.weekNumber === w) || items[0];
      const isEven = w % 2 === 0;

      rows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${w}. Hafta`, size: 18 })] })],
              shading: isEven ? { fill: "F1F5F9" } : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: match.unitTitle, size: 18 })] })],
              shading: isEven ? { fill: "F1F5F9" } : undefined
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${match.code}: `, bold: true, size: 18 }),
                    new TextRun({ text: match.description, size: 18 })
                  ]
                })
              ],
              shading: isEven ? { fill: "F1F5F9" } : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: (match.methods || ['Anlatım', 'Soru-Cevap']).join(', '), size: 18 })] })],
              shading: isEven ? { fill: "F1F5F9" } : undefined
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: (match.tools || ['Ders Kitabı', 'Akıllı Tahta']).join(', '), size: 18 })] })],
              shading: isEven ? { fill: "F1F5F9" } : undefined
            })
          ]
        })
      );
    }

    const planTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, bottom: 720, left: 720, right: 720 }
            }
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.TITLE,
              children: [new TextRun({ text: `${profile.schoolName.toUpperCase()}`, bold: true, size: 28, color: "1F4E79" })]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `${academicYear} EĞİTİM-ÖĞRETİM YILI ${grade}. SINIF ${subjectName.toUpperCase()} DERSİ YILLIK ÇALIŞMA PLANI`,
                  bold: true,
                  size: 22
                })
              ]
            }),
            new Paragraph({ children: [] }), // Boşluk
            planTable,
            new Paragraph({ children: [] }),
            // İmza Bloğu
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE }
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${profile.name}`, bold: true, size: 20 })] }),
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${profile.branch}`, size: 18 })] }),
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ders Öğretmeni", size: 18 })] })
                      ]
                    }),
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "UYGUNDUR", bold: true, size: 18 })] }),
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${profile.principalName}`, bold: true, size: 20 })] }),
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Okul Müdürü", size: 18 })] })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${grade}_Sinif_${subjectName}_Yillik_Plani_${academicYear}.docx`);
  },

  // Resmi Belge / Tutanak Word (.docx) Çıktısı Üretme
  async generateOfficialDocx(
    title: string,
    headerLines: string[],
    agendaItems?: string[],
    decisions?: string[],
    bodyText?: string,
    tableColumns?: string[],
    tableRows?: string[][],
    signatures: { role: string; name: string }[] = [],
    filename = "Resmi_Belge.docx"
  ) {
    const children: any[] = [];

    // Başlık
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: title, bold: true, size: 26, color: "1F4E79" })]
      })
    );

    // Alt Başlıklar
    headerLines.forEach(h => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: h, bold: true, size: 20 })]
        })
      );
    });

    children.push(new Paragraph({ children: [] })); // Boş satır

    // Gündem Maddeleri varsa
    if (agendaItems && agendaItems.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "GÜNDEM MADDELERİ:", bold: true, size: 22, color: "0284C7" })]
        })
      );
      agendaItems.forEach(item => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: item, size: 20 })],
            indent: { left: 360 }
          })
        );
      });
      children.push(new Paragraph({ children: [] }));
    }

    // Alınan Kararlar varsa
    if (decisions && decisions.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "ALINAN KARARLAR VE GÖRÜŞMELER:", bold: true, size: 22, color: "0284C7" })]
        })
      );
      decisions.forEach(item => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: item, size: 20 })],
            indent: { left: 360 }
          })
        );
      });
      children.push(new Paragraph({ children: [] }));
    }

    // Gövde Metni varsa (Dilekçe vb.)
    if (bodyText) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: bodyText, size: 22 })],
          indent: { firstLine: 720 }
        })
      );
      children.push(new Paragraph({ children: [] }));
    }

    // Tablo varsa (Kulüp, Sınav Analizi vb.)
    if (tableColumns && tableRows) {
      const headerRow = new TableRow({
        tableHeader: true,
        children: tableColumns.map(col => new TableCell({
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: col, bold: true, size: 18 })] })],
          shading: { fill: "E2E8F0" }
        }))
      });

      const bodyRows = tableRows.map((row, rIdx) => new TableRow({
        children: row.map(cell => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18 })] })],
          shading: rIdx % 2 === 1 ? { fill: "F8FAFC" } : undefined
        }))
      }));

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [headerRow, ...bodyRows]
        })
      );
      children.push(new Paragraph({ children: [] }));
    }

    // İmza Alanı
    if (signatures && signatures.length > 0) {
      const sigCells = signatures.map(s => new TableCell({
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.name, bold: true, size: 20 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s.role, size: 18 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\n(İmza)", size: 18 })] })
        ]
      }));

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE }
          },
          rows: [new TableRow({ children: sigCells })]
        })
      );
    }

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, bottom: 720, left: 720, right: 720 }
            }
          },
          children
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename.endsWith('.docx') ? filename : `${filename}.docx`);
  }
};

import React, { useState } from 'react';
import { FileText, Download, Copy, ChevronRight, Edit3, ArrowLeft } from 'lucide-react';
import { DOCUMENT_TEMPLATES, DocumentTemplate } from '../../data/documentTemplates';
import { TeacherProfile } from '../../services/storage';
import { DocxGenerator } from '../../services/docxGenerator';

interface DocumentsViewProps {
  profile: TeacherProfile;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ profile, showToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeTemplate, setActiveTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);

  const categories = ['Tümü', 'Zümre & ŞÖK', 'Kulüp & Rehberlik', 'Sınav & Ölçek', 'Dilekçeler & Nöbet'];

  const filteredTemplates = DOCUMENT_TEMPLATES.filter((t) => {
    if (selectedCategory === 'Tümü') return true;
    return t.category === selectedCategory;
  });

  const handleOpenTemplate = (tmpl: DocumentTemplate) => {
    setActiveTemplate(tmpl);
    // Profil bilgilerine göre varsayılan form alanlarını doldur
    const initial: Record<string, string> = {};
    tmpl.fields.forEach((f) => {
      if (f.key === 'schoolName') initial[f.key] = profile.schoolName;
      else if (f.key === 'teacherName' || f.key === 'meetingChair' || f.key === 'classTeacher' || f.key === 'consultantTeacher') initial[f.key] = profile.name;
      else if (f.key === 'principalName') initial[f.key] = profile.principalName;
      else if (f.key === 'branch') initial[f.key] = profile.branch;
      else if (f.key === 'tcNo' && profile.tcNo) initial[f.key] = profile.tcNo;
      else initial[f.key] = f.defaultValue || '';
    });
    setFormData(initial);
  };

  const handleInputChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  // Word (.docx) İndir
  const handleDownloadDocx = async () => {
    if (!activeTemplate) return;
    try {
      setIsGeneratingDocx(true);
      showToast('Resmi Word belgesi hazırlanıyor...', 'info');

      const content = activeTemplate.contentGenerator(formData);
      await DocxGenerator.generateOfficialDocx(
        content.title,
        content.header,
        content.agendaItems,
        content.decisions,
        content.bodyText,
        content.tableColumns,
        content.tableRows,
        content.signatures,
        `${activeTemplate.filenamePrefix}_${formData.academicYear || '2024-2025'}.docx`
      );

      showToast('Word belgesi başarıyla indirildi!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Belge oluşturulurken hata meydana geldi.', 'error');
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  // Metni Kopyala
  const handleCopyText = () => {
    if (!activeTemplate) return;
    const content = activeTemplate.contentGenerator(formData);
    let fullText = `${content.title}\n${content.header.join('\n')}\n\n`;

    if (content.agendaItems) {
      fullText += `GÜNDEM MADDELERİ:\n${content.agendaItems.join('\n')}\n\n`;
    }
    if (content.decisions) {
      fullText += `ALINAN KARARLAR:\n${content.decisions.join('\n')}\n\n`;
    }
    if (content.bodyText) {
      fullText += `${content.bodyText}\n\n`;
    }
    if (content.signatures) {
      fullText += `İMZALAR:\n` + content.signatures.map(s => `${s.role}: ${s.name}`).join('\n');
    }

    navigator.clipboard.writeText(fullText);
    showToast('Tutanak / Evrak metni panoya kopyalandı!', 'success');
  };

  return (
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-300">
      {/* Üst Kart */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-card-soft">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Resmi Öğretmen Evrak Merkezi
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              MEB yönetmeliklerine uygun tutanak, ölçek ve dilekçeler
            </p>
          </div>
        </div>

        {/* Kategori Filtre Hapları */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active-scale ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Şablon Listesi */}
      <div className="space-y-2.5">
        {filteredTemplates.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => handleOpenTemplate(tmpl)}
            className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-card-soft hover:shadow-md transition active-scale cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                  {tmpl.category}
                </span>
                {tmpl.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] text-slate-400 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {tmpl.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {tmpl.shortDesc}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* DÜZENLEME & CANLI ÖNİZLEME MODALI / SAYFASI */}
      {activeTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-6">
            {/* Modal Başlığı */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTemplate(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 active-scale"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {activeTemplate.title}
                  </h3>
                  <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">
                    Özelleştir ve İndir
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDownloadDocx}
                  disabled={isGeneratingDocx}
                  className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 active-scale shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Word (.docx)</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 active-scale"
                  title="Metni Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal İçeriği (Form + Önizleme) */}
            <div className="p-4 overflow-y-auto custom-scrollbar space-y-4">
              {/* Form Alanları */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-brand-600" />
                  <span>Belge Bilgilerini Düzenle</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTemplate.fields.map((field) => (
                    <div key={field.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={2}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Canlı Belge Görünümü (A4 Kağıdı Hissiyatı) */}
              {(() => {
                const preview = activeTemplate.contentGenerator(formData);

                return (
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-slate-800 dark:text-slate-100 font-sans text-xs">
                    {/* Başlık */}
                    <div className="text-center space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="font-extrabold text-sm tracking-tight text-[#1F4E79] dark:text-sky-400">
                        {preview.title}
                      </h4>
                      {preview.header.map((h, i) => (
                        <p key={i} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {h}
                        </p>
                      ))}
                    </div>

                    {/* Gündem */}
                    {preview.agendaItems && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-brand-700 dark:text-brand-300 text-xs">
                          GÜNDEM MADDELERİ:
                        </span>
                        <ul className="space-y-1 pl-2 text-xs">
                          {preview.agendaItems.map((item, idx) => (
                            <li key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Kararlar */}
                    {preview.decisions && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-brand-700 dark:text-brand-300 text-xs">
                          ALINAN KARARLAR VE GÖRÜŞMELER:
                        </span>
                        <ul className="space-y-1 pl-2 text-xs">
                          {preview.decisions.map((dec, idx) => (
                            <li key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300">
                              {dec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Gövde Metni */}
                    {preview.bodyText && (
                      <p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300 indent-4">
                        {preview.bodyText}
                      </p>
                    )}

                    {/* Tablo */}
                    {preview.tableColumns && preview.tableRows && (
                      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                        <table className="w-full text-left text-[11px] border-collapse">
                          <thead className="bg-slate-100 dark:bg-slate-800">
                            <tr>
                              {preview.tableColumns.map((col, idx) => (
                                <th key={idx} className="p-2 border-b border-slate-200 dark:border-slate-700 font-bold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {preview.tableRows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-900/40' : ''}>
                                {row.map((c, cIdx) => (
                                  <td key={cIdx} className="p-2 align-top">
                                    {c}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* İmza Bloğu */}
                    {preview.signatures && (
                      <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                        {preview.signatures.map((sig, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="font-bold text-slate-900 dark:text-white">{sig.name}</div>
                            <div className="text-[10px] text-slate-500 whitespace-pre-line">{sig.role}</div>
                            <div className="text-[10px] text-slate-400 italic">(İmza)</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

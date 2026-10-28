import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { PORTFOLIO_TIPS, PORTFOLIO_CHECKLIST, CAT } from '../data/careerData';
import { Button } from '../components/ui';
import PricingModal from '../components/PricingModal';
import { 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Compass, 
  Lock, 
  Download,
  FileCheck2,
  Award
} from 'lucide-react';

export default function CareerPortfolio() {
  const { careerState, updateCareerState, activeCareer, isProUnlocked } = useCareer();
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggleChecklist = (idx) => {
    // Check if item is locked for non-PRO (items 3 & 4 are PRO)
    if (!isProUnlocked && idx >= 3) {
      setModalOpen(true);
      return;
    }

    updateCareerState(prev => {
      const exists = prev.completedPortfolio.includes(idx);
      const nextList = exists
        ? prev.completedPortfolio.filter(i => i !== idx)
        : [...prev.completedPortfolio, idx];
      return { completedPortfolio: nextList };
    });
  };

  const completedCount = careerState.completedPortfolio.length;
  const progressPercent = Math.round((completedCount / PORTFOLIO_CHECKLIST.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
          <Briefcase size={14} />
          Portfolio Guidance
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
          Panduan Kurasi Portofolio
        </h1>
        <p className="text-sm text-[#5d5577] mt-1">
          Susun karya terbaikmu untuk membuktikan kompetensi nyata di hadapan recruiter dan klien profesional.
        </p>
      </div>

      {/* Target-Specific Guidance Card */}
      <div className="card-s p-6 sm:p-8 space-y-3 bg-gradient-to-br from-white to-[#efeafb]/60">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8f78d8] uppercase tracking-wider">
          <Sparkles size={14} />
          Strategi Kurasi untuk {activeCareer ? activeCareer.n : 'Karier Pilihanmu'}
        </div>

        {activeCareer ? (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#2b2542]">{activeCareer.n} ({CAT[activeCareer.c]})</h2>
            <p className="text-sm text-[#5d5577] leading-relaxed">
              {PORTFOLIO_TIPS[activeCareer.c]}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[#5d5577]">
              Kamu belum menetapkan target karier spesifik. Pilih salah satu karier untuk mendapatkan tips kurasi portofolio yang disesuaikan dengan standar industri.
            </p>
            <Link to="/jelajah">
              <Button variant="secondary" size="sm" className="flex items-center gap-1.5 text-xs">
                <Compass size={14} />
                Tentukan Karier Sekarang
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Checklist Card */}
      <div className="card-s p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#2b2542]">5 Standar Kualitas Portofolio Unggulan</h3>
            <p className="text-xs text-[#5d5577]">
              {!isProUnlocked ? 'Poin 1-3 terbuka gratis. Poin 4-5 eksklusif untuk Member PRO.' : 'Semua standar kurasi terbuka penuh.'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#8f78d8] bg-[#efeafb] px-3 py-1 rounded-full self-start sm:self-auto">
            {completedCount} dari {PORTFOLIO_CHECKLIST.length} Tuntas ({progressPercent}%)
          </span>
        </div>

        <div className="w-full h-2.5 bg-[#efeafb] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#8f78d8] to-[#b9a6f0] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-3 pt-2">
          {PORTFOLIO_CHECKLIST.map((step, idx) => {
            const isChecked = careerState.completedPortfolio.includes(idx);
            const isItemLocked = !isProUnlocked && idx >= 3;

            return (
              <div
                key={idx}
                onClick={() => handleToggleChecklist(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-3.5 ${
                  isItemLocked
                    ? 'bg-slate-50/80 border-slate-200 hover:border-[#8f78d8]/40'
                    : isChecked 
                      ? 'bg-[#efeafb]/50 border-[#8f78d8]/50 text-[#5d5577]' 
                      : 'bg-white border-[#d9cff5] text-[#2b2542] hover:border-[#8f78d8]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                      isItemLocked
                        ? 'border border-slate-300 bg-slate-100 text-slate-400'
                        : isChecked 
                          ? 'bg-[#8f78d8] text-white' 
                          : 'border-2 border-[#d9cff5] text-transparent hover:border-[#8f78d8]'
                    }`}
                  >
                    {isItemLocked ? <Lock size={12} /> : <CheckCircle2 size={14} />}
                  </button>
                  <span className={`text-sm font-medium ${isItemLocked ? 'text-slate-500' : isChecked ? 'line-through text-[#8a82a2]' : ''}`}>
                    {step}
                  </span>
                </div>

                {isItemLocked && (
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fce8e9] text-[#9b1c28] flex items-center gap-1">
                    <Lock size={10} /> PRO
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exclusive Portfolio Template (PRO Feature) */}
      {!isProUnlocked ? (
        <div className="card-s p-6 sm:p-8 bg-gradient-to-r from-white via-[#efeafb]/60 to-[#efeafb] border-2 border-[#8f78d8]/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8f78d8] text-white text-[10px] font-bold">
              <Award size={12} />
              Eksklusif Member PRO
            </div>
            <h3 className="text-lg font-bold text-[#2b2542]">
              Modul Template Portofolio (Figma &amp; Notion)
            </h3>
            <p className="text-xs text-[#5d5577] max-w-lg leading-relaxed">
              Dapatkan akses template portofolio berstandar HRD internasional, panduan studi kasus baris demi baris, dan contoh portofolio nyata yang lolos seleksi kerja.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setModalOpen(true)}
            className="shrink-0 text-xs sm:text-sm flex items-center gap-1.5 shadow-btn w-full sm:w-auto justify-center"
          >
            <Lock size={14} />
            <span>Buka Template PRO (Rp 35.000)</span>
          </Button>
        </div>
      ) : (
        <div className="card-s p-6 sm:p-8 bg-white border border-[#8f78d8] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#d9cff5]/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d1e7dd] text-[#198754] flex items-center justify-center">
                <FileCheck2 size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2b2542]">Template Portofolio PRO (Siap Pakai)</h4>
                <span className="text-[10px] font-bold text-[#8f78d8]">Akses Seumur Hidup Aktif</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#d1e7dd] text-[#198754]">
              Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#efeafb]/50 border border-[#d9cff5] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#4b3b86]">Template Portofolio Figma</p>
                <p className="text-[11px] text-[#5d5577]">Format case study 3 layar untuk desainer &amp; UI/UX</p>
              </div>
              <a 
                href="#download-figma"
                onClick={(e) => { e.preventDefault(); alert('Template Figma telah dibuka untuk Member PRO.'); }}
                className="text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
              >
                <Download size={13} />
                Unduh
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-[#efeafb]/50 border border-[#d9cff5] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#4b3b86]">Template Dokumentasi Notion</p>
                <p className="text-[11px] text-[#5d5577]">Struktur proyek teknis &amp; manajerial profesional</p>
              </div>
              <a 
                href="#download-notion"
                onClick={(e) => { e.preventDefault(); alert('Template Notion telah dibuka untuk Member PRO.'); }}
                className="text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
              >
                <Download size={13} />
                Buka
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

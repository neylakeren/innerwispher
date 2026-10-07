import React from 'react';
import { Link } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { PORTFOLIO_TIPS, PORTFOLIO_CHECKLIST, CAT } from '../data/careerData';
import { Button } from '../components/ui';
import { Briefcase, CheckCircle2, Sparkles, ExternalLink, Compass } from 'lucide-react';

export default function CareerPortfolio() {
  const { careerState, updateCareerState, activeCareer } = useCareer();

  const handleToggleChecklist = (idx) => {
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
            <p className="text-xs text-[#5d5577]">Centang setiap poin setelah kamu memastikannya terpenuhi.</p>
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
            return (
              <div
                key={idx}
                onClick={() => handleToggleChecklist(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 hover:border-[#8f78d8] ${
                  isChecked 
                    ? 'bg-[#efeafb]/50 border-[#8f78d8]/50 text-[#5d5577]' 
                    : 'bg-white border-[#d9cff5] text-[#2b2542]'
                }`}
              >
                <button
                  type="button"
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    isChecked 
                      ? 'bg-[#8f78d8] text-white' 
                      : 'border-2 border-[#d9cff5] text-transparent hover:border-[#8f78d8]'
                  }`}
                >
                  <CheckCircle2 size={14} />
                </button>
                <span className={`text-sm font-medium ${isChecked ? 'line-through text-[#8a82a2]' : ''}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { ROADMAPS, CAT } from '../data/careerData';
import { Button } from '../components/ui';
import { Map, CheckCircle2, Circle, ArrowRight, Compass } from 'lucide-react';

export default function CareerRoadmap() {
  const { careerState, updateCareerState, activeCareer } = useCareer();

  const handleToggleStep = (stepIdx) => {
    updateCareerState(prev => {
      const exists = prev.completedRoadmap.includes(stepIdx);
      const nextSteps = exists
        ? prev.completedRoadmap.filter(i => i !== stepIdx)
        : [...prev.completedRoadmap, stepIdx];
      return { completedRoadmap: nextSteps };
    });
  };

  if (!activeCareer) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 font-quicksand py-12 text-center">
        <div className="card-s p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#efeafb] text-[#8f78d8] mx-auto flex items-center justify-center">
            <Map size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#2b2542]">Tentukan Karier Impianmu Dulu</h2>
          <p className="text-sm text-[#5d5577] max-w-md mx-auto">
            Roadmap karier disusun secara khusus berdasarkan profesi targetmu agar setiap langkah belajarmu terarah dan efektif.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/tes">
              <Button variant="primary" size="md">
                Ikuti Tes Karier
              </Button>
            </Link>
            <Link to="/jelajah">
              <Button variant="secondary" size="md">
                Jelajah Daftar Karier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const steps = ROADMAPS[activeCareer.c] || [];
  const completedCount = careerState.completedRoadmap.length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
            <Map size={14} />
            Roadmap Langkah Karier
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
            Roadmap Menuju: {activeCareer.n}
          </h1>
          <p className="text-sm text-[#5d5577] mt-1">
            Kategori: <span className="font-semibold text-[#4b3b86]">{CAT[activeCareer.c]}</span>. Centang langkah yang telah kamu selesaikan.
          </p>
        </div>

        <Link to="/jelajah">
          <Button variant="outline" size="sm" className="shrink-0 flex items-center gap-1.5">
            <Compass size={14} />
            Ganti Karier
          </Button>
        </Link>
      </div>

      {/* Progress Card */}
      <div className="card-s p-6 space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-[#2b2542]">
          <span>Progres Roadmap</span>
          <span className="text-[#8f78d8]">{completedCount} dari {steps.length} Selesai ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-[#efeafb] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#8f78d8] to-[#b9a6f0] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps Checklist */}
      <div className="space-y-3">
        {steps.map((stepText, idx) => {
          const isDone = careerState.completedRoadmap.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => handleToggleStep(idx)}
              className={`card-s p-5 cursor-pointer transition-all duration-200 flex items-start gap-4 hover:border-[#8f78d8] ${
                isDone ? 'bg-[#efeafb]/50 border-[#8f78d8]/50' : 'bg-white'
              }`}
            >
              <button 
                type="button"
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                  isDone 
                    ? 'bg-[#8f78d8] text-white shadow-sm' 
                    : 'border-2 border-[#d9cff5] text-transparent hover:border-[#8f78d8]'
                }`}
              >
                <CheckCircle2 size={16} />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8f78d8] uppercase tracking-wider">
                    Langkah 0{idx + 1}
                  </span>
                  {isDone && (
                    <span className="text-[11px] font-semibold text-[#198754] bg-[#d1e7dd] px-2 py-0.2 rounded-full">
                      Tuntas
                    </span>
                  )}
                </div>
                <p className={`text-sm sm:text-base mt-1 font-medium transition-colors ${
                  isDone ? 'line-through text-[#8a82a2]' : 'text-[#2b2542]'
                }`}>
                  {stepText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

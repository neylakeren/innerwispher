import React from 'react';
import { useCareer } from '../context/CareerContext';
import { LEARNING_MODULES } from '../data/careerData';
import { Button } from '../components/ui';
import { GraduationCap, Clock, CheckCircle2, BookOpen } from 'lucide-react';

export default function CareerLearning() {
  const { careerState, updateCareerState } = useCareer();

  const handleToggleModule = (modId) => {
    updateCareerState(prev => {
      const exists = prev.completedLearning.includes(modId);
      const nextList = exists
        ? prev.completedLearning.filter(id => id !== modId)
        : [...prev.completedLearning, modId];
      return { completedLearning: nextList };
    });
  };

  const completedCount = careerState.completedLearning.length;
  const progressPercent = Math.round((completedCount / LEARNING_MODULES.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
          <GraduationCap size={14} />
          Modul Belajar Singkat
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
          Career Learning Hub
        </h1>
        <p className="text-sm text-[#5d5577] mt-1">
          Kumpulan materi ringkas berstandar industri untuk mengasah soft skill, strategi rekrutmen, dan kesehatan mental di tempat kerja.
        </p>
      </div>

      {/* Progress Status */}
      <div className="card-s p-6 space-y-3">
        <div className="flex justify-between items-center text-sm font-bold text-[#2b2542]">
          <span>Progres Pembelajaran</span>
          <span className="text-[#8f78d8]">{completedCount} dari {LEARNING_MODULES.length} Modul Selesai ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2.5 bg-[#efeafb] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#8f78d8] to-[#b9a6f0] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 gap-4">
        {LEARNING_MODULES.map((mod) => {
          const isCompleted = careerState.completedLearning.includes(mod.id);
          return (
            <div
              key={mod.id}
              className={`card-s p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                isCompleted ? 'bg-[#efeafb]/40 border-[#8f78d8]/50' : 'bg-white'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8f78d8]">
                    <Clock size={12} /> {mod.duration}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#198754] bg-[#d1e7dd] px-2 py-0.2 rounded-full">
                      <CheckCircle2 size={11} /> Selesai
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#2b2542]">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Button
                  variant={isCompleted ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleToggleModule(mod.id)}
                  className="text-xs flex items-center gap-1.5"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={14} /> Selesai Dipelajari
                    </>
                  ) : (
                    <>
                      <BookOpen size={14} /> Tandai Selesai
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ARTICLES_TIPS } from '../data/careerData';
import { BookOpen, ChevronDown, Sparkles } from 'lucide-react';

export default function CareerArticles() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
          <BookOpen size={14} />
          Edukasi & Wawasan
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
          Artikel & Tips Dunia Kerja
        </h1>
        <p className="text-sm text-[#5d5577] mt-1">
          Wawasan praktis seputar pemilihan magang, penyusunan resume, etika networking, dan menjaga kesehatan mental saat merintis karier.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {ARTICLES_TIPS.map((art, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`card-s transition-all duration-200 overflow-hidden ${isOpen ? 'ring-1 ring-[#8f78d8]' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base text-[#2b2542] hover:text-[#4b3b86] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#efeafb] text-[#8f78d8] flex items-center justify-center text-xs font-extrabold shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{art.title}</span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`text-[#8a82a2] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#8f78d8]' : ''}`} 
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-[#5d5577] leading-relaxed border-t border-[#d9cff5]/50 bg-[#efeafb]/20">
                  <p className="whitespace-pre-line">{art.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

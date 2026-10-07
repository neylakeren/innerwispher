import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { CAREERS, CAT } from '../data/careerData';
import { Button } from '../components/ui';
import { Compass, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CareerExplorer() {
  const { careerState, updateCareerState } = useCareer();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState(''); // '' means all

  const filteredCareers = CAREERS.filter((c) => {
    const matchesCat = !selectedCat || c.c === selectedCat;
    const matchesQuery = (c.n + ' ' + c.d + ' ' + c.s.join(' ')).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSelectCareer = (careerId) => {
    updateCareerState({
      targetCareerId: careerId,
      completedRoadmap: []
    });
    navigate('/roadmap');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
          <Compass size={14} />
          Career Explorer
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
          Jelajahi Karier Masa Depan
        </h1>
        <p className="text-sm text-[#5d5577] mt-1">
          Pelajari berbagai profesi strategis, keahlian teknis yang dibutuhkan, dan tentukan arah langkahmu.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="card-s p-4 sm:p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a82a2]" size={18} />
          <input
            type="text"
            placeholder="Cari karier atau keahlian (contoh: Figma, Python, Copywriting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d9cff5] bg-white/90 text-sm text-[#2b2542] placeholder:text-[#8a82a2] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/20 transition-all shadow-sm"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setSelectedCat('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCat === '' 
                ? 'bg-[#8f78d8] text-white shadow-sm' 
                : 'bg-[#efeafb] text-[#4b3b86] hover:bg-[#e4daf7]'
            }`}
          >
            Semua Bidang
          </button>
          {Object.entries(CAT).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCat(key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCat === key 
                  ? 'bg-[#8f78d8] text-white shadow-sm' 
                  : 'bg-[#efeafb] text-[#4b3b86] hover:bg-[#e4daf7]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Career Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((c) => {
            const isCurrent = careerState.targetCareerId === c.id;
            return (
              <div 
                key={c.id} 
                className={`card-s p-6 flex flex-col justify-between space-y-4 hover:border-[#8f78d8] transition-all duration-200 ${
                  isCurrent ? 'ring-2 ring-[#8f78d8] bg-[#efeafb]/40' : ''
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86]">
                      {CAT[c.c]}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#198754] bg-[#d1e7dd] px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Target Pilihanmu
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#2b2542]">{c.n}</h3>
                  <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                    {c.d}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-semibold text-[#4b3b86] mb-1.5">
                      Keahlian yang Dibutuhkan:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.s.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#efeafb] text-[#5d5577] border border-[#d9cff5]/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9cff5]/50">
                  <Button
                    variant={isCurrent ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleSelectCareer(c.id)}
                  >
                    {isCurrent ? 'Buka Roadmap Terkait' : 'Pilih Karier Ini'}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full card-s p-8 text-center text-[#5d5577]">
            <p className="font-semibold text-base">Tidak ada karier yang sesuai pencarian.</p>
            <p className="text-xs mt-1">Coba gunakan kata kunci keahlian lain atau ubah filter kategori.</p>
          </div>
        )}
      </div>
    </div>
  );
}

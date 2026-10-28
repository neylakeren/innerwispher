import React, { useState } from 'react';
import { useCareer } from '../context/CareerContext';
import { ZODIACS, ZODIAC_EXTRAS, DAILY_CAREER_MESSAGES } from '../data/careerData';
import { Button } from '../components/ui';
import { Sparkles, Star, RefreshCw, Compass } from 'lucide-react';

export default function CareerZodiac() {
  const { careerState, updateCareerState } = useCareer();
  const currentZodiacName = careerState.zodiac || 'Aries';

  const [messageIndex, setMessageIndex] = useState(0);

  const selectedZodiac = ZODIACS.find(z => z.name === currentZodiacName) || ZODIACS[0];
  const extras = ZODIAC_EXTRAS[selectedZodiac.name] || ZODIAC_EXTRAS.Aries;

  const handleNextMessage = () => {
    setMessageIndex((messageIndex + 1) % DAILY_CAREER_MESSAGES.length);
  };

  const handleSelectZodiac = (e) => {
    updateCareerState({ zodiac: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
            <Sparkles size={14} />
            Zodiac Career Reading
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
            Zodiak & Refleksi Karier
          </h1>
          <p className="text-sm text-[#5d5577] mt-1">
            Pembacaan karakter dan pesan refleksi harian (hiburan konsultasi karier untuk menyemangati langkahmu).
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="shrink-0">
          <label className="text-xs font-semibold text-[#5d5577] block mb-1">
            Pilih Zodiak:
          </label>
          <select
            value={currentZodiacName}
            onChange={handleSelectZodiac}
            className="px-3 py-2 rounded-xl border border-[#d9cff5] bg-white text-sm font-semibold text-[#4b3b86] focus:outline-none focus:border-[#8f78d8]"
          >
            {ZODIACS.map(z => (
              <option key={z.name} value={z.name}>
                {z.name} ({z.date})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Night Sky Zodiac Card */}
      <div className="sky p-6 sm:p-8 space-y-4 shadow-hero">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d9cff5] tracking-widest uppercase">
              <Star size={13} className="text-[#d9cff5]" />
              Zodiak Aktif
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              {selectedZodiac.name}
            </h2>
            <span className="text-xs sm:text-sm text-[#d9cff5]/90">
              {selectedZodiac.date}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-white/95 leading-relaxed pt-2">
          {selectedZodiac.desc}
        </p>
      </div>

      {/* Detailed Reading Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kekuatan */}
        <div className="card-s p-5 space-y-1.5 border-l-4 border-l-[#8f78d8]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f78d8]">
            Kekuatan Utama di Dunia Kerja
          </h3>
          <p className="text-sm text-[#2b2542] leading-relaxed">
            {extras.strength}
          </p>
        </div>

        {/* Tantangan */}
        <div className="card-s p-5 space-y-1.5 border-l-4 border-l-[#b9a6f0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
            Tantangan yang Perlu Diwaspadai
          </h3>
          <p className="text-sm text-[#2b2542] leading-relaxed">
            {extras.challenge}
          </p>
        </div>

        {/* Saran Pengembangan */}
        <div className="card-s p-5 space-y-1.5 border-l-4 border-l-[#a68ff0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8f78d8]">
            Saran Pengembangan Diri
          </h3>
          <p className="text-sm text-[#2b2542] leading-relaxed">
            {extras.advice}
          </p>
        </div>

        {/* Karier Selaras */}
        <div className="card-s p-5 space-y-1.5 border-l-4 border-l-[#4b3b86]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
            Profesi yang Paling Selaras
          </h3>
          <p className="text-sm font-semibold text-[#2b2542] leading-relaxed">
            {selectedZodiac.jobs}
          </p>
        </div>
      </div>

      {/* Daily Career Message Box */}
      <div className="card-s p-6 sm:p-8 space-y-4 bg-gradient-to-r from-[#efeafb] to-white border border-[#d9cff5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#8f78d8]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
              Pesan Karier Hari Ini
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMessage}
            className="flex items-center gap-1.5 text-xs text-[#8f78d8] hover:text-[#4b3b86]"
          >
            <RefreshCw size={12} />
            Pesan Lain
          </Button>
        </div>

        <blockquote className="text-base sm:text-lg font-bold text-[#2b2542] italic leading-snug">
          "{DAILY_CAREER_MESSAGES[messageIndex]}"
        </blockquote>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCareer } from '../context/CareerContext';
import { QUESTIONS, CAT, CAREERS } from '../data/careerData';
import { Button } from '../components/ui';
import PricingModal from '../components/PricingModal';
import { 
  ClipboardCheck, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass,
  Briefcase,
  Lock,
  Download,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function CareerTest() {
  const { careerState, updateCareerState, isReportUnlocked } = useCareer();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(Boolean(careerState.testResult));
  const [modalOpen, setModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
    }, 800);
  };

  const handlePickOption = (cat) => {
    const nextAnswers = [...answers, cat];
    setAnswers(nextAnswers);

    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate scores
      const scores = { tech: 0, cre: 0, biz: 0, soc: 0 };
      nextAnswers.forEach(c => {
        scores[c] = (scores[c] || 0) + 1;
      });

      updateCareerState({ testResult: scores });
      setShowResult(true);
    }
  };

  const handleRetakeTest = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setShowResult(false);
  };

  const handleSetTargetCareer = (careerId) => {
    updateCareerState({
      targetCareerId: careerId,
      completedRoadmap: [] // reset roadmap for new career
    });
    navigate('/roadmap');
  };

  // Result Calculations
  const result = careerState.testResult;
  let sortedCategories = [];
  let totalScore = 0;
  let recommendedCareers = [];

  if (result) {
    sortedCategories = Object.entries(result).sort((a, b) => b[1] - a[1]);
    totalScore = sortedCategories.reduce((acc, curr) => acc + curr[1], 0) || 1;
    const top2Keys = sortedCategories.slice(0, 2).map(e => e[0]);
    recommendedCareers = CAREERS.filter(c => top2Keys.includes(c.c));
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
            <ClipboardCheck size={14} />
            Tes Minat & Potensi Karier
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
            Kenali Arah Karier & Kekuatanmu
          </h1>
          <p className="text-sm text-[#5d5577] mt-1">
            25 pertanyaan psikometri untuk memetakan minat dominanmu dalam Teknologi, Kreatif, Bisnis, atau Sosial.
          </p>
        </div>

        {showResult && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetakeTest}
            className="self-start sm:self-auto shrink-0 flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            Ulangi Tes
          </Button>
        )}
      </div>

      {!showResult ? (
        /* Questions View */
        <div className="card-s p-6 sm:p-8 space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#5d5577]">
              <span>Pertanyaan {currentIndex + 1} dari {QUESTIONS.length}</span>
              <span>{Math.round(((currentIndex) / QUESTIONS.length) * 100)}% Selesai</span>
            </div>
            <div className="w-full h-2.5 bg-[#efeafb] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8f78d8] to-[#b9a6f0] transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#2b2542] leading-snug">
              {QUESTIONS[currentIndex].q}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handlePickOption(opt.cat)}
                className="group w-full text-left p-4 rounded-xl border border-[#d9cff5] bg-white hover:bg-[#efeafb] hover:border-[#8f78d8] transition-all duration-200 flex items-center justify-between text-sm sm:text-base font-medium text-[#2b2542] shadow-sm hover:shadow-md"
              >
                <span>{opt.text}</span>
                <span className="h-6 w-6 rounded-full border border-[#d9cff5] group-hover:border-[#8f78d8] group-hover:bg-[#8f78d8] flex items-center justify-center transition-colors shrink-0 ml-3">
                  <ArrowRight size={12} className="text-transparent group-hover:text-white transition-colors" />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result View */
        <div className="space-y-6">
          {/* Category Breakdown */}
          <div className="card-s p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#8f78d8]" size={20} />
              <h2 className="text-xl font-bold text-[#2b2542]">Hasil Profil Minat & Kekuatan</h2>
            </div>
            <p className="text-sm text-[#5d5577]">
              Berikut distribusi ketertarikanmu berdasarkan 25 pilihan skenario:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {sortedCategories.map(([catKey, score]) => {
                const percent = Math.round((score / totalScore) * 100);
                return (
                  <div key={catKey} className="p-4 rounded-xl border border-[#d9cff5]/70 bg-white/90 space-y-2">
                    <div className="flex justify-between text-sm font-bold text-[#2b2542]">
                      <span>{CAT[catKey]}</span>
                      <span className="text-[#8f78d8]">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#efeafb] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8f78d8] to-[#a68ff0] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paywall or Unlocked Laporan Analisis Karier Lengkap */}
          {!isReportUnlocked ? (
            <div className="card-s p-6 sm:p-8 bg-gradient-to-r from-white via-[#efeafb]/60 to-[#efeafb] border-2 border-[#8f78d8]/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8f78d8] text-white text-[11px] font-bold">
                  <Sparkles size={13} />
                  Inner Whisper PRO Bundle
                </div>
                <h3 className="text-xl font-bold text-[#2b2542]">
                  Ingin Analisis Psikometri Mendalam &amp; Unduh Laporan PDF?
                </h3>
                <p className="text-xs sm:text-sm text-[#5d5577] max-w-xl leading-relaxed">
                  Buka akses Inner Whisper PRO: Rp 35.000 / bulan untuk membuka Laporan PDF resmi, pemetaan 10+ industri, analisis SWOT, audit CV ATS, dan seluruh 10 soal simulasi wawancara STAR.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#4b3b86] font-semibold">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#8f78d8]" /> Downloadable PDF</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#8f78d8]" /> 10+ Industri Cocok</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#8f78d8]" /> Analisis SWOT</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
                <div className="text-left md:text-right">
                  <span className="text-xs text-[#5d5577] block font-medium">Langganan bulanan:</span>
                  <span className="text-2xl font-extrabold text-[#4b3b86]">Rp 35.000</span>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setModalOpen(true)}
                  className="w-full md:w-auto text-xs sm:text-sm flex items-center justify-center gap-2 shadow-btn"
                >
                  <Lock size={14} />
                  <span>Aktifkan PRO (Rp 35.000)</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="card-s p-6 sm:p-8 bg-white border border-[#8f78d8] space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#d9cff5]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#d1e7dd] text-[#198754] flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#2b2542]">Laporan Diagnostik Karier Lengkap</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8f78d8] text-white">PRO Aktif</span>
                    </div>
                    <p className="text-xs text-[#5d5577]">Hasil asesmen psikometri resmi Inner Whisper</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="text-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Download size={14} />
                  <span>{isDownloading ? 'Menyiapkan Dokumen...' : 'Unduh Laporan (PDF)'}</span>
                </Button>
              </div>

              {/* SWOT Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f8fdf9] border border-[#d1e7dd] space-y-1.5">
                  <p className="text-xs font-bold text-[#198754] uppercase tracking-wider">Kekuatan Inti (Strengths)</p>
                  <p className="text-xs text-[#2b2542] leading-relaxed">
                    Kemampuan analitis tinggi, eksekusi terstruktur, dan daya konsentrasi yang mendalam dalam memecahkan masalah kompleks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f7f4fd] border border-[#d9cff5] space-y-1.5">
                  <p className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Peluang Industri (Opportunities)</p>
                  <p className="text-xs text-[#2b2542] leading-relaxed">
                    Sangat cocok untuk industri Tech SaaS, Digital Finance, Manajemen Konsultansi, dan Ekosistem Produk Digital.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fffcfc] border border-[#fce8e9] space-y-1.5">
                  <p className="text-xs font-bold text-[#9b1c28] uppercase tracking-wider">Area Pengembangan (Growth Areas)</p>
                  <p className="text-xs text-[#2b2542] leading-relaxed">
                    Perlu melatih negosiasi persuasif dalam rapat umum dan mengurangi kecenderungan menyelesaikan semua beban sendirian.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fffef6] border border-[#fdeecb] space-y-1.5">
                  <p className="text-xs font-bold text-[#b58105] uppercase tracking-wider">Rekomendasi Langkah Aksi</p>
                  <p className="text-xs text-[#2b2542] leading-relaxed">
                    Fokus membangun 2 proyek portofolio berstandar industri dan ikuti audit CV ATS untuk menonjolkan pencapaian terukur.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Careers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2b2542]">Rekomendasi Karier Terbaik Untukmu</h2>
              <span className="text-xs text-[#5d5577]">Pilih salah satu untuk membuka Roadmap</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedCareers.map((c) => {
                const isSelected = careerState.targetCareerId === c.id;
                return (
                  <div 
                    key={c.id} 
                    className={`card-s p-6 space-y-3.5 transition-all ${isSelected ? 'ring-2 ring-[#8f78d8] bg-[#efeafb]/50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86] mb-1">
                          {CAT[c.c]}
                        </span>
                        <h3 className="text-lg font-bold text-[#2b2542]">{c.n}</h3>
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#198754] bg-[#d1e7dd] px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={12} /> Target Aktif
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#5d5577] leading-relaxed">
                      {c.d}
                    </p>

                    <div className="pt-1">
                      <div className="text-xs font-semibold text-[#4b3b86] mb-1.5">Skill Utama:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {c.s.map((skill, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-[#efeafb] text-[#5d5577] border border-[#d9cff5]/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant={isSelected ? 'secondary' : 'primary'}
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => handleSetTargetCareer(c.id)}
                      >
                        {isSelected ? 'Buka Roadmap Karier Ini' : 'Jadikan Tujuan Karier'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pricing Checkout Modal */}
      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackageId="report"
      />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../context/CareerContext';
import client from '../api/client';
import { 
  Map, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  ClipboardCheck, 
  Sparkles, 
  BookOpen, 
  CreditCard,
  Users,
  ArrowRight,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const { activeCareer, totalProgress, nextStep, isProUnlocked, isReportUnlocked, isCvAtsUnlocked, isBundleUnlocked } = useCareer();
  const navigate = useNavigate();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 19) return 'Selamat sore';
    return 'Selamat malam';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Sobat';

  const featureTiles = [
    {
      title: 'Roadmap',
      desc: 'Langkah terstruktur menuju kariermu',
      path: '/roadmap',
      icon: Map,
    },
    {
      title: 'CV & Interview',
      desc: 'Cek resume ATS & latihan wawancara',
      path: '/cv-interview',
      icon: FileText,
    },
    {
      title: 'Portofolio',
      desc: 'Panduan kurasi karya terbaikmu',
      path: '/portofolio',
      icon: Briefcase,
    },
    {
      title: 'Belajar',
      desc: 'Modul singkat pengembangan diri',
      path: '/belajar',
      icon: GraduationCap,
    },
    {
      title: 'Tes Karier',
      desc: 'Konsultasi karier & pemetaan minat',
      path: '/tes',
      icon: ClipboardCheck,
    },
    {
      title: 'Zodiak Karier',
      desc: 'Refleksi karakter & pesan harian',
      path: '/zodiak',
      icon: Sparkles,
    },
    {
      title: 'Paket Layanan',
      desc: 'Buka laporan diagnostik & audit ATS',
      path: '/paket',
      icon: CreditCard,
    },
    {
      title: 'Artikel & Tips',
      desc: 'Wawasan persiapan dunia kerja',
      path: '/artikel-tips',
      icon: BookOpen,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#7a60cc] via-[#b49cf0] to-[#8f78d8] p-6 sm:p-8 text-white shadow-hero">
        {/* Ambient Circles */}
        <div className="absolute -right-10 -bottom-14 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -left-10 -top-14 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1.5">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/90">
              {getGreeting()},
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {firstName}
            </h1>
            <div className="pt-1">
              {activeCareer ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/25 backdrop-blur-sm text-white">
                  Target: {activeCareer.n}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white/90">
                  Belum ada tujuan karier
                </span>
              )}
            </div>
          </div>

          {/* Conic Gradient Progress Ring */}
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 self-end sm:self-auto">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center relative shrink-0 shadow-glow"
              style={{
                background: `conic-gradient(#ffffff ${totalProgress}%, rgba(255, 255, 255, 0.25) 0)`
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#8a72d6] flex items-center justify-center font-extrabold text-sm text-white">
                {totalProgress}%
              </div>
            </div>
            <div className="pr-2">
              <div className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">Kesiapan Karier</div>
              <div className="text-xs font-bold text-white">{totalProgress}% Tuntas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Action Card */}
      <div 
        onClick={() => navigate(nextStep.path)}
        className="card-s p-5 sm:p-6 cursor-pointer border-2 border-[#8f78d8]/50 hover:border-[#8f78d8] transition-all duration-200 group flex items-center justify-between gap-4 shadow-card hover:shadow-lg"
      >
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#8f78d8] uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={13} />
            Langkah Berikutnya
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#2b2542] group-hover:text-[#4b3b86] transition-colors">
            {nextStep.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5d5577]">
            {nextStep.desc}
          </p>
        </div>

        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-[#efeafb] text-[#8f78d8] group-hover:bg-[#8f78d8] group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-sm"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Quick Feature Tiles */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[#2b2542]">Fitur Pengembangan & Konseling</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featureTiles.map((tile, idx) => {
            const Icon = tile.icon;
            return (
              <Link 
                key={idx}
                to={tile.path}
                className="tile flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#efeafb] text-[#8f78d8] group-hover:bg-gradient-to-tr group-hover:from-[#8f78d8] group-hover:to-[#b9a6f0] group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-200 shadow-sm">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#2b2542] group-hover:text-[#4b3b86] transition-colors">
                    {tile.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-[#5d5577] mt-1 line-clamp-2">
                  {tile.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Status Paket PRO (All-in-One 35k) */}
      <div className={`card-s p-6 ${isProUnlocked ? 'border-2 border-[#198754]/40 bg-gradient-to-r from-white to-[#f8fdf9]' : 'border-2 border-[#8f78d8] bg-gradient-to-r from-white via-[#efeafb]/50 to-[#efeafb]/80'} shadow-md`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                isProUnlocked ? 'bg-[#d1e7dd] text-[#198754]' : 'bg-[#8f78d8] text-white'
              }`}>
                {isProUnlocked ? 'PRO Member Aktif' : 'Paket Langganan PRO'}
              </span>
              <span className="text-xs text-[#5d5577] font-semibold">
                {isProUnlocked ? 'Langganan Aktif' : 'Rp 35.000 / Bulan'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#2b2542]">
              {isProUnlocked ? 'Seluruh Fitur Inner Whisper PRO Telah Terbuka' : 'Buka Semua Fitur Digital Hanya Rp 35.000 / Bulan'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5d5577] max-w-xl leading-relaxed">
              {isProUnlocked 
                ? 'Laporan konsultasi karier lengkap, unduhan PDF resmi, audit mendalam CV ATS, dan 10 simulasi wawancara STAR siap kamu gunakan.'
                : 'Dapatkan akses penuh Laporan Diagnostik Karier, CV ATS Deep Diagnostic, dan 10 Soal Simulasi Interview STAR selama 30 hari tanpa perpanjangan otomatis diam-diam.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Link to="/paket">
              <Button 
                variant={isProUnlocked ? 'outline' : 'primary'} 
                size="md" 
                className="text-xs sm:text-sm shadow-btn flex items-center gap-1.5"
              >
                <Sparkles size={15} />
                <span>{isProUnlocked ? 'Kelola Akun PRO' : 'Aktifkan PRO (Rp 35.000)'}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

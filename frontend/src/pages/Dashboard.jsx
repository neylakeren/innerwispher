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
  const { activeCareer, totalProgress, nextStep } = useCareer();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 19) return 'Selamat sore';
    return 'Selamat malam';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Sobat';

  useEffect(() => {
    client.get('/bookings')
      .then(res => {
        setBookings(res.data || []);
      })
      .catch(err => {
        console.error('Error fetching bookings', err);
      })
      .finally(() => setLoadingBookings(false));
  }, []);

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
      desc: 'Petakan potensi psikologis & minat',
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
      title: 'Konsultasi Pakar',
      desc: 'Jadwalkan konseling profesional',
      path: '/psychologists',
      icon: Users,
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

      {/* Recent Counseling Sessions Section */}
      <div className="card-s p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#8f78d8]" />
            <h2 className="text-base sm:text-lg font-bold text-[#2b2542]">
              Jadwal Sesi Konselingmu
            </h2>
          </div>
          <Link to="/bookings" className="text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86]">
            Lihat Semua Jadwal
          </Link>
        </div>

        {loadingBookings ? (
          <div className="py-4 text-center text-xs text-[#5d5577]">Memuat jadwal...</div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookings.slice(0, 2).map((b) => (
              <div 
                key={b.id} 
                className="p-4 rounded-xl border border-[#d9cff5] bg-white space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#4b3b86]">
                      {b.psychologist?.user?.name || 'Psikolog Klinis'}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      b.status === 'confirmed' ? 'bg-[#d1e7dd] text-[#198754]' : 'bg-[#fff3cd] text-[#664d03]'
                    }`}>
                      {b.status === 'confirmed' ? 'Terkonfirmasi' : 'Menunggu'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5d5577] mt-1">
                    {b.schedule_date} • {b.schedule_time || '10:00 WIB'}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#d9cff5]/50 flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#8f78d8]">
                    Rp {(b.amount || 160000).toLocaleString('id-ID')}
                  </span>
                  {b.session_id ? (
                    <Link to={`/sessions/${b.session_id}`}>
                      <Button size="sm" variant="primary" className="text-xs py-1 px-3 flex items-center gap-1">
                        <MessageSquare size={12} /> Buka Chat
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/bookings">
                      <Button size="sm" variant="outline" className="text-xs py-1 px-3">
                        Detail
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-[#5d5577] space-y-2">
            <p className="text-sm font-medium">Belum ada jadwal sesi konseling aktif.</p>
            <Link to="/psychologists">
              <Button size="sm" variant="primary" className="text-xs mt-1">
                Pilih Psikolog & Jadwalkan Sesi
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

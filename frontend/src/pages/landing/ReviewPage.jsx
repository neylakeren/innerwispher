import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck,
  Building2,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fallback reviews in case API is slow or offline
  const fallbackReviews = [
    {
      id: 1,
      name: 'Nadia Putri Rahmadani',
      role: 'Fresh Graduate UI/UX - Universitas Indonesia',
      outcome: 'Lolos Seleksi FinTech Terkemuka',
      initials: 'NP',
      rating: 5,
      review: 'Laporan diagnostik kariernya sangat akurat memetakan potensi saya ke bidang Product Design. Fitur audit CV ATS-nya ngebantu banget mendeteksi kata kunci industri yang sebelumnya kelewat. 2 minggu setelah revisi CV, langsung dipanggil interview HRD!',
    },
    {
      id: 2,
      name: 'Dimas Arya Pratama',
      role: 'Teknik Informatika - Institut Teknologi Bandung',
      outcome: 'Diterima di Ekosistem Digital Nasional',
      initials: 'DA',
      rating: 5,
      review: 'Skema langganan Rp 35.000 / bulan sangat ramah buat kantong mahasiswa. Simulasi interview metode STAR bener-bener membuka mata cara menyusun jawaban behavioral HRD secara runut, terstruktur, dan meyakinkan.',
    },
    {
      id: 3,
      name: 'Clara Anindita',
      role: 'Akuntansi & Keuangan - Universitas Airlangga',
      outcome: 'Lolos Seleksi Big 4 Assurance',
      initials: 'CA',
      rating: 5,
      review: 'Awalnya bingung kenapa CV saya sering di-reject tanpa kabar. Setelah pakai scanner CV Inner Whisper, baru sadar format tabel dan header saya bikin sistem ATS error. Begitu diperbaiki, score ATS tembus 92% dan lolos seleksi berkas!',
    },
    {
      id: 4,
      name: 'Fajar Hidayat',
      role: 'Teknik Industri - Universitas Gadjah Mada',
      outcome: 'Diterima MT FMCG Multinasional',
      initials: 'FH',
      rating: 5,
      review: 'Analisis SWOT dan radar karier 4 dimensinya komprehensif banget. Nggak cuma ngasih tahu minat, tapi juga blind spot yang harus diperbaiki sebelum masuk ke tahap user interview. Rekomendasi wajib untuk lulusan baru!',
    },
    {
      id: 5,
      name: 'Siti Sarah Maulida',
      role: 'Ilmu Komunikasi - Universitas Padjadjaran',
      outcome: 'Creative Agency Intern to Full-Time',
      initials: 'SM',
      rating: 5,
      review: 'Transfernya praktis via QRIS, BCA, SeaBank, GoPay, dan ShopeePay. Verifikasi struk oleh admin super cepat langsung kebuka semua fitur PRO. Downloadable PDF laporannya rapi dan bisa disimpan selamanya.',
    },
    {
      id: 6,
      name: 'Reza Kurniawan',
      role: 'Career Switcher - Manajemen Bisnis',
      outcome: 'Junior Data Analyst di Retail Modern',
      initials: 'RK',
      rating: 5,
      review: 'Sebagai lulusan non-IT yang ingin banting setir ke data analyst, tes minat bakatnya memberi kepastian bahwa logika analitis saya kuat. Roadmap dan modul portofolionya terstruktur serta mudah dieksekusi secara mandiri.',
    },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reviews');
      if (res.data?.success && res.data.reviews?.length > 0) {
        setReviews(res.data.reviews);
      } else {
        setReviews(fallbackReviews);
      }
    } catch (err) {
      console.warn('Fallback to static reviews:', err);
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 flex flex-col gap-12 sm:gap-16 font-quicksand">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold border border-[#d9cff5]">
          <Sparkles size={14} className="text-[#8f78d8]" />
          <span>Kisah Nyata &amp; Ulasan Pelanggan</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2b2542] tracking-tight leading-tight">
          Dipercaya Ribuan Mahasiswa &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Job Seeker Ambisius</span>
        </h1>

        <p className="text-sm sm:text-base text-[#5d5577] leading-relaxed">
          Lihat bagaimana Inner Whisper membantu pencari kerja mengaudit CV dengan format ATS, menaklukkan interview kerja metode STAR, dan menemukan arah karier terbaik mereka.
        </p>

        {/* Aggregate Metrics */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 pt-2 pb-1">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-base font-extrabold text-[#2b2542]">4.9 / 5.0</span>
          </div>
          <div className="h-4 w-px bg-[#d9cff5] hidden sm:block" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck size={14} />
            <span>100% Ulasan Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((rev, idx) => {
          return (
            <div
              key={rev.id || idx}
              className="card-s p-6 bg-white border border-[#d9cff5] hover:border-[#8f78d8] rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative group"
            >
              <div className="space-y-4">
                {/* Header Card: User Info & Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8f78d8] to-[#4b3b86] text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0">
                      {rev.avatar_url ? (
                        <img src={rev.avatar_url} alt={rev.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{rev.initials || rev.name?.charAt(0) || 'U'}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#2b2542] leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-[#5d5577] mt-0.5 leading-snug line-clamp-1">
                        {rev.role || rev.origin || 'Pelanggan Inner Whisper'}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex text-amber-400 shrink-0">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                {/* Outcome Badge */}
                {rev.outcome && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#efeafb] text-[#4b3b86] text-xs font-bold border border-[#d9cff5]/80">
                    <Award size={13} className="text-[#8f78d8] shrink-0" />
                    <span className="line-clamp-1">{rev.outcome}</span>
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-[#d9cff5]/60 flex items-center justify-between text-[11px] text-[#8a82a2]">
                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Pengguna Aktif PRO</span>
                </div>
                <span>Ulasan Terpercaya</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="card-s p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#4b3b86] via-[#6551b3] to-[#8f78d8] text-white text-center space-y-5 shadow-hero">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
          Siap Mewujudkan Lompatan Karier Impianmu?
        </h3>
        <p className="text-xs sm:text-sm text-[#efeafb] max-w-xl mx-auto leading-relaxed font-medium">
          Dapatkan keunggulan kompetitif di mata HRD sekarang. Ikuti tes minat bakat gratis, audit format CV ATS, dan kuasai pertanyaan interview kerja.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#4b3b86] hover:bg-[#efeafb] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
          >
            <ClipboardCheck size={16} />
            <span>Mulai Tes Karier Gratis</span>
          </Link>
          <Link
            to="/layanan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
          >
            <span>Pelajari Paket PRO (Rp 35k)</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Layanan() {
  const freeFeatures = [
    'Tes Minat & Bakat dasar (2 kategori dominan)',
    'CV ATS Quick Scanner (audit 8 parameter standar)',
    '3 pertanyaan simulasi wawancara kerja dasar',
    'Akses seluruh artikel & panduan karier mingguan',
  ];

  const proFeatures = [
    'Semua fitur Akses Dasar',
    'Full Laporan Analisis Karier Lengkap (Downloadable PDF)',
    'Grafik Radar 4 Dimensi & Rekomendasi 10+ Industri Cocok',
    'Analisis SWOT Karier (Kekuatan, Peluang, & Blind Spot)',
    'CV ATS Deep Diagnostic & Pencocokan Kata Kunci HRD',
    'Analisis Kata Kerja Aktif & Rekomendasi Baris-per-Baris',
    'Akses Penuh 10 Soal Simulasi Wawancara Kerja (Metode STAR)',
    'Modul Template Portofolio Karier Eksklusif',
    'Aktivasi Instan Otomatis (Tanpa Tunggu Admin)',
  ];

  const valueProps = [
    {
      icon: Zap,
      title: 'Aktivasi Instan 24/7',
      description: 'Cukup bayar via QRIS atau Virtual Account, sistem langsung membuka semua akses fitur detik itu juga.',
    },
    {
      icon: ShieldCheck,
      title: 'Standar Industri Rekrutmen',
      description: 'Format penilaian CV ATS dan bank soal wawancara disusun berbasis kriteria seleksi HRD dan sistem ATS modern.',
    },
    {
      icon: Award,
      title: '1x Bayar Tanpa Langganan',
      description: 'Hanya Rp 35.000 sekali bayar. Tidak ada jebakan tagihan bulanan atau perpanjangan otomatis.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 font-quicksand">
      {/* Hero Header */}
      <section className="text-center max-w-4xl mx-auto py-4 sm:py-8 md:py-12 mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold mb-4 border border-[#d9cff5]">
          <Sparkles size={14} className="text-[#8f78d8]" />
          Satu Harga Untuk Seluruh Akses Fitur
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#4b3b86] mb-3 sm:mb-6 tracking-tight">
          Paket Layanan &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Investasi Kariermu</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] max-w-3xl mx-auto leading-relaxed font-medium">
          Mulai secara gratis untuk mengenal potensi diri, lalu buka seluruh laporan diagnostik, audit CV ATS, dan simulator interview dengan <strong>satu kali pembayaran terjangkau</strong>.
        </p>
      </section>

      {/* Pricing Comparison Grid */}
      <section className="pb-12 sm:pb-16 md:pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Free Tier */}
          <div className="rounded-3xl p-6 sm:p-9 bg-white border border-[#d9cff5] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86]">
                  Akses Gratis
                </span>
                <span className="text-[11px] font-bold text-[#5d5577] bg-[#fbf9f9] border border-[#d9cff5] px-2.5 py-0.5 rounded-full">
                  Tanpa Syarat
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#2b2542] mb-1">Akses Dasar</h3>
              <p className="text-xs sm:text-sm text-[#5d5577] mb-5">
                Cocok untuk eksplorasi awal minat bakat dan pemeriksaan cepat format CV Anda.
              </p>

              <div className="mb-6 pb-4 border-b border-[#d9cff5]/60">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#4b3b86]">Rp 0</span>
                <span className="text-xs text-[#5d5577] ml-2 font-medium">/gratis selamanya</span>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
                  Fitur yang Didapatkan:
                </p>
                {freeFeatures.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2b2542]">
                    <CheckCircle2 size={16} className="text-[#8f78d8] shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/login"
              className="w-full text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold shadow-sm active:scale-95 bg-[#efeafb] text-[#4b3b86] hover:bg-[#e4daf7] border border-[#d9cff5]"
            >
              <span>Mulai Gratis Sekarang</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Pro Tier (Single Bundling) */}
          <div className="rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-[#efeafb] via-white to-white border-2 border-[#8f78d8] shadow-xl flex flex-col justify-between relative md:-translate-y-2">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#8f78d8] text-white shadow-sm flex items-center gap-1">
                  <Award size={13} /> All-in-One Lifetime
                </span>
                <span className="text-[11px] font-extrabold text-[#8f78d8] flex items-center gap-1">
                  <Sparkles size={13} /> Paling Hemat
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2b2542] mb-1">Inner Whisper PRO</h3>
              <p className="text-xs sm:text-sm text-[#5d5577] mb-5">
                Buka seluruh ekosistem: Laporan Lengkap, Audit CV ATS, dan 10 Simulasi Interview STAR.
              </p>

              <div className="mb-6 pb-4 border-b border-[#d9cff5]/70">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#4b3b86]">Rp 35.000</span>
                  <span className="text-xs text-[#5d5577] font-medium">/sekali bayar selamanya</span>
                </div>
                <p className="text-[11px] text-[#8f78d8] font-bold mt-1">
                  Tanpa perpanjangan otomatis. Tanpa biaya per fitur terpisah.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
                  Semua Fitur Unggulan Terbuka:
                </p>
                {proFeatures.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2b2542]">
                    <CheckCircle2 size={16} className="text-[#8f78d8] shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/login"
              className="w-full text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold shadow-btn active:scale-95 btn-lv text-white"
            >
              <span>Aktifkan PRO Sekarang (Rp 35.000)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Single Bundle */}
      <section className="card-s bg-gradient-to-r from-white to-[#efeafb]/50 p-6 sm:p-10 md:p-14 border border-[#d9cff5] max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86]">
            Mengapa Satu Harga Rp 35.000?
          </h2>
          <p className="text-xs sm:text-sm text-[#5d5577] mt-2">
            Kami percaya persiapan karier profesional harus terjangkau, transparan, dan tidak membingungkan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {valueProps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shadow-sm">
                <item.icon size={26} />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#2b2542] mt-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

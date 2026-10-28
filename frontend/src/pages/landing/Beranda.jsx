import { 
  Bot, 
  Brain, 
  FileText, 
  ArrowRight, 
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  Zap,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Beranda() {
  const steps = [
    {
      icon: Brain,
      title: 'Langkah 1: Tes Minat & Bakat Gratis',
      description: 'Jawab 25 pertanyaan psikometri terarah untuk memetakan minat dominanmu dalam Teknologi, Kreatif, Bisnis, atau Sosial.',
    },
    {
      icon: FileText,
      title: 'Langkah 2: Audit CV Format ATS',
      description: 'Pindai teks resumemu secara instan dengan standar HRD untuk memastikan kata kerja aktif dan kata kunci industri terpenuhi.',
    },
    {
      icon: Sparkles,
      title: 'Langkah 3: Simulasi Interview & Laporan',
      description: 'Latih respons wawancara kerja metode STAR dan buka laporan diagnostik lengkap untuk akselerasi karier impianmu.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 flex flex-col gap-12 sm:gap-16 md:gap-24 font-quicksand">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="md:col-span-6 flex flex-col gap-5 sm:gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold self-center md:self-start border border-[#d9cff5]">
            <Sparkles size={14} className="text-[#8f78d8]" />
            Platform Akselerasi &amp; Persiapan Karier Digital
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#2b2542]">
            Petakan Potensi Diri &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Taklukkan Karier Impian</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5d5577] max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
            Ekosistem persiapan karier mandiri yang dirancang khusus untuk mahasiswa dan pencari kerja. Mulai dari tes minat psikometri, audit CV ATS instan, hingga simulasi wawancara kerja terarah.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start pt-1">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-lv text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-btn transition-all active:scale-95 font-semibold text-white"
            >
              <ClipboardCheck size={18} />
              <span>Mulai Tes Karier Gratis</span>
            </Link>

            <Link
              to="/layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-out text-sm sm:text-base px-6 py-3.5 rounded-xl font-semibold shadow-sm text-[#4b3b86] border border-[#d9cff5] bg-white hover:bg-[#efeafb]"
            >
              <span>Lihat Paket Layanan</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#d9cff5]/60 text-left">
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">25</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Pertanyaan Asesmen</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">8 Parameter</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Audit CV Standar ATS</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">100%</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Instan Tanpa Antre</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 relative rounded-2xl overflow-hidden card-s p-2 h-[260px] sm:h-[350px] md:h-[460px] shadow-hero">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              alt="Suasana profesional persiapan karier dan pembelajaran digital"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2542]/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d9cff5]">Inner Whisper Career Copilot</span>
                <p className="text-sm sm:text-base font-bold">Akurasi asesmen psikometri &amp; standar ATS rekruter modern.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="flex flex-col gap-6 sm:gap-8 mt-2 sm:mt-8">
        <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
            Alur Persiapan Karier yang Praktis &amp; Terarah
          </h2>
          <p className="text-xs sm:text-base text-[#5d5577]">
            Tiga langkah terstruktur untuk mempersiapkan diri menghadapi seleksi kerja tanpa kebingungan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card-s p-6 sm:p-8 flex flex-col gap-3 sm:gap-4 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mb-1 shadow-sm">
                <step.icon size={26} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#2b2542]">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

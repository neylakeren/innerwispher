import { Compass, FileText, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TentangKami() {
  const pillars = [
    {
      icon: Compass,
      title: 'Pemetaan Potensi Terarah',
      description: 'Membantu Anda mengenali kekuatan diri, minat karier, dan jalur profesi yang paling selaras dengan kepribadian Anda lewat 25 indikator konsultasi karier.',
    },
    {
      icon: FileText,
      title: 'Audit Resume Standar ATS',
      description: 'Perangkat otomatis untuk membedah teks resume, memvalidasi kata kerja aktif, dan memastikan format CV terbaca optimal oleh sistem rekruter modern.',
    },
    {
      icon: Sparkles,
      title: 'Kesiapan Karier Nyata & Terjangkau',
      description: 'Dilengkapi panduan portofolio, simulasi wawancara metode STAR, dan skema harga ramah kantong tanpa beban langganan bulanan.',
    },
  ];

  return (
    <div className="pt-20 md:pt-[130px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full font-quicksand">
      {/* Hero / Mission */}
      <section className="mb-10 sm:mb-16 md:mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold mb-4 border border-[#d9cff5]">
          <ShieldCheck size={14} className="text-[#8f78d8]" />
          Platform Akselerasi &amp; Pengembangan Karier
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4b3b86] mb-3 sm:mb-6 leading-tight tracking-tight">
          Dedikasi untuk <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Potensi &amp; Masa Depan Karier Anda</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] max-w-4xl mx-auto leading-relaxed font-medium">
          Di Inner Whisper, misi kami adalah mendemokratisasi akses persiapan karier berkualitas tinggi. Kami menggabungkan layanan konsultasi karier ilmiah, teknologi audit ATS, dan simulasi wawancara terarah dalam satu ekosistem mandiri yang cepat, privat, dan terjangkau.
        </p>
      </section>

      {/* Pillars */}
      <section className="mb-10 sm:mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="card-s p-6 sm:p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                <pillar.icon size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2b2542] mb-2 sm:mb-3">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center card-s p-6 sm:p-10 md:p-14 border border-[#d9cff5] bg-white">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
          Siap Memulai Langkah Karier Impianmu?
        </h2>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] mb-5 sm:mb-8 font-medium">
          Mulai tes potensi minat secara gratis atau buka laporan diagnostik komprehensif Anda hari ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/login"
            className="w-full sm:w-auto btn-lv text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-btn inline-flex items-center justify-center gap-2.5 font-semibold transition-all active:scale-95 text-white"
          >
            <span>Mulai Tes Gratis</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/layanan"
            className="w-full sm:w-auto btn-out text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-sm inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-95 text-[#4b3b86] border border-[#d9cff5] bg-white hover:bg-[#efeafb]"
          >
            <span>Bandingkan Paket</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

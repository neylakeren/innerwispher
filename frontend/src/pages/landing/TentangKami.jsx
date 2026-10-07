import { Compass, Users, Sparkles, MessageCircle } from 'lucide-react';

export default function TentangKami() {
  const pillars = [
    {
      icon: Compass,
      title: 'Pemetaan Potensi Terarah',
      description: 'Membantu Anda mengenali kekuatan diri, minat karier, dan jalur profesi yang paling selaras dengan kepribadian Anda.',
    },
    {
      icon: Users,
      title: 'Bimbingan Konselor Berpengalaman',
      description: 'Ruang aman dan privat bersama konselor untuk mendiskusikan arah karier, mengatasi burnout, dan menyusun langkah masa depan.',
    },
    {
      icon: Sparkles,
      title: 'Kesiapan Karier Nyata',
      description: 'Dilengkapi panduan kurasi portofolio, audit resume ATS, simulasi wawancara kerja, dan materi micro-learning interaktif.',
    },
  ];

  return (
    <div className="pt-20 md:pt-[130px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full font-quicksand">
      {/* Hero / Mission */}
      <section className="mb-10 sm:mb-16 md:mb-20 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4b3b86] mb-3 sm:mb-6 leading-tight tracking-tight">
          Dedikasi untuk <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Arah &amp; Potensi Karier Anda</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] max-w-4xl mx-auto leading-relaxed font-medium">
          Di Inner Whisper, misi kami adalah menyediakan akses yang mudah, aman, dan penuh empati untuk bimbingan konseling karier, pemetaan potensi diri, serta pendampingan masa depan yang bermakna.
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
          Ingin Mulai Bercerita &amp; Berkonsultasi?
        </h2>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] mb-5 sm:mb-8 font-medium">
          Tim konselor kami siap mendengarkan dan mendampingi tanpa menghakimi.
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto btn-lv text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-btn inline-flex items-center justify-center gap-2.5 font-semibold transition-all active:scale-95 text-white"
        >
          <MessageCircle size={20} />
          <span>Chat WhatsApp Sekarang</span>
        </a>
      </section>
    </div>
  );
}

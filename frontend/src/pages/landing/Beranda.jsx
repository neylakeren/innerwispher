import { MessageCircle, Bot, Brain, CalendarDays, ShieldCheck } from 'lucide-react';

export default function Beranda() {
  const steps = [
    {
      icon: Bot,
      title: 'Langkah 1: Chat dengan Bot',
      description: 'Mulai percakapan kapan saja melalui WhatsApp. Bot kami siap merespon 24/7.',
    },
    {
      icon: Brain,
      title: 'Langkah 2: Skrining Awal',
      description: 'Bot membantu memahami kebutuhan dan kondisi awal Anda secara empatik.',
    },
    {
      icon: CalendarDays,
      title: 'Langkah 3: Jadwal Konseling',
      description: 'Terhubung dengan psikolog berlisensi untuk sesi konseling profesional.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 flex flex-col gap-12 sm:gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="md:col-span-6 flex flex-col gap-5 sm:gap-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-primary">
            Temukan Ketenangan Jiwa Anda Bersama Kami
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Layanan psikologi terpercaya dengan akses bantuan 24/7 melalui Bot WhatsApp kami. Ruang aman untuk memulihkan kesejahteraan mental Anda.
          </p>
          <div className="pt-1">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-[#833344] text-on-primary text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 font-semibold"
            >
              <MessageCircle size={20} fill="currentColor" />
              <span>Chat dengan Bot WA Kami</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-6 relative rounded-2xl overflow-hidden ambient-shadow bg-surface-container-lowest h-[220px] sm:h-[350px] md:h-[500px]">
          <img
            className="w-full h-full object-cover rounded-2xl animate-fade-in"
            alt="Ruang konsultasi yang tenang dan nyaman dengan pencahayaan hangat"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpc8IV3zPU_DwGvD_hPp5MkVe_wYxr21hZP-ShPVsCLdiSrQa36v5r_FenN4z7kJJMcjYR_OxM1dgNy3cXI1504UHAoCWoE5xbBY1P72Gx-5GisceJAuZ_uGNdKjoLeKRZJRmqfGKQg3wiZuFoInufO1sFsVQm0UoprJJvAo40fQA0gSF4QTqMO3oTLCAF--ZLCQrXB6ZkCftFXSFXGT4U_50clYWNClemkNyR0HMcR3c21NWnW20jfd0wWecXtccSXchD4_f0SGdg"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-12 md:mt-16">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Alur Pengguna yang Mudah
          </h2>
          <p className="text-xs sm:text-base text-on-surface-variant">
            Langkah sederhana untuk memulai perjalanan pemulihan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 md:p-8 ambient-shadow border border-outline-variant/30 flex flex-col gap-3 sm:gap-4 hover-lift"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-1">
                <step.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-on-surface">{step.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center gap-3 sm:gap-5 border border-outline-variant/20">
        <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
        <p className="text-sm sm:text-lg md:text-2xl font-medium text-on-surface max-w-3xl leading-relaxed">
          Privasi Anda adalah prioritas utama kami. Aman, rahasia, dan terpercaya.
        </p>
      </section>
    </div>
  );
}

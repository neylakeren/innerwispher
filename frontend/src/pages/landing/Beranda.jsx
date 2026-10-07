import { MessageCircle, Bot, Brain, CalendarDays, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export default function Beranda() {
  const steps = [
    {
      icon: Bot,
      title: 'Langkah 1: Chat dengan Bot Empatis',
      description: 'Mulai percakapan kapan saja melalui WhatsApp. Bot responsif kami siap menemani 24/7.',
    },
    {
      icon: Brain,
      title: 'Langkah 2: Skrining & Tes Minat',
      description: 'Memetakan potensi kariermu secara terarah.',
    },
    {
      icon: CalendarDays,
      title: 'Langkah 3: Konsultasi Konselor',
      description: 'Terhubung langsung dengan konselor profesional untuk bimbingan terarah.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 flex flex-col gap-12 sm:gap-16 md:gap-24 font-quicksand">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="md:col-span-6 flex flex-col gap-5 sm:gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold self-center md:self-start border border-[#d9cff5]">
            <Sparkles size={14} className="text-[#8f78d8]" />
            Ruang Konseling & Pengembangan Karier
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#2b2542]">
            Temukan Ketenangan Jiwa & <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Arah Langkahmu</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5d5577] max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
            Layanan konseling dan eksplorasi karier terpercaya dengan akses bantuan 24/7. Ruang aman yang privat untuk memulihkan energi serta merancang masa depan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start pt-1">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-lv text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-btn transition-all active:scale-95 font-semibold"
            >
              <MessageCircle size={18} fill="currentColor" />
              <span>Chat dengan Bot WA Kami</span>
            </a>

            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-out text-sm sm:text-base px-6 py-3.5 rounded-xl font-semibold shadow-sm"
            >
              <span>Mulai Tes Karier</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="md:col-span-6 relative rounded-2xl overflow-hidden card-s p-2 h-[260px] sm:h-[350px] md:h-[460px] shadow-hero">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              alt="Ruang konsultasi yang tenang dan nyaman dengan suasana teduh"
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2542]/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d9cff5]">Inner Whisper</span>
                <p className="text-sm sm:text-base font-bold">Kerahasiaan terjamin bersama konselor profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="flex flex-col gap-6 sm:gap-8 mt-2 sm:mt-8">
        <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
            Alur Pendampingan yang Nyaman & Mudah
          </h2>
          <p className="text-xs sm:text-base text-[#5d5577]">
            Tiga langkah sederhana untuk memulai perjalanan ketenangan mental dan ketajaman karier Anda.
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

      {/* Trust Section */}
      <section className="card-s bg-gradient-to-r from-white to-[#efeafb]/70 p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 border border-[#d9cff5]">
        <div className="w-12 h-12 rounded-full bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shadow-sm">
          <ShieldCheck size={28} />
        </div>
        <p className="text-sm sm:text-lg md:text-xl font-bold text-[#2b2542] max-w-3xl leading-relaxed">
          Privasi dan kerahasiaan sesi konseling Anda adalah prioritas nol kami. Terlindungi dengan standar privasi profesional.
        </p>
      </section>
    </div>
  );
}

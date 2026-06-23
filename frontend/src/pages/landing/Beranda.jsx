import React from 'react';
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
    <div className="w-full px-8 md:px-16 lg:px-24 pt-[120px] md:pt-[150px] pb-24 flex flex-col gap-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-6 flex flex-col gap-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-primary">
            Temukan Ketenangan Jiwa Anda Bersama Kami
          </h1>
          <p className="text-body-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Layanan psikologi terpercaya dengan akses bantuan 24/7 melalui Bot WhatsApp kami. Ruang aman untuk memulihkan kesejahteraan mental Anda.
          </p>
          <div className="mt-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-on-primary text-body-lg px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 font-semibold"
            >
              <MessageCircle size={22} fill="currentColor" />
              Chat dengan Bot WA Kami
            </a>
          </div>
        </div>
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden ambient-shadow bg-surface-container-lowest h-[350px] md:h-[500px] lg:h-[550px]">
          <img
            className="w-full h-full object-cover rounded-xl animate-fade-in"
            alt="Ruang konsultasi yang tenang dan nyaman dengan pencahayaan hangat"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpc8IV3zPU_DwGvD_hPp5MkVe_wYxr21hZP-ShPVsCLdiSrQa36v5r_FenN4z7kJJMcjYR_OxM1dgNy3cXI1504UHAoCWoE5xbBY1P72Gx-5GisceJAuZ_uGNdKjoLeKRZJRmqfGKQg3wiZuFoInufO1sFsVQm0UoprJJvAo40fQA0gSF4QTqMO3oTLCAF--ZLCQrXB6ZkCftFXSFXGT4U_50clYWNClemkNyR0HMcR3c21NWnW20jfd0wWecXtccSXchD4_f0SGdg"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="flex flex-col gap-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">Alur Pengguna yang Mudah</h2>
          <p className="text-body-lg text-on-surface-variant">Langkah sederhana untuk memulai perjalanan pemulihan Anda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow border border-outline-variant/30 flex flex-col gap-4 hover-lift"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-2">
                <step.icon size={28} />
              </div>
              <h3 className="text-headline-md font-bold text-on-surface">{step.title}</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="mt-24 bg-surface-container-low rounded-xl p-16 flex flex-col items-center justify-center text-center gap-6">
        <ShieldCheck size={56} className="text-primary" strokeWidth={1.5} />
        <p className="text-xl md:text-2xl lg:text-3xl font-medium text-on-surface max-w-4xl leading-relaxed">
          Privasi Anda adalah prioritas utama kami. Aman, rahasia, dan terpercaya.
        </p>
      </section>
    </div>
  );
}

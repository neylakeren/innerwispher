import React from 'react';
import { User, Heart, Briefcase, ShieldCheck, Clock, CalendarCheck, MessageCircle } from 'lucide-react';

export default function Layanan() {
  const services = [
    {
      icon: User,
      iconBg: 'bg-primary-container/20',
      iconColor: 'text-primary',
      title: 'Individual Counseling',
      description: 'Ruang aman untuk pertumbuhan pribadi.',
      colSpan: '',
    },
    {
      icon: Heart,
      iconBg: 'bg-secondary-container/20',
      iconColor: 'text-secondary',
      title: 'Couple Therapy',
      description: 'Membangun komunikasi dan harmoni kembali.',
      colSpan: '',
    },
    {
      icon: Briefcase,
      iconBg: 'bg-tertiary-container/20',
      iconColor: 'text-tertiary',
      title: 'Career Stress',
      description: 'Mengelola tekanan kerja dan keseimbangan hidup.',
      colSpan: 'lg:col-span-1 md:col-span-2',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Psikolog Tersertifikasi',
      description: 'Ditangani oleh tenaga profesional yang terdaftar dan memiliki jam terbang tinggi.',
    },
    {
      icon: Clock,
      title: 'Akses 24/7',
      description: 'Dukungan darurat dan pemesanan layanan kapan saja Anda membutuhkannya.',
    },
    {
      icon: CalendarCheck,
      title: 'Jadwal Fleksibel',
      description: 'Pilih waktu konseling yang paling sesuai dengan kesibukan Anda dengan mudah.',
    },
  ];

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <section className="w-full px-8 md:px-16 lg:px-24 py-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">Layanan Kami</h1>
          <p className="text-body-lg md:text-xl text-on-surface-variant max-w-4xl mx-auto leading-relaxed">
            Temukan ruang aman untuk berbicara, tumbuh, dan menyembuhkan. Kami menyediakan berbagai layanan psikologi profesional yang disesuaikan dengan kebutuhan Anda, didukung oleh tenaga ahli yang empati dan berpengalaman.
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="w-full px-8 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-surface-container-lowest rounded-2xl p-8 md:p-10 lg:p-12 ambient-shadow hover-lift flex flex-col border border-outline-variant/30 ${service.colSpan}`}
            >
              <div className={`${service.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                <service.icon size={28} className={service.iconColor} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{service.title}</h3>
              <p className="text-body-lg md:text-xl text-on-surface-variant flex-grow mb-6 leading-relaxed">{service.description}</p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-body-lg bg-secondary text-on-secondary py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold"
              >
                <MessageCircle size={20} />
                Booking via WA
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface-container-low py-24 w-full">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Mengapa memilih layanan kami?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <feature.icon size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-on-surface">{feature.title}</h4>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

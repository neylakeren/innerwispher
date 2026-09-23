import { User, Heart, Briefcase, ShieldCheck, Clock, CalendarCheck, MessageCircle } from 'lucide-react';

export default function Layanan() {
  const services = [
    {
      icon: User,
      iconBg: 'bg-primary-container/20',
      iconColor: 'text-primary',
      title: 'Individual Counseling',
      description: 'Ruang aman untuk pertumbuhan pribadi, mengatasi beban pikiran, kecemasan, dan eksplorasi diri bersama psikolog klinis.',
      colSpan: '',
    },
    {
      icon: Heart,
      iconBg: 'bg-secondary-container/20',
      iconColor: 'text-secondary',
      title: 'Couple Therapy',
      description: 'Membangun komunikasi yang sehat, menyelesaikan konflik, dan memulihkan keintiman dalam hubungan bersama pasangan.',
      colSpan: '',
    },
    {
      icon: Briefcase,
      iconBg: 'bg-tertiary-container/20',
      iconColor: 'text-tertiary',
      title: 'Career Stress',
      description: 'Mengelola burnout kerja, kecemasan performa, dan mencapai work-life balance yang berkelanjutan untuk produktivitas Anda.',
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
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto py-4 sm:py-8 md:py-12 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary mb-3 sm:mb-6">
          Layanan Kami
        </h1>
        <p className="text-xs sm:text-base md:text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Temukan ruang aman untuk berbicara, tumbuh, dan menyembuhkan. Kami menyediakan berbagai layanan psikologi profesional yang disesuaikan dengan kebutuhan Anda, didukung oleh tenaga ahli yang empati dan berpengalaman.
        </p>
      </section>

      {/* Services Grid */}
      <section className="pb-10 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-surface-container-lowest rounded-2xl p-5 sm:p-6 md:p-8 ambient-shadow hover-lift flex flex-col border border-outline-variant/30 ${service.colSpan}`}
            >
              <div className={`${service.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5`}>
                <service.icon size={24} className={service.iconColor} />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-on-surface mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant flex-grow mb-5 sm:mb-6 leading-relaxed">
                {service.description}
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm sm:text-base bg-secondary hover:bg-secondary/90 text-on-secondary py-3 sm:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold active:scale-95 shadow-sm"
              >
                <MessageCircle size={18} />
                <span>Booking via WA</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-10 md:p-14 border border-outline-variant/20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary">
            Mengapa Memilih Kami?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-primary">
                <feature.icon size={32} strokeWidth={1.5} className="sm:w-9 sm:h-9" />
              </div>
              <h4 className="text-base sm:text-xl font-bold text-on-surface mb-1.5 sm:mb-2">
                {feature.title}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

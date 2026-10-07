import { Briefcase, FileText, UserCheck, ShieldCheck, Clock, CalendarCheck, MessageCircle } from 'lucide-react';

export default function Layanan() {
  const services = [
    {
      icon: Briefcase,
      title: 'Career Stress & Planning',
      description: 'Mengelola burnout kerja, kecemasan performa, dan merancang roadmap langkah karier yang presisi dan berkesinambungan.',
    },
    {
      icon: FileText,
      title: 'Review CV & Portofolio',
      description: 'Audit kesesuaian format ATS resume dan bimbingan kurasi portofolio profesional untuk meningkatkan daya saing rekrutmen.',
    },
    {
      icon: UserCheck,
      title: 'Simulasi Wawancara Kerja',
      description: 'Latihan wawancara kerja terarah dengan feedback mendalam agar Anda tampil percaya diri menghadapi rekruter.',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Konselor Berpengalaman',
      description: 'Ditangani oleh konselor profesional dan mentor karier yang berdedikasi tinggi.',
    },
    {
      icon: Clock,
      title: 'Akses 24/7',
      description: 'Dukungan bantuan terarah dan pemesanan layanan kapan saja melalui platform kami.',
    },
    {
      icon: CalendarCheck,
      title: 'Jadwal Fleksibel',
      description: 'Pilih waktu konseling yang paling sesuai dengan ritme kesibukan harian Anda.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 font-quicksand">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto py-4 sm:py-8 md:py-12 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#4b3b86] mb-3 sm:mb-6 tracking-tight">
          Layanan Konseling &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Karier Kami</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] max-w-3xl mx-auto leading-relaxed font-medium">
          Temukan ruang aman untuk berbicara, bertumbuh, dan merancang masa depan. Kami menyediakan berbagai layanan konseling karier terarah yang disesuaikan dengan kebutuhan Anda.
        </p>
      </section>

      {/* Services Grid */}
      <section className="pb-10 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-s p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-200"
            >
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                  <service.icon size={26} />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#2b2542] mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#5d5577] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm sm:text-base btn-lv py-3 sm:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold active:scale-95 shadow-btn text-white"
              >
                <MessageCircle size={18} />
                <span>Konsultasi Sekarang</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="card-s bg-gradient-to-r from-white to-[#efeafb]/50 p-6 sm:p-10 md:p-14 border border-[#d9cff5]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86]">
            Mengapa Memilih Inner Whisper?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shadow-sm">
                <feature.icon size={28} />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#2b2542] mt-1">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

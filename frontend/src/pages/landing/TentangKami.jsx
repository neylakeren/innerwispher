import { ShieldCheck, MessageCircle } from 'lucide-react';

export default function TentangKami() {
  const experts = [
    {
      name: 'Dr. Rina Saraswati, M.Psi',
      tags: ['Kecemasan', 'Trauma'],
      description: 'Berpengalaman lebih dari 10 tahun membantu individu mengatasi trauma masa lalu dengan pendekatan kognitif perilaku yang berpusat pada klien.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Budi Santoso, M.Psi',
      tags: ['Depresi', 'Manajemen Stres'],
      description: 'Fokus pada penyembuhan holistik dan mindfulness untuk membantu klien menemukan kedamaian batin di tengah tekanan kehidupan modern.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Siti Aisyah, M.Psi',
      tags: ['Hubungan', 'Keluarga'],
      description: 'Spesialis dalam konseling pernikahan dan keluarga, membantu membangun kembali komunikasi yang sehat dan empati antar anggota keluarga.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="pt-20 md:pt-[130px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full font-quicksand">
      {/* Hero / Mission */}
      <section className="mb-10 sm:mb-16 md:mb-20 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4b3b86] mb-3 sm:mb-6 leading-tight tracking-tight">
          Dedikasi untuk <span className="bg-gradient-to-r from-[#8f78d8] to-[#b9a6f0] bg-clip-text text-transparent">Kesejahteraan Jiwa Anda</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] max-w-4xl mx-auto leading-relaxed font-medium">
          Di Inner Whisper, misi kami adalah menyediakan akses yang mudah, aman, dan penuh empati untuk dukungan kesehatan mental serta arah karier yang bermakna.
        </p>
      </section>

      {/* Experts */}
      <section className="mb-10 sm:mb-16 md:mb-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-6 sm:mb-10 text-center">
          Kenali Para Psikolog Klinis Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="card-s p-6 sm:p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-6 ring-4 ring-[#efeafb] shadow-btn">
                <img
                  className="w-full h-full object-cover"
                  alt={expert.name}
                  src={expert.image}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2b2542] mb-2">
                {expert.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {expert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#efeafb] text-[#4b3b86] text-xs px-3 py-1 rounded-full font-semibold border border-[#d9cff5]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
                {expert.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="mb-10 sm:mb-16 md:mb-20 card-s bg-gradient-to-r from-white to-[#efeafb]/60 p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 md:gap-12 border border-[#d9cff5]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#efeafb] rounded-2xl flex items-center justify-center shrink-0 text-[#8f78d8] shadow-sm">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
            Aman, Rahasia, &amp; Tepercaya
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-[#5d5577] leading-relaxed font-medium">
            Privasi Anda adalah prioritas nol kami. Semua sesi konseling dilindungi etika kerahasiaan medis psikolog klinis berlisensi resmi.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center card-s p-6 sm:p-10 md:p-14 border border-[#d9cff5] bg-white">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
          Ingin Mulai Bercerita?
        </h2>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] mb-5 sm:mb-8 font-medium">
          Tim ahli kami siap mendengarkan dan mendampingi tanpa menghakimi.
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto btn-lv text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-btn inline-flex items-center justify-center gap-2.5 font-semibold transition-all active:scale-95"
        >
          <MessageCircle size={20} />
          <span>Chat WhatsApp Sekarang</span>
        </a>
      </section>
    </div>
  );
}

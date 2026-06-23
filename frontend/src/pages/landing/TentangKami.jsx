import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';

export default function TentangKami() {
  const experts = [
    {
      name: 'Dr. Rina Saraswati',
      tags: ['Kecemasan', 'Trauma'],
      description: 'Berpengalaman lebih dari 10 tahun membantu individu mengatasi trauma masa lalu dengan pendekatan kognitif perilaku yang berpusat pada klien.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwXhxWL2vV0ryHhRTu0TO_WkJ7cwBXMiRrVDHQwy8IvwuZFIVjoMfwuYulDh-xWl2DHfT9JPPPi3Mgx5miy1mjluL-n0mithgKFKMIAloGD31WuAA_YNK8U-1BrkX9szQgA-XKbwd8sCBo_PjqbvBjQZu1PnzC7tfi6wYF88PhMeS70a9Pz70aSCktf9jQVV0C1_owEILYpd11QxXcJlhm9PtMe260NPKHMvr5uOCckGlSNcMt2alr4Es8WHjvqWJnyA2Rds-qpDd6',
    },
    {
      name: 'Budi Santoso, M.Psi',
      tags: ['Depresi', 'Manajemen Stres'],
      description: 'Fokus pada penyembuhan holistik dan mindfulness untuk membantu klien menemukan kedamaian batin di tengah tekanan kehidupan modern.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdyMWNNBff7geCu4BEI6BAdHNrdu93WslxJX4J6-IqC9Z3Lh0XO_0ApfMLRkqsVc3_mLMcAf64wvzjrdkxMTnGEyD3yutHFtQgrkualttJLszc8nCCberfQ4bfzUJLSAnFSYG5CZPa3BLSv9zDa6I9LtxgUTdIQc84AdrI1ru-a-rwxqQI7EMG311DYcprGZA0A6hP8ZrlN5o_08bjkg2T4o4Qs1h9WqlCYspcb7ClzFHtkBt1YDhgs1Z97jrhtyUnHRDxd0nL2_nJ',
    },
    {
      name: 'Siti Aisyah, M.Psi',
      tags: ['Hubungan', 'Keluarga'],
      description: 'Spesialis dalam konseling pernikahan dan keluarga, membantu membangun kembali komunikasi yang sehat dan empati antar anggota keluarga.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYfw_yfmXellTM-7mQ3leLX8_CO55epfwK6bOh781vkdlI-DSlFQfzn9Akx9kA_SK9M4Y8zA8uCse2Y64Gh1ELMtl0mOcJCqSjp5vz-gwK2TPxGmQDn8V9tphK0HiHptPuJ6eKmZnmRLrCCXB9jVdvwx-3cd0SpNiidJ_-c_qREYc-f37GDYrD9VAWomfR7jWNQ7KjPqdadihO5EgzhvcPZ1oimzqC9iyPPkI0g-guxf7gBAYif-oYM9GeMYrtVEk4U79AcvM_xhE',
    },
  ];

  return (
    <div className="pt-28 md:pt-[150px] pb-24 px-8 md:px-16 lg:px-24 w-full">
      {/* Hero / Mission */}
      <section className="mb-24 text-center md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8">Dedikasi untuk Kesejahteraan Mental Anda</h1>
        <p className="text-body-lg md:text-xl text-on-surface-variant max-w-5xl mx-auto leading-relaxed">
          Di InnerWhisper, misi kami adalah menyediakan akses yang mudah, aman, dan penuh empati untuk dukungan kesehatan mental. Kami percaya bahwa setiap individu berhak mendapatkan ruang yang tenang untuk memulihkan diri.
        </p>
      </section>

      {/* Experts */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-12 text-center">Kenali Para Ahli Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-8 border-4 border-primary-container">
                <img className="w-full h-full object-cover animate-fade-in" alt={expert.name} src={expert.image} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">{expert.name}</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {expert.tags.map((tag) => (
                  <span key={tag} className="bg-secondary-container text-on-secondary-container text-caption px-4 py-1.5 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">{expert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="mb-24 bg-surface-container-low rounded-2xl p-16 flex flex-col md:flex-row items-center gap-16 ambient-shadow">
        <div className="w-28 h-28 bg-primary-container rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck size={56} className="text-on-primary-container" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">Aman &amp; Rahasia</h2>
          <p className="text-body-lg md:text-xl text-on-surface-variant leading-relaxed">
            Privasi Anda adalah prioritas utama kami. Semua sesi konseling dan data pribadi dienkripsi dengan standar medis tertinggi. Kami berkomitmen menyediakan ruang yang 100% rahasia untuk perjalanan pemulihan Anda tanpa rasa khawatir.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-surface-container-highest rounded-2xl p-24 ambient-shadow border border-outline-variant/30">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">Ingin mulai bercerita?</h2>
        <p className="text-body-lg md:text-xl text-on-surface-variant mb-8 font-medium">Tim ahli kami siap mendengarkan tanpa menghakimi.</p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-on-primary text-body-lg px-16 py-6 rounded-lg shadow-md hover-lift inline-flex items-center gap-3 font-semibold"
        >
          <MessageCircle size={22} />
          Chat Bot kami sekarang
        </a>
      </section>
    </div>
  );
}

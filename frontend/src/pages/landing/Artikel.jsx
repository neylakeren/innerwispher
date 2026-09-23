import { useState } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

const categories = ['Semua Topik', 'Kecemasan', 'Hubungan', 'Perawatan Diri', 'Produktivitas'];

const featuredArticle = {
  id: 'featured-1',
  title: 'Menemukan Ketenangan di Tengah Kesibukan Sehari-hari',
  description: 'Langkah-langkah sederhana namun efektif untuk membangun rutinitas perawatan diri yang berkelanjutan, bahkan ketika jadwal Anda terasa sangat padat.',
  category: 'Perawatan Diri',
  author: 'Dr. Amanda Setiawan',
  authorTitle: 'Psikolog Klinis',
  readTime: '5 Min Baca',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsYtlGey4dJ_QUSA84iQmTtngjJcJQE3IuYWJt-625ApQbxaDJycO976Z-X32i0Yfon5AjU91fUpEcqW8Ic3ouLI2We0vwJh1js28OTt4hYAan7itkKmuGATDA3TXsfq0UiE540roIO2SO8vH5r0rlGFuZ-G3jFsRXUOMscNwBg6WtqGEi0SvwJbDuQzk3ANwRvleiNT90HiBCm8P6tHy_KJ-A8l53y-8EoP_akiE2XQnAFand0p30JSieEDk7ycz5DV-uHRaA7IdF',
  hasImage: true,
  content: [
    { type: 'paragraph', text: 'Di dunia modern yang bergerak serba cepat, kesibukan sering kali dianggap sebagai lambang kesuksesan. Namun, tanpa kita sadari, tekanan pekerjaan yang tiada habisnya, tenggat waktu yang ketat, dan tuntutan sosial dapat menguras energi mental kita secara perlahan. Merawat kesehatan mental bukan lagi sebuah kemewahan, melainkan kebutuhan dasar agar kita tetap berfungsi dengan baik.' },
    { type: 'subheading', text: '1. Mulai dengan Kesadaran Diri (Mindfulness)' },
    { type: 'paragraph', text: 'Mindfulness atau kesadaran penuh adalah latihan memusatkan perhatian pada momen saat ini tanpa menghakimi. Anda tidak perlu meluangkan waktu berjam-jam untuk bermeditasi. Lakukan saja jeda mikro selama 2-3 menit di sela-sela aktivitas kerja. Tarik napas dalam-dalam melalui hidung, tahan selama empat hitungan, lalu hembuskan perlahan melalui mulut. Latihan sederhana ini membantu menurunkan kadar hormon stres (kortisol) secara instan.' },
    { type: 'subheading', text: '2. Jadwalkan Jeda secara Sengaja' },
    { type: 'paragraph', text: 'Jika Anda bisa menjadwalkan rapat dengan klien, mengapa Anda tidak bisa menjadwalkan waktu untuk diri sendiri? Buatlah komitmen tertulis di kalender Anda, misalnya "Jeda Kopi 10 Menit tanpa Ponsel". Gunakan waktu ini untuk meregangkan otot, berjalan ke luar ruangan, atau sekadar memandangi tanaman hijau. Menjauh dari layar komputer atau gawai akan memberikan ruang bagi otak untuk beristirahat dan memulihkan fokus.' },
    { type: 'quote', text: '“Kesehatan mental Anda jauh lebih penting daripada produktivitas atau tenggat pekerjaan apa pun. Tanpa ketenangan jiwa, kesuksesan finansial tidak akan terasa utuh.”' },
    { type: 'subheading', text: '3. Terapkan Detoks Digital Berkala' },
    { type: 'paragraph', text: 'Pemberitahuan ponsel pintar yang terus-menerus berbunyi memicu otak kita untuk selalu berada dalam mode siaga (fight-or-flight). Batasi penggunaan media sosial, terutama di pagi hari setelah bangun tidur dan malam hari sebelum tidur. Coba ganti aktivitas menggulir layar (scrolling) dengan membaca buku fisik, menulis jurnal perasaan, atau mengobrol langsung dengan keluarga terdekat.' },
    { type: 'paragraph', text: 'Menemukan ketenangan tidak berarti kita harus meninggalkan semua kesibukan kita. Ini tentang bagaimana kita menciptakan batas-batas yang sehat antara dunia luar dan dunia dalam diri kita sendiri. Mulailah dari langkah kecil hari ini.' }
  ]
};

const articles = [
  {
    id: 'article-1',
    title: 'Mengenali Gejala Serangan Panik vs Kecemasan Biasa',
    description: 'Memahami perbedaan krusial antara serangan panik akut dan kecemasan umum untuk penanganan yang lebih tepat sasaran.',
    category: 'Kecemasan',
    author: 'Budi Santoso, M.Psi',
    authorTitle: 'Psikolog Klinis',
    readTime: '6 Min Baca',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6y_eWvq9iJWASljh0SrjJnziuu0inXHgVsh-cVe4zJelUq-f8TucOtrByd0VZhBuJjNfITXkn2WfPOtNutMeRnMJGFi_U8fliOleWJZUV6dW7hYs-LVTfPMLzpy6PF6_HM1Wa29_EEuMRvUfS_R4H6PGMe2UbbP-Ui2XZ8PHyN078clLD6c_fmrjalQ_KDfPBWj7Wkf2PdSt3jp1VQH_jee5M4ELqDvXzfdHW8QNx1q282OWLHfWPhDmApm1kLPnQAPvw9Bg70r2R',
    hasImage: true,
    content: [
      { type: 'paragraph', text: 'Banyak orang sering menyamakan antara serangan panik (panic attack) dengan kecemasan (anxiety) biasa. Meskipun keduanya melibatkan perasaan takut dan respons fisik yang mirip, memahami perbedaan antara keduanya sangatlah penting untuk mendapatkan penanganan yang tepat.' },
      { type: 'subheading', text: 'Serangan Panik: Tiba-tiba dan Intens' },
      { type: 'paragraph', text: 'Serangan panik biasanya datang secara mendadak tanpa pemicu yang jelas. Gejalanya sangat intens dan mencapai puncaknya dalam waktu 10 menit. Gejala fisik yang sering dirasakan meliputi jantung berdebar kencang, sesak napas berat, pusing, gemetar, hingga perasaan takut kehilangan kendali atau takut mati.' },
      { type: 'subheading', text: 'Kecemasan Biasa: Bertahap dan Terpemicu' },
      { type: 'paragraph', text: 'Di sisi lain, kecemasan biasanya berkembang secara bertahap dan berhubungan dengan pemicu tertentu, seperti masalah keuangan, ujian, atau konflik interpersonal. Intensitasnya cenderung lebih rendah daripada serangan panik, tetapi dapat berlangsung dalam jangka waktu yang lebih lama (berhari-hari hingga berminggu-minggu).' },
      { type: 'quote', text: '“Serangan panik terasa seperti badai tiba-tiba di laut tenang, sedangkan kecemasan terasa seperti mendung tebal yang tidak kunjung menurunkan hujan.”' },
      { type: 'subheading', text: 'Cara Mengatasinya secara Mandiri' },
      { type: 'paragraph', text: 'Saat Anda merasakan serangan panik, gunakan metode grounding 5-4-3-2-1 untuk memusatkan kembali pikiran Anda pada kenyataan sekitar. Temukan 5 benda yang bisa dilihat, 4 benda yang bisa disentuh, 3 suara yang bisa didengar, 2 bau yang bisa dicium, dan 1 rasa yang bisa dicicipi. Jika gejala kecemasan mengganggu aktivitas harian Anda, jangan ragu untuk berkonsultasi dengan psikolog profesional.' }
    ]
  },
  {
    id: 'article-2',
    title: 'Membangun Batasan Sehat dalam Hubungan Keluarga',
    description: 'Batasan bukanlah tembok pemisah, melainkan aturan main yang menjaga rasa hormat dan cinta dalam keluarga. Pelajari cara mengomunikasikannya.',
    category: 'Hubungan',
    author: 'Siti Aisyah, M.Psi',
    authorTitle: 'Konselor Keluarga',
    readTime: '4 Min Baca',
    hasImage: false,
    content: [
      { type: 'paragraph', text: 'Keluarga adalah tempat pertama kita belajar tentang cinta dan penerimaan. Namun, sering kali hubungan keluarga menjadi sumber stres emosional terbesar ketika batasan pribadi (boundaries) tidak dihormati atau bahkan tidak pernah ditetapkan.' },
      { type: 'subheading', text: 'Mengapa Batasan Itu Penting?' },
      { type: 'paragraph', text: 'Banyak orang merasa bersalah ketika ingin menolak permintaan keluarga. Kita takut dicap durhaka atau egois. Padahal, menetapkan batasan yang jelas justru bertujuan untuk menjaga hubungan tetap sehat dalam jangka panjang. Tanpa batasan, rasa kesal dan dendam terpendam akan perlahan mengikis kasih sayang yang tulus.' },
      { type: 'quote', text: '“Batasan yang sehat adalah cara kita mencintai diri sendiri tanpa berhenti menghargai dan menyayangi orang lain.”' },
      { type: 'subheading', text: 'Langkah Awal Mengomunikasikan Batasan' },
      { type: 'paragraph', text: 'Gunakan kalimat "Saya" (I-statement) daripada kalimat yang menyalahkan. Misalnya: "Saya sangat menghargai saran Ibu, tetapi saat ini saya butuh waktu untuk memutuskan hal ini sendiri" daripada "Ibu selalu ikut campur urusan saya!". Sampaikan dengan nada suara yang tenang, tegas, namun tetap penuh kasih.' }
    ]
  },
  {
    id: 'article-3',
    title: 'Strategi Mengatasi Burnout di Tempat Kerja',
    description: 'Kenali tanda-tanda kelelahan emosional akibat pekerjaan dan langkah taktis untuk memulihkan energi serta motivasi Anda.',
    category: 'Produktivitas',
    author: 'Budi Santoso, M.Psi',
    authorTitle: 'Psikolog Klinis',
    readTime: '7 Min Baca',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2b3h7E7k74_F9u0DqN8jO436p4eS0F-JzGz8v0a_m1x3q7n9o2w5u8r1k4j6h8f2d5a7',
    hasImage: true,
    content: [
      { type: 'paragraph', text: 'Burnout bukan sekadar rasa lelah biasa setelah lembur semalaman. Ini adalah kondisi kelelahan fisik, emosional, dan mental yang kronis akibat stres berkepanjangan di tempat kerja yang tidak terkelola dengan baik.' },
      { type: 'subheading', text: 'Tiga Dimensi Utama Burnout' },
      { type: 'paragraph', text: 'Menurut Organisasi Kesehatan Dunia (WHO), burnout ditandai dengan tiga hal: perasaan energi terkuras atau kelelahan ekstrem, meningkatnya jarak mental dari pekerjaan atau sinisme terhadap tugas kantor, dan penurunan efikasi profesional (merasa tidak mampu lagi menghasilkan karya yang baik).' },
      { type: 'subheading', text: 'Pemulihan Dimulai dari Ruang Kerja Anda' },
      { type: 'paragraph', text: 'Jangan ragu untuk berbicara secara jujur dengan atasan mengenai beban kerja Anda. Fokuslah pada penyelesaian satu tugas dalam satu waktu (monotasking). Berhentilah membuka email pekerjaan di akhir pekan. Jika energi Anda tidak kunjung pulih setelah cuti liburan, itu adalah sinyal bahwa Anda membutuhkan bantuan profesional untuk menata kembali prioritas hidup.' }
    ]
  }
];

export default function Artikel() {
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = activeCategory === 'Semua Topik'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  if (selectedArticle) {
    return (
      <div className="pt-20 md:pt-[130px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full flex flex-col items-start">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-semibold hover:text-[#833344] mb-6 sm:mb-8 transition-colors focus:outline-none"
        >
          <ArrowLeft size={16} /> <span>Kembali ke Daftar Artikel</span>
        </button>

        {/* Article Container */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-semibold">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {selectedArticle.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-3 py-3 sm:py-4 border-y border-outline-variant/30 my-1 sm:my-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm sm:text-base">
              {selectedArticle.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-on-surface">{selectedArticle.author}</p>
              <p className="text-[11px] sm:text-xs text-on-surface-variant">{selectedArticle.authorTitle}</p>
            </div>
          </div>

          {selectedArticle.hasImage && selectedArticle.image && (
            <div className="w-full h-[200px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm my-2 sm:my-4">
              <img className="w-full h-full object-cover" src={selectedArticle.image} alt={selectedArticle.title} />
            </div>
          )}

          <div className="flex flex-col gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed mt-4 sm:mt-6">
            {selectedArticle.content.map((item, idx) => {
              if (item.type === 'paragraph') {
                return <p key={idx} className="text-justify">{item.text}</p>;
              }
              if (item.type === 'subheading') {
                return <h3 key={idx} className="text-lg sm:text-2xl font-bold text-on-surface mt-4 sm:mt-6 mb-1 sm:mb-2">{item.text}</h3>;
              }
              if (item.type === 'quote') {
                return (
                  <blockquote key={idx} className="border-l-4 border-primary bg-primary-container/10 px-4 sm:px-6 py-3 sm:py-4 rounded-r-xl my-3 italic text-on-primary-container font-medium text-xs sm:text-base">
                    {item.text}
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* Call to Action to WhatsApp Counseling */}
          <div className="mt-10 sm:mt-16 bg-surface-container-low rounded-2xl p-6 sm:p-10 md:p-12 border border-outline-variant/30 text-center flex flex-col items-center gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-2xl font-bold text-on-surface">
              Butuh tempat bercerita tentang masalah serupa?
            </h3>
            <p className="text-xs sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Jangan menanggung beban Anda sendiri. Tim psikolog kami di InnerWhisper siap membantu dan mendengarkan keluh kesah Anda secara empatik tanpa menghakimi.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary hover:bg-[#833344] text-on-primary text-xs sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-md transition-all font-semibold inline-flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Konsultasikan Sekarang via WA</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-[130px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2 sm:mb-4">
            Artikel &amp; Edukasi
          </h1>
          <p className="text-xs sm:text-base md:text-xl text-on-surface-variant max-w-4xl leading-relaxed">
            Temukan wawasan, tips praktis, dan panduan untuk merawat kesehatan mental Anda setiap hari.
          </p>
        </div>
      </div>

      {/* Category Chips with Horizontal Scroll on Mobile */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedArticle(null);
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm focus:outline-none flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-[#9a4153] text-white shadow-[#9a4153]/20'
                : 'bg-surface-container text-on-surface border border-outline-variant hover:bg-surface-container-highest'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {activeCategory === 'Semua Topik' && (
        <section className="mb-8 sm:mb-14">
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row border border-outline-variant/30">
            <div className="md:w-1/2 relative overflow-hidden h-48 sm:h-64 md:h-auto">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Seseorang sedang menulis jurnal di ruangan yang tenang"
                src={featuredArticle.image}
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] text-primary font-semibold shadow-sm">
                Artikel Pilihan
              </div>
            </div>
            <div className="md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xs text-secondary font-semibold">{featuredArticle.category}</span>
                <span className="w-1 h-1 rounded-full bg-outline" />
                <span className="text-xs text-on-surface-variant font-medium">{featuredArticle.readTime}</span>
              </div>
              <h2
                className="text-lg sm:text-2xl font-bold text-on-surface mb-2 sm:mb-3 group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                {featuredArticle.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-primary text-xs font-bold">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{featuredArticle.author}</p>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant">{featuredArticle.authorTitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="text-xs sm:text-sm text-primary hover:text-surface-tint flex items-center gap-1 font-semibold focus:outline-none"
                >
                  <span>Baca Selengkapnya</span> <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Masonry Grid */}
      {filteredArticles.length > 0 ? (
        <div className="masonry-grid mb-10 sm:mb-16">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className="masonry-item bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(154,65,83,0.04)] hover:shadow-[0_8px_24px_rgba(154,65,83,0.08)] transition-all group border border-outline-variant/30 flex flex-col"
            >
              {article.hasImage && article.image && (
                <div
                  className={`relative ${index === 2 ? 'h-52 sm:h-64' : 'h-44 sm:h-52'} overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedArticle(article)}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={article.title}
                    src={article.image}
                  />
                </div>
              )}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-surface-container rounded-md text-[11px] text-secondary font-medium">
                    {article.category}
                  </span>
                </div>
                <h3
                  className="text-base sm:text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-auto pt-3 border-t border-surface-container flex items-center justify-between">
                  <p className="text-[11px] text-on-surface-variant font-medium">{article.author}</p>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs text-primary flex items-center font-semibold focus:outline-none"
                  >
                    <span>Baca</span> <ChevronRight size={13} className="ml-0.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-surface-container-low rounded-2xl mb-10 sm:mb-16">
          <p className="text-sm text-on-surface-variant">Tidak ada artikel di kategori ini untuk saat ini.</p>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="bg-primary-container rounded-2xl p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-on-primary-container mb-2 sm:mb-3">
            Dapatkan tips kesehatan mental mingguan.
          </h2>
          <p className="text-xs sm:text-base text-on-primary-container/80 leading-relaxed">
            Bergabung dengan komunitas kami dan terima artikel pilihan serta panduan merawat diri langsung di kotak masuk Anda.
          </p>
        </div>
        <div className="relative z-10 lg:w-1/2 w-full max-w-md">
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">Alamat Email</label>
            <input
              className="w-full bg-white border border-[#f2dede] rounded-xl py-3 px-4 text-xs sm:text-sm text-on-surface focus:ring-2 focus:ring-primary outline-none shadow-sm transition-all"
              id="newsletter-email"
              placeholder="Alamat email Anda"
              type="email"
            />
            <button
              className="w-full bg-primary hover:bg-[#833344] text-on-primary text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-sm font-semibold active:scale-95"
              type="submit"
            >
              Berlangganan Sekarang
            </button>
          </form>
          <p className="text-[11px] text-on-primary-container/70 mt-2 text-center lg:text-left">
            Kami menjaga privasi Anda. Tidak ada spam.
          </p>
        </div>
      </section>
    </div>
  );
}

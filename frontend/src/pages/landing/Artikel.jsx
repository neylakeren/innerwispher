import React, { useState } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

const categories = ['Semua Topik', 'Kecemasan', 'Hubungan', 'Perawatan Diri', 'Produktivitas'];

const featuredArticle = {
  id: 'featured-1',
  title: 'Menemukan Ketenangan di Tengah Kesibukan Sehari-hari',
  description: 'Langkah-langbah sederhana namun efektif untuk membangun rutinitas perawatan diri yang berkelanjutan, bahkan ketika jadwal Anda terasa sangat padat.',
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
      { type: 'paragraph', text: 'Keluarga adalah sistem pendukung utama kita. Namun, hubungan keluarga yang terlalu erat tanpa batas yang jelas sering kali dapat memicu konflik dan stres emosional. Membangun batasan sehat (boundaries) bukanlah bentuk pemberontakan atau hilangnya kasih sayang, melainkan cara menjaga kesehatan mental bersama.' },
      { type: 'subheading', text: 'Mengapa Batasan Itu Penting?' },
      { type: 'paragraph', text: 'Tanpa batasan yang jelas, Anda mungkin merasa bertanggung jawab atas kebahagiaan emosional anggota keluarga lain, mengorbankan kebutuhan pribadi demi menyenangkan mereka, atau merasa privasi Anda terus-menerus dilanggar. Batasan yang sehat mendefinisikan di mana diri Anda berakhir dan orang lain dimulai.' },
      { type: 'quote', text: '“Batasan yang sehat bukanlah tembok untuk menjauhkan orang lain, melainkan pintu gerbang yang menentukan bagaimana orang lain boleh memperlakukan kita.”' },
      { type: 'subheading', text: 'Langkah Mengomunikasikan Batasan secara Asertif' },
      { type: 'paragraph', text: 'Sampaikan batasan Anda dengan tenang, jelas, dan tanpa nada menyalahkan. Gunakan pernyataan "Saya" (I-statement). Contoh: "Saya sangat menghargai saran Ibu, tetapi untuk keputusan karir ini, saya ingin menentukannya sendiri dan bertanggung jawab atas pilihan saya." Bersiaplah menghadapi penolakan awal, karena keluarga memerlukan waktu untuk beradaptasi dengan perubahan dinamika hubungan Anda.' }
    ]
  },
  {
    id: 'article-3',
    title: 'Toxic Productivity: Saat Bekerja Keras Menjadi Berbahaya',
    description: 'Tanda-tanda Anda mungkin terjebak dalam budaya kerja yang merugikan kesehatan mental dan fisik, serta cara memulihkannya.',
    category: 'Produktivitas',
    author: 'Dr. Andi Hakim',
    authorTitle: 'Psikolog Industri',
    readTime: '5 Min Baca',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm5PhJmBgKMzKAEFh1_psYlS2cdPgVN8FLTIJ14HHiNNjUpYlJeYhI2MMM8Un6eMgu9V3Lt4SyGq0PM0jlRQhIK266UivvbZPCs7h6MtxCEMs2wT_4eY8gx5ifikiJ7cv1yYusjkC-5VwrwEKhHlZyPxZ3mXo0jNKXyGCq_ChyY9vP74jq8MuaKDgqbkYj7XfKB_KQBfPndImPIMc3_yR_w3eKNTYRaPl-LFUSaKzHGold1EP6Jy55TcsjE4f_kb1v_ygAv8fKVV0C',
    hasImage: true,
    content: [
      { type: 'paragraph', text: 'Bekerja keras adalah nilai positif. Namun, ketika keinginan untuk terus produktif berubah menjadi obsesi tak sehat yang mengabaikan kebutuhan fisik dan emosional, Anda mungkin sedang terjebak dalam fenomena yang disebut toxic productivity.' },
      { type: 'subheading', text: 'Apa itu Toxic Productivity?' },
      { type: 'paragraph', text: 'Toxic productivity adalah kondisi di mana seseorang merasa bersalah atau cemas ketika tidak sedang bekerja atau menghasilkan sesuatu. Mereka merasa harga dirinya (self-worth) sepenuhnya bergantung pada daftar tugas yang berhasil diselesaikan, sehingga mengabaikan tidur, pola makan, hubungan sosial, bahkan kesehatan tubuh mereka.' },
      { type: 'quote', text: '“Istirahat bukanlah hadiah setelah Anda selesai bekerja, melainkan kebutuhan biologis dan mental dasar agar Anda tetap bisa berfungsi dengan sehat.”' },
      { type: 'subheading', text: 'Tanda-Tanda Utama Anda Terkena Dampaknya' },
      { type: 'paragraph', text: 'Beberapa gejalanya adalah merasa lelah kronis namun kesulitan untuk tidur, merasa cemas saat libur akhir pekan, mengabaikan hobi yang dulu disukai, dan terus merasa bahwa apa yang dikerjakan "belum cukup". Untuk memulihkannya, mulailah memisahkan identitas diri Anda dari pekerjaan Anda. Sadarilah bahwa Anda berharga apa adanya, bukan hanya karena apa yang Anda hasilkan.' }
    ]
  },
  {
    id: 'article-4',
    title: 'Pentingnya Kualitas Tidur bagi Stabilitas Emosional',
    description: 'Kurang tidur bukan hanya membuat lelah secara fisik, tetapi juga melemahkan kemampuan otak mengatur emosi secara signifikan.',
    category: 'Perawatan Diri',
    author: 'Siti Rahma, M.Psi',
    authorTitle: 'Spesialis Sleep Hygiene',
    readTime: '4 Min Baca',
    hasImage: false,
    content: [
      { type: 'paragraph', text: 'Pernahkah Anda merasa sangat mudah marah, tersinggung, atau cemas setelah malam yang kurang tidur? Itu bukanlah kebetulan. Kurang tidur secara langsung memengaruhi amigdala, bagian otak yang bertanggung jawab atas pemrosesan emosi.' },
      { type: 'subheading', text: 'Bagaimana Tidur Mengatur Emosi Kita' },
      { type: 'paragraph', text: 'Selasa fase tidur REM (Rapid Eye Movement), otak kita memproses memori emosional dan menetralisir pengalaman stres dari hari sebelumnya. Jika waktu tidur Anda terpotong, otak kehilangan kesempatan emas untuk melakukan "pembersihan emosional" ini, membuat Anda rentan terhadap kecemasan dan perubahan suasana hati yang ekstrem.' },
      { type: 'quote', text: '“Tidur yang nyenyak adalah obat penenang alami terbaik. Investasikan waktu tidur Anda demi kejernihan pikiran dan stabilitas emosi esok hari.”' },
      { type: 'subheading', text: 'Tips Sederhana Memperbaiki Kualitas Tidur (Sleep Hygiene)' },
      { type: 'paragraph', text: 'Pertahankan jadwal tidur yang konsisten, bahkan di hari libur. Buat kamar tidur Anda senyap, sejuk, dan gelap. Hindari penggunaan layar gawai minimal 1 jam sebelum tidur karena cahaya biru menghambat produksi melatonin, hormon yang memicu rasa kantuk. Lakukan aktivitas menenangkan seperti membaca buku fisik atau mandi air hangat.' }
    ]
  }
];

export default function Artikel() {
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles based on selected category
  const filteredArticles = activeCategory === 'Semua Topik' 
    ? articles 
    : articles.filter(art => art.category === activeCategory);

  // If reading full article
  if (selectedArticle) {
    return (
      <div className="pt-28 pb-24 px-8 md:px-16 lg:px-24 w-full flex flex-col items-start">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-label-md text-primary font-semibold hover:text-surface-tint mb-8 transition-colors focus:outline-none"
        >
          <ArrowLeft size={18} /> Kembali ke Daftar Artikel
        </button>

        {/* Article Container */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6 w-full">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-label-sm font-semibold">
              {selectedArticle.category}
            </span>
            <span className="text-label-sm text-on-surface-variant font-medium">
              {selectedArticle.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-3 py-4 border-y border-outline-variant/30 my-2">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
              {selectedArticle.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-body-md font-bold text-on-surface">{selectedArticle.author}</p>
              <p className="text-label-sm text-on-surface-variant">{selectedArticle.authorTitle}</p>
            </div>
          </div>
          
          {selectedArticle.hasImage && selectedArticle.image && (
            <div className="w-full h-[250px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm my-4">
              <img className="w-full h-full object-cover" src={selectedArticle.image} alt={selectedArticle.title} />
            </div>
          )}

          <div className="flex flex-col gap-6 text-body-lg text-on-surface-variant leading-relaxed mt-6">
            {selectedArticle.content.map((item, idx) => {
              if (item.type === 'paragraph') {
                return <p key={idx} className="text-justify">{item.text}</p>;
              }
              if (item.type === 'subheading') {
                return <h3 key={idx} className="text-xl md:text-2xl font-bold text-on-surface mt-6 mb-2">{item.text}</h3>;
              }
              if (item.type === 'quote') {
                return (
                  <blockquote key={idx} className="border-l-4 border-primary bg-primary-container/10 px-6 py-4 rounded-r-lg my-4 italic text-on-primary-container font-medium">
                    {item.text}
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* Call to Action to WhatsApp Counseling */}
          <div className="mt-16 bg-surface-container-low rounded-2xl p-10 md:p-12 border border-outline-variant/30 text-center flex flex-col items-center gap-6">
            <h3 className="text-xl md:text-2xl font-bold text-on-surface">Butuh tempat bercerita tentang masalah serupa?</h3>
            <p className="text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Jangan menanggung beban Anda sendiri. Tim psikolog kami di InnerWhisper siap membantu dan mendengarkan keluh kesah Anda secara empatik tanpa menghakimi.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary text-body-lg px-8 py-4 rounded-lg shadow-md hover:scale-[1.02] active:scale-95 transition-all font-semibold inline-flex items-center gap-3"
            >
              Konsultasikan Sekarang via WA
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-8 md:px-16 lg:px-24 w-full">
      {/* Header */}
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">Artikel &amp; Edukasi</h1>
          <p className="text-body-lg md:text-xl text-on-surface-variant max-w-4xl leading-relaxed">
            Temukan wawasan, tips praktis, dan panduan untuk merawat kesehatan mental Anda setiap hari.
          </p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-3 mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedArticle(null);
            }}
            className={`px-8 py-3 rounded-full text-body-lg font-semibold transition-colors shadow-sm focus:outline-none ${
              activeCategory === cat
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container text-on-surface border border-outline-variant hover:bg-surface-container-highest'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {activeCategory === 'Semua Topik' && (
        <section className="mb-20">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row border border-outline-variant/30">
            <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Seseorang sedang menulis jurnal di ruangan yang tenang"
                src={featuredArticle.image}
              />
              <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full text-label-sm text-primary font-semibold shadow-sm">
                Artikel Pilihan
              </div>
            </div>
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-label-sm text-secondary font-semibold">{featuredArticle.category}</span>
                <span className="w-1 h-1 rounded-full bg-outline" />
                <span className="text-label-sm text-on-surface-variant font-medium">{featuredArticle.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedArticle(featuredArticle)}>
                {featuredArticle.title}
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                {featuredArticle.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary text-label-md font-bold">AS</div>
                  <div>
                    <p className="text-label-md text-on-surface font-semibold">{featuredArticle.author}</p>
                    <p className="text-label-sm text-on-surface-variant">{featuredArticle.authorTitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="text-label-md text-primary hover:text-surface-tint flex items-center gap-1 group-hover:gap-2 transition-all font-semibold focus:outline-none"
                >
                  Baca Selengkapnya <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Masonry Grid */}
      {filteredArticles.length > 0 ? (
        <div className="masonry-grid mb-20">
          {filteredArticles.map((article, index) => (
            <article key={article.id} className="masonry-item bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(154,65,83,0.04)] hover:shadow-[0_8px_24px_rgba(154,65,83,0.08)] transition-all group border border-outline-variant/30 flex flex-col">
              {article.hasImage && article.image && (
                <div className={`relative ${index === 2 ? 'h-64' : 'h-52'} overflow-hidden cursor-pointer`} onClick={() => setSelectedArticle(article)}>
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={article.title} src={article.image} />
                </div>
              )}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-surface-container rounded-md text-label-sm text-secondary font-medium">{article.category}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedArticle(article)}>
                  {article.title}
                </h3>
                <p className="text-body-lg text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">{article.description}</p>
                <div className="mt-auto pt-4 border-t border-surface-container flex items-center justify-between">
                  <p className="text-label-sm text-on-surface-variant font-medium">{article.author}</p>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-label-md text-primary flex items-center font-semibold focus:outline-none"
                  >
                    Baca <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-xl mb-20">
          <p className="text-body-lg text-on-surface-variant">Tidak ada artikel di kategori ini untuk saat ini.</p>
        </div>
      )}

      {/* Newsletter */}
      <section className="bg-primary-container rounded-xl p-16 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 lg:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-on-primary-container mb-4">Dapatkan tips kesehatan mental mingguan.</h2>
          <p className="text-body-lg md:text-xl text-on-primary-container/80 leading-relaxed">
            Bergabung dengan komunitas kami dan terima artikel pilihan serta panduan merawat diri langsung di kotak masuk Anda.
          </p>
        </div>
        <div className="relative z-10 lg:w-1/2 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">Alamat Email</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-lg py-4 px-6 text-body-lg text-on-surface focus:ring-2 focus:ring-primary outline-none shadow-sm transition-all"
              id="newsletter-email"
              placeholder="Alamat email Anda"
              type="email"
            />
            <button className="w-full bg-primary text-on-primary text-body-lg py-4 rounded-lg hover:bg-surface-tint transition-colors shadow-sm font-semibold animate-soft-pulse" type="submit">
              Berlangganan Sekarang
            </button>
          </form>
          <p className="text-label-sm text-on-primary-container/70 mt-3 text-center lg:text-left">
            Kami menjaga privasi Anda. Tidak ada spam.
          </p>
        </div>
      </section>
    </div>
  );
}

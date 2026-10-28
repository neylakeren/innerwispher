import { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Tag,
  Check,
  Building2,
  FileText,
  Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  'Semua Topik',
  'Resume & CV ATS',
  'Simulasi Interview',
  'Strategi Karier',
  'Mental Kesiapan Kerja'
];

const featuredArticle = {
  id: 'featured-ats-1',
  title: 'Tiga Kriteria Kunci yang Dicari HRD dalam Resume Berformat ATS',
  description: 'Pelajari bagaimana Applicant Tracking System (ATS) memindai kata kerja aktif, format tata letak yang ramah mesin, dan parameter kuantitatif yang meloloskan berkasmu ke meja user interview.',
  category: 'Resume & CV ATS',
  author: 'Tim Riset Karier',
  authorTitle: 'Inner Whisper Career Lab',
  readTime: '6 Min Baca',
  date: '28 Oktober 2026',
  image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
  content: [
    { 
      type: 'paragraph', 
      text: 'Di era rekrutmen digital saat ini, lebih dari 90% perusahaan multinasional dan tech startup terkemuka menggunakan Applicant Tracking System (ATS) untuk menyaring ribuan resume yang masuk sebelum dibaca oleh manusia. Banyak pencari kerja bertalenta gugur di tahap awal bukan karena kurang berkualifikasi, melainkan karena format dokumen mereka tidak dapat dipindai oleh parser algoritma.' 
    },
    { 
      type: 'subheading', 
      text: '1. Relevansi Kata Kunci Industri yang Spesifik' 
    },
    { 
      type: 'paragraph', 
      text: 'Mesin ATS bekerja dengan memetakan teks resume terhadap deskripsi pekerjaan (Job Description). Jika posisi yang kamu tuju menuntut keahlian "Data Cleansing", "Python", atau "Stakeholder Management", pastikan terminologi persis tersebut tertulis pada bagian keterampilan maupun ringkasan pengalamanmu. Hindari singkatan yang tidak umum yang bisa membingungkan sistem pencocokan.' 
    },
    { 
      type: 'subheading', 
      text: '2. Pencapaian yang Terukur dengan Angka (Action + Metric)' 
    },
    { 
      type: 'paragraph', 
      text: 'Sistem ATS dan rekruter modern menyukai poin pencapaian yang terukur. Jangan hanya menulis "Bertanggung jawab atas pengelolaan media sosial". Gantilah dengan formulasi berbobot: "Meningkatkan engagement rate Instagram sebesar 42% dalam 3 bulan melalui eksperimen format video edukatif mingguan". Angka memberikan bukti konkret atas dampak nyata kontribusimu.' 
    },
    { 
      type: 'quote', 
      text: '“Resume yang kuat bukan sekadar daftar riwayat hidup, melainkan dokumen proposal nilai yang membuktikan solusi apa yang bisa kamu hadirkan untuk tim perekrut.”' 
    },
    { 
      type: 'subheading', 
      text: '3. Tata Letak Hirarki Bersih (Single Column Layout)' 
    },
    { 
      type: 'paragraph', 
      text: 'Gunakan layout satu kolom yang bersih. Format dua kolom, kotak teks (text boxes), grafik rating keahlian 5 bintang, dan tabel sering kali dibaca acak oleh parser ATS sehingga teks menjadi terpotong atau tercampur antar baris. Gunakan font standar seperti Inter, Roboto, atau Arial dengan ukuran 10-12pt.' 
    },
    { 
      type: 'paragraph', 
      text: 'Pastikan juga kamu melakukan scan otomatis menggunakan alat audit CV ATS sebelum mengirimkan lamaran kerja impianmu agar tidak ada poin teknis krusial yang terlewat.' 
    }
  ]
};

const articles = [
  {
    id: 'article-interview-1',
    title: 'Formulasi Terbaik Menjawab "Ceritakan Tentang Dirimu" Saat Wawancara',
    description: 'Kuasai kerangka Present - Past - Future untuk membuka sesi wawancara kerja pertama dengan percaya diri, terstruktur, dan memikat perhatian rekruter.',
    category: 'Simulasi Interview',
    author: 'Tim Kurasi Karier',
    authorTitle: 'Spesialis Rekrutmen',
    readTime: '5 Min Baca',
    date: '26 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Pertanyaan "Bisa ceritakan tentang diri Anda?" hampir selalu menjadi pembuka dalam setiap wawancara kerja. Meskipun terkesan santai, pertanyaan ini adalah ujian penentu apakah kamu mampu mengomunikasikan nilai dirimu secara ringkas dan terarah.' 
      },
      { 
        type: 'subheading', 
        text: 'Kerangka Present - Past - Future' 
      },
      { 
        type: 'paragraph', 
        text: '1. Present (Saat Ini): Jelaskan siapa kamu saat ini, fokus keahlian utamamu, dan apa peran atau proyek terbarumu yang paling membanggakan.' 
      },
      { 
        type: 'paragraph', 
        text: '2. Past (Masa Lalu): Ceritakan 1 atau 2 pengalaman krusial (proyek kuliah, magang, atau organisasi) yang membentuk keterampilan tersebut dan membuktikan kinerjamu.' 
      },
      { 
        type: 'paragraph', 
        text: '3. Future (Masa Depan): Sambungkan mengapa kamu tertarik dengan posisi ini dan bagaimana kamu dapat berkontribusi langsung terhadap tujuan tim mereka.' 
      },
      { 
        type: 'quote', 
        text: '“Rekruter tidak sedang meminta ringkasan seluruh riwayat hidupmu dari masa sekolah, mereka ingin tahu mengapa kehadiranmu relevan untuk memecahkan masalah mereka saat ini.”' 
      },
      { 
        type: 'subheading', 
        text: 'Durasi Ideal Jawaban' 
      },
      { 
        type: 'paragraph', 
        text: 'Jaga agar respons pembuka ini berdurasi antara 90 hingga 120 detik. Latihlah intonasi dan artikulasi agar terdengar alami, bukan seperti menghafal teks naskah.' 
      }
    ]
  },
  {
    id: 'article-mental-1',
    title: 'Menjaga Kesehatan Mental dan Mengatasi Job-Hunting Fatigue',
    description: 'Strategi konsultasi karier menjaga motivasi diri saat proses melamar kerja terasa panjang. Tetapkan batasan sehat, hindari burnout, dan rawat energi mentalmu.',
    category: 'Mental Kesiapan Kerja',
    author: 'Tim Riset Karier',
    authorTitle: 'Konsultasi Karier & Well-being',
    readTime: '7 Min Baca',
    date: '24 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Job-hunting fatigue atau kelelahan emosional saat mencari kerja adalah fenomena nyata yang dialami oleh mayoritas fresh graduate. Menunggu kabar seleksi yang tak kunjung datang atau menerima penolakan berulang dapat menurunkan rasa percaya diri secara drastis.' 
      },
      { 
        type: 'subheading', 
        text: 'Pisahkan Nilai Diri dari Respons Perusahaan' 
      },
      { 
        type: 'paragraph', 
        text: 'Penolakan lamaran bukan cerminan dari kegagalan atau harga dirimu sebagai manusia. Sering kali ada faktor eksternal di luar kendalimu, seperti penutupan kuota lowongan mendadak atau kecocokan teknis spesifik internal perusahaan.' 
      },
      { 
        type: 'quote', 
        text: '“Mencari kerja adalah sebuah maraton persiapan, bukan sprint instan. Menjaga ketenangan batin adalah fondasi agar performamu tetap prima saat kesempatan emas tiba.”' 
      },
      { 
        type: 'subheading', 
        text: 'Tiga Praktik Sederhana yang Membantu' 
      },
      { 
        type: 'paragraph', 
        text: '1. Batasi Kuota Lamaran Harian: Kirim 2–3 lamaran berkualitas dengan CV yang dipersonalisasi, daripada menyebar 50 lamaran acak yang menguras energi.' 
      },
      { 
        type: 'paragraph', 
        text: '2. Tetapkan Jam "Off-Screen": Berhentilah merefresh email atau LinkedIn setelah pukul 18.00. Luangkan waktu untuk olahraga, hobi, dan istirahat berkualitas.' 
      },
      { 
        type: 'paragraph', 
        text: '3. Rayakan Proses Kecil: Mengikuti tes potensi minat bakat, merapikan portofolio, dan latihan interview adalah kemenangan harian yang layak kamu apresiasi.' 
      }
    ]
  },
  {
    id: 'article-interview-2',
    title: 'Membedah Metode STAR: Rahasia Lolos Behavioral Interview Perusahaan Global',
    description: 'Panduan praktis menstrukturkan cerita pengalamanmu dengan Situation, Task, Action, dan Result agar dinilai konkret dan profesional oleh rekruter.',
    category: 'Simulasi Interview',
    author: 'Tim Kurasi Karier',
    authorTitle: 'Spesialis Rekrutmen',
    readTime: '6 Min Baca',
    date: '22 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Pernahkah kamu ditanya: "Ceritakan situasi ketika kamu menghadapi konflik dalam tim dan bagaimana cara kamu menyelesaikannya?" Ini adalah jenis pertanyaan behavioral yang digunakan rekruter untuk memprediksi perilakumu di masa depan.' 
      },
      { 
        type: 'subheading', 
        text: 'Empat Pilar Metode STAR' 
      },
      { 
        type: 'paragraph', 
        text: '• S (Situation): Gambarkan konteks situasi atau tantangan awal secara ringkas (1-2 kalimat).' 
      },
      { 
        type: 'paragraph', 
        text: '• T (Task): Jelaskan apa peran spesifik dan tanggung jawab yang harus kamu selesaikan.' 
      },
      { 
        type: 'paragraph', 
        text: '• A (Action): Ini adalah bagian terpenting (60% porsi jawaban). Uraikan langkah taktis apa yang kamu ambil secara pribadi untuk mengatasi hambatan.' 
      },
      { 
        type: 'paragraph', 
        text: '• R (Result): Tunjukkan hasil akhir yang dicapai beserta pelajaran berharga yang kamu petik.' 
      },
      { 
        type: 'quote', 
        text: '“Gunakan kata kerja aktif \'Saya mengambil inisiatif untuk...\' daripada selalu menggunakan kata \'Kami\', agar rekruter memahami kontribusi personalmu.”' 
      }
    ]
  },
  {
    id: 'article-career-1',
    title: 'Bagaimana Memilih Tempat Magang Pertama yang Tepat untuk Lompatan Karier?',
    description: 'Kenali perbedaan program magang yang memberikan ruang ownership nyata vs sekadar tugas administratif, serta cara memvalidasi reputasi mentor.',
    category: 'Strategi Karier',
    author: 'Tim Riset Karier',
    authorTitle: 'Konsultan Pengembangan Karier',
    readTime: '5 Min Baca',
    date: '20 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Magang pertama adalah batu loncatan paling penting dalam riwayat pengalaman seorang mahasiswa. Jangan sampai kamu hanya tergiur oleh nama besar perusahaan tanpa meneliti kualitas bimbingan mentor dan proyek kerja yang akan diberikan.' 
      },
      { 
        type: 'subheading', 
        text: 'Indikator Tempat Magang Berkualitas' 
      },
      { 
        type: 'paragraph', 
        text: '1. Memiliki Project Scope yang Jelas: Perusahaan yang baik telah menyiapkan silabus atau deliverables yang diharapkan dari intern selama 3–6 bulan.' 
      },
      { 
        type: 'paragraph', 
        text: '2. Mentor yang Bersedia Mereview Kinerja: Tersedia sesi 1-on-1 berkala untuk memberikan umpan balik konstruktif terhadap hasil kerjamu.' 
      },
      { 
        type: 'paragraph', 
        text: '3. Peluang Portofolio Resmi: Hasil pekerjaanmu dapat dijadikan studi kasus portofolio yang dapat dipresentasikan saat melamar kerja full-time kelak.' 
      }
    ]
  },
  {
    id: 'article-career-2',
    title: 'Langkah Awal Membangun Networking di LinkedIn Tanpa Rasa Canggung',
    description: 'Template pesan koneksi yang sopan, etika meninggalkan jejak profesional pada postingan industri, dan membangun relasi dua arah yang otentik.',
    category: 'Strategi Karier',
    author: 'Tim Kurasi Karier',
    authorTitle: 'Spesialis Rekrutmen',
    readTime: '4 Min Baca',
    date: '18 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Banyak mahasiswa merasa segan menyapa praktisi profesional di LinkedIn karena takut dianggap mengganggu. Padahal, networking profesional adalah tentang apresiasi tulus dan rasa ingin tahu belajar.' 
      },
      { 
        type: 'subheading', 
        text: 'Template Pesan Koneksi Ramah & Sopan' 
      },
      { 
        type: 'quote', 
        text: '“Halo [Nama], salam kenal! Saya sangat terinspirasi dengan tulisan Anda seputar [Topik]. Sebagai fresh graduate yang sedang mendalami bidang yang sama, saya senang jika bisa terhubung dan belajar dari pengalaman Anda.”' 
      },
      { 
        type: 'paragraph', 
        text: 'Hindari langsung meminta lowongan pekerjaan pada pesan pertama. Bangun interaksi terlebih dahulu dengan memberikan komentar apresiatif di postingan mereka.' 
      }
    ]
  },
  {
    id: 'article-ats-2',
    title: '7 Kesalahan Fatal Format Dokumen CV yang Sering Membuat ATS Error',
    description: 'Mulai dari tabel multi-kolom, ikon grafis berlebihan, hingga penempatan kontak di header. Hindari jebakan format yang membuat resumemu gagal dipindai.',
    category: 'Resume & CV ATS',
    author: 'Tim Riset Karier',
    authorTitle: 'Teknologi Parser ATS',
    readTime: '5 Min Baca',
    date: '15 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: [
      { 
        type: 'paragraph', 
        text: 'Tahukah kamu bahwa sebagian besar software ATS tidak bisa membaca teks yang ditaruh di dalam header atau footer Microsoft Word/PDF? Ini membuat nomor telepon dan emailmu hilang dari database rekruter.' 
      },
      { 
        type: 'subheading', 
        text: 'Daftar Kesalahan yang Harus Dihindari' 
      },
      { 
        type: 'paragraph', 
        text: '1. Menggunakan Tabel dan Text Box: Struktur sel tabel sering membuat kalimat terputus secara acak.' 
      },
      { 
        type: 'paragraph', 
        text: '2. Foto Profil di Format ATS: Untuk rekrutmen perusahaan multinasional, foto tidak diperlukan dan justru memperbesar ukuran file.' 
      },
      { 
        type: 'paragraph', 
        text: '3. Progress Bar / Bintang Skill: Mesin tidak bisa mengukur apa arti "Bahasa Inggris: 4 dari 5 bintang". Gunakan kata keterangan standar seperti Fluent, Proficient, atau Conversational.' 
      },
      { 
        type: 'paragraph', 
        text: '4. Format File yang Salah: Simpan selalu dalam bentuk PDF berstandar teks atau DOCX, jangan pernah menyimpan hasil scan gambar (JPEG/PNG).' 
      }
    ]
  }
];

export default function Artikel() {
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribedToast(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribedToast(false), 4000);
    }
  };

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCategory = activeCategory === 'Semua Topik' || art.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Reading Mode View
  if (selectedArticle) {
    const relatedArticles = articles
      .filter(a => a.id !== selectedArticle.id)
      .slice(0, 2);

    return (
      <div className="pt-24 md:pt-[120px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full flex flex-col items-start font-quicksand">
        {/* Back Button & Share */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#4b3b86] font-bold hover:text-[#8f78d8] transition-colors focus:outline-none bg-[#efeafb] px-3.5 py-1.5 rounded-xl border border-[#d9cff5]"
          >
            <ArrowLeft size={16} /> 
            <span>Kembali ke Daftar Artikel</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#5d5577] hover:text-[#4b3b86] font-semibold bg-white px-3 py-1.5 rounded-xl border border-[#d9cff5] transition-colors shadow-sm"
          >
            {copiedLink ? <Check size={14} className="text-[#198754]" /> : <Share2 size={14} />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto flex flex-col gap-5 sm:gap-7 w-full bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-[#d9cff5] shadow-card">
          {/* Metadata Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5] rounded-full text-xs font-bold inline-flex items-center gap-1">
              <Tag size={12} />
              {selectedArticle.category}
            </span>
            <span className="text-xs text-[#5d5577] font-semibold inline-flex items-center gap-1">
              <Clock size={13} />
              {selectedArticle.readTime}
            </span>
            {selectedArticle.date && (
              <span className="text-xs text-[#8a82a2] hidden sm:inline">
                • {selectedArticle.date}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#2b2542] leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 py-4 border-y border-[#d9cff5]/60 my-1">
            <div className="w-11 h-11 rounded-2xl bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5] flex items-center justify-center font-bold text-sm shadow-sm">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2b2542]">{selectedArticle.author}</p>
              <p className="text-xs text-[#5d5577]">{selectedArticle.authorTitle}</p>
            </div>
          </div>

          {/* Featured Image */}
          {selectedArticle.image && (
            <div className="w-full h-[220px] sm:h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-sm my-2 border border-[#d9cff5]/60">
              <img 
                className="w-full h-full object-cover" 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="flex flex-col gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-[#2b2542] leading-relaxed mt-2">
            {selectedArticle.content.map((item, idx) => {
              if (item.type === 'paragraph') {
                return (
                  <p key={idx} className="leading-relaxed text-[#2b2542]">
                    {item.text}
                  </p>
                );
              }
              if (item.type === 'subheading') {
                return (
                  <h2 key={idx} className="text-lg sm:text-2xl font-bold text-[#4b3b86] mt-4 sm:mt-6 mb-1 tracking-tight">
                    {item.text}
                  </h2>
                );
              }
              if (item.type === 'quote') {
                return (
                  <blockquote 
                    key={idx} 
                    className="border-l-4 border-[#8f78d8] bg-[#efeafb]/70 px-5 sm:px-7 py-3.5 sm:py-5 rounded-r-2xl my-3 italic text-[#4b3b86] font-semibold text-xs sm:text-base leading-relaxed"
                  >
                    {item.text}
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* In-Article Promotion CTA Card (PRO Career Platform) */}
          <div className="mt-8 pt-8 border-t border-[#d9cff5]/60 bg-gradient-to-r from-white via-[#efeafb]/50 to-white rounded-2xl p-6 sm:p-8 border border-[#d9cff5] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8f78d8] text-white text-[10px] font-bold">
                <Sparkles size={12} />
                Inner Whisper Career Copilot
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#2b2542]">
                Ingin Memastikan CV Format ATS &amp; Latihan Wawancaramu Siap?
              </h3>
              <p className="text-xs sm:text-sm text-[#5d5577] max-w-xl">
                Coba audit CV format ATS instan dan pelajari 10 simulasi pertanyaan wawancara kerja metode STAR hanya <strong>Rp 35.000 / bulan</strong>.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
              <Link
                to="/login"
                className="btn-lv text-xs sm:text-sm px-5 py-3 rounded-xl shadow-btn font-bold text-center inline-flex items-center justify-center gap-1.5 active:scale-95 text-white"
              >
                <span>Mulai Tes Gratis</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="max-w-4xl mx-auto w-full mt-10">
          <h3 className="text-lg sm:text-xl font-bold text-[#2b2542] mb-4">
            Artikel Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-s p-4 sm:p-5 flex gap-4 items-center cursor-pointer hover:border-[#8f78d8] hover:shadow-card transition-all bg-white"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#8f78d8] uppercase tracking-wider block mb-0.5">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#2b2542] line-clamp-2 hover:text-[#4b3b86] transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-[#5d5577] mt-1 block">
                    {rel.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Catalog / List View
  return (
    <div className="pt-24 md:pt-[125px] pb-28 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 w-full font-quicksand">
      {/* Header Banner */}
      <section className="mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold mb-3 border border-[#d9cff5]">
          <BookOpen size={14} className="text-[#8f78d8]" />
          Wawasan &amp; Panduan Persiapan Kerja
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4b3b86] mb-3 sm:mb-4 tracking-tight">
          Artikel &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Edukasi Karier</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[#5d5577] leading-relaxed max-w-2xl mx-auto">
          Wawasan praktis seputar optimasi resume standar ATS, teknik wawancara STAR, strategi networking, dan menjaga kesehatan mental saat melamar kerja.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a82a2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik, resume ATS, wawancara STAR, strategi..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#d9cff5] rounded-2xl text-xs sm:text-sm text-[#2b2542] placeholder:text-[#8a82a2] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 focus:border-[#8f78d8] shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8a82a2] hover:text-[#2b2542]"
            >
              Hapus
            </button>
          )}
        </div>
      </section>

      {/* Category Chips with Horizontal Scroll */}
      <section className="mb-8 sm:mb-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm focus:outline-none flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] text-white shadow-btn'
                  : 'bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5] hover:bg-[#e4daf7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Hero (Shown when on "Semua Topik" without search query) */}
      {activeCategory === 'Semua Topik' && !searchQuery && (
        <section className="mb-10 sm:mb-14 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-xl transition-all group flex flex-col md:flex-row border border-[#d9cff5]">
            <div className="md:w-1/2 relative overflow-hidden h-52 sm:h-72 md:h-auto">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={featuredArticle.title}
                src={featuredArticle.image}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3.5 py-1 rounded-full text-xs text-[#4b3b86] font-extrabold shadow-sm border border-[#d9cff5]/80 flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#8f78d8]" />
                Artikel Pilihan
              </div>
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xs text-[#8f78d8] font-bold">{featuredArticle.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8f78d8]" />
                  <span className="text-xs text-[#5d5577] font-medium">{featuredArticle.readTime}</span>
                </div>
                <h2
                  className="text-lg sm:text-2xl font-bold text-[#2b2542] mb-2 sm:mb-3 group-hover:text-[#4b3b86] transition-colors cursor-pointer leading-snug"
                  onClick={() => {
                    setSelectedArticle(featuredArticle);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {featuredArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5d5577] line-clamp-3 leading-relaxed mb-6">
                  {featuredArticle.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#d9cff5]/60 mt-auto">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5] flex items-center justify-center text-xs font-bold">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2b2542]">{featuredArticle.author}</p>
                    <p className="text-[10px] text-[#5d5577]">{featuredArticle.authorTitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedArticle(featuredArticle);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm text-[#4b3b86] hover:text-[#8f78d8] flex items-center gap-1 font-bold focus:outline-none transition-colors"
                >
                  <span>Baca</span> <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Clean 3-Column Responsive Grid (No Broken Masonry) */}
      <section className="max-w-5xl mx-auto mb-12 sm:mb-16">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-200 border border-[#d9cff5] flex flex-col justify-between group"
              >
                {/* Article Card Image */}
                <div
                  className="relative h-48 sm:h-52 overflow-hidden cursor-pointer bg-slate-50"
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={article.title}
                    src={article.image}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#4b3b86] border border-[#d9cff5]/70 rounded-lg text-[10px] font-extrabold shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[11px] text-[#5d5577]">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    <h3
                      className="text-base sm:text-lg font-bold text-[#2b2542] mb-2 group-hover:text-[#4b3b86] transition-colors cursor-pointer leading-snug line-clamp-2"
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#5d5577] line-clamp-3 leading-relaxed mb-4">
                      {article.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#d9cff5]/60 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#efeafb] text-[#4b3b86] text-[10px] font-bold flex items-center justify-center">
                        IW
                      </div>
                      <p className="text-[11px] text-[#5d5577] font-medium truncate max-w-[120px]">
                        {article.author}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-[#8f78d8] group-hover:text-[#4b3b86] flex items-center font-bold focus:outline-none transition-colors"
                    >
                      <span>Baca</span> <ChevronRight size={14} className="ml-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white border border-[#d9cff5] rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mx-auto mb-3">
              <Search size={22} />
            </div>
            <h3 className="text-base font-bold text-[#2b2542]">Tidak Ada Artikel Ditemukan</h3>
            <p className="text-xs text-[#5d5577] mt-1 mb-4 leading-relaxed">
              Tidak ada artikel yang cocok dengan pencarian <strong>"{searchQuery}"</strong> atau kategori yang dipilih.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Semua Topik');
                setSearchQuery('');
              }}
              className="btn-lv text-xs px-4 py-2 rounded-xl text-white font-bold"
            >
              Reset Filter &amp; Pencarian
            </button>
          </div>
        )}
      </section>

      {/* Newsletter & Career Guide Subscription */}
      <section className="card-s bg-gradient-to-r from-white via-[#efeafb]/50 to-white rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 border border-[#d9cff5] max-w-5xl mx-auto shadow-sm">
        <div className="lg:w-1/2 text-center lg:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold border border-[#d9cff5]">
            <Sparkles size={13} className="text-[#8f78d8]" />
            Newsletter Karier Mingguan
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#2b2542] tracking-tight">
            Dapatkan Tips Persiapan Kerja &amp; Bedah CV Gratis
          </h2>
          <p className="text-xs sm:text-sm text-[#5d5577] leading-relaxed">
            Bergabunglah dengan ribuan mahasiswa dan job seeker untuk menerima artikel panduan wawancara dan checklist ATS langsung di emailmu.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md">
          {subscribedToast ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Terima kasih! Anda telah terdaftar untuk menerima newsletter karier mingguan kami.</span>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={handleNewsletterSubmit}>
              <input
                required
                className="w-full bg-white border border-[#d9cff5] rounded-xl py-3 px-4 text-xs sm:text-sm text-[#2b2542] focus:ring-2 focus:ring-[#8f78d8]/30 outline-none shadow-sm transition-all"
                placeholder="Masukkan alamat email Anda"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                className="btn-lv text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-btn font-bold whitespace-nowrap active:scale-95 text-white"
                type="submit"
              >
                Langganan
              </button>
            </form>
          )}
          <p className="text-[11px] text-[#8a82a2] mt-2 text-center lg:text-left">
            Privasi Anda terjamin. Bebas spam, Anda dapat berhenti berlangganan kapan saja.
          </p>
        </div>
      </section>
    </div>
  );
}

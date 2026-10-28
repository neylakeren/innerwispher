import { 
  Brain, 
  FileText, 
  ArrowRight, 
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  Award,
  ShieldCheck,
  Star,
  Quote,
  Building2,
  Users,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Beranda() {
  const steps = [
    {
      icon: Brain,
      title: 'Langkah 1: Tes Minat & Bakat Gratis',
      description: 'Jawab 25 pertanyaan psikometri terarah untuk memetakan minat dominanmu dalam Teknologi, Kreatif, Bisnis, atau Sosial.',
    },
    {
      icon: FileText,
      title: 'Langkah 2: Audit CV Format ATS',
      description: 'Pindai teks resumemu secara instan dengan standar HRD untuk memastikan kata kerja aktif dan kata kunci industri terpenuhi.',
    },
    {
      icon: Sparkles,
      title: 'Langkah 3: Simulasi Interview & Laporan',
      description: 'Latih respons wawancara kerja metode STAR dan buka laporan diagnostik lengkap untuk akselerasi karier impianmu.',
    },
  ];

  const userReviews = [
    {
      name: 'Nadia Putri Rahmadani',
      role: 'UI/UX Designer',
      origin: 'Fresh Graduate UI/UX - Universitas Indonesia',
      outcome: 'Lolos Seleksi FinTech Terkemuka',
      initials: 'NP',
      rating: 5,
      review: 'Laporan diagnostik kariernya sangat akurat memetakan potensi saya ke bidang Product Design. Fitur audit CV ATS-nya ngebantu banget mendeteksi kata kunci industri yang sebelumnya kelewat. 2 minggu setelah revisi CV, langsung dipanggil interview HRD!',
    },
    {
      name: 'Dimas Arya Pratama',
      role: 'Software Engineer Candidate',
      origin: 'Teknik Informatika - Institut Teknologi Bandung',
      outcome: 'Diterima di Ekosistem Digital Nasional',
      initials: 'DA',
      rating: 5,
      review: 'Skema langganan Rp 35.000 / bulan sangat ramah buat kantong mahasiswa. Simulasi interview metode STAR bener-bener membuka mata cara menyusun jawaban behavioral HRD secara runut, terstruktur, dan meyakinkan.',
    },
    {
      name: 'Clara Anindita',
      role: 'Associate Auditor',
      origin: 'Akuntansi & Keuangan - Universitas Airlangga',
      outcome: 'Lolos Seleksi Big 4 Assurance',
      initials: 'CA',
      rating: 5,
      review: 'Awalnya bingung kenapa CV saya sering di-reject tanpa kabar. Setelah pakai scanner CV Inner Whisper, baru sadar format tabel dan header saya bikin sistem ATS error. Begitu diperbaiki, score ATS tembus 92% dan lolos seleksi berkas!',
    },
    {
      name: 'Fajar Hidayat',
      role: 'Management Trainee Candidate',
      origin: 'Teknik Industri - Universitas Gadjah Mada',
      outcome: 'Diterima MT FMCG Multinasional',
      initials: 'FH',
      rating: 5,
      review: 'Analisis SWOT dan radar karier 4 dimensinya komprehensif banget. Nggak cuma ngasih tahu minat, tapi juga blind spot yang harus diperbaiki sebelum masuk ke tahap user interview. Rekomendasi wajib untuk lulusan baru!',
    },
    {
      name: 'Siti Sarah Maulida',
      role: 'Brand & Content Strategist',
      origin: 'Ilmu Komunikasi - Universitas Padjadjaran',
      outcome: 'Creative Agency Intern to Full-Time',
      initials: 'SM',
      rating: 5,
      review: 'Transfernya praktis via BCA dan SeaBank, verifikasi struk oleh admin super cepat nggak sampai 5 menit langsung kebuka semua fitur PRO. Downloadable PDF laporannya rapi dan bisa disimpan selamanya.',
    },
    {
      name: 'Reza Kurniawan',
      role: 'Junior Data Analyst',
      origin: 'Career Switcher - Manajemen Bisnis',
      outcome: 'Junior Data Analyst di Retail Modern',
      initials: 'RK',
      rating: 5,
      review: 'Sebagai lulusan non-IT yang ingin banting setir ke data analyst, tes minat bakatnya memberi kepastian bahwa logika analitis saya kuat. Roadmap dan modul portofolionya terstruktur serta mudah dieksekusi secara mandiri.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-[130px] pb-28 md:pb-24 flex flex-col gap-12 sm:gap-16 md:gap-24 font-quicksand">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        <div className="md:col-span-6 flex flex-col gap-5 sm:gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold self-center md:self-start border border-[#d9cff5]">
            <Sparkles size={14} className="text-[#8f78d8]" />
            Platform Akselerasi &amp; Persiapan Karier Digital
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#2b2542]">
            Petakan Potensi Diri &amp; <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">Taklukkan Karier Impian</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5d5577] max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
            Ekosistem persiapan karier mandiri yang dirancang khusus untuk mahasiswa dan pencari kerja. Mulai dari tes minat psikometri, audit CV ATS instan, hingga simulasi wawancara kerja terarah.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start pt-1">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-lv text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-btn transition-all active:scale-95 font-semibold text-white"
            >
              <ClipboardCheck size={18} />
              <span>Mulai Tes Karier Gratis</span>
            </Link>

            <Link
              to="/layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-out text-sm sm:text-base px-6 py-3.5 rounded-xl font-semibold shadow-sm text-[#4b3b86] border border-[#d9cff5] bg-white hover:bg-[#efeafb]"
            >
              <span>Lihat Paket Layanan</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#d9cff5]/60 text-left">
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">25</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Pertanyaan Asesmen</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">8 Parameter</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Audit CV Standar ATS</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-[#4b3b86]">100%</p>
              <p className="text-[11px] sm:text-xs text-[#5d5577]">Instan Tanpa Antre</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 relative rounded-2xl overflow-hidden card-s p-2 h-[260px] sm:h-[350px] md:h-[460px] shadow-hero">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              alt="Suasana profesional persiapan karier dan pembelajaran digital"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2542]/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d9cff5]">Inner Whisper Career Copilot</span>
                <p className="text-sm sm:text-base font-bold">Akurasi asesmen psikometri &amp; standar ATS rekruter modern.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="flex flex-col gap-6 sm:gap-8 mt-2 sm:mt-8">
        <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#4b3b86] mb-2 sm:mb-3">
            Alur Persiapan Karier yang Praktis &amp; Terarah
          </h2>
          <p className="text-xs sm:text-base text-[#5d5577]">
            Tiga langkah terstruktur untuk mempersiapkan diri menghadapi seleksi kerja tanpa kebingungan.
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

      {/* REVIEW & TESTIMONI SECTION */}
      <section className="flex flex-col gap-8 sm:gap-12 mt-2">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold border border-[#d9cff5]">
            <Sparkles size={14} className="text-[#8f78d8]" />
            Ulasan Pengguna &amp; Cerita Sukses
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2b2542] tracking-tight">
            Dipercaya Lebih dari <span className="bg-gradient-to-r from-[#4b3b86] to-[#8f78d8] bg-clip-text text-transparent">1.250+ Mahasiswa &amp; Job Seeker</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5d5577] max-w-2xl mx-auto leading-relaxed">
            Lihat bagaimana asesmen psikometri, scanner CV format ATS, dan simulator interview metode STAR membantu mereka lolos seleksi kerja impian.
          </p>
        </div>

        {/* Rating Scorecard Banner */}
        <div className="card-s p-6 sm:p-8 bg-gradient-to-r from-white via-[#efeafb]/40 to-white border border-[#d9cff5] max-w-4xl mx-auto w-full shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            {/* 1. Star Rating */}
            <div className="space-y-1 border-r border-[#d9cff5]/60 pr-2">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#4b3b86]">4.9 / 5.0</p>
              <p className="text-[11px] text-[#5d5577] font-semibold">1.250+ Review Terverifikasi</p>
            </div>

            {/* 2. ATS Pass Rate */}
            <div className="space-y-1 md:border-r border-[#d9cff5]/60 px-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#198754]">94%</p>
              <p className="text-xs font-bold text-[#2b2542]">Lolos Skrining ATS</p>
              <p className="text-[11px] text-[#5d5577]">Setelah Optimasi Format CV</p>
            </div>

            {/* 3. Interview Confidence */}
            <div className="space-y-1 border-r border-[#d9cff5]/60 px-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#4b3b86]">88%</p>
              <p className="text-xs font-bold text-[#2b2542]">Percaya Diri Interview</p>
              <p className="text-[11px] text-[#5d5577]">Simulasi 10 Soal STAR</p>
            </div>

            {/* 4. Affordable Transparent Price */}
            <div className="space-y-1 pl-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#8f78d8]">35K</p>
              <p className="text-xs font-bold text-[#2b2542]">Rp 35.000 / Bulan</p>
              <p className="text-[11px] text-[#5d5577]">Bebas Auto-Debit Diam-diam</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid (3 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userReviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="card-s p-6 sm:p-7 flex flex-col justify-between bg-white border border-[#d9cff5]/80 hover:border-[#8f78d8] hover:shadow-card transition-all duration-200 group"
            >
              <div className="space-y-4">
                {/* Rating & Quote Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
                    <Quote size={14} className="rotate-180" />
                  </div>
                </div>

                {/* Outcome Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fdf9] border border-[#d1e7dd] text-[11px] font-bold text-[#198754]">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>{rev.outcome}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#2b2542] leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Reviewer Profile */}
              <div className="pt-4 mt-4 border-t border-[#d9cff5]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#efeafb] text-[#4b3b86] font-extrabold text-xs flex items-center justify-center border border-[#d9cff5] shrink-0">
                  {rev.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#2b2542] truncate">{rev.name}</h4>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check size={9} strokeWidth={3} />
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5d5577] truncate">{rev.origin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#4b3b86] via-[#6551b3] to-[#8f78d8] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
              Mulai Langkah Kariermu Hari Ini
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Siap Menembus Seleksi Berkas &amp; Wawancara Kerja?
            </h3>
            <p className="text-xs sm:text-sm text-[#efeafb] max-w-xl leading-relaxed">
              Bergabunglah dengan ribuan mahasiswa dan pencari kerja yang telah menemukan arah karier dan mengoptimasi CV mereka bersama Inner Whisper.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl bg-white text-[#4b3b86] font-bold text-xs sm:text-sm hover:bg-[#efeafb] transition-all shadow-md text-center flex items-center justify-center gap-2 active:scale-95"
            >
              <ClipboardCheck size={16} />
              <span>Coba Tes Gratis</span>
            </Link>
            <Link
              to="/layanan"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Lihat Paket (Rp 35k)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

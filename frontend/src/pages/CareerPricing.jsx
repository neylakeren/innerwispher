import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Award,
  Check,
  CreditCard,
  Lock,
  Clock,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import PricingModal from '../components/PricingModal';
import { Button } from '../components/ui';

export default function CareerPricing() {
  const { isProUnlocked, proPaymentStatus, proPayment } = useCareer();
  const [modalOpen, setModalOpen] = useState(false);

  const freeFeatures = [
    'Tes Minat & Bakat dasar (2 kategori dominan)',
    'CV ATS Quick Scanner (audit 8 parameter standar)',
    '3 pertanyaan simulasi wawancara kerja dasar',
    'Akses seluruh artikel & panduan karier mingguan',
  ];

  const proFeatures = [
    'Semua fitur Akses Dasar',
    'Full Laporan Analisis Karier Lengkap (Downloadable PDF)',
    'Grafik Radar 4 Dimensi & Rekomendasi 10+ Industri Cocok',
    'Analisis SWOT Karier (Kekuatan, Peluang, & Blind Spot)',
    'CV ATS Deep Diagnostic & Pencocokan Kata Kunci HRD',
    'Analisis Kata Kerja Aktif & Saran Revisi Baris per Baris',
    'Akses Penuh 10 Soal Simulasi Wawancara Kerja (Metode STAR)',
    'Modul Template Portofolio Karier Eksklusif',
    'Akses Lifetime Selamanya (1x Bayar)',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-quicksand pb-16">
      {/* Page Header */}
      <div className="card-s p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
            <CreditCard size={14} />
            Paket Akses &amp; Upgrade
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
            Satu Harga untuk Semua Fitur
          </h1>
          <p className="text-sm text-[#5d5577] mt-1 max-w-xl">
            Tidak perlu bayar per fitur. Cukup subscribe <strong>1x seharga Rp 35.000</strong> untuk membuka seluruh laporan diagnostik, audit CV ATS, dan latihan wawancara.
          </p>
        </div>

        {/* Status Chip */}
        <div className="p-3.5 rounded-2xl bg-[#efeafb] border border-[#d9cff5] shrink-0 self-start sm:self-auto flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#8f78d8] text-white flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#5d5577] tracking-wider">Status Akun</p>
            <p className="text-xs font-extrabold text-[#4b3b86]">
              {isProUnlocked 
                ? 'Member PRO (Aktif)' 
                : proPaymentStatus === 'pending'
                  ? 'Verifikasi Struk (Pending)'
                  : 'Akses Dasar (Gratis)'}
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Status Banners */}
      {isProUnlocked && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 shadow-sm animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Inner Whisper PRO Aktif Seumur Hidup!</h4>
            <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
              Selamat! Akun Anda memiliki akses penuh tanpa batas ke download PDF laporan diagnostik karier, audit kata kunci CV ATS mendalam, dan simulasi interview STAR.
            </p>
          </div>
        </div>
      )}

      {!isProUnlocked && proPaymentStatus === 'pending' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Foto Struk Transfer Sedang Diverifikasi Admin</h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Bukti transfer Anda sebesar <strong>Rp 35.000</strong> ke <strong>Bank {proPayment?.bank_destination || 'BCA/Mandiri'}</strong> atas nama <strong>{proPayment?.sender_name || 'Anda'}</strong> sedang ditinjau. Seluruh fitur PRO otomatis aktif seketika setelah disetujui admin.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0 self-start sm:self-auto">
            Menunggu Verifikasi Admin
          </span>
        </div>
      )}

      {!isProUnlocked && proPaymentStatus === 'rejected' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold">Bukti Transfer Belum Berhasil Diverifikasi</h4>
              <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">
                Struk transfer sebelumnya tidak terbaca atau ditolak admin. Silakan unggah ulang foto struk transfer yang jelas ke rekening BCA atau Mandiri resmi kami.
              </p>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="text-xs shrink-0 self-start sm:self-auto"
          >
            Unggah Ulang Struk
          </Button>
        </div>
      )}

      {/* 2-Column Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Tier Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#d9cff5] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#efeafb] text-[#4b3b86]">
                Free Tier
              </span>
              <span className="text-[11px] font-bold text-[#198754] bg-[#d1e7dd] px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check size={11} /> Aktif
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#2b2542]">Akses Dasar</h3>
            <p className="text-xs text-[#5d5577] mb-4">Fitur penting untuk eksplorasi awal kariermu</p>

            <div className="mb-5 pb-4 border-b border-[#d9cff5]/60">
              <span className="text-3xl font-extrabold text-[#4b3b86]">Rp 0</span>
              <span className="text-xs text-[#5d5577] ml-1.5 font-medium">/gratis selamanya</span>
            </div>

            <div className="space-y-2.5 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
                Fitur yang Didapatkan:
              </p>
              {freeFeatures.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#2b2542]">
                  <CheckCircle2 size={15} className="text-[#8f78d8] shrink-0 mt-0.5" />
                  <span className="leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            disabled
            className="w-full text-xs opacity-75 cursor-not-allowed bg-[#fbf9f9]"
          >
            Akses Dasar Aktif
          </Button>
        </div>

        {/* PRO Tier Card (Single Bundling) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#efeafb] via-white to-white border-2 border-[#8f78d8] shadow-xl flex flex-col justify-between relative -translate-y-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#8f78d8] text-white shadow-sm flex items-center gap-1">
                <Award size={12} /> All-in-One Bundle
              </span>
              {isProUnlocked && (
                <span className="text-[11px] font-bold text-[#198754] bg-[#d1e7dd] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check size={11} /> Sudah Aktif
                </span>
              )}
              {!isProUnlocked && proPaymentStatus === 'pending' && (
                <span className="text-[11px] font-bold text-[#664d03] bg-[#fff3cd] px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#ffe69c]">
                  <Clock size={11} /> Verifikasi Pending
                </span>
              )}
            </div>

            <h3 className="text-2xl font-extrabold text-[#2b2542]">Inner Whisper PRO</h3>
            <p className="text-xs text-[#5d5577] mb-4">Satu paket komplit untuk seluruh persiapan kerja profesional</p>

            <div className="mb-5 pb-4 border-b border-[#d9cff5]/70">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#4b3b86]">Rp 35.000</span>
                <span className="text-xs text-[#5d5577] font-medium">/sekali bayar selamanya</span>
              </div>
              <p className="text-[11px] text-[#8f78d8] font-bold mt-1">
                Transfer rekening manual. Tanpa biaya langganan bulanan.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
                Semua Fitur Unggulan Terbuka:
              </p>
              {proFeatures.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#2b2542]">
                  <CheckCircle2 size={15} className="text-[#8f78d8] shrink-0 mt-0.5" />
                  <span className="leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {isProUnlocked ? (
              <Button
                variant="outline"
                size="md"
                disabled
                className="w-full text-xs bg-[#d1e7dd] text-[#198754] border-[#d1e7dd] font-bold flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Akses PRO Anda Telah Aktif</span>
              </Button>
            ) : proPaymentStatus === 'pending' ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setModalOpen(true)}
                className="w-full text-xs bg-[#fff3cd] text-[#664d03] border-[#ffe69c] font-bold flex items-center justify-center gap-1.5 hover:bg-[#ffe69c]/70 transition-all"
              >
                <Clock size={14} className="animate-spin" />
                <span>Menunggu Verifikasi Admin (Lihat Detail)</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setModalOpen(true)}
                className="w-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-btn py-3"
              >
                <Sparkles size={16} />
                <span>Aktifkan PRO Sekarang (Rp 35.000)</span>
                <ArrowRight size={14} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="card-s p-6 sm:p-8 bg-gradient-to-r from-white to-[#efeafb]/40 border border-[#d9cff5]">
        <h3 className="text-base sm:text-lg font-bold text-[#4b3b86] mb-4 text-center sm:text-left">
          Mengapa Inner Whisper PRO Paling Hemat &amp; Praktis?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2b2542]">Transfer Bank Manual (BCA &amp; Mandiri)</h4>
              <p className="text-xs text-[#5d5577] mt-0.5 leading-relaxed">
                Tersedia rekening resmi BCA &amp; Mandiri. Cukup unggah foto struk transfer, admin akan memverifikasi cepat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2b2542]">1x Bayar Selamanya</h4>
              <p className="text-xs text-[#5d5577] mt-0.5 leading-relaxed">
                Bebas dari auto-debit bulanan. Cukup bayar Rp 35.000 sekali saat kamu sedang mempersiapkan lamaran kerja.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2b2542]">Standar HRD &amp; ATS Teruji</h4>
              <p className="text-xs text-[#5d5577] mt-0.5 leading-relaxed">
                Laporan asesmen psikometri terstruktur, algoritma audit ATS, dan simulasi interview metode STAR.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

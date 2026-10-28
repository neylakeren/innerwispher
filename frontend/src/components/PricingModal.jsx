import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Upload, 
  Loader2, 
  Copy, 
  Check, 
  Clock, 
  AlertCircle, 
  FileText,
  QrCode,
  Smartphone,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { useAuth } from '../context/AuthContext';

export default function PricingModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const { submitProPaymentProof, refreshProStatus } = useCareer();

  const [paymentChannel, setPaymentChannel] = useState('QRIS'); // 'QRIS' | 'BANK' | 'EWALLET'
  const [bankDestination, setBankDestination] = useState('QRIS');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showQrisPreview, setShowQrisPreview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setErrorMessage('');
      setProofFile(null);
      setProofPreview(null);
      setPaymentChannel('QRIS');
      setBankDestination('QRIS');
      if (user?.name) setSenderName(user.name);
    }
  }, [isOpen, user?.name]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleCopyAccount = (number, key) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Ukuran file bukti transfer maksimal 10 MB.');
      return;
    }

    setErrorMessage('');
    setProofFile(file);
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setProofPreview('pdf');
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proofFile) {
      setErrorMessage('Silakan pilih foto struk / bukti transfer terlebih dahulu.');
      return;
    }
    if (!senderName.trim()) {
      setErrorMessage('Silakan isi nama pengirim / pemilik akun pembayaran.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const formData = new FormData();
      formData.append('proof_image', proofFile);
      formData.append('bank_destination', bankDestination);
      formData.append('sender_name', senderName.trim());
      formData.append('amount', '35000');

      await submitProPaymentProof(formData);
      await refreshProStatus();

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to upload transfer proof:', err);
      setErrorMessage(err.response?.data?.message || 'Gagal mengirim foto struk. Pastikan file valid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2b2542]/60 backdrop-blur-sm animate-fade-in font-quicksand">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d9cff5] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#efeafb] via-white to-[#efeafb] border-b border-[#d9cff5]/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8f78d8] text-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2b2542]">Aktivasi Manual Inner Whisper PRO</h3>
              <p className="text-[11px] text-[#5d5577]">Bayar via QRIS, Bank, atau E-Wallet &amp; kirim bukti struk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5d5577] hover:bg-[#efeafb] hover:text-[#2b2542] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {!isSuccess ? (
            <form onSubmit={handleSubmitProof} className="space-y-4">
              {/* Summary Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#efeafb]/70 via-white to-[#efeafb]/40 border-2 border-[#8f78d8] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8f78d8] text-white inline-block">
                    Paket Langganan Bulanan
                  </span>
                  <h4 className="text-sm font-bold text-[#2b2542] mt-1">Akses PRO 30 Hari Penuh</h4>
                  <p className="text-[11px] text-[#5d5577]">Laporan PDF + CV ATS + 10 Soal STAR + Portofolio</p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#4b3b86]">Rp 35.000</span>
                  <span className="text-[10px] text-[#5d5577] block font-medium">/bulan (30 hari)</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider block">
                    1. Pilih Metode Pembayaran Resmi:
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#efeafb]/60 border border-[#d9cff5]">
                  <button
                    type="button"
                    onClick={() => { setPaymentChannel('QRIS'); setBankDestination('QRIS'); }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentChannel === 'QRIS'
                        ? 'bg-[#8f78d8] text-white shadow-sm'
                        : 'text-[#4b3b86] hover:bg-white/70'
                    }`}
                  >
                    <QrCode size={14} />
                    <span>QRIS Instan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentChannel('BANK'); setBankDestination('BCA'); }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentChannel === 'BANK'
                        ? 'bg-[#8f78d8] text-white shadow-sm'
                        : 'text-[#4b3b86] hover:bg-white/70'
                    }`}
                  >
                    <Building2 size={14} />
                    <span>Transfer Bank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentChannel('EWALLET'); setBankDestination('GoPay'); }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentChannel === 'EWALLET'
                        ? 'bg-[#8f78d8] text-white shadow-sm'
                        : 'text-[#4b3b86] hover:bg-white/70'
                    }`}
                  >
                    <Smartphone size={14} />
                    <span>E-Wallet</span>
                  </button>
                </div>

                {/* Tab Content 1: QRIS */}
                {paymentChannel === 'QRIS' && (
                  <div className="p-3.5 rounded-2xl border border-[#d9cff5] bg-gradient-to-br from-[#efeafb]/40 via-white to-[#efeafb]/20 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div 
                        onClick={() => setShowQrisPreview(true)}
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl border-2 border-[#8f78d8] bg-white p-1.5 shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform shrink-0 flex items-center justify-center group relative"
                        title="Klik untuk memperbesar QRIS"
                      >
                        <img 
                          src="/qris.jpeg" 
                          alt="QRIS Inner Whisper" 
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-[#4b3b86]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity rounded-lg">
                          Perbesar
                        </div>
                      </div>

                      <div className="text-center sm:text-left space-y-1">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8f78d8] text-white text-[10px] font-extrabold uppercase tracking-wider">
                          QRIS Standar Nasional
                        </div>
                        <h5 className="text-sm font-bold text-[#2b2542]">Scan Langsung dari Handphone</h5>
                        <p className="text-[11px] text-[#5d5577] leading-relaxed">
                          Mendukung <strong>BCA Mobile, Mandiri Livin, BRImo, BNI, GoPay, OVO, Dana, ShopeePay, LinkAja</strong>.
                        </p>
                        <p className="text-[11px] font-medium text-[#4b3b86]">
                          a/n <strong>Neyla Vala Kiara Andi</strong>
                        </p>
                        <a
                          href="/qris.jpeg"
                          download="QRIS_InnerWhisper_Rp35000.jpeg"
                          className="inline-flex items-center gap-1 text-[11px] text-[#8f78d8] font-bold hover:underline pt-1"
                        >
                          <ExternalLink size={12} />
                          <span>Unduh Gambar Barcode QRIS</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Bank Transfer */}
                {paymentChannel === 'BANK' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* BCA */}
                    <div 
                      onClick={() => setBankDestination('BCA')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        bankDestination === 'BCA'
                          ? 'border-[#8f78d8] bg-[#efeafb]/50 shadow-sm ring-1 ring-[#8f78d8]'
                          : 'border-[#d9cff5] bg-white hover:border-[#8f78d8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#4b3b86]">Bank BCA</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopyAccount('1530581281', 'BCA'); }}
                          className="text-[11px] font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
                        >
                          {copiedAccount === 'BCA' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                          <span>{copiedAccount === 'BCA' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider mt-1">1530581281</p>
                      <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                    </div>

                    {/* SeaBank */}
                    <div 
                      onClick={() => setBankDestination('SeaBank')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        bankDestination === 'SeaBank'
                          ? 'border-[#8f78d8] bg-[#efeafb]/50 shadow-sm ring-1 ring-[#8f78d8]'
                          : 'border-[#d9cff5] bg-white hover:border-[#8f78d8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#4b3b86]">SeaBank</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopyAccount('901928200829', 'SeaBank'); }}
                          className="text-[11px] font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
                        >
                          {copiedAccount === 'SeaBank' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                          <span>{copiedAccount === 'SeaBank' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider mt-1">901928200829</p>
                      <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: E-Wallet */}
                {paymentChannel === 'EWALLET' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* GoPay */}
                    <div 
                      onClick={() => setBankDestination('GoPay')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        bankDestination === 'GoPay'
                          ? 'border-[#8f78d8] bg-[#efeafb]/50 shadow-sm ring-1 ring-[#8f78d8]'
                          : 'border-[#d9cff5] bg-white hover:border-[#8f78d8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#00aed6]">GoPay</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopyAccount('081238536128', 'GoPay'); }}
                          className="text-[11px] font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
                        >
                          {copiedAccount === 'GoPay' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                          <span>{copiedAccount === 'GoPay' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider mt-1">081238536128</p>
                      <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                    </div>

                    {/* ShopeePay */}
                    <div 
                      onClick={() => setBankDestination('ShopeePay')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        bankDestination === 'ShopeePay'
                          ? 'border-[#ee4d2d] bg-orange-50/50 shadow-sm ring-1 ring-[#ee4d2d]'
                          : 'border-[#d9cff5] bg-white hover:border-[#ee4d2d]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#ee4d2d]">ShopeePay</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleCopyAccount('081238536128', 'ShopeePay'); }}
                          className="text-[11px] font-bold text-[#ee4d2d] hover:text-[#b03016] flex items-center gap-1"
                        >
                          {copiedAccount === 'ShopeePay' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                          <span>{copiedAccount === 'ShopeePay' ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider mt-1">081238536128</p>
                      <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Input: Bank & Nama Pengirim */}
              <div className="space-y-3 pt-1 border-t border-[#d9cff5]/60">
                <label className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider block">
                  2. Konfirmasi Pembayaran Anda:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                      Metode yang Digunakan
                    </label>
                    <select
                      value={bankDestination}
                      onChange={(e) => setBankDestination(e.target.value)}
                      className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 font-semibold"
                    >
                      <option value="QRIS">QRIS (Scan Barcode Nasional)</option>
                      <option value="BCA">Bank BCA (1530581281)</option>
                      <option value="SeaBank">SeaBank (901928200829)</option>
                      <option value="GoPay">GoPay (081238536128)</option>
                      <option value="ShopeePay">ShopeePay (081238536128)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                      Nama Pengirim / Pemilik Akun
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama di akun bank / e-wallet"
                      className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30"
                    />
                  </div>
                </div>

                {/* Upload Struk Image */}
                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Unggah Foto Struk / Bukti Transfer (Maks. 5 MB)
                  </label>
                  
                  <div className="mt-1 flex justify-center px-4 pt-3 pb-3 border-2 border-[#d9cff5] border-dashed rounded-2xl hover:border-[#8f78d8] transition-colors bg-[#efeafb]/20 relative">
                    {proofPreview ? (
                      <div className="space-y-2 text-center w-full">
                        {proofPreview === 'pdf' ? (
                          <div className="p-4 rounded-xl border border-[#d9cff5] bg-white inline-flex flex-col items-center gap-1.5 shadow-sm">
                            <FileText size={32} className="text-[#8f78d8]" />
                            <span className="text-xs font-bold text-[#4b3b86]">Dokumen PDF Terpilih</span>
                          </div>
                        ) : (
                          <div className="max-h-40 overflow-hidden rounded-xl border border-[#d9cff5] inline-block shadow-sm">
                            <img src={proofPreview} alt="Preview Struk Transfer" className="h-36 w-auto object-contain mx-auto" />
                          </div>
                        )}
                        <p className="text-xs font-semibold text-[#4b3b86]">{proofFile?.name}</p>
                        <button
                          type="button"
                          onClick={() => { setProofFile(null); setProofPreview(null); }}
                          className="text-xs text-error font-bold hover:underline"
                        >
                          Ganti Foto Struk
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-center">
                        <div className="w-9 h-9 rounded-full bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mx-auto shadow-sm">
                          <Upload size={16} />
                        </div>
                        <div className="flex text-xs text-[#5d5577] justify-center">
                          <label
                            htmlFor="proof-upload"
                            className="relative cursor-pointer rounded-md font-bold text-[#8f78d8] hover:text-[#4b3b86] focus-within:outline-none"
                          >
                            <span>Pilih file foto struk</span>
                            <input
                              id="proof-upload"
                              name="proof-upload"
                              type="file"
                              accept="image/*,.pdf,.heic,.heif"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">atau seret ke sini</p>
                        </div>
                        <p className="text-[10px] text-[#5d5577]">Format JPG, PNG, WEBP, atau PDF hingga 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-xs text-error flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting || !proofFile}
                  className="w-full btn-lv text-xs sm:text-sm py-3 rounded-xl font-semibold shadow-btn flex items-center justify-center gap-2 text-white active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Mengirim Foto Struk...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Kirim Foto Struk Transfer (Rp 35.000)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-8 px-4 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#fff3cd] text-[#664d03] flex items-center justify-center mx-auto shadow-md border border-[#ffe69c]">
                <Clock size={36} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#2b2542]">Struk Berhasil Terkirim!</h4>
                <p className="text-xs text-[#5d5577] mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Foto bukti transfer Anda sebesar <strong>Rp 35.000</strong> via <strong>{bankDestination}</strong> telah masuk ke antrean verifikasi Admin.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5] text-xs text-[#4b3b86] space-y-1">
                <p className="font-bold">Proses Verifikasi Cepat:</p>
                <p className="text-[11px] text-[#5d5577]">
                  Admin akan memverifikasi dalam waktu singkat. Akun PRO Anda akan aktif otomatis begitu disetujui.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full btn-lv text-xs sm:text-sm py-2.5 rounded-xl font-semibold shadow-btn text-white"
              >
                Kembali ke Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QRIS Full Preview Lightbox */}
      {showQrisPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowQrisPreview(false)}
        >
          <div 
            className="relative max-w-sm w-full bg-white rounded-3xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-sm text-[#2b2542]">Barcode QRIS Resmi</h4>
              <button 
                onClick={() => setShowQrisPreview(false)}
                className="w-7 h-7 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center font-bold"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-2 bg-white rounded-xl border flex items-center justify-center">
              <img src="/qris.jpeg" alt="QRIS Full Barcode" className="max-h-80 w-auto object-contain" />
            </div>
            <p className="text-center text-xs text-[#5d5577]">
              Scan menggunakan aplikasi Mobile Banking atau E-Wallet apa saja.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

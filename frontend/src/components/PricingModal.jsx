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
  FileText
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { useAuth } from '../context/AuthContext';

export default function PricingModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const { submitProPaymentProof, proPaymentStatus, refreshProStatus } = useCareer();

  const [bankDestination, setBankDestination] = useState('BCA');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [copiedBank, setCopiedBank] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setErrorMessage('');
      setProofFile(null);
      setProofPreview(null);
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

  const handleCopyAccount = (number, bank) => {
    navigator.clipboard.writeText(number);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran file foto struk maksimal 5 MB.');
      return;
    }

    setErrorMessage('');
    setProofFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProofPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proofFile) {
      setErrorMessage('Silakan pilih foto struk / bukti transfer terlebih dahulu.');
      return;
    }
    if (!senderName.trim()) {
      setErrorMessage('Silakan isi nama pengirim rekening Anda.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/60 backdrop-blur-sm animate-fade-in font-quicksand">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d9cff5] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#efeafb] via-white to-[#efeafb] border-b border-[#d9cff5]/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8f78d8] text-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2b2542]">Aktivasi Manual Inner Whisper PRO</h3>
              <p className="text-[11px] text-[#5d5577]">Transfer ke rekening &amp; kirim foto struk pembayaran</p>
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
        <div className="p-6 overflow-y-auto space-y-5">
          {!isSuccess ? (
            <form onSubmit={handleSubmitProof} className="space-y-5">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#efeafb]/70 via-white to-[#efeafb]/40 border-2 border-[#8f78d8] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8f78d8] text-white inline-block">
                    Paket Langganan Bulanan
                  </span>
                  <h4 className="text-sm font-bold text-[#2b2542] mt-1">Akses PRO 30 Hari Penuh</h4>
                  <p className="text-[11px] text-[#5d5577]">Laporan PDF + CV ATS + 10 Soal STAR + Portofolio</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#4b3b86]">Rp 35.000</span>
                  <span className="text-[10px] text-[#5d5577] block font-medium">/bulan (30 hari)</span>
                </div>
              </div>

              {/* Bank Accounts Info Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider block">
                  1. Rekening Resmi Tujuan Transfer:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* BCA */}
                  <div className="p-3.5 rounded-xl border border-[#d9cff5] bg-white space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#4b3b86]">Bank BCA</span>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount('1530581281', 'BCA')}
                        className="text-[11px] font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
                      >
                        {copiedBank === 'BCA' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                        <span>{copiedBank === 'BCA' ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider">1530581281</p>
                    <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                  </div>

                  {/* SeaBank */}
                  <div className="p-3.5 rounded-xl border border-[#d9cff5] bg-white space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#4b3b86]">SeaBank</span>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount('901928200829', 'SeaBank')}
                        className="text-[11px] font-bold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1"
                      >
                        {copiedBank === 'SeaBank' ? <Check size={12} className="text-[#198754]" /> : <Copy size={12} />}
                        <span>{copiedBank === 'SeaBank' ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <p className="text-sm font-mono font-bold text-[#2b2542] tracking-wider">901928200829</p>
                    <p className="text-[10px] text-[#5d5577]">a/n Neyla Vala Kiara Andi</p>
                  </div>
                </div>
              </div>

              {/* Form Input: Bank & Nama Pengirim */}
              <div className="space-y-3 pt-1 border-t border-[#d9cff5]/60">
                <label className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider block">
                  2. Konfirmasi Pengiriman Transfer:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                      Bank Tujuan Transfer
                    </label>
                    <select
                      value={bankDestination}
                      onChange={(e) => setBankDestination(e.target.value)}
                      className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 font-semibold"
                    >
                      <option value="BCA">Bank BCA (1530581281)</option>
                      <option value="SeaBank">SeaBank (901928200829)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                      Nama Pengirim di Rekening
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama pemilik rekening transfer"
                      className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30"
                    />
                  </div>
                </div>

                {/* Upload Struk Image */}
                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Unggah Foto Struk / Bukti Transfer (Maks. 5 MB)
                  </label>
                  
                  <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-[#d9cff5] border-dashed rounded-2xl hover:border-[#8f78d8] transition-colors bg-[#efeafb]/20 relative">
                    {proofPreview ? (
                      <div className="space-y-2 text-center w-full">
                        <div className="max-h-48 overflow-hidden rounded-xl border border-[#d9cff5] inline-block shadow-sm">
                          <img src={proofPreview} alt="Preview Struk Transfer" className="h-40 w-auto object-contain mx-auto" />
                        </div>
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
                        <div className="w-10 h-10 rounded-full bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mx-auto shadow-sm">
                          <Upload size={18} />
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
                              accept="image/*"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">atau seret ke sini</p>
                        </div>
                        <p className="text-[10px] text-[#5d5577]">Format JPG, PNG, atau WEBP hingga 5MB</p>
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
              <div className="pt-2">
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
                  Foto bukti transfer Anda sebesar <strong>Rp 35.000</strong> ke <strong>Bank {bankDestination}</strong> telah masuk ke antrean verifikasi Admin.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5] text-xs text-[#4b3b86] space-y-1">
                <p className="font-bold">Proses Verifikasi Cepat:</p>
                <p className="text-[11px] text-[#5d5577]">
                  Admin akan memverifikasi dalam waktu 1x24 jam (biasanya 5–15 menit pada jam kerja). Akun PRO Anda akan aktif otomatis begitu disetujui.
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
    </div>
  );
}

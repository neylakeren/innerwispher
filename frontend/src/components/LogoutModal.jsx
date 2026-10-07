import React, { useEffect } from 'react';
import { LogOut, X, Loader2 } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm, loading = false, userName }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/50 backdrop-blur-sm transition-opacity duration-200"
      onClick={() => !loading && onClose()}
    >
      <div
        className="relative w-full max-w-sm p-6 sm:p-7 bg-white rounded-2xl shadow-2xl border border-[#d9cff5] text-center flex flex-col items-center transform transition-all duration-200 scale-100 font-quicksand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 ring-8 ring-rose-50/60 shadow-sm">
          <LogOut size={26} className="translate-x-0.5" />
        </div>

        {/* Title & Description */}
        <h3 id="logout-modal-title" className="text-lg sm:text-xl font-bold text-[#2b2542] mb-1.5">
          Konfirmasi Keluar
        </h3>
        <p id="logout-modal-desc" className="text-xs sm:text-sm text-[#5d5577] mb-6 leading-relaxed">
          Apakah Anda yakin ingin keluar dari akun{userName ? <> <span className="font-semibold text-[#2b2542]">{userName}</span></> : ''}? Anda perlu masuk kembali untuk mengakses fitur dan data Anda.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#d9cff5] text-xs sm:text-sm font-semibold text-[#5d5577] hover:bg-[#efeafb] hover:text-[#4b3b86] transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <LogOut size={15} />
                <span>Ya, Keluar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

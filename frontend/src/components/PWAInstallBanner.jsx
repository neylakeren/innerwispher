import { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the app is already in standalone mode (installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // Check if user previously dismissed the banner in this session
    const isDismissed = sessionStorage.getItem('innerwhisper_pwa_dismissed');
    if (isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('innerwhisper_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Instal Aplikasi InnerWhisper"
      className="fixed z-50 bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 bg-white/95 backdrop-blur-md border border-[#f2dede] rounded-2xl p-4 shadow-xl shadow-[#9a4153]/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 bg-[#9a4153]/10 text-[#9a4153] rounded-xl flex-shrink-0 mt-0.5">
          <Smartphone className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-[#1b1c1c] tracking-tight">
              Pasang Aplikasi InnerWhisper
            </h4>
            <button
              onClick={handleDismiss}
              aria-label="Tutup pemberitahuan"
              className="p-1 text-[#5d5c71] hover:text-[#1b1c1c] hover:bg-[#fbf9f9] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5d5c71] mt-1 leading-relaxed">
            Akses layanan konseling psikologi lebih cepat, ringan, dan langsung dari layar utama perangkat Anda.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#9a4153] hover:bg-[#833344] text-white text-xs font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#9a4153]/40"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pasang Sekarang</span>
            </button>

            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-xs font-medium text-[#5d5c71] hover:text-[#1b1c1c] hover:bg-neutral-100/60 rounded-lg transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

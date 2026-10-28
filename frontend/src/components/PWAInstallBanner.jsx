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
      // Prevent default mini-infobar from appearing automatically
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsVisible(false);
      setDeferredPrompt(null);
      sessionStorage.setItem('innerwhisper_pwa_dismissed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        setIsVisible(false);
        sessionStorage.setItem('innerwhisper_pwa_dismissed', 'true');
      }
    } catch (err) {
      // Ignored or handled gracefully
    } finally {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('innerwhisper_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Instal Aplikasi InnerWhisper"
      className="fixed z-50 bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 bg-white/95 backdrop-blur-md border border-[#d9cff5] rounded-2xl p-4 shadow-xl shadow-[#8f78d8]/15 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 font-quicksand"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 bg-[#efeafb] text-[#8f78d8] rounded-xl flex-shrink-0 mt-0.5">
          <Smartphone className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-[#2b2542] tracking-tight">
              Pasang Aplikasi Inner Whisper
            </h4>
            <button
              onClick={handleDismiss}
              aria-label="Tutup pemberitahuan"
              className="p-1 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5d5577] mt-1 leading-relaxed">
            Akses layanan konsultasi karier &amp; pengembangan potensi langsung dari layar utama perangkat Anda.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 btn-lv text-xs font-semibold rounded-xl shadow-btn transition-all"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pasang Sekarang</span>
            </button>

            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-xs font-medium text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-lg transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

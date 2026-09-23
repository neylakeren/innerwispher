import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30 group">
      {/* Desktop Tooltip */}
      <div className="hidden md:block absolute right-full mr-3.5 top-1/2 -translate-y-1/2 w-60 bg-inverse-surface text-inverse-on-surface text-xs p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl pointer-events-none">
        Bot kami siap membantu Anda 24/7 untuk penjadwalan dan konsultasi.
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-6 border-t-transparent border-l-6 border-l-inverse-surface border-b-6 border-b-transparent" />
      </div>

      {/* Floating Action Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi via WhatsApp Bot"
        className="w-12 h-12 md:w-14 md:h-14 bg-[#9a4153] hover:bg-[#833344] text-white rounded-full shadow-lg shadow-[#9a4153]/25 flex items-center justify-center animate-soft-pulse hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" aria-hidden="true" />
      </a>
    </div>
  );
}

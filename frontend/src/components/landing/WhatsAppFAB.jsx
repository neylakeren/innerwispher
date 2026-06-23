import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFAB() {
  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-50 group">
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-64 bg-inverse-surface text-inverse-on-surface text-label-sm p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg pointer-events-none">
        Bot kami siap membantu Anda 24/7 untuk penjadwalan dan bantuan awal.
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-inverse-surface border-b-8 border-b-transparent" />
      </div>
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center animate-soft-pulse hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>
    </div>
  );
}

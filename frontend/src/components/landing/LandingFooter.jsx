import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingFooter() {
  return (
    <footer className="bg-[#efeafb]/70 border-t border-[#d9cff5] w-full backdrop-blur-md hidden md:block font-quicksand">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-16 lg:px-24 py-16 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
            <img src="/logo.png" alt="Inner Whisper" className="h-8 w-auto object-contain drop-shadow-[0_4px_10px_rgba(143,120,216,0.25)]" />
            <span className="bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent">
              Inner Whisper
            </span>
          </Link>
          <p className="text-sm text-[#5d5577] max-w-sm leading-relaxed">
            Berkomitmen untuk menyediakan ruang aman dan dukungan profesional bagi perjalanan kesehatan mental dan perencanaan karier Anda.
          </p>
          <p className="text-xs text-[#5d5577]/80 mt-3">
            &copy; 2026 Inner Whisper. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <h4 className="text-[#4b3b86] font-bold text-sm tracking-wide">Tautan</h4>
          <Link to="/review" className="text-sm text-[#5d5577] hover:text-[#4b3b86] transition-colors">Review Pelanggan</Link>
          <a href="#" className="text-sm text-[#5d5577] hover:text-[#4b3b86] transition-colors">Kebijakan Privasi</a>
          <a href="#" className="text-sm text-[#5d5577] hover:text-[#4b3b86] transition-colors">Syarat &amp; Ketentuan</a>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <h4 className="text-[#4b3b86] font-bold text-sm tracking-wide">Bantuan</h4>
          <a href="#" className="text-sm text-[#5d5577] hover:text-[#4b3b86] transition-colors">Pusat Bantuan</a>
          <a href="#" className="text-sm text-[#5d5577] hover:text-[#4b3b86] transition-colors">Karier</a>
        </div>
      </div>
    </footer>
  );
}

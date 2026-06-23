import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingFooter() {
  return (
    <footer className="bg-surface-container-low w-full rounded-t-xl hidden md:block">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-8 md:px-16 lg:px-24 py-20 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <Link to="/" className="text-headline-md font-bold text-primary">
            MentalCare
          </Link>
          <p className="text-body-md text-secondary max-w-sm">
            Berkomitmen untuk menyediakan ruang aman dan dukungan profesional bagi perjalanan kesehatan mental Anda.
          </p>
          <p className="text-label-sm text-secondary mt-4">
            &copy; 2024 MentalCare. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-3 text-label-md">
          <h4 className="text-primary font-bold mb-1">Tautan</h4>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Kebijakan Privasi</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Syarat &amp; Ketentuan</a>
        </div>
        <div className="col-span-1 flex flex-col gap-3 text-label-md">
          <h4 className="text-primary font-bold mb-1">Bantuan</h4>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Pusat Bantuan</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Karir</a>
        </div>
      </div>
    </footer>
  );
}

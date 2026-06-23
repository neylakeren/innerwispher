import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingNavbar() {
  const { user } = useAuth();
  const navItems = [
    { to: '/', label: 'Beranda' },
    { to: '/layanan', label: 'Layanan' },
    { to: '/tentang-kami', label: 'Tentang Kami' },
    { to: '/artikel', label: 'Artikel' },
  ];

  return (
    <header className="hidden md:flex bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex justify-between items-center px-8 md:px-16 lg:px-24 py-4 w-full">
        <Link to="/" className="text-headline-md font-bold text-primary">
          MentalCare
        </Link>
        <nav className="flex items-center gap-gutter">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-label-md transition-colors ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="text-label-md text-primary font-semibold hover:text-surface-tint border border-outline-variant/60 hover:bg-surface-container px-4 py-2 rounded-lg transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-label-md text-primary font-semibold hover:text-surface-tint border border-outline-variant/60 hover:bg-surface-container px-4 py-2 rounded-lg transition-all"
            >
              Masuk
            </Link>
          )}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary text-label-md px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle size={16} />
            Chat di WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

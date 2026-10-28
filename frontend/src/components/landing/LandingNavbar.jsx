import { NavLink, Link } from 'react-router-dom';
import { LogIn, LayoutDashboard, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingNavbar() {
  const { user } = useAuth();
  const navItems = [
    { to: '/', label: 'Beranda' },
    { to: '/layanan', label: 'Paket Layanan' },
    { to: '/tentang-kami', label: 'Tentang Kami' },
    { to: '/artikel', label: 'Artikel & Panduan' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 border-b border-[#d9cff5]/70 shadow-sm transition-all font-quicksand">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-3 md:py-4 w-full">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-lg md:text-2xl font-bold tracking-tight">
          <img src="/logo.png" alt="InnerWhisper" className="h-8 w-auto object-contain drop-shadow-[0_4px_10px_rgba(143,120,216,0.25)]" />
          <span className="bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent">
            Inner Whisper
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors py-1 ${
                  isActive
                    ? 'text-[#4b3b86] font-bold border-b-2 border-[#8f78d8]'
                    : 'text-[#5d5577] hover:text-[#4b3b86] font-medium'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4b3b86] font-semibold border border-[#d9cff5] bg-[#efeafb] hover:bg-[#e4daf7] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shadow-sm"
            >
              <LayoutDashboard size={15} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4b3b86] font-semibold border border-[#d9cff5] bg-[#efeafb] hover:bg-[#e4daf7] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shadow-sm"
            >
              <LogIn size={15} />
              <span>Masuk</span>
            </Link>
          )}

          {/* Primary CTA Button */}
          <Link
            to={user ? "/tes" : "/login"}
            className="hidden sm:inline-flex items-center gap-1.5 btn-lv text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-btn transition-all active:scale-95 text-white"
          >
            <Sparkles size={15} />
            <span>Coba Tes Gratis</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

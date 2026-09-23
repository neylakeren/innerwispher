import { NavLink, Link } from 'react-router-dom';
import { MessageCircle, LogIn, LayoutDashboard } from 'lucide-react';
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
    <header className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 border-b border-[#f2dede]/70 shadow-sm transition-all">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-3 md:py-4 w-full">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-lg md:text-2xl font-bold text-primary tracking-tight">
          <img src="/logo.png" alt="InnerWhisper" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
          <span>InnerWhisper</span>
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
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary font-medium'
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
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-semibold border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all"
            >
              <LayoutDashboard size={15} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-semibold border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all"
            >
              <LogIn size={15} />
              <span>Masuk</span>
            </Link>
          )}

          {/* Desktop WhatsApp Action */}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle size={16} />
            <span>Chat di WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { Home, Stethoscope, Info, BookOpen } from 'lucide-react';

export default function BottomNavBar() {
  const navItems = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/layanan', label: 'Layanan', icon: Stethoscope },
    { to: '/tentang-kami', label: 'Tentang', icon: Info },
    { to: '/artikel', label: 'Artikel', icon: BookOpen },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#f2dede] pb-safe pt-1.5 shadow-[0_-4px_20px_rgba(154,65,83,0.08)]"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-[#9a4153]'
                  : 'text-[#5d5c71] hover:text-[#1b1c1c] active:scale-95'
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5 relative">
                <div
                  className={`p-1.5 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-[#9a4153]/12 text-[#9a4153] -translate-y-0.5' : 'text-[#5d5c71]'
                  }`}
                >
                  <item.icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={`text-[11px] leading-tight tracking-tight transition-all duration-200 ${
                    isActive ? 'font-bold text-[#9a4153]' : 'font-medium text-[#5d5c71]'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4153] mt-0.5" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

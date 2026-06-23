import React from 'react';
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
    <nav className="md:hidden fixed bottom-0 w-full z-40 bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-colors ${
                isActive
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
                <span className={`text-label-sm ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

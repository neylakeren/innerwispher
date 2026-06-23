import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import BottomNavBar from '../components/landing/BottomNavBar';
import WhatsAppFAB from '../components/landing/WhatsAppFAB';

export default function LandingLayout({ children }) {
  return (
    <div className="bg-background text-on-surface font-jakarta antialiased min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <LandingFooter />
      <BottomNavBar />
      <WhatsAppFAB />
    </div>
  );
}

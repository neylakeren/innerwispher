import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import BottomNavBar from '../components/landing/BottomNavBar';
import WhatsAppFAB from '../components/landing/WhatsAppFAB';

export default function LandingLayout({ children }) {
  return (
    <div className="bg-[#f7f4fd] text-[#2b2542] font-quicksand antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient Floating Blobs from Inner Whisper */}
      <div className="blobs">
        <i />
        <i />
        <i />
      </div>

      <LandingNavbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <LandingFooter />
      <BottomNavBar />
      <WhatsAppFAB />
    </div>
  );
}

import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesMenu } from './components/sections/ServicesMenu';
import { HydrationGallery } from './components/sections/HydrationGallery';
import { StylistSection } from './components/sections/StylistSection';
import { BookingEngine } from './components/booking/BookingEngine';
import { AdminCMSModal } from './components/admin/AdminCMSModal';
import { BookingsModal } from './components/modals/BookingsModal';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';

const SalonLayout: React.FC = () => {
  const { isDark } = useSalon();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-[#08080C] text-[#F4F4F6]'
          : 'bg-[#FAFAFC] text-slate-900'
      }`}
    >
      <Navbar />
      <main>
        <HeroSection />
        <ServicesMenu />
        <HydrationGallery />
        <StylistSection />
        <BookingEngine />
      </main>
      <Footer />
      <MobileBottomBar />
      <AdminCMSModal />
      <BookingsModal />
    </div>
  );
};

export function App() {
  return (
    <SalonProvider>
      <SalonLayout />
    </SalonProvider>
  );
}

export default App;

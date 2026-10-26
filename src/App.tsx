import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesMenu } from './components/sections/ServicesMenu';
import { HydrationGallery } from './components/sections/HydrationGallery';
import { StylistSection } from './components/sections/StylistSection';
import { BookingEngine } from './components/booking/BookingEngine';
import { FAQSection } from './components/sections/FAQSection';
import { AdminCMSModal } from './components/admin/AdminCMSModal';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { FadeInOnScroll } from './components/common/FadeInOnScroll';

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
        {/* 1. Hero Showcase */}
        <FadeInOnScroll>
          <HeroSection />
        </FadeInOnScroll>

        {/* 2. Catálogo de Servicios & Precios */}
        <FadeInOnScroll>
          <ServicesMenu />
        </FadeInOnScroll>

        {/* 3. Transformaciones Antes y Después */}
        <FadeInOnScroll>
          <HydrationGallery />
        </FadeInOnScroll>

        {/* 4. Conoce a tu Estilista / Atención Personalizada */}
        <FadeInOnScroll>
          <StylistSection />
        </FadeInOnScroll>

        {/* 5. Agenda de Citas (Directamente debajo de Atención Personalizada) */}
        <FadeInOnScroll>
          <BookingEngine />
        </FadeInOnScroll>

        {/* 6. Preguntas Frecuentes (Al final de la página) */}
        <FadeInOnScroll>
          <FAQSection />
        </FadeInOnScroll>
      </main>

      {/* 7. Footer con Acceso al Gestor al lado de Estilista: Valentina */}
      <Footer />

      {/* Botón de reserva móvil & botón flotante de WhatsApp */}
      <MobileBottomBar />
      <FloatingWhatsApp />

      {/* Panel Gestor Interno de Valentina */}
      <AdminCMSModal />
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

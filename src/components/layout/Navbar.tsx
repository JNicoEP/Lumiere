import React from 'react';
import { Sparkles, Sun, Moon, CalendarCheck, Home } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const Navbar: React.FC = () => {
  const {
    isDark,
    toggleTheme,
    bookings,
    setIsBookingsModalOpen,
    setIsAdminModalOpen
  } = useSalon();

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#08080C]/90 border-violet-900/40 text-[#F4F4F6]'
          : 'bg-white/90 border-indigo-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo (Double click opens hidden Stylist CMS) */}
        <div
          onDoubleClick={() => setIsAdminModalOpen(true)}
          title="Doble clic para acceso privado de estilista"
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-semibold block leading-none bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              LUMIÈRE
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.26em] flex items-center gap-1 mt-1 ${
                isDark ? 'text-indigo-300/80' : 'text-indigo-700'
              }`}
            >
              <Home className="w-3 h-3" /> Haute Coiffure a Domicilio
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#servicios"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Carta de Servicios
          </a>
          <a
            href="#transformaciones"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Hidratación &amp; Galería
          </a>
          <a
            href="#estilista"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Estilista a Domicilio
          </a>
          <a
            href="#agenda"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Agenda Online
          </a>
        </nav>

        {/* Actions: Theme Switcher + My Bookings + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar modo de color"
            className={`px-3 py-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isDark
                ? 'bg-[#12121C] border-violet-800/60 text-indigo-200 hover:border-violet-500'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-indigo-300" />
                <span className="hidden sm:inline">Página Blanca</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-700" />
                <span className="hidden sm:inline">Página Oscura</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsBookingsModalOpen(true)}
            className={`px-3.5 py-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isDark
                ? 'bg-[#12121C] border-violet-800/60 text-[#F4F4F6] hover:border-violet-500'
                : 'bg-white border-indigo-200 text-slate-800 hover:bg-indigo-50'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-violet-400" />
            <span className="hidden lg:inline">Mis Turnos</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-violet-600 text-white font-bold">
              {bookings.length}
            </span>
          </button>

          <a
            href="#agenda"
            className="px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg shadow-violet-900/50 transition-all"
          >
            Reservar Ahora
          </a>
        </div>
      </div>
    </header>
  );
};

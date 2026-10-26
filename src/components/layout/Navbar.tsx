import React from 'react';
import { CalendarCheck, Home } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const Navbar: React.FC = () => {
  const {
    isDark,
    toggleTheme,
    bookings,
    setIsBookingsModalOpen
  } = useSalon();

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#08080C]/75 border-violet-900/40 text-[#F4F4F6]'
          : 'bg-white/75 border-indigo-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name (Click scrolls to top of page) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img
            src="/images/emblem-lumiere.jpg"
            alt="LUMIÈRE Emblem"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border border-violet-500/40 shadow-lg shadow-violet-950/60 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] font-semibold block leading-none bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              LUMIÈRE
            </span>
            <span
              className={`text-[9px] sm:text-[10px] uppercase tracking-[0.26em] flex items-center gap-1 mt-1 ${
                isDark ? 'text-indigo-300/80' : 'text-indigo-700'
              }`}
            >
              <Home className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Haute Coiffure a Domicilio
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a
            href="#servicios"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Servicios
          </a>
          <a
            href="#transformaciones"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Antes &amp; Después
          </a>
          <a
            href="#estilista"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Valentina
          </a>
          <a
            href="#testimonios"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Opiniones
          </a>
          <a
            href="#faq"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Preguntas
          </a>
          <a
            href="#agenda"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Agenda
          </a>
        </nav>

        {/* Actions: Theme Emoji Switcher + My Bookings + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar modo de color"
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className={`w-9 h-9 rounded-full border text-base flex items-center justify-center transition-all ${
              isDark
                ? 'bg-[#12121C]/80 border-violet-800/60 hover:border-violet-500 hover:bg-violet-950/40'
                : 'bg-indigo-50/80 border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setIsBookingsModalOpen(true)}
            className={`px-3.5 py-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isDark
                ? 'bg-[#12121C]/80 border-violet-800/60 text-[#F4F4F6] hover:border-violet-500'
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
            Reservar Cita
          </a>
        </div>
      </div>
    </header>
  );
};

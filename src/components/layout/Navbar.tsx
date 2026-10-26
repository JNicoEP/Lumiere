import React from 'react';
import { useSalon } from '../../context/SalonContext';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useSalon();

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
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-semibold block leading-none bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            LUMIÈRE
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
            href="#agenda"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Agenda
          </a>
          <a
            href="#faq"
            className="hover:text-violet-400 transition-colors tracking-wide"
          >
            Preguntas
          </a>
        </nav>

        {/* Actions: Custom Theme Switcher Button + Primary CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Alternar modo de color"
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="w-10 h-10 rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all border border-indigo-400/50 hover:border-indigo-300 shadow-md hover:shadow-indigo-500/30 flex items-center justify-center shrink-0 cursor-pointer p-0.5 bg-black/20 backdrop-blur-sm"
          >
            <img
              src="/images/theme-toggle.png"
              alt="Modo claro/oscuro"
              className={`w-full h-full object-contain rounded-full transition-transform duration-300 ${
                isDark ? 'hover:rotate-12' : 'hover:-rotate-12'
              }`}
            />
          </button>

          <a
            href="#agenda"
            className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg shadow-violet-900/50 transition-all"
          >
            Reservar Cita
          </a>
        </div>
      </div>
    </header>
  );
};

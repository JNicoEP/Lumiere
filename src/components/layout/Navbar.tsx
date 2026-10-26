import React, { useState } from 'react';
import { Menu, X, Scissors, Sparkles, User, Calendar, HelpCircle, MessageSquare } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { ThemeToggleLottie } from '../common/ThemeToggleLottie';

export const Navbar: React.FC = () => {
  const { isDark, bankInfo } = useSalon();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cleanPhone = (bankInfo.whatsappPhone || '+34 600 123 456').replace(/[^0-9]/g, '');

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#08080C]/80 border-violet-900/40 text-[#F4F4F6]'
          : 'bg-white/80 border-indigo-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
        >
          <img
            src="/images/emblem-lumiere.jpg"
            alt="LUMIÈRE Emblem"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl object-cover border border-violet-500/40 shadow-lg shadow-violet-950/60 group-hover:scale-105 transition-transform"
          />
          <span className="font-serif text-lg sm:text-2xl tracking-[0.25em] font-semibold block leading-none bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            LUMIÈRE
          </span>
        </a>

        {/* Desktop Navigation Links */}
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

        {/* Actions: Theme Toggle + CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <ThemeToggleLottie />

          <a
            href="#agenda"
            className="hidden sm:inline-flex px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg shadow-violet-900/50 transition-all"
          >
            Reservar Cita
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            className={`md:hidden p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#12121E] border-violet-800/60 text-slate-300 hover:text-white'
                : 'bg-indigo-50 border-indigo-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 py-5 space-y-4 shadow-2xl backdrop-blur-xl animate-fade-in ${
            isDark
              ? 'bg-[#0A0A12]/95 border-violet-900/60 text-[#F4F4F6]'
              : 'bg-white/95 border-indigo-200 text-slate-900'
          }`}
        >
          <nav className="flex flex-col space-y-2">
            <a
              href="#servicios"
              onClick={closeMenu}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                isDark ? 'hover:bg-violet-950/50 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'
              }`}
            >
              <Scissors className="w-4 h-4 text-violet-400" />
              <span>Menú de Servicios &amp; Tarifas</span>
            </a>

            <a
              href="#transformaciones"
              onClick={closeMenu}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                isDark ? 'hover:bg-violet-950/50 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Deslizador Antes &amp; Después</span>
            </a>

            <a
              href="#estilista"
              onClick={closeMenu}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                isDark ? 'hover:bg-violet-950/50 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'
              }`}
            >
              <User className="w-4 h-4 text-violet-400" />
              <span>Conoce a Valentina (Estilista)</span>
            </a>

            <a
              href="#agenda"
              onClick={closeMenu}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                isDark ? 'hover:bg-violet-950/50 text-violet-300 font-semibold' : 'hover:bg-indigo-50 text-indigo-700 font-semibold'
              }`}
            >
              <Calendar className="w-4 h-4 text-violet-400" />
              <span>Agenda tu Cita a Domicilio</span>
            </a>

            <a
              href="#faq"
              onClick={closeMenu}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                isDark ? 'hover:bg-violet-950/50 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-violet-400" />
              <span>Preguntas Frecuentes</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-violet-900/30 flex items-center justify-between gap-3">
            <a
              href={`https://wa.me/${cleanPhone}?text=Hola%20Valentina,%20tengo%20una%20consulta%20sobre%20los%20servicios%20a%20domicilio%20de%20Lumi%C3%A8re`}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

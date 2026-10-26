import React from 'react';
import { Lock } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';

export const Footer: React.FC = () => {
  const { isDark, setIsAdminModalOpen } = useSalon();

  return (
    <footer
      className={`border-t py-14 pb-28 md:pb-14 transition-colors ${
        isDark
          ? 'bg-[#06060A] border-violet-950 text-slate-400'
          : 'bg-indigo-950 text-indigo-100 border-indigo-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-violet-900/30">
          <div className="flex items-center gap-3.5">
            <img
              src="/images/emblem-lumiere.jpg"
              alt="LUMIÈRE Emblem"
              className="w-11 h-11 rounded-2xl object-cover border border-violet-500/40 shadow-md"
            />
            <div>
              <p className="font-serif text-xl font-semibold text-white tracking-[0.2em] leading-tight">
                LUMIÈRE
              </p>
              <p className="text-xs text-indigo-300">
                Alta Peluquería Privada a Domicilio — Estilista: {SOLE_STYLIST.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <a href="#servicios" className="hover:text-violet-400 transition-colors">Servicios</a>
            <a href="#transformaciones" className="hover:text-violet-400 transition-colors">Antes &amp; Después</a>
            <a href="#estilista" className="hover:text-violet-400 transition-colors">Valentina</a>
            <a href="#testimonios" className="hover:text-violet-400 transition-colors">Opiniones</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">Preguntas</a>
            <a href="#agenda" className="hover:text-violet-400 transition-colors font-semibold text-violet-300">Agenda Online</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} LUMIÈRE Haute Coiffure Privée. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Atención exclusiva en residencias privadas y hoteles</span>
            {/* Discreet Button for Stylist Admin */}
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              title="Acceso Gestor Estilista (PIN: 1234)"
              className="opacity-40 hover:opacity-100 transition-opacity px-2.5 py-1 rounded-md border border-violet-800/50 text-[11px] flex items-center gap-1 text-indigo-300"
            >
              <Lock className="w-3 h-3" /> π
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

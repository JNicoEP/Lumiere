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
              <div className="flex flex-wrap items-center gap-2.5 mt-1">
                <span className="text-xs text-indigo-300">
                  LUMIÈRE Alta Peluquería Privada a Domicilio — Estilista: {SOLE_STYLIST.name}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-violet-500/50 bg-violet-950/80 hover:bg-violet-900 text-violet-200 hover:text-white shadow-sm hover:border-violet-400 transition-all cursor-pointer"
                  title="Acceso Gestor Estilista (PIN: 1234)"
                >
                  <Lock className="w-3 h-3 text-violet-400" />
                  <span>Acceso Gestor</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <a href="#servicios" className="hover:text-violet-400 transition-colors">Servicios</a>
            <a href="#transformaciones" className="hover:text-violet-400 transition-colors">Antes &amp; Después</a>
            <a href="#estilista" className="hover:text-violet-400 transition-colors">Valentina</a>
            <a href="#agenda" className="hover:text-violet-400 transition-colors font-semibold text-violet-300">Agenda Online</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">Preguntas</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} LUMIÈRE Haute Coiffure Privée. Todos los derechos reservados.
          </p>

          <span className="text-slate-400 text-center sm:text-right">
            Atención exclusiva en residencias privadas, hoteles y suites nupciales.
          </span>
        </div>
      </div>
    </footer>
  );
};

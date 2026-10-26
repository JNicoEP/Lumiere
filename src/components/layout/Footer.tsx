import React from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';

export const Footer: React.FC = () => {
  const { isDark, setIsAdminModalOpen } = useSalon();

  return (
    <footer
      className={`border-t py-12 pb-24 md:pb-12 transition-colors ${
        isDark
          ? 'bg-[#06060A] border-violet-950 text-slate-400'
          : 'bg-indigo-950 text-indigo-100 border-indigo-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-white tracking-[0.2em]">
              LUMIÈRE
            </p>
            <p className="text-xs text-indigo-300">
              Alta Peluquería Privada a Domicilio — Estilista: {SOLE_STYLIST.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span>Peinados para Eventos • Cortes de Pelo • Hidratación</span>
          {/* Discreet Semi-Hidden Button for the Stylist Administrator */}
          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            title="Acceso Gestor Estilista (PIN: 1234)"
            className="opacity-35 hover:opacity-100 transition-opacity px-2.5 py-1 rounded-md border border-violet-800/50 text-[11px] flex items-center gap-1 text-indigo-300"
          >
            <Lock className="w-3 h-3" /> π
          </button>
        </div>
      </div>
    </footer>
  );
};

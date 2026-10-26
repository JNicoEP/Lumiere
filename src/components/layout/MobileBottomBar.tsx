import React from 'react';
import { useSalon } from '../../context/SalonContext';

export const MobileBottomBar: React.FC = () => {
  const { isDark, selectedServiceIds } = useSalon();

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-4 py-3 border-t backdrop-blur-xl flex items-center justify-between gap-3 ${
        isDark
          ? 'bg-[#08080C]/95 border-violet-900/50'
          : 'bg-white/95 border-indigo-200'
      }`}
    >
      <a
        href="#agenda"
        className="w-full py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] shadow-lg flex items-center justify-center gap-2"
      >
        <span>📅</span>
        Agendar Cita a Domicilio {selectedServiceIds.length > 0 ? `(${selectedServiceIds.length} serv.)` : ''}
      </a>
    </div>
  );
};

import React from 'react';
import { Sparkles, CalendarCheck } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const MobileBottomBar: React.FC = () => {
  const { isDark, selectedServiceIds, setIsBookingsModalOpen, bookings } = useSalon();

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-4 py-3 border-t backdrop-blur-xl flex items-center justify-between gap-3 ${
        isDark
          ? 'bg-[#08080C]/95 border-violet-900/50'
          : 'bg-white/95 border-indigo-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsBookingsModalOpen(true)}
        className="px-3.5 py-2.5 rounded-full border border-violet-700/60 text-xs font-semibold flex items-center gap-1.5"
      >
        <CalendarCheck className="w-4 h-4 text-violet-400" />
        Turnos ({bookings.length})
      </button>

      <a
        href="#agenda"
        className="flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] shadow-lg flex items-center justify-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Reservar a Domicilio ({selectedServiceIds.length})
      </a>
    </div>
  );
};

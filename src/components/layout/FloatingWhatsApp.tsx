import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const { bankInfo } = useSalon();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanPhone = (bankInfo.whatsappPhone || '+34 600 123 456').replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=Hola%20Valentina,%20tengo%20una%20consulta%20sobre%20los%20servicios%20a%20domicilio%20de%20Lumi%C3%A8re`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end gap-2 select-none">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 p-3 pl-3.5 pr-2.5 rounded-2xl bg-[#10101C]/95 border border-violet-600/40 shadow-2xl backdrop-blur-md text-xs text-white max-w-xs animate-bounce-short">
          <div className="relative shrink-0">
            <img
              src={SOLE_STYLIST.avatar}
              alt="Valentina"
              className="w-9 h-9 rounded-full object-cover border border-violet-400"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black ring-1 ring-emerald-300" />
          </div>
          <div className="flex-1 leading-tight">
            <span className="font-semibold block text-violet-300">¿Dudas con tu pelo?</span>
            <span className="text-[11px] text-slate-300">Escríbele directo a Valentina</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            title="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar a Valentina por WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/50 hover:scale-105 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};

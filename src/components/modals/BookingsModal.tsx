import React from 'react';
import { X, CalendarCheck, MapPin } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';
import { buildWhatsAppBookingUrl } from '../../utils/formatters';

export const BookingsModal: React.FC = () => {
  const { isDark, bookings, isBookingsModalOpen, setIsBookingsModalOpen } = useSalon();

  if (!isBookingsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div
        className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl ${
          isDark
            ? 'bg-[#10101A] border-violet-700/60 text-white'
            : 'bg-white border-indigo-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between border-b border-violet-900/40 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <CalendarCheck className="w-5 h-5 text-violet-400" />
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Mis Citas a Domicilio Agendadas
            </h3>
          </div>
          <button
            onClick={() => setIsBookingsModalOpen(false)}
            className="p-2 rounded-full hover:bg-violet-900/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-slate-400">
              Aún no tienes turnos registrados en este navegador.
            </p>
            <a
              href="#agenda"
              onClick={() => setIsBookingsModalOpen(false)}
              className="inline-block px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-600 text-white"
            >
              Agendar mi Primera Cita
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#08080C] border-violet-900/50' : 'bg-indigo-50/50 border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-400">
                    Turno #{b.id} — {b.date} ({b.time} hs)
                  </span>
                  <span className="text-xs font-bold">${b.finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" /> {b.clientAddress}
                </p>
                <p className="text-xs text-slate-400">
                  {b.services.map((s) => s.name).join(' + ')}
                </p>
                <div className="pt-2">
                  <a
                    href={buildWhatsAppBookingUrl(b, SOLE_STYLIST.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[11px] font-bold uppercase tracking-wider text-violet-400 hover:underline"
                  >
                    Reenviar confirmación por WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

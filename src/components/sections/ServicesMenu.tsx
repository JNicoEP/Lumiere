import React, { useState } from 'react';
import { Clock, Check, Plus, Scissors, Home } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types/salon.types';
import { CATEGORY_LABELS } from '../../data/initialData';

export const ServicesMenu: React.FC = () => {
  const {
    isDark,
    services,
    selectedServiceIds,
    toggleSelectService,
    clearSelectedServices,
    setBookingStep
  } = useSalon();
  const [activeFilter, setActiveFilter] = useState<'todos' | ServiceCategory>('todos');

  const filteredServices =
    activeFilter === 'todos'
      ? services
      : services.filter((item) => item.category === activeFilter);

  const categories: ('todos' | ServiceCategory)[] = [
    'todos',
    'peinados',
    'cortes',
    'hidratacion'
  ];

  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));
  const subtotal = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0);

  return (
    <section id="servicios" className="py-16 sm:py-20 border-b border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Scissors className="w-3.5 h-3.5" /> Carta Exclusiva a Domicilio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            Menú de Servicios &amp; Tarifas Transparentes
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Selecciona uno o más rituales de <strong>Peinados para Eventos</strong>,{' '}
            <strong>Cortes de Pelo</strong> o <strong>Hidratación Profunda</strong>. Todos los
            servicios que elijas se reflejarán automáticamente en tu agenda para apartar tu cita.
          </p>
        </div>

        {/* Category Tabs - Swipeable on mobile */}
        <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar mb-8 sm:mb-12">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all border shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] text-white border-violet-500 shadow-lg shadow-violet-900/40'
                    : isDark
                    ? 'bg-[#10101A] text-slate-300 border-violet-900/50 hover:border-violet-600'
                    : 'bg-white text-slate-700 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                onClick={() => toggleSelectService(service.id)}
                className={`group cursor-pointer rounded-2xl p-4 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-b from-[#19152E] to-[#11111C] border-violet-500 ring-1 ring-violet-500/50 shadow-xl shadow-violet-950/50'
                      : 'bg-indigo-50/70 border-violet-600 ring-1 ring-violet-500 shadow-lg'
                    : isDark
                    ? 'bg-[#101018] border-violet-900/40 hover:border-violet-700/70'
                    : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
                        isDark
                          ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-800/60'
                          : 'bg-indigo-100 text-indigo-900'
                      }`}
                    >
                      {CATEGORY_LABELS[service.category]}
                    </span>

                    {service.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug group-hover:text-violet-400 transition-colors">
                      {service.name}
                    </h3>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-violet-400 shrink-0">
                      ${service.price}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-[#C8C8D8]' : 'text-slate-600'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-violet-900/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-indigo-300/90">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      {service.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-violet-400" />A domicilio
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectService(service.id);
                    }}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50'
                        : isDark
                        ? 'bg-[#181826] text-indigo-200 group-hover:bg-violet-700 group-hover:text-white'
                        : 'bg-indigo-100 text-indigo-900 group-hover:bg-violet-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> En tu Agenda
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Seleccionar
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Floating Summary Bar inside section */}
        {selectedServiceIds.length > 0 && (
          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl border border-violet-500/50 bg-gradient-to-r from-[#141126] via-[#1D163B] to-[#141126] text-white shadow-2xl">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-violet-400 font-bold block">
                ✓ Reflejado en tu Agenda a Domicilio
              </span>
              <p className="text-sm sm:text-lg font-serif font-semibold">
                {selectedServices.map((s) => s.name).join(' + ')}
              </p>
              <p className="text-xs text-indigo-200">
                Total: <strong>${subtotal}</strong> • Duración estimada: <strong>{totalDuration} min</strong> • Traslado incluido
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={clearSelectedServices}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white border border-violet-900/80 hover:border-violet-700 transition-colors"
              >
                Limpiar selección
              </button>
              <a
                href="#agenda"
                onClick={() => setBookingStep(2)}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] text-white shadow-lg shadow-violet-900/50 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Continuar a Fecha y Hora en la Agenda</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

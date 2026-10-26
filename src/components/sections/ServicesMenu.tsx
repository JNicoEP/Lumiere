import React, { useState } from 'react';
import { Clock, Check, Plus, Scissors, Home } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types/salon.types';
import { CATEGORY_LABELS } from '../../data/initialData';

export const ServicesMenu: React.FC = () => {
  const { isDark, services, selectedServiceIds, toggleSelectService } = useSalon();
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

  return (
    <section id="servicios" className="py-20 border-b border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Scissors className="w-3.5 h-3.5" /> Carta Exclusiva a Domicilio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            Menú de Servicios &amp; Tarifas Transparentes
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Selecciona uno o más rituales de <strong>Peinados para Eventos</strong>,{' '}
            <strong>Cortes de Pelo</strong> o <strong>Hidratación Profunda</strong>. Todos los
            servicios incluyen traslado y equipamiento profesional en tu domicilio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all border ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <div
                key={service.id}
                onClick={() => toggleSelectService(service.id)}
                className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-b from-[#19152E] to-[#11111C] border-violet-500 ring-1 ring-violet-500/50 shadow-xl shadow-violet-950/50'
                      : 'bg-indigo-50/70 border-violet-600 ring-1 ring-violet-500 shadow-lg'
                    : isDark
                    ? 'bg-[#101018] border-violet-900/40 hover:border-violet-700/70'
                    : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <div className="space-y-4">
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

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl font-semibold leading-snug group-hover:text-violet-400 transition-colors">
                      {service.name}
                    </h3>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-violet-400 shrink-0">
                      ${service.price}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? 'text-[#C8C8D8]' : 'text-slate-600'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-violet-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-indigo-300/90">
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50'
                        : isDark
                        ? 'bg-[#181826] text-indigo-200 group-hover:bg-violet-700 group-hover:text-white'
                        : 'bg-indigo-100 text-indigo-900 group-hover:bg-violet-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> En tu Cita
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
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-violet-600/50 bg-gradient-to-r from-[#141126] via-[#1D163B] to-[#141126] text-white shadow-xl">
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">
                Selección activa para tu cita a domicilio
              </p>
              <p className="text-sm sm:text-base font-medium">
                Has seleccionado <strong>{selectedServiceIds.length}</strong> servicio(s) para tu
                visita privada.
              </p>
            </div>
            <a
              href="#agenda"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-600 hover:bg-violet-500 text-white shadow-lg transition-all"
            >
              Continuar a Fecha y Hora →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { Award, CheckCircle2, Home, Shield } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';

export const StylistSection: React.FC = () => {
  const { isDark } = useSalon();

  return (
    <section id="estilista" className="py-20 border-b border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait of the Single Master Stylist */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-3xl overflow-hidden border p-3 ${
                isDark
                  ? 'bg-[#10101A] border-violet-800/50'
                  : 'bg-white border-indigo-200 shadow-lg'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={SOLE_STYLIST.avatar}
                  alt={SOLE_STYLIST.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-600 text-white">
                    Única Estilista Principal
                  </span>
                  <h3 className="font-serif text-3xl font-semibold mt-2">{SOLE_STYLIST.name}</h3>
                  <p className="text-xs text-indigo-200">{SOLE_STYLIST.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & At-Home Protocol */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
              <Award className="w-4 h-4" /> Atención Personalizada 1 a 1
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              Conoce a tu Estilista Exclusiva a Domicilio
            </h2>

            <p className={`text-base leading-relaxed ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
              {SOLE_STYLIST.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#101018] border-violet-900/50' : 'bg-indigo-50/60 border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm mb-1">
                  <Award className="w-4 h-4" /> Especialidad Triple
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {SOLE_STYLIST.specialty}
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#101018] border-violet-900/50' : 'bg-indigo-50/60 border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm mb-1">
                  <Shield className="w-4 h-4" /> Higiene &amp; Maletín VIP
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Herramientas esterilizadas, vaporizador de ozono portátil y cosmética de autor.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                Protocolo de Servicio a Domicilio:
              </p>
              {SOLE_STYLIST.coverageZones.map((zone) => (
                <div key={zone} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{zone}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#agenda"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg shadow-violet-900/40 transition-all"
              >
                <Home className="w-4 h-4" /> Reservar Visita de {SOLE_STYLIST.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

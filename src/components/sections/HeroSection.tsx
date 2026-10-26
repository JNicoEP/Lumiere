import React from 'react';
import { Sparkles, MapPin, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SOLE_STYLIST } from '../../data/initialData';

export const HeroSection: React.FC = () => {
  const { isDark, promo } = useSalon();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-violet-900/30">
      {/* Subtle Blue-Purple Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-900/25 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 w-[28rem] h-[28rem] rounded-full bg-violet-800/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Persuasive Copywriting */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.2em] font-semibold ${
                isDark
                  ? 'bg-[#12121E] border-violet-700/50 text-indigo-300'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-violet-400" />
              Exclusivo Servicio Privado a Domicilio
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-tight">
              La excelencia de la alta peluquería,{' '}
              <span className="italic bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                en la intimidad de tu hogar.
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-[#C8C8D8]' : 'text-slate-600'
              }`}
            >
              Transformamos tu salón privado o suite de hotel en un atelier de lujo.
              Especialistas en <strong>Peinados de Gala para Eventos</strong>,{' '}
              <strong>Cortes de Autor con Visagismo</strong> y{' '}
              <strong>Rituales de Hidratación Profunda</strong> con efecto espejo inmediato,
              sin traslados ni esperas.
            </p>

            {/* Active Promo Banner if enabled by Stylist in CMS */}
            {promo.active && promo.code && (
              <div
                className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                  isDark
                    ? 'bg-gradient-to-r from-indigo-950/70 via-violet-950/60 to-indigo-950/70 border-violet-700/50'
                    : 'bg-indigo-50/90 border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold tracking-widest uppercase">
                    -{promo.discountPercent}% OFF
                  </span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold block">
                      {promo.description || 'Beneficio Especial a Domicilio'}
                    </span>
                    <span className={isDark ? 'text-indigo-200/80' : 'text-indigo-800'}>
                      Usa la palabra clave{' '}
                      <code className="font-mono font-bold underline">{promo.code}</code> en el
                      Paso 3 de tu reserva.
                    </span>
                  </div>
                </div>
                <a
                  href="#agenda"
                  className="text-xs font-semibold uppercase tracking-wider text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  Aplicar ahora <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#agenda"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-xl shadow-violet-900/50 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Agendar Cita a Domicilio
              </a>
              <a
                href="#servicios"
                className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold uppercase tracking-widest border transition-all ${
                  isDark
                    ? 'border-violet-800/70 bg-[#12121C] text-[#F4F4F6] hover:border-violet-500'
                    : 'border-indigo-200 bg-white text-slate-800 hover:bg-indigo-50'
                }`}
              >
                Explorar Menú &amp; Precios
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-violet-900/30">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">1 Sola Estilista</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Atención 100% personalizada por {SOLE_STYLIST.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Puntualidad VIP</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Equipamiento completo en tu domicilio u hotel
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Alta Cosmética</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Fórmulas de seda, caviar y ácido hialurónico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div
              className={`relative rounded-3xl overflow-hidden border p-3 shadow-2xl ${
                isDark
                  ? 'bg-[#10101A] border-violet-800/50 shadow-violet-950/50'
                  : 'bg-white border-indigo-200 shadow-indigo-200/60'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=85"
                  alt="Cabello hidratado y peinado de alta costura a domicilio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/30 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#08080C]/85 text-indigo-200 border border-violet-700/50 backdrop-blur-md">
                    Haute Coiffure Mobile
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white">
                    ★ 5.0
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <p className="text-xs uppercase tracking-[0.22em] text-indigo-300">
                    Especialidad de la Casa
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Peinados de Gala, Cortes de Autor &amp; Hidratación Espejo
                  </h2>
                  <p className="text-xs text-slate-300">
                    Atención exclusiva a domicilio por {SOLE_STYLIST.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Droplets, CheckCircle2, Eye, ShieldCheck, Scissors, Calendar } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { GALLERY_ITEMS } from '../../data/initialData';

interface TransformationCase {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  afterImage: string;
  beforeImage: string;
  beforeLabel: string;
  afterLabel: string;
  results: { label: string; value: string }[];
  diagnosis: string;
}

const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: 'case-hidratacion',
    tabLabel: '1. Hidratación',
    title: 'Tratamiento de Hidratación Profunda & Seda',
    subtitle: 'Misma pose y ángulo: a la izquierda el cabello reseco, deshidratado y con frizz natural; a la derecha la transformación con nutrición profunda y textura líquida.',
    badge: 'Hidratación Profunda',
    beforeImage: '/images/transformations/hidratacion-before.jpg',
    afterImage: '/images/transformations/hidratacion-after.jpg',
    beforeLabel: 'Antes: Cabello Seco y Maltratado',
    afterLabel: 'Después: Hidratación Profunda',
    results: [
      { label: 'Nutrición Capilar', value: '100% Restaurado' },
      { label: 'Control de Frizz', value: 'Sin Enredos' },
      { label: 'Cutícula Sellada', value: 'Suavidad Seda' }
    ],
    diagnosis: 'Diagnóstico previo y aplicación de mascarilla termolipídica con ácido hialurónico y vaporizador ozonizado portátil a domicilio.'
  },
  {
    id: 'case-corte',
    tabLabel: '2. Corte de Pelo',
    title: 'Corte de Autor & Visagismo de Precisión',
    subtitle: 'Misma pose y ángulo: a la izquierda melena sin forma con puntas abiertas; a la derecha corte estructurado en capas con visagismo y contornos limpios.',
    badge: 'Corte de Autor',
    beforeImage: '/images/transformations/corte-before.jpg',
    afterImage: '/images/transformations/corte-after.jpg',
    beforeLabel: 'Antes: Melena Sin Forma',
    afterLabel: 'Después: Corte Estructurado',
    results: [
      { label: 'Visagismo', value: 'A Medida' },
      { label: 'Puntas Saneadas', value: '100% Cierre' },
      { label: 'Movimiento Natural', value: 'Ligero y Fluido' }
    ],
    diagnosis: 'Estudio de la morfología del rostro y corte milimétrico en seco y húmedo con tijeras de precisión en tu propio domicilio.'
  },
  {
    id: 'case-rizos',
    tabLabel: '3. Rizos & Definición',
    title: 'Nutrición Hidrolipídica & Definición de Rizos',
    subtitle: 'Misma pose y ángulo: a la izquierda rizos esponjados sin definición; a la derecha rizos nutridos desde el interior con elasticidad y rebote.',
    badge: 'Rizos & Ondas',
    beforeImage: '/images/transformations/rizos-before.jpg',
    afterImage: '/images/transformations/rizos-after.jpg',
    beforeLabel: 'Antes: Rizo Rebelde & Con Frizz',
    afterLabel: 'Después: Rizo Definido & Nutrito',
    results: [
      { label: 'Definición de Rizo', value: 'Rebote Natural' },
      { label: 'Retención de Humedad', value: 'Hasta 72h' },
      { label: 'Tacto Capilar', value: 'Aterciopelado' }
    ],
    diagnosis: 'Lavado botánico con ampolla concentrada, activación de bucles mechón a mechón y secado con difusor iónico profesional.'
  }
];

export const HydrationGallery: React.FC = () => {
  const { isDark } = useSalon();
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = TRANSFORMATION_CASES[activeCaseIndex];

  // Precise pointer calculation for smooth dragging
  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = clientX - rect.left;
      const percent = Math.min(Math.max((rawX / rect.width) * 100, 2), 98);
      setSliderPos(percent);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handlePointerMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUpdate = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handlePointerMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section id="transformaciones" className="py-16 sm:py-24 lg:py-28 border-b border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Droplets className="w-3.5 h-3.5" /> Evidencia Visual &amp; Portafolio de Resultados
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight">
            Deslizador de Transformación Antes y Después
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Compara el estado del cabello antes del servicio frente a los resultados reales obtenidos tras el tratamiento en la misma pose y ángulo.
          </p>

          {/* Treatment Case Switcher Tabs - Swipeable on mobile */}
          <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {TRANSFORMATION_CASES.map((tc, idx) => (
              <button
                key={tc.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPos(50);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 ${
                  activeCaseIndex === idx
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-2 ring-violet-400/50'
                    : isDark
                    ? 'bg-[#12121E] text-slate-300 hover:bg-[#1A1A2E] border border-violet-900/40'
                    : 'bg-indigo-50 text-slate-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                {tc.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before / After Comparator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerUpdate}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative rounded-3xl overflow-hidden border select-none shadow-2xl touch-none cursor-ew-resize group ${
                isDark ? 'border-violet-700/60 bg-[#0A0A10]' : 'border-indigo-200 bg-white'
              }`}
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                {/* AFTER LAYER (FULL CONTAINER BASE - REAL PHOTOGRAPH) */}
                <img
                  src={activeCase.afterImage}
                  alt={activeCase.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                {/* BEFORE LAYER (CLIPPED PHOTO - REAL PHOTOGRAPH) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                  }}
                >
                  <img
                    src={activeCase.beforeImage}
                    alt={activeCase.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>

                {/* DIVIDER LINE WITH GLOW & CENTER HANDLE */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_16px_rgba(168,85,247,0.95)] pointer-events-none z-20"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Floating Percentage Badge */}
                  <div className="absolute -top-1 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-900/90 text-violet-200 border border-violet-500/40 backdrop-blur-md shadow-md">
                    {Math.round(sliderPos)}%
                  </div>

                  {/* Center Drag Handle - Responsive size */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-violet-500/30 group-hover:scale-110 transition-transform">
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                {/* TOP CORNER LABELS - Responsive labels that don't collide on mobile */}
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-black/85 text-amber-200 border border-amber-500/30 backdrop-blur-md shadow-lg flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400" />
                  <span className="hidden sm:inline">{activeCase.beforeLabel}</span>
                  <span className="sm:hidden">Antes</span>
                </div>
                <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-violet-900/90 text-violet-100 border border-violet-400/50 backdrop-blur-md shadow-lg flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-violet-300" />
                  <span className="hidden sm:inline">{activeCase.afterLabel}</span>
                  <span className="sm:hidden">Después</span>
                </div>

                {/* BOTTOM FLOATING HINT */}
                <div className="absolute bottom-2.5 sm:bottom-3 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
                  <div className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold text-slate-300 bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-center">
                    <SlidersHorizontal className="w-3 h-3 text-violet-400 shrink-0" />
                    <span>Desliza a los lados para comparar</span>
                  </div>
                </div>

                {/* Accessible Range Input */}
                <input
                  type="range"
                  min={2}
                  max={98}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Comparador de cabello antes y después"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                />
              </div>
            </div>

            {/* Quick Preset Buttons for Instant Inspection */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs px-2 text-slate-400">
              <button
                type="button"
                onClick={() => setSliderPos(95)}
                className="hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> 100% Antes
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className="hover:text-violet-300 transition-colors font-semibold text-violet-400"
              >
                Comparar 50/50
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(5)}
                className="hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                100% Después
              </button>
            </div>
          </div>

          {/* Technical Diagnosis & Results Card */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-5 sm:p-8 rounded-3xl border space-y-4 sm:space-y-5 transition-all ${
                isDark
                  ? 'bg-[#10101A] border-violet-900/50 shadow-xl shadow-black/40'
                  : 'bg-white border-indigo-200 shadow-xl'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-violet-600/20 text-violet-300 border border-violet-500/30">
                  {activeCase.badge}
                </span>
                <span className="text-[11px] text-violet-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Garantía de Satisfacción
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                {activeCase.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
                {activeCase.subtitle}
              </p>

              <div
                className={`p-3.5 sm:p-4 rounded-2xl border text-xs leading-relaxed ${
                  isDark
                    ? 'bg-[#090910] border-violet-950/80 text-slate-300'
                    : 'bg-indigo-50/60 border-indigo-100 text-slate-700'
                }`}
              >
                <strong className="text-violet-400 block mb-1">Procedimiento en tu Domicilio:</strong>
                {activeCase.diagnosis}
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {activeCase.results.map((res, i) => (
                  <div
                    key={i}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center ${
                      isDark
                        ? 'bg-[#141424] border-violet-900/40'
                        : 'bg-slate-50 border-indigo-100'
                    }`}
                  >
                    <div className="text-[10px] sm:text-[11px] font-bold text-violet-400 truncate">{res.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight mt-0.5">{res.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Equipo esterilizado y maletín profesional en tu residencia</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cuidado de toallas, secado anti-fricción y sin dejar residuos</span>
                </div>
              </div>

              <a
                href="#agenda"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg shadow-violet-700/30 transition-all text-center"
              >
                <Calendar className="w-4 h-4" /> Agendar este Servicio a Domicilio
              </a>
            </div>
          </div>
        </div>

        {/* 6 Visual Cards showcasing Diverse Portfolio */}
        <div className="space-y-4 sm:space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
            <h3 className="font-serif text-2xl font-semibold">
              Servicios Destacados de Portafolio
            </h3>
            <span className="text-xs uppercase tracking-wider text-violet-400 font-semibold flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" /> 6 Trabajos Exclusivos en Residencias
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#101018] border-violet-900/40 hover:border-violet-600/70 shadow-lg hover:shadow-violet-900/20'
                    : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md hover:shadow-xl'
                }`}
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#08080C]/80 text-indigo-300 border border-violet-700/50 backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-violet-700/90 text-white backdrop-blur-md shadow">
                    {item.badgeText}
                  </span>
                </div>
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider">
                    {item.durationLabel}
                  </div>
                  <h4 className="font-serif text-xl font-semibold leading-tight">{item.title}</h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

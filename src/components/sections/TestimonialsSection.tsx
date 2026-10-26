import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Camila Rodríguez',
    location: 'Suite Nupcial — Hotel Alvear Palace',
    service: 'Recogido Editorial Nupcial & Tocado',
    comment: 'Valentina transformó la suite en un verdadero atelier de alta costura. El peinado resistió más de 12 horas intacto sin un solo pelo fuera de lugar. Su puntualidad y serenidad antes de la ceremonia fueron impagables.',
    rating: 5,
    date: 'Hace 2 semanas'
  },
  {
    id: 'test-2',
    name: 'Sofía Montalbán',
    location: 'Residencia Privada — Recoleta',
    service: 'Ritual Criogénico de Hidratación & Brillo',
    comment: 'Tenía el cabello totalmente reseco por las decoloraciones. En 60 minutos en el living de mi casa, con su vaporizador y toallas térmicas, el cabello quedó con un brillo espejo que jamás había logrado en ningún salón tradicional.',
    rating: 5,
    date: 'Hace 3 semanas'
  },
  {
    id: 'test-3',
    name: 'Martina Benítez',
    location: 'Departamento Privado — Palermo Chico',
    service: 'Corte French Bob & Visagismo',
    comment: 'Increíble precisión. Estudió mis facciones antes de hacer el primer corte. Cortó en seco y húmedo con tijeras japonesas. El resultado tiene un movimiento natural hermoso y no dejó ni un solo residuo en mi casa.',
    rating: 5,
    date: 'Hace 1 mes'
  },
  {
    id: 'test-4',
    name: 'Lucía Valenzuela',
    location: 'Residencia en Belgrano',
    service: 'Método Curly & Definición de Rizos',
    comment: 'Tengo rulos rebeldes y siempre me daba miedo que me cortaran o peinaran. Valentina entendió a la perfección la caída del rizo, usó difusor profesional y mis rulos quedaron armados, suaves y sin frizz.',
    rating: 5,
    date: 'Hace 1 mes'
  }
];

export const TestimonialsSection: React.FC = () => {
  const { isDark } = useSalon();

  return (
    <section id="testimonios" className="py-20 sm:py-28 border-b border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-violet-400 text-violet-400" /> Experiencias Reales a Domicilio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight">
            Lo que dicen nuestras clientas
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Más de 190 citas privadas atendidas en residencias y hoteles con calificación perfecta de 5.0 estrellas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:-translate-y-1 duration-300 ${
                isDark
                  ? 'bg-[#101018] border-violet-900/40 hover:border-violet-600/60 shadow-lg'
                  : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed italic ${isDark ? 'text-[#D5D5E5]' : 'text-slate-700'}`}>
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-violet-900/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="text-[10px] text-slate-500">{t.date}</span>
                </div>
                <div className="text-[11px] text-violet-400 font-medium">{t.service}</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

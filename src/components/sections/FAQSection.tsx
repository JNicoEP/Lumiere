import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: '¿Qué necesito tener preparado en mi casa antes de la llegada de Valentina?',
    a: 'Únicamente una silla cómoda cercana a un enchufe de corriente y buena iluminación o luz natural. Valentina traslada todo el equipamiento profesional: lavacabezas portátil con protector ergonómico, vaporizador de ozono, toallas desechables de bambú estériles, herramientas térmicas con control iónico y paños de piso protectores para no dejar un solo rastro en tu hogar.'
  },
  {
    q: '¿Cómo funciona la seña del 30% para confirmar el turno?',
    a: 'Al completar tu solicitud en la web, el sistema aparta tu fecha y horario en la agenda privada de Valentina. Para confirmar de forma definitiva se abona la seña del 30% mediante transferencia bancaria o Mercado Pago. El 70% restante se paga en tu domicilio al finalizar el servicio en efectivo o transferencia.'
  },
  {
    q: '¿Qué sucede si necesito reprogramar o surge un imprevisto?',
    a: 'Puedes reprogramar tu turno sin penalización con al menos 24 horas de anticipación comunicándote por WhatsApp con Valentina. Tu seña del 30% quedará acreditada a favor para la nueva fecha acordada.'
  },
  {
    q: '¿Atiende en hoteles, suites nupciales o quintas de eventos?',
    a: 'Sí, Valentina es especialista en preparación nupcial y eventos de gala en suites de hotel (Hoteles Alvear, Faena, Four Seasons, etc.) y residencias privadas. Se coordina el acceso previamente en recepción para una llegada puntual y discreta.'
  },
  {
    q: '¿Qué productos y marcas de cosmética utiliza?',
    a: 'Exclusivamente fórmulas de alta gama libres de sulfatos y parabenos enriquecidas con ácido hialurónico molecular, aminoácidos de seda pura y aceites botánicos de primera línea para garantizar resultados óptimos sin agredir la fibra capilar.'
  }
];

export const FAQSection: React.FC = () => {
  const { isDark } = useSalon();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 border-b border-violet-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <HelpCircle className="w-3.5 h-3.5" /> Todo lo que necesitas saber
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Respuestas claras sobre el protocolo de atención privada a domicilio y la reserva de citas.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDark
                    ? isOpen
                      ? 'bg-[#12121E] border-violet-700/60'
                      : 'bg-[#0A0A12] border-violet-950/80 hover:border-violet-800/60'
                    : isOpen
                    ? 'bg-indigo-50/90 border-indigo-300 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span
                    className={`font-serif text-lg sm:text-xl font-semibold transition-colors ${
                      isDark ? 'text-violet-200' : 'text-slate-900'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-violet-600 text-white'
                        : isDark
                        ? 'bg-violet-950/80 text-violet-400'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-5 sm:px-6 pb-6 pt-3 text-xs sm:text-sm leading-relaxed border-t transition-colors ${
                      isDark
                        ? 'text-slate-300 border-violet-900/30'
                        : 'text-slate-700 border-indigo-100'
                    }`}
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
            isDark
              ? 'bg-[#0E0E18] border-violet-900/50'
              : 'bg-white border-indigo-200 shadow-sm'
          }`}
        >
          <div className="text-center sm:text-left">
            <h4
              className={`font-serif text-lg font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              ¿Tienes una consulta específica sobre tu cabello?
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Puedes escribirle a Valentina por WhatsApp y enviarle una foto de referencia.
            </p>
          </div>
          <a
            href="https://wa.me/34600123456?text=Hola%20Valentina,%20tengo%20una%20consulta%20sobre%20un%20servicio%20a%20domicilio%20de%20Lumi%C3%A8re"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white shrink-0 shadow-md flex items-center gap-1.5 transition-all"
          >
            <span>💬</span> Consultar a Valentina
          </a>
        </div>
      </div>
    </section>
  );
};

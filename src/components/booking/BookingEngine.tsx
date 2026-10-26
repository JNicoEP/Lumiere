import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Tag,
  User,
  Phone,
  CreditCard,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { AVAILABLE_TIME_SLOTS, SOLE_STYLIST, CATEGORY_LABELS } from '../../data/initialData';
import { getNextAvailableDays, buildWhatsAppBookingUrl } from '../../utils/formatters';
import { BookingRecord } from '../../types/salon.types';

export const BookingEngine: React.FC = () => {
  const {
    isDark,
    services,
    selectedServiceIds,
    toggleSelectService,
    promo,
    addBooking,
    bankInfo,
    bookingStep: step,
    setBookingStep: setStep
  } = useSalon();

  const availableDays = useMemo(() => getNextAvailableDays(7), []);
  const [selectedDate, setSelectedDate] = useState<string>(availableDays[0]?.iso || '');
  const [selectedTime, setSelectedTime] = useState<string>('11:00');

  // Client Details (At-home service)
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);

  // Promo Code State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(
    null
  );

  // Confirmed Booking State
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const selectedServices = useMemo(
    () => services.filter((s) => selectedServiceIds.includes(s.id)),
    [services, selectedServiceIds]
  );

  const totalDuration = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.duration, 0),
    [selectedServices]
  );

  const subtotal = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.price, 0),
    [selectedServices]
  );

  // Calculate custom stylist promo discount if applied and active
  const promoDiscountAmount = useMemo(() => {
    if (
      appliedCoupon &&
      promo.active &&
      appliedCoupon.toUpperCase() === promo.code.toUpperCase()
    ) {
      return Number(((subtotal * promo.discountPercent) / 100).toFixed(2));
    }
    return 0;
  }, [appliedCoupon, promo, subtotal]);

  // Clean and exact 30% deposit calculation
  const finalTotal = Math.max(0, Number((subtotal - promoDiscountAmount).toFixed(2)));
  const depositAmount = Number((finalTotal * 0.3).toFixed(2));
  const amountPaidNow = depositAmount;
  const pendingBalance = Math.max(0, Number((finalTotal - depositAmount).toFixed(2)));

  const handleCopyAlias = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(bankInfo.alias);
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    }
  };

  const handleApplyCoupon = () => {
    const clean = couponInput.trim().toUpperCase();
    if (!clean) {
      setCouponFeedback({ type: 'err', msg: 'Ingresa una palabra de descuento.' });
      return;
    }
    if (promo.active && clean === promo.code.toUpperCase()) {
      setAppliedCoupon(clean);
      setCouponFeedback({
        type: 'ok',
        msg: `¡Descuento de ${promo.discountPercent}% aplicado con éxito!`
      });
    } else {
      setAppliedCoupon(null);
      setCouponFeedback({
        type: 'err',
        msg: 'La palabra ingresada no coincide con ninguna promoción activa.'
      });
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    if (!clientName.trim() || !clientPhone.trim() || !clientAddress.trim()) return;

    const newRecord: BookingRecord = {
      id: `AV-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientAddress: clientAddress.trim(),
      clientNotes: clientNotes.trim(),
      paymentMode: 'deposit',
      subtotal,
      promoCodeApplied: promoDiscountAmount > 0 ? promo.code : null,
      promoDiscountAmount,
      vipDiscountAmount: 0,
      finalTotal,
      amountPaidNow,
      pendingBalance
    };

    addBooking(newRecord);
    setConfirmedBooking(newRecord);
  };

  return (
    <section id="agenda" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Reserva Online en 3 Pasos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            Agenda tu Cita Privada a Domicilio
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Sincronización en tiempo real con la agenda de <strong>{SOLE_STYLIST.name}</strong>.
            Los servicios que elijas se actualizan automáticamente en cada paso.
          </p>
        </div>

        {/* Confirmed Ticket View */}
        {confirmedBooking ? (
          <div
            className={`max-w-2xl mx-auto rounded-3xl p-8 border shadow-2xl space-y-6 ${
              isDark
                ? 'bg-[#10101A] border-violet-500/60'
                : 'bg-white border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-600 text-white">
                Turno Solicitado #{confirmedBooking.id}
              </span>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="font-serif text-3xl font-semibold">
              ¡Tu cita a domicilio está reservada, {confirmedBooking.clientName}!
            </h3>

            <div
              className={`p-6 rounded-2xl border space-y-3 text-sm ${
                isDark ? 'bg-[#08080C] border-violet-900/50' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <p>
                <strong>Estilista:</strong> {SOLE_STYLIST.name}
              </p>
              <p>
                <strong>Fecha y Hora:</strong> {confirmedBooking.date} a las{' '}
                {confirmedBooking.time} hs
              </p>
              <p>
                <strong>Dirección a Domicilio:</strong> {confirmedBooking.clientAddress}
              </p>
              <p>
                <strong>Servicios Seleccionados:</strong>{' '}
                {confirmedBooking.services.map((s) => s.name).join(', ')}
              </p>
              {confirmedBooking.promoCodeApplied && (
                <p className="text-violet-400 font-semibold">
                  <strong>Descuento Aplicado ({confirmedBooking.promoCodeApplied}):</strong> -$
                  {confirmedBooking.promoDiscountAmount.toFixed(2)}
                </p>
              )}

              {/* Exact Deposit Breakdown */}
              <div className="pt-3 border-t border-violet-900/40 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Costo Total de Servicios:</span>
                  <span className="font-semibold">${confirmedBooking.finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-violet-600/20 border border-violet-500/50 text-violet-200">
                  <span className="font-bold">Seña requerida para confirmar (30%):</span>
                  <span className="text-lg font-bold text-violet-300">
                    ${confirmedBooking.amountPaidNow.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 px-1">
                  <span>Saldo a abonar en tu domicilio (70%):</span>
                  <span className="font-semibold text-slate-200">
                    ${confirmedBooking.pendingBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Bank Details Card in Confirmation */}
              <div
                className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-[#121220] border-violet-800/60' : 'bg-white border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-violet-400">
                  <span>Datos Bancarios para Transferir la Seña:</span>
                  <span className="text-[11px] text-slate-400">{bankInfo.banco}</span>
                </div>
                <p className="text-slate-300 text-[11px]"><strong>Titular:</strong> {bankInfo.titular}</p>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-violet-900/40">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Alias de transferencia:</span>
                    <code className="font-mono font-bold text-violet-300">{bankInfo.alias}</code>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAlias}
                    className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedAlias ? <><Check className="w-3 h-3 text-emerald-300" /> ¡Copiado!</> : <><Copy className="w-3 h-3" /> Copiar</>}
                  </button>
                </div>
                <p className="text-slate-400 text-[11px]"><strong>CBU / CVU:</strong> <span className="font-mono">{bankInfo.cbu}</span></p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={buildWhatsAppBookingUrl(confirmedBooking, SOLE_STYLIST.name)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Enviar Comprobante de Seña a Valentina por WhatsApp
              </a>

              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setStep(1);
                }}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Agendar otra cita
              </button>
            </div>
          </div>
        ) : (
          /* 3-Step Interactive Wizard */
          <div
            className={`rounded-3xl border p-6 sm:p-10 shadow-2xl ${
              isDark
                ? 'bg-[#10101A] border-violet-900/50 shadow-violet-950/30'
                : 'bg-white border-indigo-200 shadow-indigo-100'
            }`}
          >
            {/* Stepper Header */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-violet-900/30">
              {[
                { num: 1, short: '1. Servicios', full: '1. Servicios a Domicilio' },
                { num: 2, short: '2. Horario', full: '2. Día & Horario' },
                { num: 3, short: '3. Confirmar', full: '3. Domicilio & Seña (30%)' }
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    if (s.num === 2 && selectedServices.length > 0) setStep(2);
                    if (s.num === 3 && selectedServices.length > 0) setStep(3);
                  }}
                  className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all border text-center ${
                    step === s.num
                      ? 'bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] text-white border-violet-500 shadow-md'
                      : isDark
                      ? 'bg-[#08080C] text-slate-400 border-violet-900/40 hover:border-violet-700'
                      : 'bg-indigo-50/60 text-slate-600 border-indigo-200'
                  }`}
                >
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.full}</span>
                </button>
              ))}
            </div>

            {/* STEP 1: SELECT SERVICES */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Paso 1: Elige tus Servicios (Peinados, Cortes o Hidratación)
                  </h3>
                  <span className="text-xs text-violet-400 font-semibold">
                    Seleccionados: {selectedServices.length} ({totalDuration} min en total)
                  </span>
                </div>

                {/* Live Feedback Banner from Services Menu Selection */}
                {selectedServices.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/80 via-[#18132e] to-[#121220] border border-violet-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-violet-300 block">
                          Servicios reflejados en tu agenda ({selectedServices.length}):
                        </span>
                        <p className="text-sm font-medium text-white">
                          {selectedServices.map((s) => s.name).join(' + ')} —{' '}
                          <strong className="text-violet-300">${subtotal}</strong> ({totalDuration} min)
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white shadow-md transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>Avanzar a Día y Hora →</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-2xl border text-center text-xs ${
                      isDark
                        ? 'bg-[#08080C] border-violet-900/40 text-slate-400'
                        : 'bg-indigo-50/60 border-indigo-200 text-slate-600'
                    }`}
                  >
                    Selecciona a continuación los rituales que deseas para tu visita privada a domicilio (opcional: también puedes elegirlos desde el menú de servicios superior).
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => {
                    const active = selectedServiceIds.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleSelectService(srv.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          active
                            ? isDark
                              ? 'bg-[#19152E] border-violet-500 shadow-md ring-1 ring-violet-500/40'
                              : 'bg-indigo-50 border-violet-600 shadow-md ring-1 ring-violet-400'
                            : isDark
                            ? 'bg-[#08080C] border-violet-900/40 hover:border-violet-700'
                            : 'bg-white border-indigo-100 hover:border-indigo-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-violet-400 font-bold">
                            {CATEGORY_LABELS[srv.category] || srv.category}
                          </span>
                          <h4 className="font-serif text-xl font-semibold">{srv.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{srv.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-2xl font-bold text-violet-400 block">
                            ${srv.price}
                          </span>
                          <span className="text-[11px] text-slate-400">{srv.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] disabled:opacity-40 shadow-lg text-center"
                  >
                    {selectedServices.length === 0
                      ? 'Selecciona al menos 1 servicio para continuar'
                      : 'Siguiente: Elegir Día y Hora →'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE, TIME & SOLE STYLIST */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Selected Services Recap Pill */}
                {selectedServices.length > 0 && (
                  <div className="p-3.5 rounded-2xl border border-violet-800/60 bg-violet-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-violet-300">Servicios a domicilio:</span>
                      <span className="text-slate-200">{selectedServices.map((s) => s.name).join(' + ')}</span>
                      <span className="text-violet-400 font-bold">(${subtotal} • {totalDuration} min)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] text-violet-400 hover:underline font-semibold"
                    >
                      ← Modificar servicios
                    </button>
                  </div>
                )}

                {/* Stylist Profile Card */}
                <div
                  className={`p-4 rounded-2xl border flex items-center gap-4 ${
                    isDark
                      ? 'bg-[#08080C] border-violet-800/60'
                      : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <img
                    src={SOLE_STYLIST.avatar}
                    alt={SOLE_STYLIST.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-violet-500"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-violet-400 font-bold">
                      Estilista Asignada para tu Visita a Domicilio
                    </span>
                    <h4 className="font-serif text-2xl font-semibold">{SOLE_STYLIST.name}</h4>
                    <p className="text-xs text-slate-400">{SOLE_STYLIST.specialty}</p>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 block">
                      Selecciona el Día de tu Visita
                    </label>
                    <span className="text-[11px] text-violet-400 sm:hidden">
                      ← Desliza los días →
                    </span>
                  </div>
                  <div className="flex overflow-x-auto sm:grid sm:grid-cols-7 gap-2.5 pb-2 -mx-1 px-1 no-scrollbar">
                    {availableDays.map((d) => {
                      const active = selectedDate === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDate(d.iso)}
                          className={`shrink-0 w-24 sm:w-auto p-3 rounded-2xl border text-center transition-all ${
                            active
                              ? 'bg-gradient-to-b from-[#6D28D9] to-[#4C1D95] text-white border-violet-400 shadow-md ring-2 ring-violet-400/50'
                              : isDark
                              ? 'bg-[#08080C] border-violet-900/40 text-slate-300 hover:border-violet-600'
                              : 'bg-white border-indigo-200 text-slate-700 hover:bg-indigo-50'
                          }`}
                        >
                          <span className="text-[11px] uppercase block opacity-80">
                            {d.dayName}
                          </span>
                          <span className="font-serif text-2xl font-bold block">{d.dayNumber}</span>
                          <span className="text-[11px] block opacity-80">{d.monthName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 block">
                    Horario de Llegada Estimado a tu Domicilio
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {AVAILABLE_TIME_SLOTS.map((slot) => {
                      const active = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            active
                              ? 'bg-violet-600 text-white border-violet-400 shadow-md ring-2 ring-violet-400/50'
                              : isDark
                              ? 'bg-[#08080C] border-violet-900/40 text-slate-300 hover:border-violet-600'
                              : 'bg-white border-indigo-200 text-slate-700'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-violet-800 text-indigo-300 text-center"
                  >
                    ← Volver a Servicios
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] shadow-lg text-center"
                  >
                    Siguiente: Dirección &amp; Confirmación →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AT-HOME ADDRESS, PROMO CODE & EXACT 30% DEPOSIT WITH BANK CARD */}
            {step === 3 && (
              <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Paso 3: Datos de tu Domicilio
                  </h3>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ej. Camila Montalbán"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      WhatsApp de Contacto *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Ej. +34 600 123 456"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Dirección Completa (Calle, Piso, Depto o Hotel) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        placeholder="Ej. Av. Alvear 1891, Recoleta (Piso 4B)"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Notas especiales o requerimientos (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Ej. Timbre no funciona, avisar por WhatsApp. Tengo cabello rizado con mechas."
                      className={`w-full p-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:border-violet-500 ${
                        isDark
                          ? 'bg-[#08080C] border-violet-900/60 text-white'
                          : 'bg-white border-indigo-200 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Promo Coupon Input */}
                  <div className="pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Palabra de Beneficio / Cupón
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Ingresa tu cupón"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-base sm:text-xs font-mono uppercase focus:outline-none focus:border-violet-500 ${
                            isDark
                              ? 'bg-[#08080C] border-violet-900/60 text-white'
                              : 'bg-white border-indigo-200 text-slate-900'
                          }`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-violet-900/60 hover:bg-violet-800 text-violet-200 border border-violet-700/50"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponFeedback && (
                      <p
                        className={`text-xs mt-1.5 ${
                          couponFeedback.type === 'ok' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {couponFeedback.msg}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Pricing Breakdown & 30% Deposit with Bank Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div
                    className={`p-6 rounded-2xl border space-y-4 ${
                      isDark
                        ? 'bg-[#08080C] border-violet-800/50'
                        : 'bg-indigo-50/60 border-indigo-200'
                    }`}
                  >
                    <h4 className="font-serif text-xl font-semibold">Resumen de tu Visita</h4>

                    <div className="text-xs space-y-1.5 text-slate-300">
                      <p>
                        <strong>Fecha:</strong> {selectedDate} ({selectedTime} hs)
                      </p>
                      <p>
                        <strong>Estilista:</strong> {SOLE_STYLIST.name}
                      </p>
                      <p>
                        <strong>Servicios:</strong> {selectedServices.map((s) => s.name).join(', ')}
                      </p>
                      <p>
                        <strong>Duración:</strong> ~{totalDuration} minutos
                      </p>
                    </div>

                    <div className="pt-3 border-t border-violet-900/30 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      {promoDiscountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Cupón ({appliedCoupon}):</span>
                          <span>-${promoDiscountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between font-bold text-base pt-2 border-t border-violet-900/30">
                        <span>Total de Servicios:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Deposit Breakdown */}
                    <div className="p-4 rounded-xl bg-violet-600/15 border border-violet-500/40 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-violet-300">
                          Seña para apartar fecha (30%):
                        </span>
                        <span className="font-serif text-xl font-bold text-violet-300">
                          ${depositAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Saldo en tu domicilio (70%):</span>
                        <span className="font-medium text-slate-200">${pendingBalance.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Bank Info Card with 1-Click Copy Alias */}
                    <div
                      className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                        isDark ? 'bg-[#121220] border-violet-800/60' : 'bg-white border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-violet-300 font-bold">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Transferencia Bancaria / Mercado Pago</span>
                      </div>
                      <p className="text-[11px] text-slate-300"><strong>Titular:</strong> {bankInfo.titular}</p>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-violet-900/40">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Alias de transferencia:</span>
                          <code className="font-mono font-bold text-violet-300">{bankInfo.alias}</code>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyAlias}
                          className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedAlias ? <><Check className="w-3 h-3 text-emerald-300" /> ¡Copiado!</> : <><Copy className="w-3 h-3" /> Copiar</>}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400"><strong>CBU/CVU:</strong> <span className="font-mono">{bankInfo.cbu}</span></p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold uppercase border border-violet-800 text-slate-300 text-center"
                      >
                        ← Atrás
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:flex-1 py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg flex items-center justify-center gap-1.5 text-center"
                      >
                        Confirmar Cita (Seña: ${depositAmount.toFixed(2)})
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

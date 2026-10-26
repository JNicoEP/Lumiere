import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  CheckCircle2,
  Tag,
  User,
  Phone,
  CreditCard,
  MessageSquare
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
    addBooking
  } = useSalon();

  const availableDays = useMemo(() => getNextAvailableDays(7), []);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>(availableDays[0].iso);
  const [selectedTime, setSelectedTime] = useState<string>('11:00');

  // Client Details (At-home service)
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('deposit');

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
      return (subtotal * promo.discountPercent) / 100;
    }
    return 0;
  }, [appliedCoupon, promo, subtotal]);

  const subtotalAfterPromo = Math.max(0, subtotal - promoDiscountAmount);

  // Additional 5% off if paying full amount upfront
  const vipDiscountAmount = paymentMode === 'full' ? subtotalAfterPromo * 0.05 : 0;
  const finalTotal = Math.max(0, subtotalAfterPromo - vipDiscountAmount);
  const amountPaidNow = paymentMode === 'deposit' ? finalTotal * 0.3 : finalTotal;
  const pendingBalance = Math.max(0, finalTotal - amountPaidNow);

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
        msg: `¡Código "${clean}" aplicado! Obtienes ${promo.discountPercent}% de descuento.`
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
      paymentMode,
      subtotal,
      promoCodeApplied: promoDiscountAmount > 0 ? promo.code : null,
      promoDiscountAmount,
      vipDiscountAmount,
      finalTotal,
      amountPaidNow,
      pendingBalance
    };

    addBooking(newRecord);
    setConfirmedBooking(newRecord);
  };

  return (
    <section id="agenda" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Reserva Online en 3 Pasos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            Agenda tu Cita Privada a Domicilio
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#C8C8D8]' : 'text-slate-600'}`}>
            Sincronización en tiempo real con la agenda de <strong>{SOLE_STYLIST.name}</strong>.
            Elige tus servicios de Peinados para Eventos, Cortes de Pelo o Hidratación.
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
                Turno Confirmado #{confirmedBooking.id}
              </span>
              <CheckCircle2 className="w-8 h-8 text-violet-400" />
            </div>

            <h3 className="font-serif text-3xl font-semibold">
              ¡Tu cita a domicilio está reservada, {confirmedBooking.clientName}!
            </h3>

            <div
              className={`p-5 rounded-2xl border space-y-2.5 text-sm ${
                isDark ? 'bg-[#08080C] border-violet-900/50' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <p>
                <strong>Estilista Asignada:</strong> {SOLE_STYLIST.name}
              </p>
              <p>
                <strong>Fecha y Hora:</strong> {confirmedBooking.date} a las{' '}
                {confirmedBooking.time} hs
              </p>
              <p>
                <strong>Dirección del Domicilio / Hotel:</strong> {confirmedBooking.clientAddress}
              </p>
              <p>
                <strong>Servicios:</strong>{' '}
                {confirmedBooking.services.map((s) => s.name).join(', ')}
              </p>
              {confirmedBooking.promoCodeApplied && (
                <p className="text-violet-400 font-semibold">
                  <strong>Descuento Aplicado ({confirmedBooking.promoCodeApplied}):</strong> -$
                  {confirmedBooking.promoDiscountAmount.toFixed(2)}
                </p>
              )}
              <div className="pt-2 border-t border-violet-900/30 flex justify-between font-bold text-base">
                <span>Total Final: ${confirmedBooking.finalTotal.toFixed(2)}</span>
                <span className="text-violet-400">
                  Abonado ahora: ${confirmedBooking.amountPaidNow.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppBookingUrl(confirmedBooking, SOLE_STYLIST.name)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:opacity-95 shadow-lg"
              >
                Enviar Comprobante por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest border border-violet-700 text-violet-300 hover:bg-violet-950/40"
              >
                Agendar Otro Turno
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
            <div className="grid grid-cols-3 gap-3 pb-8 mb-8 border-b border-violet-900/30">
              {[
                { num: 1, title: '1. Servicios a Domicilio' },
                { num: 2, title: '2. Día & Horario' },
                { num: 3, title: '3. Domicilio & Descuento' }
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num as 1 | 2 | 3)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all border text-center ${
                    step === s.num
                      ? 'bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] text-white border-violet-500 shadow-md'
                      : isDark
                      ? 'bg-[#08080C] text-slate-400 border-violet-900/40'
                      : 'bg-indigo-50/60 text-slate-600 border-indigo-200'
                  }`}
                >
                  {s.title}
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
                              ? 'bg-[#19152E] border-violet-500'
                              : 'bg-indigo-50 border-violet-600'
                            : isDark
                            ? 'bg-[#08080C] border-violet-900/40 hover:border-violet-700'
                            : 'bg-white border-indigo-100 hover:border-indigo-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-violet-400 font-bold">
                            {CATEGORY_LABELS[srv.category]}
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
                    className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] disabled:opacity-40 shadow-lg"
                  >
                    Siguiente: Elegir Día y Hora →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE, TIME & SOLE STYLIST */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Sole Stylist Confirmation Card */}
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
                  <label className="text-xs font-bold uppercase tracking-widest text-indigo-300 block">
                    Selecciona el Día de tu Visita
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {availableDays.map((d) => {
                      const active = selectedDate === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDate(d.iso)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            active
                              ? 'bg-gradient-to-b from-[#6D28D9] to-[#4C1D95] text-white border-violet-400 shadow-md'
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
                    Horarios Disponibles a Domicilio
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
                    {AVAILABLE_TIME_SLOTS.map((slot) => {
                      const active = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            active
                              ? 'bg-violet-600 text-white border-violet-400 shadow-md'
                              : isDark
                              ? 'bg-[#08080C] border-violet-900/40 text-slate-300 hover:border-violet-600'
                              : 'bg-white border-indigo-200 text-slate-700'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-violet-800 text-indigo-300"
                  >
                    ← Volver
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] shadow-lg"
                  >
                    Siguiente: Dirección &amp; Confirmación →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AT-HOME ADDRESS, CUSTOM PROMO CODE & PAYMENT */}
            {step === 3 && (
              <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Paso 3: Datos de Envío a Domicilio
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
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-violet-500 ${
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
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Dirección Exacta del Domicilio o Suite de Hotel *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        placeholder="Calle, Número, Piso/Puerta o Nombre del Hotel y Habitación"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Indicaciones Adicionales (Largo del pelo, estacionamiento, etc.)
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-violet-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={2}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="Ej. Cabello hasta media espalda, timbre 4B..."
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-violet-500 ${
                          isDark
                            ? 'bg-[#08080C] border-violet-900/60 text-white'
                            : 'bg-white border-indigo-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Custom Promo Word Input */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isDark
                        ? 'bg-[#08080C] border-violet-800/60'
                        : 'bg-indigo-50/70 border-indigo-200'
                    }`}
                  >
                    <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-violet-400">
                      <Tag className="w-3.5 h-3.5" /> ¿Tienes una palabra de descuento de tu estilista?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder={`Ej. ${promo.code || 'HIDRATA20'}`}
                        className={`flex-1 px-3.5 py-2 rounded-xl border text-xs font-mono uppercase ${
                          isDark
                            ? 'bg-[#12121E] border-violet-800 text-white'
                            : 'bg-white border-indigo-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponFeedback && (
                      <p
                        className={`text-xs font-medium ${
                          couponFeedback.type === 'ok' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {couponFeedback.msg}
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary & Payment Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div
                    className={`p-6 rounded-2xl border space-y-4 ${
                      isDark
                        ? 'bg-[#08080C] border-violet-800/60'
                        : 'bg-indigo-50/50 border-indigo-200'
                    }`}
                  >
                    <h4 className="font-serif text-2xl font-semibold border-b border-violet-900/30 pb-2">
                      Resumen de tu Cita a Domicilio
                    </h4>

                    <div className="text-xs space-y-1">
                      <p>
                        <strong>Estilista:</strong> {SOLE_STYLIST.name}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {selectedDate} — {selectedTime} hs ({totalDuration}{' '}
                        min)
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-violet-900/30 text-sm">
                      {selectedServices.map((s) => (
                        <div key={s.id} className="flex justify-between">
                          <span>{s.name}</span>
                          <span className="font-semibold">${s.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Payment Mode Selector */}
                    <div className="space-y-2 pt-3 border-t border-violet-900/30">
                      <label className="text-xs font-bold uppercase tracking-wider block text-indigo-300">
                        Modalidad de Reserva
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMode('deposit')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left ${
                            paymentMode === 'deposit'
                              ? 'border-violet-500 bg-violet-600/20 text-violet-300'
                              : 'border-violet-900/40 opacity-70'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5 mb-1" />
                          Seña 30% Ahora
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMode('full')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left ${
                            paymentMode === 'full'
                              ? 'border-violet-500 bg-violet-600/20 text-violet-300'
                              : 'border-violet-900/40 opacity-70'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5 mb-1" />
                          Total (-5% VIP)
                        </button>
                      </div>
                    </div>

                    {/* Totals Breakdown */}
                    <div className="space-y-1.5 pt-3 border-t border-violet-900/30 text-xs">
                      <div className="flex justify-between">
                        <span>Subtotal servicios:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {promoDiscountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>
                            Descuento ({promo.code} -{promo.discountPercent}%):
                          </span>
                          <span>-${promoDiscountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {vipDiscountAmount > 0 && (
                        <div className="flex justify-between text-indigo-300 font-semibold">
                          <span>Bonificación Pago Total (5%):</span>
                          <span>-${vipDiscountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold pt-2 border-t border-violet-900/30">
                        <span>Total Final:</span>
                        <span className="text-violet-400">${finalTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-indigo-300">
                        <span>A abonar ahora para confirmar:</span>
                        <span>${amountPaidNow.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-3 rounded-full text-xs font-bold uppercase border border-violet-800"
                      >
                        ← Atrás
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#8B5CF6] shadow-lg"
                      >
                        Confirmar Cita a Domicilio
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

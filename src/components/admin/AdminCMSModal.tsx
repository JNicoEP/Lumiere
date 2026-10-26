import React, { useState } from 'react';
import {
  X,
  Lock,
  Save,
  Plus,
  Trash2,
  RotateCcw,
  Tag,
  Scissors,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  CreditCard,
  CalendarCheck,
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types/salon.types';
import { CATEGORY_LABELS, SOLE_STYLIST } from '../../data/initialData';
import { buildWhatsAppBookingUrl } from '../../utils/formatters';

export const AdminCMSModal: React.FC = () => {
  const {
    isDark,
    isAdminModalOpen,
    setIsAdminModalOpen,
    services,
    updateService,
    addService,
    deleteService,
    resetCatalogToDefaults,
    promo,
    updatePromo,
    bankInfo,
    updateBankInfo,
    bookings,
    deleteBooking
  } = useSalon();

  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  // Top-level Navigation inside CMS
  const [activeTab, setActiveTab] = useState<'turnos' | 'servicios' | 'banco' | 'cupon'>('turnos');

  // Category filter in CMS Catalog tab
  const [cmsCategoryFilter, setCmsCategoryFilter] = useState<'todos' | ServiceCategory>('todos');

  // New Service Form State
  const [newCategory, setNewCategory] = useState<ServiceCategory>('hidratacion');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState<number | string>(75);
  const [newDuration, setNewDuration] = useState<number | string>(60);
  const [formFeedback, setFormFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  if (!isAdminModalOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('PIN incorrecto. (PIN de acceso: 1234)');
    }
  };

  const handleAddNewService = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setFormFeedback({ type: 'err', msg: 'Por favor, ingresa al menos el nombre del nuevo servicio.' });
      return;
    }

    const priceNum = Number(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormFeedback({ type: 'err', msg: 'Ingresa un precio válido mayor a 0.' });
      return;
    }

    const durationNum = Number(newDuration) || 60;
    const finalDesc = newDesc.trim() || `${trimmedName} exclusivo a domicilio con equipamiento profesional de alta peluquería.`;

    addService({
      category: newCategory,
      name: trimmedName,
      description: finalDesc,
      price: priceNum,
      duration: durationNum,
      tag: 'Nuevo'
    });

    setNewName('');
    setNewDesc('');
    setNewPrice(75);
    setNewDuration(60);
    setFormFeedback({
      type: 'ok',
      msg: `¡Servicio "${trimmedName}" añadido exitosamente al catálogo!`
    });

    setTimeout(() => {
      setFormFeedback(null);
    }, 4000);
  };

  const filteredServices = cmsCategoryFilter === 'todos'
    ? services
    : services.filter((s) => s.category === cmsCategoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl ${
          isDark
            ? 'bg-[#10101A] border-violet-700/60 text-white'
            : 'bg-white border-indigo-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-violet-900/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                Gestor Interno de Valentina (CMS)
              </h3>
              <p className="text-xs text-slate-400">
                Gestión de turnos agendados, catálogo de servicios, precios y pagos
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-full hover:bg-violet-900/30 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleVerifyPin} className="max-w-sm mx-auto py-12 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/40 mx-auto flex items-center justify-center mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-semibold">Acceso de Estilista</h4>
            <p className="text-xs text-slate-400">
              Ingresa tu PIN de 4 dígitos para acceder a tus turnos y editar la web.
            </p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN (por defecto: 1234)"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-center tracking-widest font-mono text-lg ${
                isDark
                  ? 'bg-[#08080C] border-violet-800 text-white'
                  : 'bg-indigo-50 border-indigo-300 text-slate-900'
              }`}
            />
            {pinError && <p className="text-xs text-rose-400 font-semibold">{pinError}</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] shadow-lg hover:opacity-95 transition-opacity"
            >
              Desbloquear Gestor
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-violet-900/30 pb-4">
              <button
                type="button"
                onClick={() => setActiveTab('turnos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'turnos'
                    ? 'bg-violet-600 text-white shadow-md'
                    : isDark
                    ? 'bg-[#12121E] text-slate-400 hover:text-white border border-violet-900/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-violet-300" />
                <span>Turnos Agendados</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-violet-950 text-violet-200 border border-violet-500/30 font-bold">
                  {bookings.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('servicios')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'servicios'
                    ? 'bg-violet-600 text-white shadow-md'
                    : isDark
                    ? 'bg-[#12121E] text-slate-400 hover:text-white border border-violet-900/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scissors className="w-4 h-4 text-violet-300" />
                <span>Catálogo de Servicios ({services.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('banco')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'banco'
                    ? 'bg-violet-600 text-white shadow-md'
                    : isDark
                    ? 'bg-[#12121E] text-slate-400 hover:text-white border border-violet-900/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-violet-300" />
                <span>Datos Bancarios (Seña 30%)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cupon')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  activeTab === 'cupon'
                    ? 'bg-violet-600 text-white shadow-md'
                    : isDark
                    ? 'bg-[#12121E] text-slate-400 hover:text-white border border-violet-900/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag className="w-4 h-4 text-violet-300" />
                <span>Cupón de Descuento</span>
              </button>
            </div>

            {/* TAB 1: TURNOS AGENDADOS */}
            {activeTab === 'turnos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-2xl font-semibold flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-violet-400" />
                      Citas Agendadas por Clientes ({bookings.length})
                    </h4>
                    <p className="text-xs text-slate-400">
                      Aquí recibes todas las solicitudes de turno a domicilio con dirección y montos.
                    </p>
                  </div>
                </div>

                {bookings.length === 0 ? (
                  <div
                    className={`text-center py-14 px-6 rounded-3xl border space-y-3 ${
                      isDark ? 'bg-[#08080C] border-violet-900/40' : 'bg-slate-50 border-indigo-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto mb-2">
                      <CalendarCheck className="w-6 h-6" />
                    </div>
                    <h5 className="font-serif text-xl font-semibold">No hay turnos pendientes</h5>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Cuando una clienta aparte una fecha en la web abonando la seña del 30%, su cita aparecerá aquí al instante con todos sus datos de contacto y domicilio.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className={`p-5 rounded-2xl border space-y-4 transition-all ${
                          isDark
                            ? 'bg-[#08080C] border-violet-800/60 hover:border-violet-600/70'
                            : 'bg-white border-indigo-200 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-violet-900/30 pb-3">
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                              Turno #{b.id}
                            </span>
                            <h5 className="font-serif text-lg font-semibold flex items-center gap-2">
                              <span>📅 {b.date}</span>
                              <span className="text-xs font-normal text-slate-400">a las</span>
                              <span className="text-violet-300 font-bold">{b.time} hs</span>
                            </h5>
                          </div>

                          <div className="sm:text-right">
                            <span className="text-xs text-slate-400 block">Total: ${b.finalTotal.toFixed(2)}</span>
                            <span className="text-sm font-bold text-violet-400 block">
                              Seña 30%: ${b.amountPaidNow.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1.5">
                            <p className="font-semibold flex items-center gap-1.5 text-slate-200">
                              <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                              <span>{b.clientAddress}</span>
                            </p>
                            <p className="flex items-center gap-1.5 text-slate-400">
                              <Phone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                              <span>Clienta: {b.clientName} ({b.clientPhone})</span>
                            </p>
                          </div>

                          <div>
                            <span className="text-[11px] uppercase font-bold text-violet-400 block mb-1">
                              Servicios seleccionados:
                            </span>
                            <p className="text-slate-300">
                              {b.services.map((s) => s.name).join(', ')}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-violet-900/20">
                          <a
                            href={buildWhatsAppBookingUrl(b, SOLE_STYLIST.name)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Abrir Chat de WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => deleteBooking(b.id)}
                            className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:underline p-1"
                            title="Eliminar o archivar este turno"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Archivar / Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CATÁLOGO DE SERVICIOS */}
            {activeTab === 'servicios' && (
              <div className="space-y-8">
                {/* 1. Add a New Service Form */}
                <form
                  onSubmit={handleAddNewService}
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isDark ? 'bg-[#08080C] border-violet-700/60' : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl font-semibold flex items-center gap-2">
                      <Plus className="w-5 h-5 text-violet-400" /> Agregar Nuevo Servicio al Catálogo
                    </h4>
                    <span className="text-[11px] text-violet-400 font-semibold uppercase tracking-wider">
                      En Vivo
                    </span>
                  </div>

                  {formFeedback && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        formFeedback.type === 'ok'
                          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                      }`}
                    >
                      {formFeedback.type === 'ok' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      )}
                      <span>{formFeedback.msg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-3">
                      <label className="text-[11px] uppercase font-bold text-violet-400 block mb-1">
                        Categoría
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ServiceCategory)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold ${
                          isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-200'
                        }`}
                      >
                        <option value="peinados">Peinados para Eventos</option>
                        <option value="cortes">Cortes de Pelo</option>
                        <option value="hidratacion">Hidratación Profunda</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="text-[11px] uppercase font-bold text-violet-400 block mb-1">
                        Nombre del Servicio *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Peinado Nupcial con Ondas"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                          isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-200'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase font-bold text-violet-400 block mb-1">
                        Precio ($) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="Precio $"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold ${
                          isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-200'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[11px] uppercase font-bold text-violet-400 block mb-1">
                        Duración (min)
                      </label>
                      <input
                        type="number"
                        min={15}
                        step={5}
                        placeholder="Minutos (ej. 60)"
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold ${
                          isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold text-violet-400 block">
                      Descripción (Opcional)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Detalla qué incluye el servicio a domicilio..."
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                          isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-200'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Agregar Servicio
                      </button>
                    </div>
                  </div>
                </form>

                {/* Active Services List */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-2xl font-semibold flex items-center gap-2">
                        <Scissors className="w-5 h-5 text-violet-400" /> Catálogo de Servicios Activos ({services.length})
                      </h4>
                      <p className="text-xs text-slate-400">
                        Los cambios se reflejan inmediatamente en el menú y agenda de la web.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetCatalogToDefaults}
                      className="text-xs flex items-center gap-1 text-indigo-300 hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Restaurar catálogo inicial
                    </button>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(['todos', 'peinados', 'cortes', 'hidratacion'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCmsCategoryFilter(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          cmsCategoryFilter === cat
                            ? 'bg-violet-600 text-white shadow-md'
                            : isDark
                            ? 'bg-[#12121E] text-slate-300 hover:bg-[#1A1A2E] border border-violet-900/50'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {CATEGORY_LABELS[cat] || 'Todos'} ({cat === 'todos' ? services.length : services.filter(s => s.category === cat).length})
                      </button>
                    ))}
                  </div>

                  {/* Services Grid */}
                  <div className="space-y-3 pt-2">
                    {filteredServices.map((srv) => (
                      <div
                        key={srv.id}
                        className={`p-4 rounded-2xl border grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                          isDark ? 'bg-[#08080C] border-violet-900/50 hover:border-violet-700/50' : 'bg-slate-50 border-indigo-100'
                        }`}
                      >
                        <div className="md:col-span-3">
                          <label className="text-[10px] uppercase text-violet-400 font-bold block mb-1">
                            Nombre ({CATEGORY_LABELS[srv.category]})
                          </label>
                          <input
                            type="text"
                            value={srv.name}
                            onChange={(e) => updateService({ ...srv, name: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                              isDark
                                ? 'bg-[#12121E] border-violet-800 text-white'
                                : 'bg-white border-indigo-200'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-5">
                          <label className="text-[10px] uppercase text-violet-400 font-bold block mb-1">
                            Descripción
                          </label>
                          <input
                            type="text"
                            value={srv.description}
                            onChange={(e) => updateService({ ...srv, description: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                              isDark
                                ? 'bg-[#12121E] border-violet-800 text-white'
                                : 'bg-white border-indigo-200'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase text-violet-400 font-bold block mb-1 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> Precio ($)
                          </label>
                          <input
                            type="number"
                            value={srv.price}
                            onChange={(e) =>
                              updateService({ ...srv, price: Number(e.target.value) || 0 })
                            }
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                              isDark
                                ? 'bg-[#12121E] border-violet-800 text-white'
                                : 'bg-white border-indigo-200'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="text-[10px] uppercase text-violet-400 font-bold block mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Min
                          </label>
                          <input
                            type="number"
                            value={srv.duration}
                            onChange={(e) =>
                              updateService({ ...srv, duration: Number(e.target.value) || 0 })
                            }
                            className={`w-full px-2 py-1.5 rounded-lg border text-xs text-center font-semibold ${
                              isDark
                                ? 'bg-[#12121E] border-violet-800 text-white'
                                : 'bg-white border-indigo-200'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => deleteService(srv.id)}
                            title="Eliminar este servicio"
                            className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DATOS BANCARIOS */}
            {activeTab === 'banco' && (
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-[#08080C] border-violet-800/60' : 'bg-indigo-50/70 border-indigo-200'
                }`}
              >
                <h4 className="font-serif text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-violet-400" /> Configurar Datos Bancarios para la Seña (30%)
                </h4>
                <p className="text-xs text-slate-400">
                  Estos datos son los que verá la clienta para transferir la seña y asegurar su turno.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Alias de Transferencia
                    </label>
                    <input
                      type="text"
                      value={bankInfo.alias}
                      onChange={(e) => updateBankInfo({ ...bankInfo, alias: e.target.value.trim() })}
                      className={`w-full px-3 py-2 rounded-xl border font-mono text-sm ${
                        isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      CBU / CVU
                    </label>
                    <input
                      type="text"
                      value={bankInfo.cbu}
                      onChange={(e) => updateBankInfo({ ...bankInfo, cbu: e.target.value.trim() })}
                      className={`w-full px-3 py-2 rounded-xl border font-mono text-sm ${
                        isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Banco / Billetera
                    </label>
                    <input
                      type="text"
                      value={bankInfo.banco}
                      onChange={(e) => updateBankInfo({ ...bankInfo, banco: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${
                        isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Titular de la Cuenta
                    </label>
                    <input
                      type="text"
                      value={bankInfo.titular}
                      onChange={(e) => updateBankInfo({ ...bankInfo, titular: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${
                        isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      WhatsApp de Atención
                    </label>
                    <input
                      type="text"
                      value={bankInfo.whatsappPhone}
                      onChange={(e) => updateBankInfo({ ...bankInfo, whatsappPhone: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${
                        isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CUPÓN DE DESCUENTO */}
            {activeTab === 'cupon' && (
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-[#08080C] border-violet-800/60' : 'bg-indigo-50/70 border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Tag className="w-5 h-5 text-violet-400" /> Configurar Cupón de Descuento
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.active}
                      onChange={(e) => updatePromo({ ...promo, active: e.target.checked })}
                      className="accent-violet-600 w-4 h-4 rounded"
                    />
                    Cupón Activo
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Palabra Clave (Cupón)
                    </label>
                    <input
                      type="text"
                      value={promo.code}
                      onChange={(e) =>
                        updatePromo({ ...promo, code: e.target.value.toUpperCase() })
                      }
                      className={`w-full px-3 py-2 rounded-xl border font-mono uppercase text-sm ${
                        isDark
                          ? 'bg-[#12121E] border-violet-800 text-white'
                          : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Porcentaje de Descuento (%)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={promo.discountPercent}
                      onChange={(e) =>
                        updatePromo({ ...promo, discountPercent: Number(e.target.value) })
                      }
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${
                        isDark
                          ? 'bg-[#12121E] border-violet-800 text-white'
                          : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-semibold block mb-1 text-slate-400">
                      Mensaje de la Promo
                    </label>
                    <input
                      type="text"
                      value={promo.description}
                      onChange={(e) => updatePromo({ ...promo, description: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${
                        isDark
                          ? 'bg-[#12121E] border-violet-800 text-white'
                          : 'bg-white border-indigo-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer action */}
            <div className="flex justify-end pt-4 border-t border-violet-900/40">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" /> Guardar y Volver a la Web
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

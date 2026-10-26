import React, { useState } from 'react';
import { X, Lock, Save, Plus, Trash2, RotateCcw, Tag, Scissors } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types/salon.types';
import { CATEGORY_LABELS } from '../../data/initialData';

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
    updatePromo
  } = useSalon();

  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  // New Service Form State
  const [newCategory, setNewCategory] = useState<ServiceCategory>('hidratacion');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState(75);
  const [newDuration, setNewDuration] = useState(60);

  if (!isAdminModalOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('PIN incorrecto. (Pista para demo: 1234)');
    }
  };

  const handleAddNewService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) return;
    addService({
      category: newCategory,
      name: newName.trim(),
      description: newDesc.trim(),
      price: Number(newPrice) || 50,
      duration: Number(newDuration) || 60,
      tag: 'Nuevo'
    });
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl ${
          isDark
            ? 'bg-[#10101A] border-violet-700/60 text-white'
            : 'bg-white border-indigo-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between border-b border-violet-900/40 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-violet-400" />
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Gestor Interno de la Estilista (CMS)
            </h3>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-full hover:bg-violet-900/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleVerifyPin} className="max-w-sm mx-auto py-8 space-y-4 text-center">
            <p className="text-sm text-slate-400">
              Acceso exclusivo para la estilista administradora. Ingresa tu clave para modificar
              precios, descripciones y palabras de descuento.
            </p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN de estilista (1234)"
              className={`w-full px-4 py-3 rounded-xl border text-center tracking-widest font-mono text-lg ${
                isDark
                  ? 'bg-[#08080C] border-violet-800 text-white'
                  : 'bg-indigo-50 border-indigo-300 text-slate-900'
              }`}
            />
            {pinError && <p className="text-xs text-amber-400">{pinError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]"
            >
              Desbloquear Gestor
            </button>
          </form>
        ) : (
          <div className="space-y-8">
            {/* 1. Custom Discount Word Configuration */}
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-[#08080C] border-violet-800/60' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-2xl font-semibold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-violet-400" /> Configurar Palabra Personalizada de
                  Descuento
                </h4>
                <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promo.active}
                    onChange={(e) => updatePromo({ ...promo, active: e.target.checked })}
                    className="accent-violet-600 w-4 h-4"
                  />
                  Promoción Activa
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase font-semibold block mb-1">
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
                  <label className="text-xs uppercase font-semibold block mb-1">
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
                  <label className="text-xs uppercase font-semibold block mb-1">
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

            {/* 2. Edit Existing Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-2xl font-semibold flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-violet-400" /> Editar Servicios Existentes (En
                  Vivo)
                </h4>
                <button
                  type="button"
                  onClick={resetCatalogToDefaults}
                  className="text-xs flex items-center gap-1 text-indigo-300 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restaurar valores originales
                </button>
              </div>

              <div className="space-y-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className={`p-4 rounded-2xl border grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                      isDark ? 'bg-[#08080C] border-violet-900/50' : 'bg-slate-50 border-indigo-100'
                    }`}
                  >
                    <div className="md:col-span-3">
                      <label className="text-[10px] uppercase text-violet-400 font-bold block">
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
                      <label className="text-[10px] uppercase text-violet-400 font-bold block">
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
                      <label className="text-[10px] uppercase text-violet-400 font-bold block">
                        Precio ($)
                      </label>
                      <input
                        type="number"
                        value={srv.price}
                        onChange={(e) =>
                          updateService({ ...srv, price: Number(e.target.value) || 0 })
                        }
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold ${
                          isDark
                            ? 'bg-[#12121E] border-violet-800 text-white'
                            : 'bg-white border-indigo-200'
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2 flex items-end justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => deleteService(srv.id)}
                        className="p-2 rounded-lg bg-red-950/50 text-red-300 hover:bg-red-900/70 text-xs flex items-center gap-1"
                        title="Eliminar servicio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Add a New Service */}
            <form
              onSubmit={handleAddNewService}
              className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-[#08080C] border-violet-800/60' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <h4 className="font-serif text-xl font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4 text-violet-400" /> Agregar Nuevo Servicio al Catálogo
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ServiceCategory)}
                  className={`px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white'
                  }`}
                >
                  <option value="peinados">Peinados para Eventos</option>
                  <option value="cortes">Cortes de Pelo</option>
                  <option value="hidratacion">Hidratación Profunda</option>
                </select>
                <input
                  type="text"
                  placeholder="Nombre del servicio"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`px-3 py-2 rounded-xl border text-xs sm:col-span-2 ${
                    isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white'
                  }`}
                />
                <input
                  type="number"
                  placeholder="Precio $"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className={`px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white'
                  }`}
                />
                <input
                  type="number"
                  placeholder="Minutos (ej. 60)"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className={`px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white'
                  }`}
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Descripción persuasiva del servicio a domicilio..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-[#12121E] border-violet-800 text-white' : 'bg-white'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase bg-violet-600 text-white"
                >
                  Añadir
                </button>
              </div>
            </form>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-600 text-white flex items-center gap-1.5"
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

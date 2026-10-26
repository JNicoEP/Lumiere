import { BookingRecord } from '../types/salon.types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}

export interface AvailableDay {
  iso: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
}

export function getNextAvailableDays(count: number = 7): AvailableDay[] {
  const days: AvailableDay[] = [];
  const today = new Date();

  for (let i = 1; i <= count + 4; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    // Skip Sundays (0) if stylist prefers resting
    if (nextDate.getDay() !== 0) {
      const iso = nextDate.toISOString().split('T')[0];
      const dayName = nextDate.toLocaleDateString('es-ES', { weekday: 'short' });
      const dayNumber = nextDate.getDate();
      const monthName = nextDate.toLocaleDateString('es-ES', { month: 'short' });
      days.push({ iso, dayName, dayNumber, monthName });
      if (days.length === count) break;
    }
  }

  return days;
}

export function buildWhatsAppBookingUrl(booking: BookingRecord, stylistName: string): string {
  const serviceNames = booking.services.map((s) => `• ${s.name} ($${s.price})`).join('%0A');
  const promoText = booking.promoCodeApplied
    ? `%0A🏷️ *Código Aplicado:* ${booking.promoCodeApplied} (-$${booking.promoDiscountAmount.toFixed(2)})`
    : '';

  const message =
    `✨ *CONFIRMACIÓN DE CITA A DOMICILIO — LUMIÈRE*%0A` +
    `----------------------------------%0A` +
    `🔖 *Código de Turno:* ${booking.id}%0A` +
    `👩‍🎨 *Estilista:* ${stylistName}%0A` +
    `📅 *Fecha:* ${booking.date} a las ${booking.time} hs%0A` +
    `📍 *Dirección a Domicilio:* ${booking.clientAddress}%0A` +
    `👤 *Clienta:* ${booking.clientName}%0A` +
    `----------------------------------%0A` +
    `💇‍♀️ *Servicios Seleccionados:*%0A${serviceNames}${promoText}%0A` +
    `💵 *Costo Total del Servicio:* $${booking.finalTotal.toFixed(2)}%0A` +
    `💳 *Seña Requerida (30% para confirmar):* $${booking.amountPaidNow.toFixed(2)}%0A` +
    `⏳ *Saldo Restante en Domicilio (70%):* $${booking.pendingBalance.toFixed(2)}`;

  const cleanPhone = booking.clientPhone.replace(/[^0-9]/g, '') || '34600000000';
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

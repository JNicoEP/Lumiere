import { BookingRecord } from '../types/salon.types';

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(0)}`;
}

export function getNextAvailableDays(count = 7): { iso: string; dayName: string; dayNumber: string; monthName: string }[] {
  const days = [];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    days.push({
      iso,
      dayName: i === 0 ? 'Hoy' : dayNames[d.getDay()],
      dayNumber: String(d.getDate()).padStart(2, '0'),
      monthName: monthNames[d.getMonth()],
    });
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
    `💳 *Total Final:* $${booking.finalTotal.toFixed(2)}%0A` +
    `✅ *Abonado Ahora:* $${booking.amountPaidNow.toFixed(2)}%0A` +
    `⏳ *Saldo en Domicilio:* $${booking.pendingBalance.toFixed(2)}`;

  const cleanPhone = booking.clientPhone.replace(/[^0-9]/g, '') || '34600000000';
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

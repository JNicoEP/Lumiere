export type ServiceCategory = 'peinados' | 'cortes' | 'hidratacion';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  tag?: string;
}

export interface PromoConfig {
  code: string;
  discountPercent: number;
  active: boolean;
  description: string;
}

export interface StylistProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  rating: string;
  experience: string;
  avatar: string;
  coverageZones: string[];
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  services: ServiceItem[];
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  clientNotes: string;
  paymentMode: 'deposit' | 'full';
  subtotal: number;
  promoCodeApplied: string | null;
  promoDiscountAmount: number;
  vipDiscountAmount: number;
  finalTotal: number;
  amountPaidNow: number;
  pendingBalance: number;
}

export interface GalleryCardItem {
  id: string;
  categoryLabel: string;
  title: string;
  description: string;
  durationLabel: string;
  imageUrl: string;
  badgeText: string;
}

export interface BankPaymentInfo {
  titular: string;
  alias: string;
  cbu: string;
  banco: string;
  whatsappPhone: string;
}

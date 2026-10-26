import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, PromoConfig, BookingRecord } from '../types/salon.types';
import { INITIAL_SERVICES, INITIAL_PROMO } from '../data/initialData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SalonContextType {
  isDark: boolean;
  toggleTheme: () => void;
  services: ServiceItem[];
  updateService: (updated: ServiceItem) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;
  resetCatalogToDefaults: () => void;
  promo: PromoConfig;
  updatePromo: (newPromo: PromoConfig) => void;
  selectedServiceIds: string[];
  toggleSelectService: (id: string) => void;
  clearSelectedServices: () => void;
  bookings: BookingRecord[];
  addBooking: (booking: BookingRecord) => void;
  isBookingsModalOpen: boolean;
  setIsBookingsModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage<boolean>('atelier_violette_theme_dark', true);
  const [services, setServices] = useLocalStorage<ServiceItem[]>('atelier_violette_services_v1', INITIAL_SERVICES);
  const [promo, setPromo] = useLocalStorage<PromoConfig>('atelier_violette_promo_v1', INITIAL_PROMO);
  const [bookings, setBookings] = useLocalStorage<BookingRecord[]>('atelier_violette_bookings_v1', []);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['hidratacion-1']);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Ensure initial default selection exists
  useEffect(() => {
    if (selectedServiceIds.length === 0 && services.length > 0) {
      setSelectedServiceIds([services[0].id]);
    } else if (selectedServiceIds.includes('hidratacion-1')) {
      setSelectedServiceIds(['hidra-1']);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const updateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const created: ServiceItem = {
      ...newService,
      id: `srv-${Date.now()}`
    };
    setServices((prev) => [...prev, created]);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setSelectedServiceIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const resetCatalogToDefaults = () => {
    setServices(INITIAL_SERVICES);
    setPromo(INITIAL_PROMO);
  };

  const updatePromo = (newPromo: PromoConfig) => {
    setPromo({
      ...newPromo,
      code: newPromo.code.trim().toUpperCase()
    });
  };

  const toggleSelectService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelectedServices = () => setSelectedServiceIds([]);

  const addBooking = (booking: BookingRecord) => {
    setBookings((prev) => [booking, ...prev]);
  };

  return (
    <SalonContext.Provider
      value={{
        isDark,
        toggleTheme,
        services,
        updateService,
        addService,
        deleteService,
        resetCatalogToDefaults,
        promo,
        updatePromo,
        selectedServiceIds,
        toggleSelectService,
        clearSelectedServices,
        bookings,
        addBooking,
        isBookingsModalOpen,
        setIsBookingsModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = (): SalonContextType => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon debe utilizarse dentro de un SalonProvider');
  }
  return context;
};

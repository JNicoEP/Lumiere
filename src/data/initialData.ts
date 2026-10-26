import { ServiceItem, PromoConfig, StylistProfile, GalleryCardItem } from '../types/salon.types';

export const INITIAL_SERVICES: ServiceItem[] = [
  // PEINADOS PARA EVENTOS
  {
    id: 'peinado-1',
    category: 'peinados',
    name: 'Recogido Editorial Red Carpet (A Domicilio)',
    description: 'Diseño de recogido de alta costura estructurado o descontracturado en la comodidad de tu hogar u hotel. Incluye preparación térmica, fijación invisible de larga duración resistente a la humedad y colocación de tocado o velo.',
    price: 95,
    duration: 75,
    tag: 'Novias & Gala'
  },
  {
    id: 'peinado-2',
    category: 'peinados',
    name: 'Ondas Glamour Hollywood & Brillo Seda',
    description: 'Ondas esculpidas al agua con caída fluida, volumen controlado en coronilla y sellado espejo anti-frizz. Ideal para eventos nocturnos, graduaciones y sesiones fotográficas.',
    price: 80,
    duration: 60,
    tag: 'Tendencia Evento'
  },
  {
    id: 'peinado-3',
    category: 'peinados',
    name: 'Semi-Recogido Bohemio & Textura Orgánica',
    description: 'Equilibrio entre frescura y sofisticación con trenzados sutiles o torsiones limpias que realzan tus facciones y mantienen el movimiento natural durante toda la celebración.',
    price: 75,
    duration: 60
  },
  // CORTES DE PELO
  {
    id: 'corte-1',
    category: 'cortes',
    name: 'Corte de Autor & Visagismo Personalizado',
    description: 'Estudio morfológico de tu rostro y textura natural antes del primer corte. Ejecución de precisión milimétrica en seco y húmedo en tu domicilio, con peinado de acabado salón.',
    price: 70,
    duration: 60,
    tag: 'Más Solicitado'
  },
  {
    id: 'corte-2',
    category: 'cortes',
    name: 'Corte Long Layers, Movimiento & Puntas Seda',
    description: 'Capas invisibles diseñadas para multiplicar el volumen, eliminar peso innecesario y sanear puntas abiertas sin sacrificar el largo de tu melena.',
    price: 62,
    duration: 50
  },
  {
    id: 'corte-3',
    category: 'cortes',
    name: 'Diseño French Bob / Clavicut de Precisión',
    description: 'Líneas geométricas depuradas y contornos elegantes a la altura de la mandíbula o clavícula que estilizan el cuello y rejuvenecen la expresión al instante.',
    price: 68,
    duration: 60,
    tag: 'Estilo Editorial'
  },
  // HIDRATACIÓN
  {
    id: 'hidra-1',
    category: 'hidratacion',
    name: 'Ritual Criogénico de Ácido Hialurónico & Seda',
    description: 'Infusión intensiva de macromoléculas de agua y proteínas de seda pura que rellenan la fibra porosa, devolviendo la elasticidad, suavidad extrema y un reflejo espejo inmediato.',
    price: 85,
    duration: 60,
    tag: 'Efecto Espejo'
  },
  {
    id: 'hidra-2',
    category: 'hidratacion',
    name: 'Cura Botánica de Lípidos & Caviar Negro',
    description: 'Tratamiento reconstructor profundo para cabellos deshidratados, opacos o castigados por el calor. Sella la cutícula escamada y elimina el encrespamiento desde la primera sesión.',
    price: 92,
    duration: 70,
    tag: 'Restauración Total'
  },
  {
    id: 'hidra-3',
    category: 'hidratacion',
    name: 'Spa Oxigenante & Sellado Hidrolipídico Express',
    description: 'Terapia revitalizante a domicilio con vapor de ozono portátil, masaje craneal relajante y ampolla concentrada de ceramidas para recuperar el tacto aterciopelado.',
    price: 65,
    duration: 45
  }
];

export const INITIAL_PROMO: PromoConfig = {
  code: 'HIDRATA20',
  discountPercent: 20,
  active: true,
  description: 'Beneficio exclusivo activado por tu estilista'
};

export const SOLE_STYLIST: StylistProfile = {
  id: 'stylist-valentina',
  name: 'Valentina',
  role: 'Directora Creativa & Especialista en Estilismo Privado a Domicilio',
  specialty: 'Peinados de Alta Costura para Eventos, Cortes de Visagismo & Hidratación Molecular',
  bio: 'Con más de 12 años de experiencia en backstages de moda en París y Madrid, Valentina traslada la excelencia técnica, higiene rigurosa y herramientas de vanguardia directamente a la privacidad de tu residencia o suite de hotel.',
  rating: '5.0 ★ (190+ citas privadas)',
  experience: '12 años de trayectoria internacional',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
  coverageZones: [
    'Atención en Residencias Privadas',
    'Suites de Hotel & Preparación Nupcial',
    'Equipamiento Portátil de Lujo e Higiene Esterilizada'
  ]
};

export const GALLERY_ITEMS: GalleryCardItem[] = [
  {
    id: 'gal-1',
    categoryLabel: 'Peinados para Eventos',
    title: 'Ondas Glamour Hollywood & Brillo Seda',
    description: 'Preparación integral en tu domicilio con fijación flexible de larga duración resistente a la humedad y brillo tridimensional.',
    durationLabel: '60 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Alta Fijación'
  },
  {
    id: 'gal-2',
    categoryLabel: 'Peinados para Eventos',
    title: 'Recogido de Gala & Novias a Domicilio',
    description: 'Diseño de alta costura estructurado o descontracturado en tu suite o residencia, con fijación invisible y colocación de tocado.',
    durationLabel: '75 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Novias & Gala'
  },
  {
    id: 'gal-3',
    categoryLabel: 'Cortes de Pelo',
    title: 'French Bob / Clavicut de Precisión',
    description: 'Líneas geométricas depuradas y contornos elegantes que estilizan el cuello y rejuvenecen la expresión con acabado pulido.',
    durationLabel: '60 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Estilo Editorial'
  },
  {
    id: 'gal-4',
    categoryLabel: 'Cortes de Pelo',
    title: 'Corte de Autor & Capas Invisibles con Movimiento',
    description: 'Arquitectura capilar personalizada según tus facciones, logrando una caída fluida, volumen equilibrado y puntas selladas.',
    durationLabel: '60 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Visagismo a Medida'
  },
  {
    id: 'gal-5',
    categoryLabel: 'Hidratación Profunda',
    title: 'Terapia de Seda & Ácido Hialurónico Molecular',
    description: 'Reconstrucción profunda de la fibra porosa para transformar hebras secas en una melena nutrida con caída líquida y brillo.',
    durationLabel: '60 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Nutrición Celular'
  },
  {
    id: 'gal-6',
    categoryLabel: 'Hidratación Profunda',
    title: 'Método Curly: Nutrición & Definición de Rizos',
    description: 'Activación y nutrición intensiva de ondas y rizos con ampolla lipídica y difusor iónico para bucles esponjosos y elásticos.',
    durationLabel: '65 min en tu domicilio',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85',
    badgeText: 'Definición Natural'
  }
];

export const AVAILABLE_TIME_SLOTS: string[] = [
  '09:30',
  '11:00',
  '13:00',
  '15:30',
  '17:00',
  '18:30',
  '20:00'
];

export const CATEGORY_LABELS: Record<string, string> = {
  todos: 'Todos los Servicios',
  peinados: 'Peinados para Eventos',
  cortes: 'Cortes de Pelo',
  hidratacion: 'Hidratación Profunda'
};

export interface SeasonalAlert {
  id: string;
  title: string;
  badge: string;
  level: 'info' | 'warning' | 'critical';
  dateRange: string;
  startDate: string;
  endDate: string;
  summary: string;
  closedItems: string[];
  openItems: string[];
  tips: string[];
}

export interface CommercialPattern {
  id: string;
  title: string;
  typicalHours: string;
  icon: string;
  description: string;
  winterException?: string;
  tips: string[];
}

export const SEASONAL_ALERTS: SeasonalAlert[] = [
  {
    id: 'alert-admin-closure',
    title: 'Cierre Administrativo y Bancario de Fin de Año',
    badge: 'Administración & Bancos',
    level: 'critical',
    dateRange: '29 Dic al 3 Ene',
    startDate: '2026-12-29',
    endDate: '2027-01-03',
    summary:
      'Las oficinas gubernamentales, ayuntamientos y ventanillas bancarias tradicionales cierran por completo durante todo este periodo.',
    closedItems: [
      'Oficinas gubernamentales y ministerios',
      'Ventanillas de bancos tradicionales (MUFG, Mizuho, SMBC)',
      'Ayuntamientos y centros cívicos de distrito',
      'Muchas clínicas médicas privadas y dentistas'
    ],
    openItems: [
      'Cajeros automáticos (ATM) 24/7 en Konbinis (7-Eleven, Lawson, FamilyMart)',
      'Urgencias hospitalarias principales (marcar 119)',
      'Transporte público (trenes Shinkansen, metro y autobuses con horario de festivo)'
    ],
    tips: [
      'Llevad siempre efectivo retirado antes del 29 de diciembre.',
      'Si necesitáis efectivo urgente, usad cajeros 7-Bank dentro de 7-Eleven con tarjetas internacionales (Visa, Mastercard, Revolut).'
    ]
  },
  {
    id: 'alert-gantan-new-year',
    title: '1 de Enero de 2027: Gantan (Año Nuevo Oficial)',
    badge: 'Festivo Nacional',
    level: 'critical',
    dateRange: '1 de Enero de 2027',
    startDate: '2027-01-01',
    endDate: '2027-01-01',
    summary:
      'Festivo sagrado en Japón. Cierre masivo de grandes almacenes y comercios tradicionales. Las calles amanecen muy silenciosas y la vida se traslada a los santuarios.',
    closedItems: [
      'Grandes almacenes (Depāto: Isetan, Takashimaya, Mitsukoshi, Parco, etc.)',
      'Tiendas independientes de barrio, obradores y pequeños comercios',
      'Bancos y oficinas corporativas'
    ],
    openItems: [
      'Santuarios Shintoístas y Templos Budistas (con gran devoción)',
      'Parques temáticos (Tokyo Disney Resort y USJ operan normalmente)',
      'Grandes cadenas de comida rápida y restaurantes de estaciones principales',
      'Tiendas de conveniencia Konbini 24 horas'
    ],
    tips: [
      'Planead comidas en zonas de estaciones centrales, cadenas familiares o comprad víveres en el konbini la noche anterior.',
      'Día idóneo para visitar santuarios o disfrutar de parques temáticos.'
    ]
  },
  {
    id: 'alert-hatsumode-crowds',
    title: '1 al 3 de Enero: Hatsumode (Multitudes en Templos)',
    badge: 'Afluencia Masiva',
    level: 'warning',
    dateRange: '1 al 3 de Enero',
    startDate: '2027-01-01',
    endDate: '2027-01-03',
    summary:
      'Tradición sagrada del Hatsumode: primera visita y rezo del año para millones de japoneses. Los santuarios principales reciben riadas masivas de devotos.',
    closedItems: [],
    openItems: [
      'Templos y santuarios abiertos con puestos callejeros (Yatai)',
      'Venta de amuletos Omamori, flechas Hamaya y tablillas Ema'
    ],
    tips: [
      'En templos populares (Sensō-ji, Meiji Jingu, Fushimi Inari), esperad colas de más de 1 o 2 horas.',
      'Id bien temprano al amanecer o a última hora de la tarde si vais con niños.',
      'Llevad monedas de 5 y 50 yenes preparadas para las ofrendas (Go-en).'
    ]
  },
  {
    id: 'alert-fukubukuro-sales',
    title: '2 de Enero en adelante: Reapertura Comercial & Fukubukuro',
    badge: 'Reapertura & Rebajas',
    level: 'info',
    dateRange: '2 al 5 de Enero',
    startDate: '2027-01-02',
    endDate: '2027-01-05',
    summary:
      'La gran mayoría de comercios y grandes almacenes reabre sus puertas por todo lo alto con las famosas rebajas de Año Nuevo y la venta de las codiciadas bolsas de la suerte (Fukubukuro).',
    closedItems: [],
    openItems: [
      'Grandes almacenes (Depāto) y centros comerciales reabiertos',
      'Venta de bolsas sorpresa Fukubukuro con descuentos masivos',
      'Calles comerciales y restaurantes con horarios habituales'
    ],
    tips: [
      'Habrá colas desde primera hora en tiendas de moda y electrónica para conseguir las Fukubukuro.',
      '¡Ocasión perfecta para compras si os gusta el ambiente festivo!'
    ]
  },
  {
    id: 'alert-seijin-no-hi',
    title: '11 de Enero de 2027: Seijin no Hi (Día de la Mayoría de Edad)',
    badge: 'Festivo Nacional Móvil',
    level: 'info',
    dateRange: '11 de Enero de 2027',
    startDate: '2027-01-11',
    endDate: '2027-01-11',
    summary:
      'Festivo nacional oficial (segundo lunes de enero). Ceremonias para jóvenes que cumplen 20 años luciendo kimonos tradicionales (furisode) y trajes elegantes.',
    closedItems: [
      'Oficinas administrativas y bancos'
    ],
    openItems: [
      'Comercios, centros comerciales y restaurantes abiertos con normalidad',
      'Atracciones turísticas, parques temáticos y museos abiertos'
    ],
    tips: [
      'Cerca de santuarios y centros de congresos veréis a muchos jóvenes con elegantes kimonos de manga larga; es una estampa cultural preciosa para fotos con la familia.',
      'Al ser fin de semana largo (sábado 9 a lunes 11), habrá mayor afluencia doméstica en transportes y restaurantes.'
    ]
  }
];

export const COMMERCIAL_PATTERNS: CommercialPattern[] = [
  {
    id: 'cp-depato',
    title: 'Grandes Almacenes (Depāto) y Centros Comerciales',
    typicalHours: '10:00 - 20:00',
    icon: '🛍️',
    description:
      'Espacios como Isetan, Takashimaya, Parco y Lumine operan habitualmente de 10:00 a 20:00. Las plantas gastronómicas (restaurants floor, normalmente en los pisos superiores 7º-10º) prolongan su servicio 1 o 2 horas más (hasta las 21:00 o 22:00).',
    winterException:
      'El 31 de Diciembre (Nochevieja) suelen adelantar el cierre a las 18:00. El 1 de Enero cierran por completo. Reabren el 2 de Enero con gran afluencia.',
    tips: [
      'Las plantas sótano (Depachika) son un paraíso de gastronomía para llevar (bento boxes, dulces gourmet y sushi de calidad suprema).',
      'A partir de las 19:00, las bandejas de comida en el Depachika reciben descuentos de hasta el 50% con pegatinas amarillas.'
    ]
  },
  {
    id: 'cp-shotengai',
    title: 'Tiendas de Barrio y Calles Comerciales (Shōtengai)',
    typicalHours: '10:00 - 18:30 / 19:00',
    icon: '🏮',
    description:
      'En barrios tradicionales y localidades de montaña o provincias (como Takayama o barrios antiguos de Kioto), las pequeñas tiendas y obradores cierran muy temprano al anochecer.',
    winterException:
      'Muchos artesanos y tiendas familiares cierran del 30 de Diciembre al 3 de Enero inclusive.',
    tips: [
      'No demoréis las compras de recuerdos o meriendas tradicionales pasadas las 17:30 en Takayama o pueblos históricos.'
    ]
  },
  {
    id: 'cp-restaurants-last-order',
    title: 'Restaurantes y la Regla del "Last Order"',
    typicalHours: '11:00 - 14:30 / 17:30 - 21:30',
    icon: '🍜',
    description:
      'Muchos restaurantes tradicionales dividen su jornada entre almuerzo y cena. Atención máxima con la regla del "Last Order" (L.O.), que se aplica con rigurosa puntualidad nipona entre 30 y 60 minutos antes del cierre fijado.',
    winterException:
      'Muchos restaurantes familiares cierran la noche del 31 de Diciembre y todo el 1 de Enero.',
    tips: [
      'Si un restaurante indica cierre a las 21:00, el Last Order será entre las 20:00 y las 20:30. No os sentarán si llegáis después.',
      'Preguntad siempre: "Last order wa nan-ji desu ka?" (¿A qué hora es el último pedido?).'
    ]
  },
  {
    id: 'cp-konbini-lifesaver',
    title: 'Konbini 24/7 (7-Eleven, FamilyMart, Lawson): El Salvavidas',
    typicalHours: '24 horas / 365 días',
    icon: '🛒',
    description:
      'Las tiendas de conveniencia son una institución en Japón y nunca cierran. Son el auténtico pilar logístico del viaje: desayunos calientes express, onigiri frescos varias veces al día, café de máquina excelente, bebidas calientes de pet y farmacia básica.',
    winterException:
      '¡Operatividad total ininterrumpida incluso el 31 de Diciembre y 1 de Enero!',
    tips: [
      'Cajeros 7-Bank aceptan tarjetas internacionales las 24 horas.',
      'Disponen de microondas para calentar vuestro bento al instante y agua hirviendo para preparar noodles instantáneos.',
      'En los estantes de bebidas calientes (marcador naranja / Atatakai), podéis coger botellas térmicas para calentaros las manos en los paseos invernales.'
    ]
  }
];

export function isNewYearSpecialPeriod(dateInput?: string | Date): boolean {
  let dateStr: string;
  if (!dateInput) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Madrid',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    dateStr = formatter.format(new Date());
  } else if (typeof dateInput === 'string') {
    dateStr = dateInput.trim();
  } else {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Madrid',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    dateStr = formatter.format(dateInput);
  }

  // Active during New Year window (Dec 29 - Jan 3)
  return (
    (dateStr >= '2026-12-29' && dateStr <= '2026-12-31') ||
    (dateStr >= '2027-01-01' && dateStr <= '2027-01-03')
  );
}

export function getAlertsForDate(dateStr: string): SeasonalAlert[] {
  return SEASONAL_ALERTS.filter(
    (alert) => dateStr >= alert.startDate && dateStr <= alert.endDate
  );
}

import { PackingCategory } from '../types/packing';

export const PACKING_CATEGORIES: PackingCategory[] = [
  {
    id: 'docs',
    name: 'Documentación & Dinero',
    items: [
      { id: 'pack-docs-1', categoryId: 'docs', text: 'Pasaportes físicos (vigencia > 6 meses)' },
      { id: 'pack-docs-2', categoryId: 'docs', text: 'Efectivo en yenes (JPY)' },
      { id: 'pack-docs-3', categoryId: 'docs', text: 'Tarjetas de crédito / débito sin comisión internacional (Revolut/N26)' },
      { id: 'pack-docs-4', categoryId: 'docs', text: 'Copias impresas y PDF de seguro médico y reservas de hoteles' },
      { id: 'pack-docs-5', categoryId: 'docs', text: 'Entradas impresas / QR de Tokyo Disney y Universal Studios Japan' }
    ]
  },
  {
    id: 'tech',
    name: 'Electrónica',
    items: [
      { id: 'pack-tech-1', categoryId: 'tech', text: 'Adaptadores de enchufe Tipo A para Japón (2 clavijas planas)' },
      { id: 'pack-tech-2', categoryId: 'tech', text: 'Powerbanks de alta capacidad para jornadas completas fuera' },
      { id: 'pack-tech-3', categoryId: 'tech', text: 'Cargadores y cables USB-C / Lightning / Apple Watch' },
      { id: 'pack-tech-4', categoryId: 'tech', text: 'Dispositivo Pocket WiFi o instalación activa de eSIM' },
      { id: 'pack-tech-5', categoryId: 'tech', text: 'Consola / entretenimiento portátil para vuelos y trayectos en Shinkansen' }
    ]
  },
  {
    id: 'clothes',
    name: 'Ropa de Invierno',
    items: [
      { id: 'pack-clothes-1', categoryId: 'clothes', text: 'Camisetas y mallas térmicas de alta densidad (Heattech)' },
      { id: 'pack-clothes-2', categoryId: 'clothes', text: 'Abrigos impermeables y cortavientos / Plumas de montaña' },
      { id: 'pack-clothes-3', categoryId: 'clothes', text: 'Calzado cómodo antideslizante para caminar (fácil de quitar y poner)' },
      { id: 'pack-clothes-4', categoryId: 'clothes', text: 'Calcetines gruesos y térmicos para templos y nieve' },
      { id: 'pack-clothes-5', categoryId: 'clothes', text: 'Gorros de lana, guantes térmicos táctiles y bufandas' }
    ]
  },
  {
    id: 'family',
    name: 'Infantil / Familia',
    items: [
      { id: 'pack-fam-1', categoryId: 'family', text: 'Botiquín infantil (Apiretal / Dalsy, tiritas, termómetro)' },
      { id: 'pack-fam-2', categoryId: 'family', text: 'Mudas completas de repuesto para jornadas largas' },
      { id: 'pack-fam-3', categoryId: 'family', text: 'Mochilas ligeras de día para los niños' },
      { id: 'pack-fam-4', categoryId: 'family', text: 'Snacks para desplazamientos y botella de agua reutilizable' }
    ]
  },
  {
    id: 'toiletries',
    name: 'Aseo & Salud',
    items: [
      { id: 'pack-toil-1', categoryId: 'toiletries', text: 'Medicación personal para toda la estancia' },
      { id: 'pack-toil-2', categoryId: 'toiletries', text: 'Crema hidratante y protector labial (para frío y viento invernal)' },
      { id: 'pack-toil-3', categoryId: 'toiletries', text: 'Cepillos y pasta de dientes de viaje' },
      { id: 'pack-toil-4', categoryId: 'toiletries', text: 'Toallitas húmedas y pañuelos desechables' },
      { id: 'pack-toil-5', categoryId: 'toiletries', text: 'Bolsas de aseo compactas' }
    ]
  }
];

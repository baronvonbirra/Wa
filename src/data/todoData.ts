import { TodoCategory } from '../types/todo';

export const TODO_CATEGORIES: TodoCategory[] = [
  {
    id: 'tramites',
    name: 'Trámites y Documentación',
    description: 'Pasaportes, seguro médico, Visit Japan Web y registros en la nube.',
    items: [
      { id: 'todo-tram-1', categoryId: 'tramites', text: 'Comprobar validez de los pasaportes (mínimo 6 meses de vigencia)' },
      { id: 'todo-tram-2', categoryId: 'tramites', text: 'Contratar seguro médico de viaje familiar con cobertura completa' },
      { id: 'todo-tram-3', categoryId: 'tramites', text: 'Completar registro QR en Visit Japan Web (Inmigración y Aduanas)' },
      { id: 'todo-tram-4', categoryId: 'tramites', text: 'Notificar a los bancos el uso de tarjetas bancarias en Japón' },
      { id: 'todo-tram-5', categoryId: 'tramites', text: 'Escanear pasaportes y pólizas, subiéndolas a copia digital segura en la nube' }
    ]
  },
  {
    id: 'reservas',
    name: 'Reservas y Entradas',
    description: 'Entradas de parques, Shinkansen y conexión de datos.',
    items: [
      { id: 'todo-res-1', categoryId: 'reservas', text: 'Comprar entradas para Tokyo Disneyland y Tokyo DisneySea' },
      { id: 'todo-res-2', categoryId: 'reservas', text: 'Comprar entradas Universal Studios Japan + Express Pass' },
      { id: 'todo-res-3', categoryId: 'reservas', text: 'Reservar billetes de tren Shinkansen (Tokio - Kawaguchiko - Takayama - Kioto)' },
      { id: 'todo-res-4', categoryId: 'reservas', text: 'Alquilar Pocket WiFi de alta velocidad o comprar eSIMs de datos ilimitados' }
    ]
  },
  {
    id: 'logistica',
    name: 'Finanzas y Logística',
    description: 'Cambio de divisas, pases de transporte y mapas offline.',
    items: [
      { id: 'todo-log-1', categoryId: 'logistica', text: 'Cambiar yenes en efectivo para gastos en establecimientos tradicionales' },
      { id: 'todo-log-2', categoryId: 'logistica', text: 'Configurar tarjeta IC Suica / Pasmo digital en el Wallet del smartphone' },
      { id: 'todo-log-3', categoryId: 'logistica', text: 'Descargar zonas de mapas offline en Google Maps para Tokio, Kioto y Alpes' },
      { id: 'todo-log-4', categoryId: 'logistica', text: 'Revisar horarios y frecuencias de trenes JR y líneas locales' }
    ]
  }
];

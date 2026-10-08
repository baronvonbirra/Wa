import { EmergencyContact, TransportNote } from '../types/guide';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-police',
    title: 'Policía (Keisatsu)',
    number: '110',
    description: 'Para denuncias, robos, pérdida de pasaporte o accidentes de tráfico. Servicio gratuito con asistencia telefónica en inglés.',
    badge: 'Urgencias 24h',
    iconName: 'ShieldAlert'
  },
  {
    id: 'em-ambulance',
    title: 'Ambulancia / Bomberos (Kyūkyū / Shōbō)',
    number: '119',
    description: 'Para emergencias médicas graves, fiebres repentinas o rescate. Indicar "Kyūkyū desu" (Es una emergencia médica).',
    badge: 'Urgencias 24h',
    iconName: 'Ambulance'
  },
  {
    id: 'em-embassy',
    title: 'Embajada de España en Tokio',
    number: '+81335838533',
    description: '1-3-29 Roppongi, Minato-ku, Tokio 106-0032. Teléfono de emergencia consular para extravío de documentación.',
    badge: 'Consulado',
    iconName: 'Building2'
  },
  {
    id: 'em-insurance',
    title: 'Asistencia Médica Seguro de Viaje',
    number: '+34912345678',
    description: 'Línea de atención telefónica 24/7 en español para autorización previa de consultas médicas y hospitales.',
    badge: 'Seguro Privado',
    iconName: 'PhoneCall'
  }
];

export const TRANSPORT_NOTES: TransportNote[] = [
  {
    id: 'tr-suica',
    title: 'Tarjetas IC (Suica / Pasmo Digital)',
    summary: 'La forma más rápida de pagar metro, trenes locales, autobuses y tiendas de conveniencia (Konbini).',
    details: [
      'Añade Suica o Pasmo directamente a Apple Wallet o Google Wallet sin comisiones.',
      'Recarga en efectivo en cualquier máquina de estación o cajero 7-Bank en konbinis (7-Eleven, Lawson, FamilyMart).',
      'Pasa el móvil directamente por el lector sin necesidad de desbloquear o abrir la app (Express Transit).'
    ],
    iconName: 'CreditCard'
  },
  {
    id: 'tr-takuhaibin',
    title: 'Envío de Equipaje (Takuhaibin / Yamato Transport)',
    summary: 'Envía maletas grandes directamente entre hoteles para viajar cómodo en tren.',
    details: [
      'Solicita el servicio en la recepción de tu hotel 24 horas antes del traslado (ej. de Tokio a Kioto).',
      'El coste medio por maleta grande oscila entre 2.000 y 3.000 yenes.',
      'Asegúrate de llevar una mochila pequeña de mano para pasar 1 noche mientras llega el equipaje principal.'
    ],
    iconName: 'Truck'
  },
  {
    id: 'tr-shinkansen',
    title: 'Trenes Shinkansen y Asientos de Equipaje',
    summary: 'Pautas para viajar rápido y sin estrés en la red de alta velocidad.',
    details: [
      'Equipaje de dimensiones totales (Alto + Ancho + Fondo) superiores a 160 cm requiere reserva previa de asiento con área de equipaje.',
      'Conserva tu billete físico o QR hasta salir por los torniquetes de la estación de destino.',
      'Llega con 15 minutos de antelación; los trenes bala en Japón destacan por una puntualidad milimétrica.'
    ],
    iconName: 'Train'
  }
];

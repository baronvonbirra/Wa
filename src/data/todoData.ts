import { TodoCategory } from '../types/todo';

export const TODO_CATEGORIES: TodoCategory[] = [
  {
    id: 'entradas-parques',
    name: 'Entradas y Parques',
    description: 'Fechas clave de apertura de ventas para entradas de parques temáticos y atracciones.',
    items: [
      {
        id: 'task-oct-21-disney',
        categoryId: 'entradas-parques',
        text: '21, 22 y 23 de octubre de 2026 (07:00 h): Compra de entradas para Tokyo Disneyland desde su web oficial (para el 21, 22 y 23 de diciembre).'
      },
      {
        id: 'task-nov-09-usj',
        categoryId: 'entradas-parques',
        text: '9 de noviembre de 2026 (16:00 h): Compra de entradas (Studio Pass) y pases rápidos (Express Pass) para Universal Studios Japan (para la visita del 9 de enero).'
      },
      {
        id: 'task-dec-01-pokemon',
        categoryId: 'entradas-parques',
        text: '1 de diciembre de 2026 (10:00 h): Reserva de mesa en el Pokémon Café de Osaka (para la visita del 8 de enero).'
      }
    ]
  },
  {
    id: 'transporte-trenes',
    name: 'Transporte y Reservas',
    description: 'Reserva anticipada de autobuses de larga distancia, Shinkansen y tarjetas IC.',
    items: [
      {
        id: 'task-nov-28-bus-fuji',
        categoryId: 'transporte-trenes',
        text: '28 de noviembre de 2026 (02:00 h / a lo largo del día): Reserva de billetes de autobús Tokio → Fujikawaguchiko en Highwaybus o Japan Bus Online (para el 28 de diciembre).'
      },
      {
        id: 'task-nov-30-bus-takayama',
        categoryId: 'transporte-trenes',
        text: '30 de noviembre de 2026 (02:00 h / a lo largo del día): Reserva de billetes de autobús Fujikawaguchiko → Takayama en Nohi Bus (para el 30 de diciembre).'
      },
      {
        id: 'task-dec-02-train-kyoto',
        categoryId: 'transporte-trenes',
        text: '2 de diciembre de 2026: Reserva de tren Takayama → Kioto (Limited Express Hida + Shinkansen) (para el 2 de enero).'
      },
      {
        id: 'task-dec-07-shinkansen-osaka',
        categoryId: 'transporte-trenes',
        text: '7 de diciembre de 2026: Reserva de Shinkansen Kioto → Osaka en smartEX (para el 7 de enero) (opcional, opción de coger JR Special Rapid sin reserva previa).'
      },
      {
        id: 'task-dec-10-shinkansen-tokyo',
        categoryId: 'transporte-trenes',
        text: '10 de diciembre de 2026: Reserva de Shinkansen Osaka → Tokio en smartEX (para el 10 de enero).'
      },
      {
        id: 'task-dec-21-suica-child',
        categoryId: 'transporte-trenes',
        text: '21 de diciembre de 2026 (llegada a Haneda): Tramitación de tarjetas físicas Suica Child para los niños y traslado al Toy Story Hotel en Limousine Bus.'
      }
    ]
  },
  {
    id: 'documentacion-logistica',
    name: 'Documentación y Conectividad',
    description: 'Registro oficial de entrada en Japón, e-SIM y copias de seguridad.',
    items: [
      {
        id: 'task-nov-13-vjw',
        categoryId: 'documentacion-logistica',
        text: '13 de noviembre de 2026: Registro de pasaportes, vuelos y alojamiento en Visit Japan Web.'
      },
      {
        id: 'task-dec-esim-vjw',
        categoryId: 'documentacion-logistica',
        text: 'Diciembre de 2026 (días previos al vuelo): Activación de eSIM (Ubigi) y guardado de capturas/PDF de los códigos QR de Visit Japan Web.'
      }
    ]
  }
];

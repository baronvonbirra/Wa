import { TripItinerary, Accommodation, WeatherLocationInfo } from '../types/itinerary';

export const WEATHER_DATA: Record<string, WeatherLocationInfo> = {
  Tokyo: {
    location: 'Tokio',
    temp: '6°C / 11°C',
    condition: 'Soleado / Frío moderado',
    clothingRecommendation: 'Frío moderado: abrigo cálido, bufanda y capas térmicas ligeras.',
    iconName: 'Sun'
  },
  Fujikawaguchiko: {
    location: 'Kawaguchiko / Monte Fuji',
    temp: '-2°C / 5°C',
    condition: 'Helado / Posibilidad de nieve',
    clothingRecommendation: 'Nieve y frío helado: abrigo térmico pesado, gorro, guantes y mallas térmicas.',
    iconName: 'Snowflake'
  },
  Takayama: {
    location: 'Takayama / Alpes Japoneses',
    temp: '-4°C / 3°C',
    condition: 'Nieve / Frío extremo',
    clothingRecommendation: 'Nieve intensa / Abrigo térmico de montaña, botas antideslizantes y capas Heattech.',
    iconName: 'Snowflake'
  },
  Kyoto: {
    location: 'Kioto',
    temp: '2°C / 9°C',
    condition: 'Despejado / Frío seco',
    clothingRecommendation: 'Frío seco: abrigo, bufanda, guantes y calzado cómodo para caminar.',
    iconName: 'Wind'
  },
  Osaka: {
    location: 'Osaka',
    temp: '3°C / 10°C',
    condition: 'Soleado / Frío templado',
    clothingRecommendation: 'Frío moderado: chaqueta resistente, bufanda y ropa cómoda de invierno.',
    iconName: 'Sun'
  },
  Kamakura: {
    location: 'Kamakura',
    temp: '5°C / 11°C',
    condition: 'Brisa marina / Frío suave',
    clothingRecommendation: 'Brisa costera: cortavientos cálido, abrigo y calzado ligero.',
    iconName: 'CloudSun'
  }
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'hotel-1',
    name: 'Tokyo Disney Resort Toy Story Hotel',
    kanjiName: '東京ディズニーリゾート・トイ・ストーリーホテル',
    japaneseAddress: '〒279-8511 千葉県浦安市舞浜1-47',
    englishAddress: '1-47 Maihama, Urayasu, Chiba 279-8511',
    check_in: '2026-12-21',
    check_out: '2026-12-23',
    nearestStation: 'Estación Bayside (Disney Resort Line) / Estación Maihama (JR Keiyo Line)'
  },
  {
    id: 'hotel-2',
    name: 'Toyoko Inn Tokyo Akiba Asakusabashi-eki Higashi-guchi',
    kanjiName: '東横INN東京秋葉浅草橋駅東口',
    japaneseAddress: '〒111-0052 東京都台東区柳橋2-14-4',
    englishAddress: '2-14-4 Yanagibashi, Taito-ku, Tokyo 111-0052, Japan',
    check_in: '2026-12-23',
    check_out: '2026-12-28',
    nearestStation: 'Estación JR / Toei Asakusabashi (Salida Higashi-guchi / Este)'
  },
  {
    id: 'hotel-3',
    name: 'Kawaguchiko Country Cottage Ban',
    kanjiName: '河口湖カントリーコテージBan',
    japaneseAddress: '〒401-0304 山梨県南都留郡富士河口湖町河口2092',
    englishAddress: '2092 Kawaguchi, Fujikawaguchiko, Minamitsuru District, Yamanashi 401-0304',
    check_in: '2026-12-28',
    check_out: '2026-12-30',
    nearestStation: 'Estación Kawaguchiko (Fujikyu Railway)'
  },
  {
    id: 'hotel-4',
    name: 'Kouya (Takayama)',
    kanjiName: '旅荘 耕や (高山)',
    japaneseAddress: '〒506-0000 岐阜県高山市本町',
    englishAddress: 'Honmachi, Takayama, Gifu 506-0000',
    check_in: '2026-12-30',
    check_out: '2027-01-02',
    nearestStation: 'Estación JR Takayama (Línea Principal Takayama)'
  },
  {
    id: 'hotel-5',
    name: 'Kamon Inn Toji Higashi',
    kanjiName: 'カモンイン 東寺東 (京都)',
    japaneseAddress: '〒601-8428 京都府京都市南区東寺東門前町41',
    englishAddress: '41 Tojihigashimonzencho, Minami Ward, Kyoto 601-8428',
    check_in: '2027-01-02',
    check_out: '2027-01-07',
    nearestStation: 'Estación Kintetsu Toji / Estación JR Kyoto'
  },
  {
    id: 'hotel-6',
    name: 'Henn na Hotel Osaka Shinsaibashi',
    kanjiName: '変なホテル大阪 心斎橋',
    japaneseAddress: '〒542-0081 大阪府大阪市中央区南船場3-5-2',
    englishAddress: '3-5-2 Minamisenba, Chuo Ward, Osaka 542-0081',
    check_in: '2027-01-07',
    check_out: '2027-01-10',
    nearestStation: 'Estación Shinsaibashi (Osaka Metro Midosuji Line)'
  },
  {
    id: 'hotel-7',
    name: 'Hotel Vista Tokyo Tsukiji',
    kanjiName: 'ホテルビスタ東京築地',
    japaneseAddress: '〒104-0045 東京都中央区築地4-15-1',
    englishAddress: '4-15-1 Tsukiji, Chuo Ward, Tokyo 104-0045',
    check_in: '2027-01-10',
    check_out: '2027-01-13',
    nearestStation: 'Estación Tsukijishijo (Línea Toei Oedo) / Estación Tsukiji (Línea Hibiya)'
  }
];

export const ACCOMMODATIONS_MAP: Record<string, Accommodation> = ACCOMMODATIONS.reduce((acc, current) => {
  acc[current.id] = current;
  return acc;
}, {} as Record<string, Accommodation>);

export const TRIP_DATA: TripItinerary = {
  "id": "japan-2026-2027",
  "title": "Itinerario Completo de Viaje a Japón 2026-2027",
  "start_date": "2026-12-20",
  "end_date": "2027-01-13",
  "totalDays": 25,
  "stages": [
    {
      "stage_id": 0,
      "name": "¡Comienza la Aventura! Rumbo a Japón",
      "subtitle": "Etapa 0",
      "dateRange": "20 Dic",
      "start_date": "2026-12-20",
      "end_date": "2026-12-20",
      "accommodations": [],
      "days": [
        {
          "dayIndex": 0,
          "date": "2026-12-20",
          "formattedDate": "Domingo, 20 de Diciembre de 2026",
          "shortDate": "20 Dic",
          "title": "Despegue desde Málaga (AGP) ✈️ Tokio (HND)",
          "location": "Málaga / Vuelo",
          "accommodationId": "",
          "activities": [
            {
              "id": "act-0-1",
              "title": "Despegue desde Málaga (AGP) ✈️ Tokio (HND)",
              "locationQuery": "Aeropuerto de Málaga AGP",
              "type": "transit",
              "learnInfo": {
                "title": "¡Aprender: Bienvenida e Inmersión Cultural!",
                "subtitle": "Etapa 0 • Málaga (AGP) ✈️ Tokio (HND)",
                "summary": "¡Llegó el gran día! Dejamos Málaga y cruzamos medio planeta hacia la tierra de los samuráis, el anime y los templos milenarios.",
                "pills": [
                  {
                    "label": "Datos Geográficos Sorprendentes",
                    "text": "Japón es un archipiélago con más de 14.000 islas, aunque casi toda la población vive en las 4 más grandes.",
                    "type": "geography"
                  },
                  {
                    "label": "Cultura del Silencio y el Respeto",
                    "text": "En los medios de transporte públicos no se habla por teléfono ni se escucha música sin auriculares. El silencio es un regalo de respeto hacia los demás.",
                    "type": "etiquette"
                  },
                  {
                    "label": "El Misterio de las Papeleras Ausentes",
                    "text": "No hay papeleras en la calle por motivos de seguridad desde 1995. Cada persona lleva una bolsa pequeña en su mochila para guardar su basura hasta regresar al hotel o usar los cubos junto a los Konbini (tiendas 24 horas).",
                    "type": "cultural"
                  },
                  {
                    "label": "Dato Divertido / Kawaii",
                    "text": "¿Sabías que en Japón hay más de 4 millones de máquinas expendedoras? ¡Puedes comprar café hirviendo o sopa caliente en lata directamente de la máquina en la calle durante el invierno!",
                    "type": "funFact"
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "stage_id": 1,
      "name": "Tokio (Primera Parte), Disney y Nikko",
      "subtitle": "Etapa 1",
      "dateRange": "21 – 27 Dic",
      "start_date": "2026-12-21",
      "end_date": "2026-12-27",
      "accommodations": [
        {
          "id": "hotel-1",
          "name": "Tokyo Disney Resort Toy Story Hotel",
          "kanjiName": "東京ディズニーリゾート・トイ・ストーリーホテル",
          "japaneseAddress": "〒279-8511 千葉県浦安市舞浜1-47",
          "englishAddress": "1-47 Maihama, Urayasu, Chiba 279-8511",
          "check_in": "2026-12-21",
          "check_out": "2026-12-23",
          "nearestStation": "Estación Bayside (Disney Resort Line) / Estación Maihama (JR Keiyo Line)"
        },
        {
          "id": "hotel-2",
          "name": "Toyoko Inn Tokyo Akiba Asakusabashi-eki Higashi-guchi",
          "kanjiName": "東横INN東京秋葉浅草橋駅東口",
          "japaneseAddress": "〒111-0052 東京都台東区柳橋2-14-4",
          "englishAddress": "2-14-4 Yanagibashi, Taito-ku, Tokyo 111-0052, Japan",
          "check_in": "2026-12-23",
          "check_out": "2026-12-28",
          "nearestStation": "Estación JR / Toei Asakusabashi (Salida Higashi-guchi / Este)"
        }
      ],
      "days": [
        {
          "dayIndex": 1,
          "date": "2026-12-21",
          "formattedDate": "Lunes, 21 de Diciembre de 2026",
          "shortDate": "21 Dic",
          "title": "Llegada y Disney Resort",
          "location": "Tokyo",
          "accommodationId": "hotel-1",
          "activities": [
            {
              "id": "act-1-1",
              "title": "Llegada al Aeropuerto de Haneda",
              "locationQuery": "Haneda Airport Tokyo",
              "type": "transit",
              "learnInfo": {
                "title": "Llegada al Aeropuerto de Haneda",
                "subtitle": "21 de Diciembre • Tokio",
                "summary": "Uno de los aeropuertos más modernos y eficientes del mundo, construido en gran parte sobre terrenos ganados al mar en la Bahía de Tokio.",
                "pills": [
                  {
                    "label": "Dato curioso",
                    "text": "¡Tiene una zona comercial dentro llamada Edokōji que recrea una calle tradicional de la época de los samuráis!",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-1-2",
              "title": "Traslado y Check-in en Hotel Tokyo Disney Resort",
              "locationQuery": "Tokyo Disney Resort Toy Story Hotel",
              "type": "hotel",
              "learnInfo": {
                "title": "Tokyo Disney Resort Toy Story Hotel",
                "subtitle": "21 de Diciembre • Disney Resort",
                "summary": "Un hotel temático donde te sientes del tamaño de un juguete.",
                "pills": [
                  {
                    "label": "Dato Kawaii",
                    "text": "El patio del hotel cuenta con figuras gigantes de Woody, Buzz Lightyear y los marcianitos de tres ojos. ¡Parece un escenario de película real!",
                    "type": "funFact"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-1-1",
              "name": "Bon Voyage Disney Store",
              "category": "Tienda Oficial Disney",
              "note": "Tienda gigante fuera del parque para comprar orejitas y merchandising previo.",
              "locationQuery": "Bon Voyage Maihama"
            }
          ],
          "restaurants": [
            {
              "id": "rest-1-1",
              "name": "Ikspiari Food Court",
              "specialty": "Variedad Gastronómica",
              "recommendation": "Ideal para cenar rápido al llegar cerca de Maihama Station.",
              "locationQuery": "Ikspiari Shopping Mall Maihama"
            }
          ]
        },
        {
          "dayIndex": 2,
          "date": "2026-12-22",
          "formattedDate": "Martes, 22 de Diciembre de 2026",
          "shortDate": "22 Dic",
          "title": "Tokyo Disneyland",
          "location": "Tokyo",
          "accommodationId": "hotel-1",
          "activities": [
            {
              "id": "act-2-1",
              "title": "Día completo en Tokyo Disneyland",
              "locationQuery": "Tokyo Disneyland",
              "type": "theme_park",
              "learnInfo": {
                "title": "Tokyo Disneyland",
                "subtitle": "22 de Diciembre • Parque Temático",
                "summary": "Inaugurado en 1983, fue el primer parque Disney construido fuera de Estados Unidos.",
                "pills": [
                  {
                    "label": "Dato de Etiqueta",
                    "text": "A diferencia de otros parques del mundo, en Japón los visitantes extienden mantas de picnic en el suelo horas antes del desfile y se sientan en completo orden para no tapar la vista a los de atrás.",
                    "type": "etiquette"
                  },
                  {
                    "label": "Comida imperdible",
                    "text": "Las palomitas de sabores estrambóticos. Encontraréis carritos con sabor a curry, té matcha, miel, caramelo salado y salsa de soja con mantequilla.",
                    "type": "funFact"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-2-1",
              "name": "World Bazaar Shops",
              "category": "Merchandising Disney",
              "note": "Recuerdos exclusivos de San Valentín / Navidad de Tokyo Disney Resort.",
              "locationQuery": "World Bazaar Tokyo Disneyland"
            }
          ],
          "restaurants": [
            {
              "id": "rest-2-1",
              "name": "Queen of Hearts Banquet Hall",
              "specialty": "Comida Temática Alicia en el País de las Maravillas",
              "recommendation": "Probar la tarta de queso de la Reina de Corazones y el bistec.",
              "locationQuery": "Queen of Hearts Banquet Hall Tokyo Disneyland"
            }
          ]
        },
        {
          "dayIndex": 3,
          "date": "2026-12-23",
          "formattedDate": "Miércoles, 23 de Diciembre de 2026",
          "shortDate": "23 Dic",
          "title": "Tokyo DisneySea y Traslado a Tokio Centro",
          "location": "Tokyo",
          "accommodationId": "hotel-2",
          "activities": [
            {
              "id": "act-3-1",
              "title": "Día completo en Tokyo DisneySea",
              "locationQuery": "Tokyo DisneySea",
              "type": "theme_park",
              "learnInfo": {
                "title": "Tokyo DisneySea",
                "subtitle": "23 de Diciembre • Parque Temático",
                "summary": "El único parque Disney del planeta ambientado exclusivamente en mitos y leyendas del océano. Es considerado por los expertos como el parque temático con mejor diseño del mundo.",
                "pills": [
                  {
                    "label": "Dato curioso",
                    "text": "El volcán del centro (Mount Prometheus) erupciona con fuego real y un estruendo gigante a lo largo del día.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-3-2",
              "title": "Traslado y Check-in en Toyoko Inn Tokyo Akiba Asakusabashi-eki Higashi-guchi",
              "locationQuery": "Toyoko Inn Tokyo Akiba Asakusabashi-eki Higashi-guchi",
              "type": "hotel",
              "learnInfo": {
                "title": "Hotel Toyoko Inn Akiba Asakusabashi Station East Exit",
                "subtitle": "23 de Diciembre • Tokio Centro",
                "summary": "Vuestro cuartel general en Tokio para la primera semana.",
                "pills": [
                  {
                    "label": "Dato Cultural",
                    "text": "Los hoteles Toyoko Inn son famosos por ofrecer un desayuno tradicional japonés gratuito por las mañanas, incluyendo boles de arroz, sopa de miso y encurtidos.",
                    "type": "cultural"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-3-1",
              "name": "Emporio (DisneySea)",
              "category": "Duffy & Friends Merch",
              "note": "Productos exclusivos de Duffy, ShellieMay y Gelatoni.",
              "locationQuery": "Emporio Tokyo DisneySea"
            }
          ],
          "restaurants": [
            {
              "id": "rest-3-1",
              "name": "Vulcania Restaurant",
              "specialty": "Comida China Temática Mysterious Island",
              "recommendation": "Menú en la cueva volcánica del Capitán Nemo.",
              "locationQuery": "Vulcania Restaurant Tokyo DisneySea"
            }
          ]
        },
        {
          "dayIndex": 4,
          "date": "2026-12-24",
          "formattedDate": "Jueves, 24 de Diciembre de 2026",
          "shortDate": "24 Dic",
          "title": "Tokio (Shibuya, Harajuku y Roppongi)",
          "location": "Tokyo",
          "accommodationId": "hotel-2",
          "activities": [
            {
              "id": "act-4-1",
              "title": "Santuario Meiji Jingu",
              "locationQuery": "Meiji Jingu Shrine Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Santuario Meiji Jingu",
                "subtitle": "24 de Diciembre • Harajuku",
                "summary": "Un frondoso bosque sagrado de más de 100.000 árboles en mitad de la megalópolis, dedicado a los espíritus del Emperador Meiji y la Emperatriz Shōken.",
                "pills": [
                  {
                    "label": "Dato Curioso",
                    "text": "Al entrar veréis un muro enorme con barriles de sake decorados (Kazaridaru), donados anualmente a los dioses del santuario.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-4-2",
              "title": "Calle Takeshita (Harajuku)",
              "locationQuery": "Takeshita Street Harajuku",
              "type": "sights",
              "learnInfo": {
                "title": "Calle Takeshita (Harajuku)",
                "subtitle": "24 de Diciembre • Harajuku",
                "summary": "La cuna mundial de la moda Kawaii, subculturas juveniles y estética alternativa.",
                "pills": [
                  {
                    "label": "Dato Divertido",
                    "text": "Aquí es obligatorio probar las crepes japonesas enrolladas en forma de cono de Marion Crêpes, rellenas de tarta de queso entera, nata y fruta.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-4-3",
              "title": "Avenida Omotesando",
              "locationQuery": "Omotesando Avenue Tokyo",
              "type": "sights"
            },
            {
              "id": "act-4-4",
              "title": "Cruce de Shibuya (Shibuya Scramble)",
              "locationQuery": "Shibuya Crossing Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Cruce de Shibuya y Estatua de Hachiko",
                "subtitle": "24 de Diciembre • Shibuya",
                "summary": "El cruce peatonal más concurrido del planeta (hasta 3.000 personas cruzan en un solo verde) y la estatua del perro Akita más fiel de la historia.",
                "pills": [
                  {
                    "label": "Dato Emotivo",
                    "text": "Hachiko esperó a su dueño fallecido en la estación de Shibuya cada día durante casi 10 años.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-4-5",
              "title": "Mirador Shibuya Sky",
              "locationQuery": "Shibuya Sky Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Shibuya SKY & Nintendo/Pokémon Store (Shibuya Parco)",
                "subtitle": "24 de Diciembre • Shibuya",
                "summary": "Un mirador al aire libre a 229 metros de altura y la tienda oficial de Nintendo con una figura a tamaño real de Mewtwo en incubadora.",
                "pills": [
                  {
                    "label": "Cultura Pop",
                    "text": "En la tienda oficial de Nintendo podrás contemplar estatuas a tamaño real de Mario, Link y Mewtwo.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-4-6",
              "title": "Roppongi Hills e Iluminaciones Navideñas",
              "locationQuery": "Roppongi Hills Mori Tower",
              "type": "sights",
              "learnInfo": {
                "title": "Roppongi Hills y Torre de Tokio",
                "subtitle": "24 de Diciembre • Roppongi",
                "summary": "El complejo urbano vanguardista con vistas a la icónica Torre de Tokio iluminada de rojo y blanco para la Nochebuena.",
                "pills": [
                  {
                    "label": "Dato Arquitectónico",
                    "text": "La Torre de Tokio se inspiró en la Torre Eiffel de París pero mide 332,9 metros (3 metros más alta) y luce iluminación especial navideña.",
                    "type": "historical"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-4-1",
              "name": "MEGA Don Quijote Shibuya",
              "category": "Compras Generales / Tax Free",
              "note": "Tienda gigante de 8 plantas con cosmética, dulces y merchandising.",
              "locationQuery": "MEGA Don Quijote Shibuya"
            },
            {
              "id": "shop-4-2",
              "name": "Shibuya PARCO (Nintendo TOKYO & Pokémon Center)",
              "category": "Gaming & Pop Culture",
              "note": "Tienda oficial de Nintendo, Pokémon Center Shibuya y Capcom Store.",
              "locationQuery": "Shibuya PARCO Nintendo TOKYO"
            },
            {
              "id": "shop-4-3",
              "name": "Kiddy Land Harajuku",
              "category": "Juguetes y Personajes",
              "note": "4 plantas de Sanrio, Studio Ghibli, Snoopy y Rilakkuma.",
              "locationQuery": "Kiddy Land Harajuku"
            }
          ],
          "restaurants": [
            {
              "id": "rest-4-1",
              "name": "Ichiran Shibuya",
              "specialty": "Tonkotsu Ramen",
              "recommendation": "Ramen individual personalizado en cabinas icónicas.",
              "locationQuery": "Ichiran Shibuya"
            },
            {
              "id": "rest-4-2",
              "name": "Gyukatsu Motomura Shibuya",
              "specialty": "Filete de Ternera Empanado (Gyukatsu)",
              "recommendation": "Se cocina en la piedra caliente personal de tu mesa.",
              "locationQuery": "Gyukatsu Motomura Shibuya"
            },
            {
              "id": "rest-4-3",
              "name": "Crepes de Harajuku (Marion Crepes)",
              "specialty": "Postres / Crepes",
              "recommendation": "Probar el crepe caliente de nata y fresa en Takeshita Street.",
              "locationQuery": "Marion Crepes Harajuku"
            }
          ]
        },
        {
          "dayIndex": 5,
          "date": "2026-12-25",
          "formattedDate": "Viernes, 25 de Diciembre de 2026",
          "shortDate": "25 Dic",
          "title": "Excursión a Nikko y Utsunomiya",
          "location": "Tokyo",
          "accommodationId": "hotel-2",
          "activities": [
            {
              "id": "act-5-1",
              "title": "Santuario Tōshō-gū (Nikko)",
              "locationQuery": "Nikko Toshogu Shrine",
              "type": "sights",
              "learnInfo": {
                "title": "Santuario Tōshō-gū (Nikko)",
                "subtitle": "25 de Diciembre • Nikko",
                "summary": "El lugar de descanso eterno del gran shōgun Tokugawa Ieyasu, declarado Patrimonio de la Humanidad.",
                "pills": [
                  {
                    "label": "Dato Artístico/Kawaii",
                    "text": "Aquí se encuentra el famoso grabado en madera de los Tres Monos Sabios (Mizaru, Kikazaru y Iwazaru): 'No ver el mal, no oír el mal, no decir el mal'.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-5-2",
              "title": "Puente Shinkyo (Nikko)",
              "locationQuery": "Shinkyo Bridge Nikko",
              "type": "sights",
              "learnInfo": {
                "title": "Puente Shinkyo",
                "subtitle": "25 de Diciembre • Nikko",
                "summary": "Un fotogénico puente sagrado lacado en rojo que cruza el río Daiya en la entrada de los templos de Nikko.",
                "pills": [
                  {
                    "label": "Leyenda Sagrada",
                    "text": "Según la leyenda, el monje Shodo Shonin cruzó el río embravecido sobre el lomo de dos serpientes gigantes transformadas en puente.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-5-3",
              "title": "Cascada Kegon y Lago Chuzenji (Nikko)",
              "locationQuery": "Kegon Falls Nikko",
              "type": "sights",
              "learnInfo": {
                "title": "Cascada Kegon y Lago Chuzenji",
                "subtitle": "25 de Diciembre • Nikko",
                "summary": "Una impresionante caída de agua de casi 100 metros de altura que descarga las aguas del lago volcánico Chuzenji.",
                "pills": [
                  {
                    "label": "Naturaleza Espectacular",
                    "text": "Se puede bajar en un ascensor especial dentro de la roca de la montaña para ver la fuerza de la cascada a nivel del suelo.",
                    "type": "geography"
                  }
                ]
              }
            },
            {
              "id": "act-5-4",
              "title": "Parada gastronómica y cena de gyozas en Utsunomiya",
              "locationQuery": "Utsunomiya Station Gyoza",
              "type": "food",
              "learnInfo": {
                "title": "Utsunomiya (La Capital de la Gyoza)",
                "subtitle": "25 de Diciembre • Utsunomiya",
                "summary": "Ciudad famosa en todo Japón por sus empanadillas al vapor y a la plancha (gyozas). ¡Incluso tienen una estatua de piedra con forma de gyoza en la estación!",
                "pills": [
                  {
                    "label": "Gastronomía",
                    "text": "Los habitantes de Utsunomiya consumen más gyozas al año que en cualquier otra ciudad japonesa. ¡Probaréis variedades a la plancha, fritas y en sopa!",
                    "type": "funFact"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-5-1",
              "name": "Nikko Kaido Shopping Street",
              "category": "Artesanía y Dulces",
              "note": "Probar Yuba (piel de tofu) y recuerdos tallados en madera.",
              "locationQuery": "Nikko Station Shopping Street"
            }
          ],
          "restaurants": [
            {
              "id": "rest-5-1",
              "name": "Utsunomiya Minmin (Gyozakai)",
              "specialty": "Gyozas de Utsunomiya",
              "recommendation": "La capital japonesa del gyoza. Pedir variados al vapor, fritos y a la plancha.",
              "locationQuery": "Utsunomiya Minmin Station"
            },
            {
              "id": "rest-5-2",
              "name": "Hippari Dako Nikko",
              "specialty": "Soba & Noodles",
              "recommendation": "Local acogedor famoso entre viajeros cerca de Shinkyo Bridge.",
              "locationQuery": "Hippari Dako Nikko"
            }
          ]
        },
        {
          "dayIndex": 6,
          "date": "2026-12-26",
          "formattedDate": "Sábado, 26 de Diciembre de 2026",
          "shortDate": "26 Dic",
          "title": "Tokio (Asakusa, Ueno y Akihabara)",
          "location": "Tokyo",
          "accommodationId": "hotel-2",
          "activities": [
            {
              "id": "act-6-1",
              "title": "Templo Sensō-ji",
              "locationQuery": "Senso-ji Temple Asakusa",
              "type": "sights",
              "learnInfo": {
                "title": "Templo Sensō-ji y Kaminarimon Gate (Asakusa)",
                "subtitle": "26 de Diciembre • Asakusa",
                "summary": "El templo budista más antiguo de Tokio (fundado en el año 645) custodiado por el gran farolillo rojo de la 'Puerta del Trueno' (Kaminarimon).",
                "pills": [
                  {
                    "label": "Dato Tradicional",
                    "text": "Podréis comprar un Omikuji (papel con la fortuna). Si os sale 'Mala suerte', se ata en unas varillas de metal del templo para que el viento se la lleve.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-6-2",
              "title": "Calle comercial Nakamise-dori",
              "locationQuery": "Nakamise Shopping Street Asakusa",
              "type": "shopping",
              "learnInfo": {
                "title": "Calle Comercial Nakamise",
                "subtitle": "26 de Diciembre • Asakusa",
                "summary": "Una calle peatonal llena de puestos de artesanía, abanicos y dulces tradicionales como Sembei (galletas de arroz) y Ningyo-yaki (bizcochitos rellenos de judía dulce).",
                "pills": [
                  {
                    "label": "Tradición Comercial",
                    "text": "Ha funcionado como mercado tradicional para peregrinos desde hace más de 300 años durante el período Edo.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-6-3",
              "title": "Parque Ueno",
              "locationQuery": "Ueno Park Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Asahi Group Super Dry Hall & Tokyo Skytree",
                "subtitle": "26 de Diciembre • Sumida",
                "summary": "La famosa torre Skytree (634 metros) y el edificio de Asahi con la emblemática escultura dorada en forma de llama en su azotea.",
                "pills": [
                  {
                    "label": "Dato Arquitectónico",
                    "text": "La altura de 634 metros de Skytree se eligió porque los números 6 (Mu), 3 (Sa), 4 (Shi) se leen 'Musashi', el antiguo nombre de la región.",
                    "type": "geography"
                  }
                ]
              }
            },
            {
              "id": "act-6-4",
              "title": "Calle comercial Ameyoko",
              "locationQuery": "Ameyoko Shopping Street Ueno",
              "type": "shopping",
              "learnInfo": {
                "title": "Calle Ameyoko (Ueno)",
                "subtitle": "26 de Diciembre • Ueno",
                "summary": "Un animado mercado al aire libre bajo las vías del tren, nacido como estraperlo tras la Segunda Guerra Mundial.",
                "pills": [
                  {
                    "label": "Historia del Mercado",
                    "text": "Ameyoko significa 'calle de caramelos' y 'calle americana', en honor al comercio popular tras la guerra.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-6-5",
              "title": "Akihabara Electric Town",
              "locationQuery": "Akihabara Electric Town",
              "type": "shopping",
              "learnInfo": {
                "title": "Akihabara Electric Town (Super Potato, Radio Kaikan, Maid Cafes)",
                "subtitle": "26 de Diciembre • Akihabara",
                "summary": "El meca mundial de la cultura Otaku, los videojuegos retro (Super Potato), las figuras de colección (Radio Kaikan) y las cafeterías temáticas (Maidreamin).",
                "pills": [
                  {
                    "label": "Dato Divertido",
                    "text": "En Akihabara Gachapon Hall hay cientos de máquinas expendedoras de cápsulas con juguetes de lo más extravagantes (¡desde miniconstrucciones hasta gorros para gatos!).",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-6-6",
              "title": "Akihabara Radio Kaikan",
              "locationQuery": "Akihabara Radio Kaikan",
              "type": "shopping"
            },
            {
              "id": "act-6-7",
              "title": "Super Potato Akihabara",
              "locationQuery": "Super Potato Akihabara",
              "type": "shopping"
            },
            {
              "id": "act-6-8",
              "title": "Animate Akihabara",
              "locationQuery": "Animate Akihabara",
              "type": "shopping"
            },
            {
              "id": "act-6-9",
              "title": "Yodobashi Camera Multimedia Akiba",
              "locationQuery": "Yodobashi Camera Multimedia Akiba",
              "type": "shopping"
            }
          ],
          "shops": [
            {
              "id": "shop-6-1",
              "name": "Super Potato Akihabara",
              "category": "Videojuegos Retro",
              "note": "El templo de los videojuegos retro: Famicom, Game Boy y consolas raras.",
              "locationQuery": "Super Potato Akihabara"
            },
            {
              "id": "shop-6-2",
              "name": "Yodobashi Camera Akiba",
              "category": "Tecnología & Merch",
              "note": "9 plantas de electrónica, maquetas, gashapones y merchandising.",
              "locationQuery": "Yodobashi Camera Multimedia Akiba"
            },
            {
              "id": "shop-6-3",
              "name": "Nakamise-dori Shops",
              "category": "Souvenirs Tradicionales",
              "note": "Abanicos, yukatas, amuletos Omamori y dulces Senbei.",
              "locationQuery": "Nakamise Shopping Street Asakusa"
            }
          ],
          "restaurants": [
            {
              "id": "rest-6-1",
              "name": "Kanda Matsuya",
              "specialty": "Soba & Tempura Tradicional",
              "recommendation": "Restaurante histórico cerca de Akihabara especializado en fideos de trigo sarraceno.",
              "locationQuery": "Kanda Matsuya Tokyo"
            },
            {
              "id": "rest-6-2",
              "name": "Asakusa Unatoto",
              "specialty": "Unadon (Anguila a la parrilla sobre arroz)",
              "recommendation": "Anguila deliciosa y asequible cerca de Sensō-ji.",
              "locationQuery": "Unatoto Asakusa"
            },
            {
              "id": "rest-6-3",
              "name": "Maidreamin Akihabara",
              "specialty": "Maid Cafe Experiencia Temática",
              "recommendation": "Vivencia icónica de la cultura otaku con tortillas dibujadas.",
              "locationQuery": "Maidreamin Akihabara"
            }
          ]
        },
        {
          "dayIndex": 7,
          "date": "2026-12-27",
          "formattedDate": "Domingo, 27 de Diciembre de 2026",
          "shortDate": "27 Dic",
          "title": "Tokio Tradicional, Imperial y el Shinjuku Otaku/Cine",
          "location": "Tokyo",
          "accommodationId": "hotel-2",
          "activities": [
            {
              "id": "act-7-1",
              "title": "Estación de Tokio",
              "locationQuery": "Tokyo Station",
              "type": "transit",
              "learnInfo": {
                "title": "Estación de Tokio y Puerta Ōte-mon",
                "subtitle": "27 de Diciembre • Tokio Imperial",
                "summary": "La monumental estación de ladrillo rojo de 1914 y la puerta de acceso a los Jardines Orientales del Palacio Imperial, donde residió el shōgun en el Castillo Edo.",
                "pills": [
                  {
                    "label": "Historia Imperial",
                    "text": "Los muros de piedra del Palacio Imperial guardan marcas grabadas por los antiguos clanes daimyō que ayudaron a construir el Castillo Edo.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-7-2",
              "title": "Puerta Ōte-mon (Jardines Orientales del Palacio Imperial)",
              "locationQuery": "Otemon Gate Tokyo Imperial Palace",
              "type": "sights"
            },
            {
              "id": "act-7-3",
              "title": "Santuario Yasukuni",
              "locationQuery": "Yasukuni Shrine Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Santuario Yasukuni",
                "subtitle": "27 de Diciembre • Kudanshita",
                "summary": "Histórico santuario Shinto rodeado de cientos de árboles de cerezo.",
                "pills": [
                  {
                    "label": "Patrimonio",
                    "text": "El árbol de cerezo de referencia para declarar el inicio oficial de la floración en Tokio se encuentra dentro de este santuario.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-7-4",
              "title": "Kanda Jinbocho (Librerías antiguas, cómics y vinilos)",
              "locationQuery": "Kanda Jimbocho Tokyo",
              "type": "shopping",
              "learnInfo": {
                "title": "Barrio de Kanda Jinbocho (Curry Bondy & Udon Maruka)",
                "subtitle": "27 de Diciembre • Jinbocho",
                "summary": "El famoso barrio de las librerías antiguas, tiendas de discos vintage y restaurantes míticos de curry al estilo japonés.",
                "pills": [
                  {
                    "label": "Paraíso del Libro y Curry",
                    "text": "Jinbocho alberga más de 160 librerías de segunda mano y es conocida como la meca del curry en Tokio.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-7-5",
              "title": "Shinjuku (Centro)",
              "locationQuery": "Shinjuku Station Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Shinjuku (Ayuntamiento, YUNIKA VISION y Godzilla Head)",
                "subtitle": "27 de Diciembre • Shinjuku",
                "summary": "El corazón de los rascacielos de Tokio. Subida al mirador gratuito del Ayuntamiento, contemplación de las pantallas gigantes LED de YUNIKA VISION y saludo a la cabeza gigante de Godzilla de 12 metros asomando sobre el edificio.",
                "pills": [
                  {
                    "label": "Cine & Ciudad",
                    "text": "La cabeza gigante de Godzilla en el Hotel Gracery ruge y echa humo a ciertas horas fijas del día.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-7-6",
              "title": "Ayuntamiento de Tokio (Tokyo Metropolitan Government Building)",
              "locationQuery": "Tokyo Metropolitan Government Building Observation Deck",
              "type": "sights"
            },
            {
              "id": "act-7-7",
              "title": "YUNIKA VISION (Pantallas LED gigantes)",
              "locationQuery": "YUNIKA VISION Shinjuku",
              "type": "sights"
            },
            {
              "id": "act-7-8",
              "title": "Godzilla Head (Hotel Gracery Shinjuku)",
              "locationQuery": "Godzilla Head Shinjuku Hotel Gracery",
              "type": "sights"
            },
            {
              "id": "act-7-9",
              "title": "Callejón Omoide Yokochō",
              "locationQuery": "Omoide Yokocho Shinjuku",
              "type": "sights",
              "learnInfo": {
                "title": "Omoide Yokochō y Shinjuku Golden-Gai",
                "subtitle": "27 de Diciembre • Shinjuku",
                "summary": "Travesías de callejones diminutos llenos de farolillos de papel, humo de brochetas Yakitori y tabernas tradicionales.",
                "pills": [
                  {
                    "label": "Ambiente Nocturno",
                    "text": "Omoide Yokocho ('Callejón de los Recuerdos') conserva el ambiente popular de la época Showa de postguerra.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-7-10",
              "title": "Shinjuku Golden-Gai",
              "locationQuery": "Shinjuku Golden Gai",
              "type": "sights"
            },
            {
              "id": "act-7-11",
              "title": "Santuario Suga (Yotsuya)",
              "locationQuery": "Suga Shrine Yotsuya Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Santuario Suga y Escaleras de 'Your Name' (Your Name Stairs)",
                "subtitle": "27 de Diciembre • Yotsuya",
                "summary": "Las famosas escaleras rojas del tranquilo barrio de Yotsuya donde los protagonistas de la película de anime Your Name (Kimi no Na wa) se reencuentran en la escena final.",
                "pills": [
                  {
                    "label": "Escenario Anime",
                    "text": "Es uno de los puntos de peregrinación de anime más icónicos del mundo. Los fans recrean la mirada entre Taki y Mitsuha en los escalones superiores.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-7-12",
              "title": "Escaleras de \"Your Name\" (Your Name Stairs / Kimi no Na wa)",
              "locationQuery": "Your Name Stairs Suga Shrine Yotsuya",
              "type": "sights"
            },
            {
              "id": "act-7-13",
              "title": "Puente local del recorrido",
              "locationQuery": "Yotsuya Bridge Tokyo",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-7-1",
              "name": "Disk Union Jinbocho CD Record shop",
              "category": "Música & Vinilos Vintage",
              "note": "Paraíso para los amantes de la música, vinilos raros y CDs coleccionables.",
              "locationQuery": "Disk Union Jinbocho CD Record shop"
            }
          ],
          "restaurants": [
            {
              "id": "rest-7-1",
              "name": "Curry Bondy Jinbocho",
              "specialty": "Curry Japonés Tradicional",
              "recommendation": "Famosísimo curry al estilo japonés servido con patatas cocidas con mantequilla.",
              "locationQuery": "Curry Bondy Jinbocho"
            },
            {
              "id": "rest-7-2",
              "name": "Udon Maruka",
              "specialty": "Sanuki Udon",
              "recommendation": "Considerado uno de los mejores restaurantes de udon artesanal de todo Tokio.",
              "locationQuery": "Udon Maruka Jinbocho"
            },
            {
              "id": "rest-7-3",
              "name": "Tempura Shinjuku Tsunahachi Souhonten",
              "specialty": "Tempura Tradicional",
              "recommendation": "Famoso restaurante de tempura crujiente artesanal desde 1924.",
              "locationQuery": "Tempura Tsunahachi Shinjuku"
            },
            {
              "id": "rest-7-4",
              "name": "YAKITORI Torikizoku Shinjuku Yasukuni Dori",
              "specialty": "Izakaya & Brochetas Yakitori",
              "recommendation": "Taberna japonesa tradicional con brochetas de pollo al carbón.",
              "locationQuery": "YAKITORI Torikizoku Shinjuku Yasukuni Dori"
            },
            {
              "id": "rest-7-5",
              "name": "Gyopao Gyoza Shinjuku",
              "specialty": "Gyoza & Asian Craft Beer",
              "recommendation": "Gyozas jugosas estilo xiao long bao muy populares en Shinjuku.",
              "locationQuery": "Gyopao Gyoza Shinjuku"
            },
            {
              "id": "rest-7-6",
              "name": "Café La Bohème Shinjuku Gyoen",
              "specialty": "Cafetería & Gastronomía",
              "recommendation": "Escenario emblemático que inspiró la cafetería donde trabaja Taki en 'Your Name'.",
              "locationQuery": "Cafe La Boheme Shinjuku Gyoen"
            }
          ]
        }
      ]
    },
    {
      "stage_id": 2,
      "name": "Monte Fuji y Alpes Japoneses",
      "subtitle": "Etapa 2",
      "dateRange": "28 Dic – 1 Ene",
      "start_date": "2026-12-28",
      "end_date": "2027-01-01",
      "accommodations": [
        {
          "id": "hotel-3",
          "name": "Kawaguchiko Country Cottage Ban",
          "kanjiName": "河口湖カントリーコテージBan",
          "japaneseAddress": "〒401-0304 山梨県南都留郡富士河口湖町河口2092",
          "englishAddress": "2092 Kawaguchi, Fujikawaguchiko, Minamitsuru District, Yamanashi 401-0304",
          "check_in": "2026-12-28",
          "check_out": "2026-12-30",
          "nearestStation": "Estación Kawaguchiko (Fujikyu Railway)"
        },
        {
          "id": "hotel-4",
          "name": "Kouya (Takayama)",
          "kanjiName": "旅荘 耕や (高山)",
          "japaneseAddress": "〒506-0000 岐阜県高山市本町",
          "englishAddress": "Honmachi, Takayama, Gifu 506-0000",
          "check_in": "2026-12-30",
          "check_out": "2027-01-02",
          "nearestStation": "Estación JR Takayama (Línea Principal Takayama)"
        }
      ],
      "days": [
        {
          "dayIndex": 8,
          "date": "2026-12-28",
          "formattedDate": "Lunes, 28 de Diciembre de 2026",
          "shortDate": "28 Dic",
          "title": "Kawaguchiko",
          "location": "Fujikawaguchiko",
          "accommodationId": "hotel-3",
          "activities": [
            {
              "id": "act-8-1",
              "title": "Santuario Kawaguchi Asama",
              "locationQuery": "Kawaguchi Asama Shrine",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Kawaguchi Asama y Mirador Tenku no Torii",
                            "subtitle": "28 de Diciembre • Kawaguchiko ⛩️",
                            "summary": "Un santuario milenario fundado en el año 865 para calmar las erupciones del Monte Fuji. Arriba en la colina se encuentra el 'Torii del Cielo', un marco rojo sagrado que encuadra el volcán.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso / Histórico",
                                                        "text": "Las puertas Torii marcan la frontera entre el mundo profano y el espacio sagrado de los kami (espíritus Shinto).",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii para Lily y James",
                                                        "text": "¡Es uno de los miradores más fotogénicos del mundo! Si miráis con atención, el marco rojo hace que el volcán parezca una pintura gigante hecha por la naturaleza.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-8-2",
              "title": "Santuario Yama",
              "locationQuery": "Yama Shrine Kawaguchiko",
              "type": "sights"
            },
            {
              "id": "act-8-3",
              "title": "Santuario Homi",
              "locationQuery": "Homi Shrine Kawaguchiko",
              "type": "sights"
            },
            {
              "id": "act-8-4",
              "title": "Mirador Tenku no Torii",
              "locationQuery": "Tenku no Torii Kawaguchiko",
              "type": "sights",
              "learnInfo": {
                            "title": "Mirador Tenku no Torii",
                            "subtitle": "28 de Diciembre • Kawaguchiko ⛩️",
                            "summary": "El 'Torii del Cielo', un majestuoso marco rojo sagrado situado en la colina de Kawaguchi Asama que enmarca de forma inolvidable la silueta del Monte Fuji sobre el lago.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "Fue colocado en lo alto del monte para adorar reverentemente al sagrado Monte Fuji desde la lejanía.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii",
                                                        "text": "¡Parece un marco de fotos gigante donde el paisaje cambia de color según la hora del día!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-8-5",
              "title": "Cascada Haha-no-Shirataki",
              "locationQuery": "Haha-no-Shirataki Waterfall",
              "type": "sights",
              "learnInfo": {
                            "title": "Cascada Haha-no-Shirataki (Cascada de la Leche Materna)",
                            "subtitle": "28 de Diciembre • Kawaguchiko",
                            "summary": "Una hermosa cascada escondida en el bosque que históricamente usaban los peregrinos para purificarse con agua helada antes de subir al Fuji.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso / Histórico",
                                                        "text": "Los antiguos peregrinos realizaban el ritual Misogi bajo sus heladas aguas para limpiar su mente y espíritu antes de iniciar la ascensión al sagrado volcán.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "Escuchad el murmullo del agua y buscad los pequeños carámbanos de hielo que se forman en las rocas en invierno como cristales Mágicos.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-8-6",
              "title": "Parque Nagasaki",
              "locationQuery": "Nagasaki Park Kawaguchiko",
              "type": "sights",
              "learnInfo": {
                            "title": "Parque Nagasaki",
                            "subtitle": "28 de Diciembre • Kawaguchiko",
                            "summary": "Parque a la orilla del lago Kawaguchiko con paseos llenos de vistas frontales y despejadas del volcán Fuji.",
                            "pills": [
                                          {
                                                        "label": "Naturaleza e Historia",
                                                        "text": "Uno de los salientes más tranquilos del lago Kawaguchiko para admirar la inmensidad del volcán en invierno.",
                                                        "type": "geography"
                                          },
                                          {
                                                        "label": "Píldora Kawaii",
                                                        "text": "¡Buscad la forma perfecta del cono de nieve del Fuji reflejándose en el agua como un espejo!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-8-7",
              "title": "Parque Oishi",
              "locationQuery": "Oishi Park Kawaguchiko",
              "type": "sights",
              "learnInfo": {
                            "title": "Parque Oishi",
                            "subtitle": "28 de Diciembre • Kawaguchiko",
                            "summary": "Parques a la orilla del lago Kawaguchiko con paseos llenos de flores y vistas frontales del volcán.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Famoso por su sendero panorámico de flores a lo largo de 350 metros bordeando las aguas cristalinas del lago.",
                                                        "type": "geography"
                                          },
                                          {
                                                        "label": "Píldora Kawaii",
                                                        "text": "¡En el centro del parque podéis probar helados artesanales sabor lavanda y arándanos con vistas directas al Fuji!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-8-1",
              "name": "Oishi Park Living Center",
              "category": "Productos de Lavanda y Fuji",
              "note": "Souvenirs artesanales y galletas con forma del Fuji.",
              "locationQuery": "Oishi Park Kawaguchiko"
            }
          ],
          "restaurants": [
            {
              "id": "rest-8-1",
              "name": "Houtou Fudou Kawaguchiko",
              "specialty": "Houtou Udon (Fideos anchos en sopa de miso)",
              "recommendation": "Plato térmico tradicional imprescindible para combatir el frío invernal.",
              "locationQuery": "Houtou Fudou Kawaguchiko"
            },
            {
              "id": "rest-8-2",
              "name": "Oishi Park Cafe",
              "specialty": "Helado de Lavanda y Vistas al Fuji",
              "recommendation": "Probar el helado artesanal contemplando el volcán.",
              "locationQuery": "Oishi Park Cafe Kawaguchiko"
            }
          ]
        },
        {
          "dayIndex": 9,
          "date": "2026-12-29",
          "formattedDate": "Martes, 29 de Diciembre de 2026",
          "shortDate": "29 Dic",
          "title": "Kawaguchiko, Fujiyoshida y Oshino",
          "location": "Fujikawaguchiko",
          "accommodationId": "hotel-3",
          "activities": [
            {
              "id": "act-9-1",
              "title": "Mirador Ubuyagasaki",
              "locationQuery": "Ubuyagasaki Kawaguchiko",
              "type": "sights"
            },
            {
              "id": "act-9-2",
              "title": "Komagari Plaza",
              "locationQuery": "Komagari Plaza Kawaguchiko",
              "type": "sights"
            },
            {
              "id": "act-9-3",
              "title": "Teleférico Panorámico del Monte Fuji",
              "locationQuery": "Mt. Fuji Panoramic Ropeway",
              "type": "sights"
            },
            {
              "id": "act-9-4",
              "title": "Paseo en barco por el lago Kawaguchiko",
              "locationQuery": "Lake Kawaguchi Sightseeing Boat",
              "type": "sights"
            },
            {
              "id": "act-9-5",
              "title": "Parque Arakurayama Sengen",
              "locationQuery": "Chureito Pagoda Arakurayama Sengen Park",
              "type": "sights",
              "learnInfo": {
                            "title": "Parque Arakurayama Sengen (Pagoda Chureito)",
                            "subtitle": "29 de Diciembre • Fujiyoshida ⛩️",
                            "summary": "La postal más famosa de todo Japón: una pagoda roja de cinco pisos con el Monte Fuji de fondo.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Para llegar arriba hay que subir 398 escalones (llamados la escalera Sakuya).",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Misión Kawaii para James",
                                                        "text": "¡Contar los cinco tejados de la pagoda! Cada piso representa uno de los cinco elementos de la filosofía budista: Tierra, Agua, Fuego, Viento y Vacío.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-9-6",
              "title": "Santuario Kitaguchi Hongu Fuji Sengen",
              "locationQuery": "Kitaguchi Hongu Fuji Sengen Shrine",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Kitaguchi Hongu Fuji Sengen",
                            "subtitle": "29 de Diciembre • Fujiyoshida",
                            "summary": "El punto de partida histórico donde los antiguos peregrinos iniciaban el ascenso a pie al monte sagrado.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "El bosque de entrada cuenta con cedros milenarios gigantes (Sugi) de más de 1.000 años de antigüedad que han visto pasar a generaciones de montañeros.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Respeto y Etiqueta",
                                                        "text": "Haced una reverencia respetuosa al cruzar el enorme Torii de madera roja que marca el inicio del camino sagrado.",
                                                        "type": "etiquette"
                                          }
                            ]
              }
            },
            {
              "id": "act-9-7",
              "title": "Santuario Arayayama",
              "locationQuery": "Arayayama Shrine Fujiyoshida",
              "type": "sights"
            },
            {
              "id": "act-9-8",
              "title": "Zona comercial Honcho 2-chome",
              "locationQuery": "Honcho 2-chome Fujiyoshida",
              "type": "shopping"
            },
            {
              "id": "act-9-9",
              "title": "Manantiales de Oshino Hakkai",
              "locationQuery": "Oshino Hakkai Yamanashi",
              "type": "sights",
              "learnInfo": {
                            "title": "Manantiales de Oshino Hakkai",
                            "subtitle": "29 de Diciembre • Oshino",
                            "summary": "Ocho estanques cristalinos alimentados por la nieve derretida del Monte Fuji, que se filtra a través de capas de lava durante más de 80 años.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "El agua es tan purísima y transparente que se pueden ver peces enormes nadando a varios metros de profundidad como si flotaran en el aire.",
                                                        "type": "geography"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "¡Acercaos al estanque central Waku-ike para tocar el agua helada de la nieve derretida del Fuji!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-9-10",
              "title": "Shinobi No Sato Ninja Village",
              "locationQuery": "Oshino Ninja Village Shinobi no Sato",
              "type": "sights",
              "learnInfo": {
                            "title": "Shinobi No Sato Ninja Village",
                            "subtitle": "29 de Diciembre • Oshino 🗡️",
                            "summary": "Un parque temático cultural sobre los secretos y técnicas de los ninjas de la época feudal.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "Los ninjas (o shinobi) eran expertos en artes marciales, espionaje y camuflaje que servían a los señores feudales en el Japón antiguo.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Misión Ninja para Lily y James",
                                                        "text": "Pasar por la 'Casa de los Trucos Ninja' atravesando paredes falsas, pasadizos secretos y lanzando estrellas shuriken.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-9-1",
              "name": "Fujisan Shokupan Bakery",
              "category": "Panadería Temática",
              "note": "Pan de molde con el dibujo del Monte Fuji al cortar la rebanada.",
              "locationQuery": "Fujisan Shokupan Kawaguchiko"
            },
            {
              "id": "shop-9-2",
              "name": "Ide Sake Brewery",
              "category": "Destilería de Sake local",
              "note": "Sake elaborado con agua pura del deshielo del Monte Fuji.",
              "locationQuery": "Ide Sake Brewery Kawaguchiko"
            }
          ],
          "restaurants": [
            {
              "id": "rest-9-1",
              "name": "Kosaku Kawaguchiko",
              "specialty": "Houtou Udon con Calabaza y Jabalí",
              "recommendation": "Restaurante en casa tradicional de madera con suelo de tatami.",
              "locationQuery": "Kosaku Kawaguchiko"
            },
            {
              "id": "rest-9-2",
              "name": "Sanrokuen",
              "specialty": "BBQ Robatayaki Tradicional",
              "recommendation": "Pescado de río y brochetas asadas en el fogón Irori central.",
              "locationQuery": "Sanrokuen Kawaguchiko"
            }
          ]
        },
        {
          "dayIndex": 10,
          "date": "2026-12-30",
          "formattedDate": "Miércoles, 30 de Diciembre de 2026",
          "shortDate": "30 Dic",
          "title": "Takayama (Centro y Templos)",
          "location": "Takayama",
          "accommodationId": "hotel-4",
          "activities": [
            {
              "id": "act-10-1",
              "title": "Santuario Sakurayama Hachiman",
              "locationQuery": "Sakurayama Hachimangu Takayama",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Sakurayama Hachiman y Ruta Higashiyama",
                            "subtitle": "30 de Diciembre • Takayama",
                            "summary": "El santuario protector del norte de la ciudad y el tranquilo camino de templos de madera entre cedros gigantes.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "Custodia las majestuosas carrozas Yatai de más de 300 años utilizadas en el célebre Festival de Takayama.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "Pasear en silencio por la ruta Higashiyama escuchando el crujido de las botas en la nieve bajo los arboles centenarios.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-10-2",
              "title": "Templo Takayama Betsuin Shorenji",
              "locationQuery": "Takayama Betsuin Temple",
              "type": "sights"
            },
            {
              "id": "act-10-3",
              "title": "Ruta de templos de Higashiyama (Hakusan, Daiohji, Zennoji)",
              "locationQuery": "Higashiyama Walking Course Takayama",
              "type": "sights"
            },
            {
              "id": "act-10-4",
              "title": "Santuario Akiba",
              "locationQuery": "Akiba Shrine Takayama",
              "type": "sights"
            },
            {
              "id": "act-10-5",
              "title": "Santuario Akiha Shimoninomachi",
              "locationQuery": "Akiha Shimoninomachi Shrine Takayama",
              "type": "sights"
            },
            {
              "id": "act-10-6",
              "title": "Residencia Yoshijima",
              "locationQuery": "Yoshijima Heritage House Takayama",
              "type": "sights"
            },
            {
              "id": "act-10-7",
              "title": "Residencia Kusakabe",
              "locationQuery": "Kusakabe Heritage House Takayama",
              "type": "sights"
            },
            {
              "id": "act-10-8",
              "title": "Centro de artesanía Hida Takayama Omoide Taikenkan",
              "locationQuery": "Hida Takayama Omoide Taikenkan",
              "type": "culture"
            },
            {
              "id": "act-10-9",
              "title": "Museo de la Ciudad de Takayama",
              "locationQuery": "Takayama Museum of History and Art",
              "type": "culture"
            },
            {
              "id": "act-10-10",
              "title": "Distrito histórico Sanmachi Suji",
              "locationQuery": "Sanmachi Suji Takayama",
              "type": "sights",
              "learnInfo": {
                            "title": "Distrito Histórico Sanmachi Suji",
                            "subtitle": "30 de Diciembre • Takayama",
                            "summary": "Un conjunto de tres calles perfectamente conservadas de la época de Edo (siglos XVII-XIX) con casas de madera oscura, tiendas tradicionales y canales de agua limpia.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Las grandes bolas de ramas de cedro (Sugidama) colgadas en las entradas indican que allí se elabora sake tradicional.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Gastronómica",
                                                        "text": "Aquí se prueba el famoso sushi de ternera de Hida servido sobre una galleta crujiente de arroz.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-10-11",
              "title": "Destilería Kawashiri",
              "locationQuery": "Kawashiri Sake Brewery Takayama",
              "type": "food"
            },
            {
              "id": "act-10-12",
              "title": "Destilería Funasaka",
              "locationQuery": "Funasaka Sake Brewery Takayama",
              "type": "food"
            },
            {
              "id": "act-10-13",
              "title": "Puente Nakahashi",
              "locationQuery": "Nakahashi Bridge Takayama",
              "type": "sights",
              "learnInfo": {
                            "title": "Puente Nakahashi",
                            "subtitle": "30 de Diciembre • Takayama",
                            "summary": "El icónico puente de madera lacada en rojo bermellón que cruza el río Miyagawa.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "El puente rojo de Nakahashi es el símbolo emblemático que conecta el centro antiguo de Takayama con las colinas de los templos.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Píldora Kawaii",
                                                        "text": "¡Mirad hacia abajo al río helado para saludar a los patos e patitos que nadan alegremente entre la nieve!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-10-1",
              "name": "Tiendas de artesanía en Sanmachi Suji",
              "category": "Muñecos Sarubobo",
              "note": "Comprar el amuleto tradicional rojo Sarubobo de la región de Hida.",
              "locationQuery": "Sanmachi Suji Takayama"
            },
            {
              "id": "shop-10-2",
              "name": "Funasaka Sake Brewery",
              "category": "Cata & Venta de Sake",
              "note": "Dispensador automático de monedas para probar varios tipos de sake.",
              "locationQuery": "Funasaka Sake Brewery Takayama"
            }
          ],
          "restaurants": [
            {
              "id": "rest-10-1",
              "name": "Hida Kotteushi",
              "specialty": "Nigiri Sushi de Carne de Hida A5",
              "recommendation": "Sushi de ternera A5 servido sobre una galleta crujiente de senbei.",
              "locationQuery": "Hida Kotteushi Takayama"
            },
            {
              "id": "rest-10-2",
              "name": "Hidagyu Maruaki",
              "specialty": "Yakiniku de Carne de Hida",
              "recommendation": "Carne marmoleada A5 a la parrilla de altísima calidad.",
              "locationQuery": "Maruaki Takayama"
            },
            {
              "id": "rest-10-3",
              "name": "Menya Shirakawa",
              "specialty": "Takayama Ramen",
              "recommendation": "Fideos finos rizados en caldo claro de pollo y salsa de soja frita.",
              "locationQuery": "Menya Shirakawa Takayama"
            }
          ]
        },
        {
          "dayIndex": 11,
          "date": "2026-12-31",
          "formattedDate": "Jueves, 31 de Diciembre de 2026",
          "shortDate": "31 Dic",
          "title": "Takayama y Shirakawa-go",
          "location": "Takayama",
          "accommodationId": "hotel-4",
          "activities": [
            {
              "id": "act-11-1",
              "title": "Nakabashi Park (Takayama)",
              "locationQuery": "Nakabashi Park Takayama",
              "type": "sights"
            },
            {
              "id": "act-11-2",
              "title": "Takayama Jinya (Takayama)",
              "locationQuery": "Takayama Jinya",
              "type": "sights"
            },
            {
              "id": "act-11-3",
              "title": "Mirador del Castillo de Ogimachi (Shirakawa-go)",
              "locationQuery": "Ogimachi Castle Observation Deck Shirakawago",
              "type": "sights"
            },
            {
              "id": "act-11-4",
              "title": "Aldea Gassho Village (Shirakawa-go)",
              "locationQuery": "Shirakawago Gassho Village",
              "type": "sights",
              "learnInfo": {
                            "title": "Aldea Histórica de Shirakawa-go (Ogimachi)",
                            "subtitle": "31 de Diciembre • Shirakawa-go ❄️",
                            "summary": "Una aldea de montaña declarada Patrimonio de la Humanidad, famosa por sus casas con tejados de paja empinados (Gassho-zukuri).",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Gassho-zukuri significa 'construido como manos en oración'. Los tejados tienen una inclinación de 60 grados para que las toneladas de nieve invernal resbalen y no colapsen las estructuras.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Detalle de Ingeniería",
                                                        "text": "¡Las casas se construyeron sin usar un solo clavo de metal! Toda la estructura de madera se amarra con cuerdas de paja de arroz.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-11-5",
              "title": "Casa Wada (Shirakawa-go)",
              "locationQuery": "Wada House Shirakawago",
              "type": "sights",
              "learnInfo": {
                            "title": "Casa Wada y Casa Nagase",
                            "subtitle": "31 de Diciembre • Shirakawa-go ❄️",
                            "summary": "Las residencias de madera más grandes de la aldea. En el último piso bajo el tejado se criaban históricamente gusanos de seda durante el invierno.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "En el desván superior bajo el tejado de paja se mantenían encendidos fogones tradicionales Irori para dar calor constante a los gusanos de seda en invierno.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "Subid por las inclinadas escaleras de madera sin zapatos para ver la estructura de troncos amarrados con cuerdas.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-11-6",
              "title": "Casa Nagase (Shirakawa-go)",
              "locationQuery": "Nagase House Shirakawago",
              "type": "sights",
              "learnInfo": {
                            "title": "Casa Nagase (Shirakawa-go)",
                            "subtitle": "31 de Diciembre • Shirakawa-go ❄️",
                            "summary": "Residencia histórica Gassho-zukuri de 5 plantas perteneciente a una antigua dinastía de médicos de la aldea.",
                            "pills": [
                                          {
                                                        "label": "Historia y Medicina",
                                                        "text": "Exhibe instrumentos médicos antiguos del período Edo y artefactos de la vida cotidiana en las montañas nevadas.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Detalle Asombroso",
                                                        "text": "¡Sus vigas de madera llevan en pie más de 250 años soportando nevadas récord año tras año!",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-11-7",
              "title": "Las Tres Casas de Shirakawago",
              "locationQuery": "Three Houses Shirakawago",
              "type": "sights"
            },
            {
              "id": "act-11-8",
              "title": "Museo al aire libre Minka-en (Shirakawa-go)",
              "locationQuery": "Gassho-zukuri Minkaen Shirakawago",
              "type": "culture"
            },
            {
              "id": "act-11-9",
              "title": "Puente Deai (Shirakawa-go)",
              "locationQuery": "Deai Bridge Shirakawago",
              "type": "sights"
            },
            {
              "id": "act-11-10",
              "title": "Santuario Shirakawa Hachiman (Shirakawa-go)",
              "locationQuery": "Shirakawa Hachiman Shrine Shirakawago",
              "type": "sights"
            },
            {
              "id": "act-11-11",
              "title": "Santuario Ogimachi Akiba (Shirakawa-go)",
              "locationQuery": "Ogimachi Akiba Shrine Shirakawago",
              "type": "sights"
            },
            {
              "id": "act-11-12",
              "title": "Santuario Hatoya Hachiman (Shirakawa-go)",
              "locationQuery": "Hatoya Hachiman Shrine Shirakawago",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-11-1",
              "name": "Shirakawa-go Souvenir Shops",
              "category": "Artesanía de paja y madera",
              "note": "Réplicas en miniatura de las casas Gassho-zukuri.",
              "locationQuery": "Shirakawago Ogimachi Village"
            }
          ],
          "restaurants": [
            {
              "id": "rest-11-1",
              "name": "Irori Shirakawa-go",
              "specialty": "Hida Beef Miso Sets",
              "recommendation": "Carne de Hida cocinada sobre hoja de magnolia con pasta de miso (Hoba Miso).",
              "locationQuery": "Irori Shirakawago"
            },
            {
              "id": "rest-11-2",
              "name": "Kyōya Takayama",
              "specialty": "Cena de Nochevieja Tradicional",
              "recommendation": "Restaurante histórico de Takayama para probar fideos Toshikoshi Soba de fin de año.",
              "locationQuery": "Kyoya Takayama"
            }
          ]
        },
        {
          "dayIndex": 12,
          "date": "2027-01-01",
          "formattedDate": "Viernes, 1 de Enero de 2027",
          "shortDate": "1 Ene",
          "title": "Takayama (Zona Sur y Castillo)",
          "location": "Takayama",
          "accommodationId": "hotel-4",
          "activities": [
            {
              "id": "act-12-1",
              "title": "Parque Shiroyama",
              "locationQuery": "Shiroyama Park Takayama",
              "type": "sights"
            },
            {
              "id": "act-12-2",
              "title": "Templo Shoren-ji",
              "locationQuery": "Shoren-ji Temple Takayama",
              "type": "sights"
            },
            {
              "id": "act-12-3",
              "title": "Ruinas del castillo de Takayama",
              "locationQuery": "Takayama Castle Ruins",
              "type": "sights"
            },
            {
              "id": "act-12-4",
              "title": "Ruinas del sur (Minaminoidemaru)",
              "locationQuery": "Minaminoidemaru Takayama",
              "type": "sights"
            },
            {
              "id": "act-12-5",
              "title": "Templo Dairyu",
              "locationQuery": "Dairyu Temple Takayama",
              "type": "sights"
            },
            {
              "id": "act-12-6",
              "title": "Santuario Bentendo",
              "locationQuery": "Bentendo Shrine Takayama",
              "type": "sights"
            },
            {
              "id": "act-12-7",
              "title": "Santuario Hie",
              "locationQuery": "Hie Shrine Takayama",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Hie y Templo Hida Kokubunji",
                            "subtitle": "01 de Enero • Takayama (Hatsumode)",
                            "summary": "Los lugares donde los habitantes de Takayama acuden el 1 de enero para hacer el Hatsumode (la primera visita del año al santuario para pedir buena suerte).",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "En Hida Kokubunji hay un árbol Ginkgo gigante de más de 1.200 años. La leyenda dice que cuando caen todas sus hojas doradas, llega la gran nevada del invierno.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Tradición de Año Nuevo",
                                                        "text": "Hatsumode es la tradición japonesa de hacer la primera oración del año en el santuario para desear salud y prosperidad familiar.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-12-8",
              "title": "Templo Hida Kokubunji",
              "locationQuery": "Hida Kokubunji Temple Takayama",
              "type": "sights",
              "learnInfo": {
                            "title": "Templo Hida Kokubunji",
                            "subtitle": "01 de Enero • Takayama (Hatsumode)",
                            "summary": "El templo budista más antiguo de Takayama, custodia de la famosa pagoda de madera de tres pisos.",
                            "pills": [
                                          {
                                                        "label": "Leyenda del Arbol Sagrado",
                                                        "text": "El gran árbol Ginkgo milenario es considerado el espíritu guardián que protege a Takayama de los incendios y heladas.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "Comprar un amuleto Omamori o escribir un deseo para el año 2027 en una tablilla de madera Ema.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-12-1",
              "name": "Miyagawa Morning Market (Especial Año Nuevo)",
              "category": "Mercado local",
              "note": "Puestos de encurtidos locales, verduras de invierno y artesanía de madera.",
              "locationQuery": "Miyagawa Morning Market Takayama"
            }
          ],
          "restaurants": [
            {
              "id": "rest-12-1",
              "name": "Ajikura Tengoku",
              "specialty": "Hida Beef Yakiniku",
              "recommendation": "Parrilla de ternera A5 galardonada ubicada cerca de la estación de Takayama.",
              "locationQuery": "Ajikura Tengoku Takayama"
            },
            {
              "id": "rest-12-2",
              "name": "Brochetas en la calle de Takayama",
              "specialty": "Hida Beef Skewers",
              "recommendation": "Probar las brochetas de carne A5 recién hechas al carbón.",
              "locationQuery": "Takayama Old Town Street Food"
            }
          ]
        }
      ]
    },
    {
      "stage_id": 3,
      "name": "Kioto y Excursión a Nara",
      "subtitle": "Etapa 3",
      "dateRange": "2 – 6 Ene",
      "start_date": "2027-01-02",
      "end_date": "2027-01-06",
      "accommodations": [
        {
          "id": "hotel-5",
          "name": "Kamon Inn Toji Higashi",
          "kanjiName": "カモンイン 東寺東 (京都)",
          "japaneseAddress": "〒601-8428 京都府京都市南区東寺東門前町41",
          "englishAddress": "41 Tojihigashimonzencho, Minami Ward, Kyoto 601-8428",
          "check_in": "2027-01-02",
          "check_out": "2027-01-07",
          "nearestStation": "Estación Kintetsu Toji / Estación JR Kyoto"
        }
      ],
      "days": [
        {
          "dayIndex": 13,
          "date": "2027-01-02",
          "formattedDate": "Sábado, 2 de Enero de 2027",
          "shortDate": "2 Ene",
          "title": "Kioto (Zona Sur y Centro)",
          "location": "Kyoto",
          "accommodationId": "hotel-5",
          "activities": [
            {
              "id": "act-13-1",
              "title": "Templo Tō-ji",
              "locationQuery": "Toji Temple Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Templo Tō-ji y Torre de Kioto",
                            "subtitle": "02 de Enero • Kioto Sur",
                            "summary": "La pagoda de madera más alta de Japón (55 metros), construida en el siglo IX.",
                            "pills": [
                                          {
                                                        "label": "Patrimonio de la Humanidad",
                                                        "text": "Fundado en el año 796 al comienzo del período Heian, era la puerta de bienvenida este a la antigua capital imperial de Kioto.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Contraste Único",
                                                        "text": "Desde sus jardines podéis ver el contraste entre la pagoda clásica del siglo IX y la moderna Torre de Kioto recortada en el cielo.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-13-2",
              "title": "Santuario Fushimi Inari-taisha",
              "locationQuery": "Fushimi Inari Taisha Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Fushimi Inari-taisha",
                            "subtitle": "02 de Enero • Kioto Sur 🦊",
                            "summary": "El santuario dedicado a Inari, la deidad del arroz, la agricultura y los negocios, famoso por sus túneles de más de 10.000 puertas Torii rojas (Senbon Torii).",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Veréis cientos de estatuas de zorros (Kitsune), los mensajeros sagrados de Inari. Muchos llevan llaves o pergaminos en la boca.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Misión Kawaii",
                                                        "text": "Buscar las estatuas de zorritos que llevan baberos rojos tradicionales atados al cuello.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-13-3",
              "title": "Templo Tōfuku-ji (Puerta Kusaka)",
              "locationQuery": "Tofukuji Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-13-4",
              "title": "Sanjūsangen-dō (1001 estatuas)",
              "locationQuery": "Sanjusangendo Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Templo Sanjūsangen-dō",
                            "subtitle": "02 de Enero • Kioto Sur",
                            "summary": "El edificio de madera más largo de Japón, que alberga en su interior 1.001 estatuas de tamaño real de Kannon (la diosa de la misericordia), talladas a mano en madera y cubiertas de pan de oro.",
                            "pills": [
                                          {
                                                        "label": "Dato Sorprendente",
                                                        "text": "¡No hay dos caras iguales! Se dice que si miras con atención, encontrarás una estatua que se parece a ti o a alguien que conoces.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Arquitectura Mítica",
                                                        "text": "Mide 120 metros de longitud y cuenta con 33 espacios entre columnas (Sanjūsangen) que representan las 33 manifestaciones de la diosa.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-13-5",
              "title": "Templo Higashi Honganji",
              "locationQuery": "Higashi Honganji Kyoto",
              "type": "sights"
            },
            {
              "id": "act-13-6",
              "title": "Templo Nishi-Honganji",
              "locationQuery": "Nishi Honganji Kyoto",
              "type": "sights"
            },
            {
              "id": "act-13-7",
              "title": "Torre de Kioto",
              "locationQuery": "Kyoto Tower",
              "type": "sights"
            },
            {
              "id": "act-13-8",
              "title": "Estación de Kioto",
              "locationQuery": "Kyoto Station",
              "type": "transit"
            }
          ],
          "shops": [
            {
              "id": "shop-13-1",
              "name": "Kyoto Station Porta Underground Mall",
              "category": "Moda & Recuerdos de Kioto",
              "note": "Centro comercial subterráneo repleto de dulces Yatsuhashi y artesanía.",
              "locationQuery": "Kyoto Station Porta"
            }
          ],
          "restaurants": [
            {
              "id": "rest-13-1",
              "name": "Katsukura Kyoto Porta",
              "specialty": "Tonkotsu & Tonkatsu de Cerdo Premium",
              "recommendation": "Uno de los mejores empanados tonkatsu de Kioto con sésamo molido.",
              "locationQuery": "Katsukura Kyoto Porta"
            },
            {
              "id": "rest-13-2",
              "name": "Sushi no Musashi (Estación de Kioto)",
              "specialty": "Kaitenzushi (Sushi en cinta transportadora)",
              "recommendation": "Sushi fresco, rápido y sabroso dentro del pasillo de la estación.",
              "locationQuery": "Sushi no Musashi Kyoto Station"
            }
          ]
        },
        {
          "dayIndex": 14,
          "date": "2027-01-03",
          "formattedDate": "Domingo, 3 de Enero de 2027",
          "shortDate": "3 Ene",
          "title": "Kioto (Norte y Arashiyama)",
          "location": "Kyoto",
          "accommodationId": "hotel-5",
          "activities": [
            {
              "id": "act-14-1",
              "title": "Pabellón Dorado (Kinkaku-ji)",
              "locationQuery": "Kinkaku-ji Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Pabellón Dorado (Kinkaku-ji)",
                            "subtitle": "03 de Enero • Arashiyama / Norte 🌟",
                            "summary": "Un templo zen cuyas dos plantas superiores están totalmente cubiertas con hojas de oro puro, reflejándose sobre el estanque Espejo.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "Construido originalmente a finales del siglo XIV como villa de descanso del shōgun Ashikaga Yoshimitsu.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii / Misión",
                                                        "text": "¡Buscad la estatua del ave Fénix dorada de bronce colocada en lo alto del tejado superior que brilla con el sol!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-14-2",
              "title": "Jardín zen de Ryōan-ji",
              "locationQuery": "Ryoan-ji Temple Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Jardín Zen de Ryōan-ji",
                            "subtitle": "03 de Enero • Arashiyama / Norte",
                            "summary": "El jardín seco (Karesansui) más famoso del mundo, compuesto únicamente por grava blanca rastrillada y 15 piedras rodeadas de musgo.",
                            "pills": [
                                          {
                                                        "label": "El Enigma de las Piedras",
                                                        "text": "Desde cualquier punto del porche donde te sientes, solo podrás ver 14 piedras a la vez. Una piedra siempre queda oculta, simbolizando que la perfección humana es inalcanzable.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Misión de Meditación",
                                                        "text": "Sentaos en el porche de madera en completo orden e intentad descubrir desde qué ángulo podéis adivinar dónde está oculta la piedra número 15.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-14-3",
              "title": "Templo Ninna-ji",
              "locationQuery": "Ninna-ji Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-14-4",
              "title": "Templo Tenryū-ji",
              "locationQuery": "Tenryu-ji Temple Arashiyama",
              "type": "sights",
              "learnInfo": {
                            "title": "Bosque de Bambú de Arashiyama y Templo Tenryū-ji",
                            "subtitle": "03 de Enero • Arashiyama",
                            "summary": "Un sendero mágico flanqueado por miles de tallos gigantes de bambú verde que se mecen con el viento.",
                            "pills": [
                                          {
                                                        "label": "Sonido Protegido",
                                                        "text": "El susurro de los tallos de bambú al chocar suavemente con la brisa está catalogado entre los '100 sonidos a preservar en Japón'.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Misión Verde",
                                                        "text": "Caminar despacio alzando la mirada hacia el dosel verde de bambú que filtra la luz del sol.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-14-5",
              "title": "Parque Kameyama",
              "locationQuery": "Kameyama Park Arashiyama",
              "type": "sights"
            },
            {
              "id": "act-14-6",
              "title": "Santuario Nonomiya",
              "locationQuery": "Nonomiya Shrine Arashiyama",
              "type": "sights"
            },
            {
              "id": "act-14-7",
              "title": "Templo Jōjakkō-ji",
              "locationQuery": "Jojakko-ji Temple Arashiyama",
              "type": "sights"
            },
            {
              "id": "act-14-8",
              "title": "Templo Seiryō-ji",
              "locationQuery": "Seiryo-ji Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-14-9",
              "title": "Templo Giō-ji",
              "locationQuery": "Gio-ji Temple Arashiyama",
              "type": "sights"
            },
            {
              "id": "act-14-10",
              "title": "Calle conservada Saga Toriimoto",
              "locationQuery": "Saga Toriimoto Preserved Street",
              "type": "sights"
            },
            {
              "id": "act-14-11",
              "title": "Templo Otagi Nenbutsu-ji",
              "locationQuery": "Otagi Nenbutsu-ji Temple",
              "type": "sights",
              "learnInfo": {
                            "title": "Templo Otagi Nenbutsu-ji",
                            "subtitle": "03 de Enero • Arashiyama",
                            "summary": "Un templo escondido en la montaña con 1.200 estatuas de piedra de discípulos de Buda (Rakan).",
                            "pills": [
                                          {
                                                        "label": "Dato Kawaii/Divertido",
                                                        "text": "Las estatuas fueron esculpidas por ciudadanos normales en los años 80 y cada una tiene una expresión cómica o entrañable: una está bebiendo sake, otra sostiene una cámara de fotos y otra sonríe con un gato en brazos.",
                                                        "type": "funFact"
                                          },
                                          {
                                                        "label": "Misión para Lily y James",
                                                        "text": "¡Buscad entre los musgos la figura esculpida del discípulo que sostiene felizmente a un gatito en brazos!",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-14-12",
              "title": "Santuario Toriimotohachimangu",
              "locationQuery": "Toriimoto Hachiman Shrine",
              "type": "sights"
            },
            {
              "id": "act-14-13",
              "title": "Templo Daikaku-ji",
              "locationQuery": "Daikaku-ji Temple Kyoto",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-14-1",
              "name": "Tiendas de artesanía en Arashiyama",
              "category": "Artesanía de Bambú",
              "note": "Abanicos, palillos y artículos hechos con bambú de Arashiyama.",
              "locationQuery": "Arashiyama Shopping Street"
            }
          ],
          "restaurants": [
            {
              "id": "rest-14-1",
              "name": "Steak Otsuka",
              "specialty": "Cortes de Ternera Japonesa A5 / Murasawa Beef",
              "recommendation": "Restaurante de carne icónico cerca de la estación de Saga-Arashiyama.",
              "locationQuery": "Steak Otsuka Arashiyama"
            },
            {
              "id": "rest-14-2",
              "name": "% Arabica Kyoto Arashiyama",
              "specialty": "Café de Especialidad con Vistas al Río",
              "recommendation": "Tomar un café espresso helado frente al puente Togetsukyo.",
              "locationQuery": "Arabica Kyoto Arashiyama"
            }
          ]
        },
        {
          "dayIndex": 15,
          "date": "2027-01-04",
          "formattedDate": "Lunes, 4 de Enero de 2027",
          "shortDate": "4 Ene",
          "title": "Kioto (Paseo del Filósofo y Higashiyama Norte)",
          "location": "Kyoto",
          "accommodationId": "hotel-5",
          "activities": [
            {
              "id": "act-15-1",
              "title": "Pabellón de Plata (Ginkaku-ji)",
              "locationQuery": "Ginkaku-ji Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Pabellón de Plata (Ginkaku-ji)",
                            "subtitle": "04 de Enero • Higashiyama Norte",
                            "summary": "El templo hermano del Pabellón Dorado. Aunque se proyectó para cubrirse de plata, nunca se llegó a recubrir, creando la estética japonesa del Wabi-sabi (encontrar la belleza en la simplicidad e imperfección).",
                            "pills": [
                                          {
                                                        "label": "Filosofía Wabi-sabi",
                                                        "text": "Representa la belleza de la sobriedad, la elegancia natural y el paso del tiempo expresados en sus jardines de arena y musgo.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Dato Asombroso",
                                                        "text": "El cono de arena blanca rastrillada (Kōgetsudai) en el jardín está diseñado para reflejar la luz dorada de la luna llena.",
                                                        "type": "historical"
                                          }
                            ]
              }
            },
            {
              "id": "act-15-2",
              "title": "Paseo del Filósofo",
              "locationQuery": "Philosopher's Path Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Paseo del Filósofo y Templo Eikan-dō",
                            "subtitle": "04 de Enero • Higashiyama Norte",
                            "summary": "Un tranquilo camino junto a un canal empedrado arbolado que usaba el filósofo Nishida Kitaro para meditar.",
                            "pills": [
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "Discurre a lo largo de 2 kilómetros al pie de las colinas de Higashiyama, conectando pintorescos templos bajo los árboles.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Píldora Kawaii",
                                                        "text": "A lo largo del canal podréis cruzar pequeños puentes de piedra y saludar a los simpáticos patos del canal.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-15-3",
              "title": "Templo Hōnen-in",
              "locationQuery": "Honen-in Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-15-4",
              "title": "Mausoleo del Emperador Reizei",
              "locationQuery": "Emperor Reizei Tomb Kyoto",
              "type": "sights"
            },
            {
              "id": "act-15-5",
              "title": "Templo Kōun-ji",
              "locationQuery": "Koun-ji Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-15-6",
              "title": "Santuario Kumanonyakuōji",
              "locationQuery": "Kumano Nyakuoji Shrine Kyoto",
              "type": "sights"
            },
            {
              "id": "act-15-7",
              "title": "Templo Eikan-dō (Zenrin-ji)",
              "locationQuery": "Eikan-do Zenrin-ji Kyoto",
              "type": "sights"
            },
            {
              "id": "act-15-8",
              "title": "Complejo Nanzen-ji",
              "locationQuery": "Nanzen-ji Temple Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Complejo Nanzen-ji y el Acueducto de Ladrillo",
                            "subtitle": "04 de Enero • Higashiyama Norte",
                            "summary": "Un imponente templo zen que esconde en su jardín posterior un auténtico acueducto de ladrillo rojo de estilo romano (Suirokaku) construido en 1890.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Fue construido en el período Meiji para canalizar agua potable desde el Lago Biwa hasta Kioto integrándose con la arquitectura del templo.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Misión Fotográfica",
                                                        "text": "Explorar los grandes arcos de ladrillo rojo y ver correr el agua clara por el canal superior.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-15-9",
              "title": "Santuario Heian Jingū",
              "locationQuery": "Heian Shrine Kyoto",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-15-1",
              "name": "Tiendas del Paseo del Filósofo",
              "category": "Cerámica y Té Verde",
              "note": "Pequeñas galerías artesanales de cerámica Kiyomizu-yaki.",
              "locationQuery": "Philosopher's Path Kyoto"
            }
          ],
          "restaurants": [
            {
              "id": "rest-15-1",
              "name": "Omen Ginkaku-ji",
              "specialty": "Udon Tradicional",
              "recommendation": "Fideos udon servidos con caldo caliente y verduras de estación de Kioto.",
              "locationQuery": "Omen Ginkakuji Kyoto"
            },
            {
              "id": "rest-15-2",
              "name": "Kyoudon Kisoba Okakita",
              "specialty": "Udon & Soba",
              "recommendation": "Excelente restaurante de fideos caseros junto al canal.",
              "locationQuery": "Okakita Kyoto"
            }
          ]
        },
        {
          "dayIndex": 16,
          "date": "2027-01-05",
          "formattedDate": "Martes, 5 de Enero de 2027",
          "shortDate": "5 Ene",
          "title": "Excursión a Nara y Kioto (Castillo Nijō)",
          "location": "Kyoto",
          "accommodationId": "hotel-5",
          "activities": [
            {
              "id": "act-16-1",
              "title": "Estación de Nara",
              "locationQuery": "Nara Station",
              "type": "transit"
            },
            {
              "id": "act-16-2",
              "title": "Templo Kōfuku-ji (Nara)",
              "locationQuery": "Kofuku-ji Temple Nara",
              "type": "sights"
            },
            {
              "id": "act-16-3",
              "title": "Jardín Yoshikien (Nara)",
              "locationQuery": "Yoshikien Garden Nara",
              "type": "sights"
            },
            {
              "id": "act-16-4",
              "title": "Jardín Isuien (Nara)",
              "locationQuery": "Isuien Garden Nara",
              "type": "sights"
            },
            {
              "id": "act-16-5",
              "title": "Gran puerta Nandaimon (Nara)",
              "locationQuery": "Nandaimon Gate Todaiji Nara",
              "type": "sights"
            },
            {
              "id": "act-16-6",
              "title": "Templo Tōdai-ji - Gran Buda (Nara)",
              "locationQuery": "Todai-ji Great Buddha Nara",
              "type": "sights",
              "learnInfo": {
                            "title": "Gran Templo Tōdai-ji y el Gran Buda (Daibutsu)",
                            "subtitle": "05 de Enero • Nara 🦌",
                            "summary": "Una de las estructuras de madera más grandes del mundo, que custodia en su interior una colosal estatua de bronce de Buda de 15 metros de altura y 500 toneladas.",
                            "pills": [
                                          {
                                                        "label": "Misión para Lily y James",
                                                        "text": "En la parte trasera hay una columna de madera con un agujero en la base. Dice la leyenda que quien logre atravesar el agujero (que tiene el mismo tamaño que un orificio de la nariz del Gran Buda) obtendrá la iluminación y buena suerte eterna.",
                                                        "type": "funFact"
                                          },
                                          {
                                                        "label": "Dato Histórico",
                                                        "text": "El edificio principal (Daibutsuden) se construyó originalmente en el año 752 y ha sido reconstruido tras superar terremotos e incendios.",
                                                        "type": "historical"
                                          }
                            ]
              }
            },
            {
              "id": "act-16-7",
              "title": "Parque de Nara",
              "locationQuery": "Nara Park",
              "type": "sights",
              "learnInfo": {
                            "title": "Parque de Nara y sus Ciervos Sagrados (Sika)",
                            "subtitle": "05 de Enero • Nara 🦌",
                            "summary": "Un enorme parque donde conviven en libertad más de 1.200 ciervos sika.",
                            "pills": [
                                          {
                                                        "label": "Dato de Etiqueta/Kawaii",
                                                        "text": "Los ciervos son considerados mensajeros de los dioses shintoístas. ¡Han aprendido a inclinarse (hacer una reverencia) cuando les enseñas una galleta especial (Shika-senbei)!",
                                                        "type": "etiquette"
                                          },
                                          {
                                                        "label": "Misión Ciervo de Nara",
                                                        "text": "Haced una leve inclinación con la cabeza ante un ciervo tranquilo para ver cómo responde con una reverencia educada.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-16-8",
              "title": "Santuario Kasuga-taisha (Nara)",
              "locationQuery": "Kasuga Taisha Nara",
              "type": "sights",
              "learnInfo": {
                            "title": "Santuario Kasuga-taisha y Naramachi",
                            "subtitle": "05 de Enero • Nara 🦌",
                            "summary": "El santuario del bosque famoso por sus más de 3.000 linternas de piedra y bronce, seguido del histórico barrio de casas de comerciantes Naramachi.",
                            "pills": [
                                          {
                                                        "label": "Dato Curioso",
                                                        "text": "Caminitos de musgo serpentean entre miles de linternas de piedra cubiertas de musgo donadas por devotos durante siglos.",
                                                        "type": "cultural"
                                          },
                                          {
                                                        "label": "Barrio Tradicional",
                                                        "text": "En las calles de Naramachi podéis ver colgados de los tejados los amuletos rojos Migawari-zaru con forma de monitos.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-16-9",
              "title": "Templo Shin-Yakushiji Jizodo (Nara)",
              "locationQuery": "Shin-Yakushiji Temple Nara",
              "type": "sights"
            },
            {
              "id": "act-16-10",
              "title": "Residencia histórica Imanishi-ke Shoin (Nara)",
              "locationQuery": "Imanishi-ke Shoin Nara",
              "type": "sights"
            },
            {
              "id": "act-16-11",
              "title": "Museo Naramachi (Nara)",
              "locationQuery": "Naramachi Museum Nara",
              "type": "culture"
            },
            {
              "id": "act-16-12",
              "title": "Casa machiya Naramachi Koshino Ie (Nara)",
              "locationQuery": "Naramachi Koshi-no-Ie",
              "type": "culture"
            },
            {
              "id": "act-16-13",
              "title": "Templo Gangō-ji (Nara)",
              "locationQuery": "Gango-ji Temple Nara",
              "type": "sights"
            },
            {
              "id": "act-16-14",
              "title": "Castillo Nijō (Kioto - Tarde)",
              "locationQuery": "Nijo Castle Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Castillo Nijō (Kioto - Visita de Tarde)",
                            "subtitle": "05 de Enero • Kioto 🗡️",
                            "summary": "El palacio residencia de los shōgunes Tokugawa en Kioto.",
                            "pills": [
                                          {
                                                        "label": "Dato de Seguridad Ninja",
                                                        "text": "Los pasillos del palacio tienen 'Suelos de Ruiseñor' (Uguisubari). Las maderas están diseñadas con clavos metálicos especiales que gimen imitando el canto de un pájaro cuando alguien camina sobre ellas, alertando a los guardias ante la presencia de asesinos ninja.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Misión Escucha Ninja",
                                                        "text": "Caminar despacio sobre el suelo de madera de los pasillos del Palacio Ninomaru para escuchar los 'trinos' del ruiseñor.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-16-1",
              "name": "Calle Comercial Higashimuki (Nara)",
              "category": "Souvenirs de Nara",
              "note": "Galletones Shika-senbei para los ciervos y recuerdos de madera.",
              "locationQuery": "Higashimuki Shopping Street Nara"
            },
            {
              "id": "shop-16-2",
              "name": "Harushika Sake Brewery (Nara)",
              "category": "Cata de Sake",
              "note": "Cata de 5 tipos de sake de Nara por solo 500 yenes.",
              "locationQuery": "Harushika Sake Brewery Nara"
            }
          ],
          "restaurants": [
            {
              "id": "rest-16-1",
              "name": "Nakatanidou (Nara)",
              "specialty": "Mochi Tradicional Machacado en Directo",
              "recommendation": "Ver el espectáculo del machacado de mochi super rápido y comerlo caliente.",
              "locationQuery": "Nakatanidou Nara"
            },
            {
              "id": "rest-16-2",
              "name": "Maguro Koya (Nara)",
              "specialty": "Donburi de Atún",
              "recommendation": "Boles de arroz con atún de máxima calidad gestionado por un matrimonio entrañable.",
              "locationQuery": "Maguro Koya Nara"
            }
          ]
        },
        {
          "dayIndex": 17,
          "date": "2027-01-06",
          "formattedDate": "Miércoles, 6 de Enero de 2027",
          "shortDate": "6 Ene",
          "title": "Kioto (Higashiyama Sur, Gion y Pontocho)",
          "location": "Kyoto",
          "accommodationId": "hotel-5",
          "activities": [
            {
              "id": "act-17-1",
              "title": "Templo Kiyomizu-dera",
              "locationQuery": "Kiyomizu-dera Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Templo Kiyomizu-dera",
                            "subtitle": "06 de Enero • Higashiyama Sur",
                            "summary": "Templo construido en el año 778 sobre un acantilado, famoso por su gran terraza sostenida por 139 columnas de madera ensambladas sin un solo clavo.",
                            "pills": [
                                          {
                                                        "label": "Las Tres Caídas de Otowa",
                                                        "text": "En la base del templo brotan tres chorros de agua sagrada. Beber de uno da salud, del otro éxito en los estudios y del tercero amor. ¡Pero solo puedes beber de uno! Si bebes de los tres, los dioses te castigarán por codicioso.",
                                                        "type": "historical"
                                          },
                                          {
                                                        "label": "Misión de Sabiduría",
                                                        "text": "Elegid cuál de los tres chorros queréis probar usando los cazos de largo mango metálico desinfectados con UV.",
                                                        "type": "funFact"
                                          }
                            ]
              }
            },
            {
              "id": "act-17-2",
              "title": "Honke Nishio Yatsuhashi",
              "locationQuery": "Honke Nishio Yatsuhashi Kiyomizu",
              "type": "shopping"
            },
            {
              "id": "act-17-3",
              "title": "Cuesta histórica Sannenzaka",
              "locationQuery": "Sannenzaka Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Cuestas Históricas Sannenzaka y Ninenzaka",
                            "subtitle": "06 de Enero • Higashiyama Sur",
                            "summary": "Preciosas calles peatonales empedradas con casas tradicionales de madera, tiendas de té y artesanía.",
                            "pills": [
                                          {
                                                        "label": "Superstición Divertida",
                                                        "text": "La leyenda dice que si tropiezas en la cuesta Ninenzaka, tendrás dos años de mala suerte... ¡a menos que compres una calabaza de madera en las tiendas de la calle para anular el hechizo!",
                                                        "type": "funFact"
                                          },
                                          {
                                                        "label": "Tradición e Historias",
                                                        "text": "Paseo flanqueado por casas Machiya tradicionales conservadas desde el período Edo.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-17-4",
              "title": "Cuesta histórica Ninenzaka",
              "locationQuery": "Ninenzaka Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Cuesta histórica Ninenzaka",
                            "subtitle": "06 de Enero • Higashiyama Sur",
                            "summary": "Calle empedrada histórica con tiendas de artesanía, té tradicional y casas de madera centenarias.",
                            "pills": [
                                          {
                                                        "label": "Leyenda de la Calabaza",
                                                        "text": "Si tropiezas en sus escalones, busca rápidamente una calabaza de madera Hyoutan en los escaparates para protegerte de la racha de mala suerte.",
                                                        "type": "funFact"
                                          },
                                          {
                                                        "label": "Pausa Kawaii",
                                                        "text": "Aquí se encuentra el icónico Starbucks de Ninenzaka donde se toma el café en salones con tatami tradicional.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-17-5",
              "title": "Estatua Ryozen Kannon",
              "locationQuery": "Ryozen Kannon Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-6",
              "title": "Templo Kōdai-ji",
              "locationQuery": "Kodai-ji Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-7",
              "title": "Templo zen Entoku-in",
              "locationQuery": "Entoku-in Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-8",
              "title": "Santuario Yasaka",
              "locationQuery": "Yasaka Shrine Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-9",
              "title": "Templo Chion-in",
              "locationQuery": "Chion-in Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-10",
              "title": "Templo Shōren-in Monzeki",
              "locationQuery": "Shoren-in Temple Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-11",
              "title": "Jardín Choontei",
              "locationQuery": "Choontei Garden Kyoto",
              "type": "sights"
            },
            {
              "id": "act-17-12",
              "title": "Calle Hanamikoji",
              "locationQuery": "Hanamikoji Street Gion Kyoto",
              "type": "sights",
              "learnInfo": {
                            "title": "Barrio de Gion (Hanamikoji) y Callejón Pontocho",
                            "subtitle": "06 de Enero • Gion",
                            "summary": "El legendario barrio de las Geishas (Geiko) y aprendices (Maiko).",
                            "pills": [
                                          {
                                                        "label": "Dato de Respeto",
                                                        "text": "Las Geishas no son artistas de disfraz, sino maestras de las artes tradicionales japonesas. No se las debe tocar ni perseguir para fotos.",
                                                        "type": "etiquette"
                                          },
                                          {
                                                        "label": "Atmósfera Nocturna",
                                                        "text": "En el callejón Pontocho podéis ver los farolillos de papel rojo encendidos reflejándose sobre los suelos de piedra junto al río Kamogawa.",
                                                        "type": "cultural"
                                          }
                            ]
              }
            },
            {
              "id": "act-17-13",
              "title": "Teatro Miyagawacho Kaburenjo",
              "locationQuery": "Miyagawacho Kaburenjo Theatre Kyoto",
              "type": "culture"
            },
            {
              "id": "act-17-14",
              "title": "Callejón Pontocho",
              "locationQuery": "Pontocho Alley Kyoto",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-17-1",
              "name": "Donguri Kyowakoku (Ghibli Shop Ninenzaka)",
              "category": "Tienda Oficial Studio Ghibli",
              "note": "Ubicada en una casa machiya histórica con Totoro en la puerta.",
              "locationQuery": "Donguri Kyowakoku Ninenzaka"
            },
            {
              "id": "shop-17-2",
              "name": "Nintendo KYOTO",
              "category": "Tienda Oficial Nintendo",
              "note": "Tienda oficial en el centro de Kioto con la estatua de Mario en el tejado.",
              "locationQuery": "Nintendo KYOTO Takashimaya"
            }
          ],
          "restaurants": [
            {
              "id": "rest-17-1",
              "name": "Starbucks Coffee Kyoto Ninenzaka Yasaka Chaya",
              "specialty": "Cafetería en Casa Machiya Tradicional",
              "recommendation": "El único Starbucks del mundo donde te sientas en tatami sin zapatos.",
              "locationQuery": "Starbucks Ninenzaka Kyoto"
            },
            {
              "id": "rest-17-2",
              "name": "Gion Tanto",
              "specialty": "Okonomiyaki & Monjayaki",
              "recommendation": "Restaurante con vistas al canal de Shirakawa en Gion.",
              "locationQuery": "Gion Tanto Kyoto"
            },
            {
              "id": "rest-17-3",
              "name": "Gyoza Hohei",
              "specialty": "Gyozas de Gion",
              "recommendation": "Gyozas crujientes recomendadas por la guía Michelin en pleno Gion.",
              "locationQuery": "Gyoza Hohei Gion"
            }
          ]
        }
      ]
    },
    {
      "stage_id": 4,
      "name": "Osaka",
      "subtitle": "Etapa 4",
      "dateRange": "7 – 9 Ene",
      "start_date": "2027-01-07",
      "end_date": "2027-01-09",
      "accommodations": [
        {
          "id": "hotel-6",
          "name": "Henn na Hotel Osaka Shinsaibashi",
          "kanjiName": "変なホテル大阪 心斎橋",
          "japaneseAddress": "〒542-0081 大阪府大阪市中央区南船場3-5-2",
          "englishAddress": "3-5-2 Minamisenba, Chuo Ward, Osaka 542-0081",
          "check_in": "2027-01-07",
          "check_out": "2027-01-10",
          "nearestStation": "Estación Shinsaibashi (Osaka Metro Midosuji Line)"
        }
      ],
      "days": [
        {
          "dayIndex": 18,
          "date": "2027-01-07",
          "formattedDate": "Jueves, 7 de Enero de 2027",
          "shortDate": "7 Ene",
          "title": "Osaka (Castillo, Templos y Dōtonbori)",
          "location": "Osaka",
          "accommodationId": "hotel-6",
          "activities": [
            {
              "id": "act-18-1",
              "title": "Castillo Osaka",
              "locationQuery": "Osaka Castle",
              "type": "sights",
              "learnInfo": {
                "title": "Castillo de Osaka (Osaka-jō)",
                "subtitle": "07 de Enero • Osaka 🏯",
                "summary": "Una imponente fortaleza construida en 1583 por Toyotomi Hideyoshi, rodeada de fosos gigantes de agua y muros de piedra colosales.",
                "pills": [
                  {
                    "label": "Dato Curioso / Histórico",
                    "text": "Las piedras de las murallas son tan gigantescas que la más grande (llamada Tako-ishi o 'Piedra Pulpo') pesa casi 130 toneladas y fue llevada desde islas lejanas en barco.",
                    "type": "historical"
                  },
                  {
                    "label": "Misión Kawaii",
                    "text": "Buscar el adorno de oro en forma de pez con cabeza de tigre (Shachihoko) en los tejados del castillo, encargado de proteger el edificio contra los incendios.",
                    "type": "funFact"
                  },
                  {
                    "label": "Patrimonio de Osaka",
                    "text": "El gran torreón central de 8 pisos alberga un museo sobre la historia de los samuráis y ofrece vistas panorámicas de toda la ciudad.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-18-2",
              "title": "Shitennō-ji",
              "locationQuery": "Shitennoji Temple Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Templo Shitennō-ji",
                "subtitle": "07 de Enero • Osaka ⛩️",
                "summary": "El primer templo budista financiado por el estado en Japón, fundado en el año 593 por el venerado Príncipe Shōtoku.",
                "pills": [
                  {
                    "label": "Historia Milenaria",
                    "text": "Fundado a finales del siglo VI, mantiene el trazado simétrico Asuka-style con su pagoda rectilínea de cinco pisos.",
                    "type": "historical"
                  },
                  {
                    "label": "Misión / Dato Curioso",
                    "text": "En el estanque Kame-ike habitan decenas de tortugas tomando el sol, consideradas en Japón símbolo de longevidad y buena fortuna.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-18-3",
              "title": "Ukiniwa Bridge",
              "locationQuery": "Ukiniwa Bridge Osaka",
              "type": "sights"
            },
            {
              "id": "act-18-4",
              "title": "Daikoku Bridge",
              "locationQuery": "Daikoku Bridge Osaka",
              "type": "sights"
            },
            {
              "id": "act-18-5",
              "title": "Ebisu Bridge",
              "locationQuery": "Ebisubashi Bridge Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Puente Ebisu y Cartel de Glico Man",
                "subtitle": "07 de Enero • Osaka 🏃‍♂️",
                "summary": "El icónico puente peatonal sobre el canal Dōtonbori, famoso por ofrecer la mejor vista del histórico cartel del corredor de Glico.",
                "pills": [
                  {
                    "label": "Misión Fotográfica",
                    "text": "¡Imprescindible hacerse la foto clásica en el Puente Ebisu imitando la pose de brazos en alto de Glico Man!",
                    "type": "funFact"
                  },
                  {
                    "label": "Píldora Gastronómica",
                    "text": "Desde aquí se accede directamente a los mejores puestos de Takoyaki y Okonomiyaki de la ciudad.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-18-6",
              "title": "Dōtonbori",
              "locationQuery": "Dotonbori Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Dōtonbori y la Magia Nocturna de Osaka",
                "subtitle": "07 de Enero • Osaka 🌃",
                "summary": "El canal más efervescente de Osaka, famoso por sus neones gigantes, esculturas animadas en fachadas y ambiente festivo.",
                "pills": [
                  {
                    "label": "Píldora Gastronómica",
                    "text": "Osaka es la capital del Takoyaki (bolitas de masa rellenas de pulpo preparadas en planchas con huecos semicirculares) y del Okonomiyaki (la deliciosa tortilla japonesa).",
                    "type": "cultural"
                  },
                  {
                    "label": "Espíritu Kuidaore",
                    "text": "Kuidaore es el famoso dicho de Osaka que significa 'comer hasta reventar o arruinarse disfrutando de la buena comida'.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-18-7",
              "title": "Kani Doraku Dotombori",
              "locationQuery": "Kani Doraku Dotombori",
              "type": "sights"
            },
            {
              "id": "act-18-8",
              "title": "Ukiyo Koji",
              "locationQuery": "Ukiyo Koji Dotonbori",
              "type": "sights"
            },
            {
              "id": "act-18-9",
              "title": "Hozen-ji",
              "locationQuery": "Hozenji Temple Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Templo Hozen-ji y Buda Mizukake Fudo",
                "subtitle": "07 de Enero • Osaka 🍃",
                "summary": "Un santuario recogido en mitad del bullicioso centro que oculta la estatua del Buda Mizukake Fudo completamente cubierta de musgo verde.",
                "pills": [
                  {
                    "label": "Dato Tradicional",
                    "text": "Para pedir un deseo o buena suerte para la familia, no se echan monedas: ¡se le echa agua por encima a la estatua con un cazo de madera!",
                    "type": "cultural"
                  },
                  {
                    "label": "Píldora Kawaii",
                    "text": "El vertido constante de agua por parte de los devotos durante décadas ha hecho que el Buda parezca un mullido muñeco de terciopelo verde.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-18-10",
              "title": "Hozenji Yokocho",
              "locationQuery": "Hozenji Yokocho Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Callejón Histórico Hozenji Yokocho",
                "subtitle": "07 de Enero • Osaka 🏮",
                "summary": "Un pintoresco callejón empedrado flanqueado por farolillos de papel y tabernas tradicionales que conserva la atmósfera clásica del Japón antiguo.",
                "pills": [
                  {
                    "label": "Patrimonio Urbano",
                    "text": "Un remanso de paz con suelo de piedra de ochenta metros de largo que contrasta con los neones del canal Dōtonbori.",
                    "type": "historical"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-18-1",
              "name": "Don Quijote Dotonbori (con Noria Ferris Wheel)",
              "category": "Tax Free & Compras",
              "note": "Tienda megagigante junto al canal con la noria Ebisu Tower.",
              "locationQuery": "Don Quijote Dotonbori"
            }
          ],
          "restaurants": [
            {
              "id": "rest-18-1",
              "name": "Takoyaki Wanaka Dotonbori",
              "specialty": "Takoyaki (Bolas de pulpo)",
              "recommendation": "El takoyaki más famoso y crujiente de Osaka.",
              "locationQuery": "Takoyaki Wanaka Dotonbori"
            },
            {
              "id": "rest-18-2",
              "name": "Kukuru Dotonbori",
              "specialty": "Takoyaki gigante",
              "recommendation": "Famoso por el pulpo gigante saliendo de la fachada.",
              "locationQuery": "Takoyaki Dotonbori Kukuru"
            },
            {
              "id": "rest-18-3",
              "name": "Okonomiyaki Houzenji Sanpei",
              "specialty": "Okonomiyaki estilo Osaka",
              "recommendation": "Tortilla japonesa en plancha de hierro en el callejón Hozenji.",
              "locationQuery": "Okonomiyaki Houzenji Sanpei"
            }
          ]
        },
        {
          "dayIndex": 19,
          "date": "2027-01-08",
          "formattedDate": "Viernes, 8 de Enero de 2027",
          "shortDate": "8 Ene",
          "title": "Osaka (Mercados, Otaku y Shinsekai)",
          "location": "Osaka",
          "accommodationId": "hotel-6",
          "activities": [
            {
              "id": "act-19-1",
              "title": "Kuromon Market",
              "locationQuery": "Kuromon Market Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Mercado Kuromon (La Cocina de Osaka)",
                "subtitle": "08 de Enero • Osaka 🦀",
                "summary": "Un mercado cubierto con más de 600 metros de puestos de brochetas de marisco, fruta fresca gigante y brochetas de carne Wagyu.",
                "pills": [
                  {
                    "label": "Historia Gastronómica",
                    "text": "Conocido históricamente como 'Kuromon Ichiba' (Mercado de la Puerta Negra) por la antigua puerta del cercano templo Enmyoji.",
                    "type": "historical"
                  },
                  {
                    "label": "Misión Kawaii",
                    "text": "Probar las brochetas de fruta fresca gigante con las famosas fresas blancas y rojas de prefecturas japonesas.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-19-2",
              "title": "Ota Road",
              "locationQuery": "Nipponbashi Ota Road Osaka",
              "type": "shopping",
              "learnInfo": {
                "title": "Ota Road (Nipponbashi)",
                "subtitle": "08 de Enero • Osaka 🎮",
                "summary": "El equivalente a Akihabara en el oeste de Japón: calles llenas de tiendas de anime, videojuegos retro, maquetas y mangas de colección.",
                "pills": [
                  {
                    "label": "Cultura Pop & Gaming",
                    "text": "El epicentro otaku de Kansai con tiendas de varias plantas repletas de gashapones, cartas Pokémon y figuras de colección.",
                    "type": "funFact"
                  },
                  {
                    "label": "Nostalgia Gamer",
                    "text": "Encontraréis consolas Famicom, Game Boy y juegos vintage en estado impecable.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-19-3",
              "title": "Nipponbashi Denden Town",
              "locationQuery": "Denden Town Nipponbashi Osaka",
              "type": "shopping",
              "learnInfo": {
                "title": "Nipponbashi Denden Town",
                "subtitle": "08 de Enero • Osaka 🔌",
                "summary": "El histórico distrito tecnológico y electrónico de Osaka especializado en componentes, herramientas de modelismo y tecnología.",
                "pills": [
                  {
                    "label": "Meca Tecnológica",
                    "text": "Nació como mercado de radio tras la Segunda Guerra Mundial y evolucionó hacia el centro otaku y tecnológico de Kansai.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-19-4",
              "title": "Namba Walk Forest Park",
              "locationQuery": "Namba Walk Osaka",
              "type": "sights"
            },
            {
              "id": "act-19-5",
              "title": "America-mura",
              "locationQuery": "Amerikamura Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "America-mura (Amemura)",
                "subtitle": "08 de Enero • Osaka 🗽",
                "summary": "El barrio de la cultura juvenil, moda urbana y tiendas vintage de Osaka.",
                "pills": [
                  {
                    "label": "Dato Divertido",
                    "text": "En lo alto de un edificio comercial de la plaza central veréis una réplica a pequeña escala de la Estatua de la Libertad.",
                    "type": "funFact"
                  },
                  {
                    "label": "Moda e Ilustración",
                    "text": "Nació en los años 70 como centro de moda importada de EE.UU. y hoy es la cuna del arte urbano y tiendas vintage de Osaka.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-19-6",
              "title": "BB Amemura / AMERICAN VILLAGE FREEMARKET",
              "locationQuery": "Amerikamura Vintage Market",
              "type": "shopping"
            },
            {
              "id": "act-19-7",
              "title": "Shinsaibashisuji",
              "locationQuery": "Shinsaibashisuji Shopping Street",
              "type": "shopping"
            },
            {
              "id": "act-19-8",
              "title": "Mitsugu (Mitsuhachimangu)",
              "locationQuery": "Mitsuhachimangu Shrine Osaka",
              "type": "sights"
            },
            {
              "id": "act-19-9",
              "title": "Calle comercial Shinsekai Hondori",
              "locationQuery": "Shinsekai Hondori Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Barrio Retro de Shinsekai",
                "subtitle": "08 de Enero • Osaka 🍢",
                "summary": "Un barrio nostálgico con estética retro de la Era Showa (años 50 y 60) dominado por la torre Tsūtenkaku.",
                "pills": [
                  {
                    "label": "Dato Gastronómico",
                    "text": "Cuna del Kushikatsu (brochetas empanadas fritas). Recordad la regla de oro: ¡Prohibido mojar la brocheta dos veces en la salsa común!",
                    "type": "funFact"
                  },
                  {
                    "label": "Atmósfera Nostálgica",
                    "text": "Diseñado en 1912 inspirándose mitad en París y mitad en Coney Island de Nueva York.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-19-10",
              "title": "Tsūtenkaku",
              "locationQuery": "Tsutenkaku Tower Osaka",
              "type": "sights",
              "learnInfo": {
                "title": "Torre Tsūtenkaku y Estatua de Billiken",
                "subtitle": "08 de Enero • Osaka 🌟",
                "summary": "La icónica torre de 103 metros símbolo de Osaka que alberga en su mirador la estatua dorada de Billiken.",
                "pills": [
                  {
                    "label": "El Dios de la Suerte",
                    "text": "Dentro de la torre vive la estatua de Billiken. La tradición dice que si le rascas la planta de los pies mientras pides un deseo, se cumplirá.",
                    "type": "cultural"
                  },
                  {
                    "label": "Dato Curioso",
                    "text": "Tsūtenkaku significa 'Torre que conduce al cielo'. Las luces de su cima pronostican el tiempo de mañana.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-19-11",
              "title": "Mercado Shin-sekai",
              "locationQuery": "Shinsekai Market Osaka",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-19-1",
              "name": "Gee Store / Gamers Nanba",
              "category": "Manga, Anime & Merch",
              "note": "El corazón otaku de Osaka en Nipponbashi Denden Town.",
              "locationQuery": "Gee Store Osaka"
            },
            {
              "id": "shop-19-2",
              "name": "Yellow Submarine Nanba",
              "category": "TCG & Juegos de Mesa",
              "note": "Cartas Pokémon, Yu-Gi-Oh! y juegos de mesa en Ota Road.",
              "locationQuery": "Yellow Submarine Nanba"
            },
            {
              "id": "shop-19-3",
              "name": "Pokémon Center Osaka DX & Pokémon Cafe",
              "category": "Tienda Oficial & Cafetería",
              "note": "En la planta 9 de Daimaru Shinsaibashi.",
              "locationQuery": "Pokémon Center Osaka DX"
            }
          ],
          "restaurants": [
            {
              "id": "rest-19-1",
              "name": "Kushikatsu Daruma Shinsekai",
              "specialty": "Kushikatsu (Brochetas empanadas fritas)",
              "recommendation": "Icono de Shinsekai. Recordar la regla de oro: ¡No mochar la salsa dos veces!",
              "locationQuery": "Kushikatsu Daruma Shinsekai"
            },
            {
              "id": "rest-19-2",
              "name": "Hokkyokusei Shinsaibashi Main Shop",
              "specialty": "Omurice (Arroz envuelto en tortilla suave)",
              "recommendation": "El restaurante donde se inventó el Omurice en Japón.",
              "locationQuery": "Hokkyokusei Shinsaibashi"
            },
            {
              "id": "rest-19-3",
              "name": "Kōgaryū Amerika-mura",
              "specialty": "Takoyaki estilo moderno",
              "recommendation": "Probar el takoyaki cubierto con salsa cebolleta y mayonesa.",
              "locationQuery": "Kogaryu Amerikamura"
            }
          ]
        },
        {
          "dayIndex": 20,
          "date": "2027-01-09",
          "formattedDate": "Sábado, 9 de Enero de 2027",
          "shortDate": "9 Ene",
          "title": "Universal Studios Japan",
          "location": "Osaka",
          "accommodationId": "hotel-6",
          "activities": [
            {
              "id": "act-20-1",
              "title": "Universal Studios Japan",
              "locationQuery": "Universal Studios Japan",
              "type": "theme_park",
              "learnInfo": {
                "title": "Universal Studios Japan: Super Nintendo World & Harry Potter",
                "subtitle": "09 de Enero • Osaka 🍄",
                "summary": "Día completo de diversión en USJ explorando Super Nintendo World y The Wizarding World of Harry Potter.",
                "pills": [
                  {
                    "label": "Misión Super Nintendo World",
                    "text": "Con las pulseras Power-Up Band, Lily y James podrán golpear bloques '?', conseguir monedas sonoras reales y enfrentarse a Bowser Jr. en atracciones interactiva de realidad aumentada.",
                    "type": "funFact"
                  },
                  {
                    "label": "The Wizarding World of Harry Potter",
                    "text": "El castillo de Hogwarts a tamaño real, el pueblo de Hogsmeade y las tiendas de varitas Ollivanders. ¡Obligatorio probar la Butterbeer (cerveza de mantequilla sin alcohol)!",
                    "type": "cultural"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-20-1",
              "name": "1-UP Factory (Super Nintendo World)",
              "category": "Merchandising Mario & Luigi",
              "note": "Gorros de Mario, objetos interactivos y peluches.",
              "locationQuery": "Super Nintendo World USJ"
            }
          ],
          "restaurants": [
            {
              "id": "rest-20-1",
              "name": "Kinopio's Cafe (Toadstool Cafe)",
              "specialty": "Comida Temática Super Mario",
              "recommendation": "Hamburguesa de champiñón y tarta de la Princesa Peach.",
              "locationQuery": "Kinopio's Cafe USJ"
            },
            {
              "id": "rest-20-2",
              "name": "Osaka Takoyaki Park (CityWalk)",
              "specialty": "Colección de los mejores Takoyakis de Osaka",
              "recommendation": "Probar 5 puestos famosos de takoyaki en un solo lugar al salir del parque.",
              "locationQuery": "Osaka Takoyaki Park"
            }
          ]
        }
      ]
    },
    {
      "stage_id": 5,
      "name": "Tokio (Segunda Parte) y Kamakura",
      "subtitle": "Etapa 5",
      "dateRange": "10 – 13 Ene",
      "start_date": "2027-01-10",
      "end_date": "2027-01-13",
      "accommodations": [
        {
          "id": "hotel-7",
          "name": "Hotel Vista Tokyo Tsukiji",
          "kanjiName": "ホテルビスタ東京築地",
          "japaneseAddress": "〒104-0045 東京都中央区築地4-15-1",
          "englishAddress": "4-15-1 Tsukiji, Chuo Ward, Tokyo 104-0045",
          "check_in": "2027-01-10",
          "check_out": "2027-01-13",
          "nearestStation": "Estación Tsukijishijo (Línea Toei Oedo) / Estación Tsukiji (Línea Hibiya)"
        }
      ],
      "days": [
        {
          "dayIndex": 21,
          "date": "2027-01-10",
          "formattedDate": "Domingo, 10 de Enero de 2027",
          "shortDate": "10 Ene",
          "title": "Tokio (Ginza, Tsukishima y Tsukuda)",
          "location": "Tokyo",
          "accommodationId": "hotel-7",
          "activities": [
            {
              "id": "act-21-1",
              "title": "Kabuki-za",
              "locationQuery": "Kabukiza Theatre Ginza",
              "type": "culture"
            },
            {
              "id": "act-21-2",
              "title": "Asahi Inari Shrine",
              "locationQuery": "Asahi Inari Shrine Ginza",
              "type": "sights"
            },
            {
              "id": "act-21-3",
              "title": "Seiko House Ginza Clock Tower",
              "locationQuery": "Seiko House Ginza Clock Tower",
              "type": "sights",
              "learnInfo": {
                "title": "Distrito de Ginza y Torre del Reloj Seiko House",
                "subtitle": "10 de Enero • Ginza 🕰️",
                "summary": "La zona comercial más elegante de Tokio, presidida por la icónica torre con reloj de estilo occidental construida en 1932.",
                "pills": [
                  {
                    "label": "Dato Histórico",
                    "text": "Ginza fue uno de los primeros barrios de Tokio en modernizarse tras la Restauración Meiji, caracterizándose por sus edificios de ladrillo de estilo occidental.",
                    "type": "historical"
                  },
                  {
                    "label": "Paseo Peatonal",
                    "text": "Los fines de semana la gran avenida principal de Chuo-dori se transforma en un 'Paraíso Peatonal' sin coches.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-21-4",
              "title": "Kakugo Inari Shrine",
              "locationQuery": "Kakugo Inari Shrine Ginza",
              "type": "sights"
            },
            {
              "id": "act-21-5",
              "title": "Ginza Lion Beer Hall (Ginza 7-chome)",
              "locationQuery": "Ginza Lion Beer Hall",
              "type": "food"
            },
            {
              "id": "act-21-6",
              "title": "Toyoiwa Inari Shrine",
              "locationQuery": "Toyoiwa Inari Shrine Ginza",
              "type": "sights"
            },
            {
              "id": "act-21-7",
              "title": "Jardines de Hamarikyu",
              "locationQuery": "Hamarikyu Gardens Tokyo",
              "type": "sights",
              "learnInfo": {
                "title": "Jardines de Hamarikyu",
                "subtitle": "10 de Enero • Tokio 🍵",
                "summary": "Antiguo parque señorial y terreno de caza de patos de los shōgunes, cuyos estanques cambian de nivel con las mareas del océano.",
                "pills": [
                  {
                    "label": "Dato Curioso",
                    "text": "Cuenta con una preciosa casa de té tradicional construida en madera sobre el agua (Nakajima no Ochaya).",
                    "type": "cultural"
                  },
                  {
                    "label": "Ingeniería Hidráulica",
                    "text": "El estanque de agua salada Shioiri-no-ike está regulado por compuertas que se abren con la subida y bajada de la marea de la Bahía de Tokio.",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-21-8",
              "title": "隅田川テラス（月島）",
              "locationQuery": "Sumida River Terrace Tsukishima",
              "type": "sights"
            },
            {
              "id": "act-21-9",
              "title": "Nishinaka dori Street",
              "locationQuery": "Nishinaka dori Street Tsukishima",
              "type": "sights",
              "learnInfo": {
                "title": "Isla de Tsukishima y la Calle del Monjayaki",
                "subtitle": "10 de Enero • Tsukishima 🍳",
                "summary": "Una isla artificial en la Bahía de Tokio famosa por la calle Nishinaka-dori, que alberga más de 70 restaurantes de Monjayaki.",
                "pills": [
                  {
                    "label": "Dato Gastronómico",
                    "text": "El Monjayaki es una especialidad parecida al okonomiyaki pero mucho más fluida. Se cocina directamente sobre la plancha de la mesa y se come rascando pequeñas porciones tostadas con espátulas diminutas llamadas Hagashi.",
                    "type": "cultural"
                  },
                  {
                    "label": "Origen Histórico",
                    "text": "Nació a finales del siglo XIX como tentempié barato para niños preparado en los comercios de golosinas (Dagashiya).",
                    "type": "historical"
                  }
                ]
              }
            },
            {
              "id": "act-21-10",
              "title": "Triton Bridge",
              "locationQuery": "Triton Bridge Tokyo",
              "type": "sights"
            },
            {
              "id": "act-21-11",
              "title": "Tsukuda Namiyoke Inari Daimyōjin & Osaki Inari Jinja",
              "locationQuery": "Tsukuda Namiyoke Inari Shrine",
              "type": "sights"
            },
            {
              "id": "act-21-12",
              "title": "Puente Aioi",
              "locationQuery": "Aioi Bridge Tokyo",
              "type": "sights"
            },
            {
              "id": "act-21-13",
              "title": "Tsukudako Bridge",
              "locationQuery": "Tsukudako Bridge Tokyo",
              "type": "sights"
            },
            {
              "id": "act-21-14",
              "title": "Sumiyoshi Jinja",
              "locationQuery": "Sumiyoshi Jinja Tsukuda Tokyo",
              "type": "sights"
            },
            {
              "id": "act-21-15",
              "title": "Ishikawa Island Lighthouse",
              "locationQuery": "Ishikawajima Lighthouse Tokyo",
              "type": "sights"
            },
            {
              "id": "act-21-16",
              "title": "Tsukishima Monja Okoge Main Store",
              "locationQuery": "Tsukishima Monja Okoge Main Store",
              "type": "food",
              "learnInfo": {
                "title": "Gastronomía Interactiva: Monjayaki de Tsukishima",
                "subtitle": "10 de Enero • Tsukishima 🥢",
                "summary": "Restaurante emblemático para disfrutar de la experiencia de cocinar Monjayaki sobre la plancha de hierro de la propia mesa.",
                "pills": [
                  {
                    "label": "Misión Culinaria",
                    "text": "Formar un 'dique' circular con la verdura en la plancha antes de verter el caldo crujiente en el centro.",
                    "type": "funFact"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-21-1",
              "name": "Uniqlo Ginza (12 plantas)",
              "category": "Ropa & Moda",
              "note": "La tienda Uniqlo más grande del mundo con cafetería y personalización UT.",
              "locationQuery": "Uniqlo Ginza Flagship Store"
            },
            {
              "id": "shop-21-2",
              "name": "Ginza Six",
              "category": "Centro Comercial de Lujo",
              "note": "Arquitectura moderna y jardín en la azotea con vistas espectaculares.",
              "locationQuery": "Ginza Six Tokyo"
            }
          ],
          "restaurants": [
            {
              "id": "rest-21-1",
              "name": "Tsukishima Monja Moheji Honten",
              "specialty": "Monjayaki de Tsukishima",
              "recommendation": "Plato típico crujiente a la plancha de la bahía de Tokio.",
              "locationQuery": "Tsukishima Monja Moheji Honten"
            },
            {
              "id": "rest-21-2",
              "name": "Kyuei Melon Pan Tsukishima",
              "specialty": "Melonpan Recién Horneado",
              "recommendation": "Pan dulce caliente con corteza crujiente irresistible.",
              "locationQuery": "Kyuei Melon Pan Tsukishima"
            }
          ]
        },
        {
          "dayIndex": 22,
          "date": "2027-01-11",
          "formattedDate": "Lunes, 11 de Enero de 2027",
          "shortDate": "11 Ene",
          "title": "Tokio (Nakano y Shimokitazawa)",
          "location": "Tokyo",
          "accommodationId": "hotel-7",
          "activities": [
            {
              "id": "act-22-1",
              "title": "Nakano Station",
              "locationQuery": "Nakano Station Tokyo",
              "type": "transit"
            },
            {
              "id": "act-22-2",
              "title": "Renga Zaka",
              "locationQuery": "Renga Zaka Nakano Tokyo",
              "type": "sights"
            },
            {
              "id": "act-22-3",
              "title": "Fureai Road",
              "locationQuery": "Fureai Road Nakano Tokyo",
              "type": "sights"
            },
            {
              "id": "act-22-4",
              "title": "Hakusen Street",
              "locationQuery": "Hakusen Street Nakano Tokyo",
              "type": "sights"
            },
            {
              "id": "act-22-5",
              "title": "Nakano Broadway",
              "locationQuery": "Nakano Broadway Tokyo",
              "type": "shopping",
              "learnInfo": {
                "title": "Nakano Broadway",
                "subtitle": "11 de Enero • Nakano 🤖",
                "summary": "Un centro comercial de estética retro que es la cuna del coleccionismo vintage: juguetes de los años 70, juguetes de hojalata, células de animación original de anime y vinilos.",
                "pills": [
                  {
                    "label": "Laberinto Vintage",
                    "text": "Alberga más de 25 tiendas temáticas Mandarake especializadas en celuloide de animación, mangas descatalogados y figuras raras.",
                    "type": "cultural"
                  },
                  {
                    "label": "Píldora Dulce",
                    "text": "En la planta sótano podéis probar en Daily Chico un helado suave gigante de 8 pisos con 8 sabores distintos colocados uno sobre otro.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-22-6",
              "title": "Shimo-Kitazawa Station",
              "locationQuery": "Shimokitazawa Station Tokyo",
              "type": "transit"
            },
            {
              "id": "act-22-7",
              "title": "Marché Shimokitazawa",
              "locationQuery": "Marche Shimokitazawa",
              "type": "shopping",
              "learnInfo": {
                "title": "Barrio Indie de Shimokitazawa & Totoro Cream Puffs",
                "subtitle": "11 de Enero • Shimokitazawa 🎸",
                "summary": "El barrio más bohemio e hípster de Tokio, famoso por sus callejones peatonales repletos de tiendas de ropa vintage de segunda mano, cafeterías de especialidad y tiendas de música.",
                "pills": [
                  {
                    "label": "Ambiente Bohemio",
                    "text": "Calles peatonales rodeadas de teatros independientes, librerías pequeñas y boutiques vintage únicas.",
                    "type": "cultural"
                  },
                  {
                    "label": "Profiteroles de Totoro",
                    "text": "En las inmediaciones se encuentra Shiro-Hige's Cream Puff Factory, la única pastelería autorizada por Studio Ghibli para cocinar profiteroles con la forma exacta de Totoro.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-22-8",
              "title": "Mail Post",
              "locationQuery": "Mail Post Shimokitazawa",
              "type": "sights"
            }
          ],
          "shops": [
            {
              "id": "shop-22-1",
              "name": "Mandarake Nakano Broadway",
              "category": "Manga, Figuras & Relojes Retro",
              "note": "Complejo de más de 25 tiendas temáticas en Nakano Broadway.",
              "locationQuery": "Mandarake Nakano Broadway"
            },
            {
              "id": "shop-22-2",
              "name": "Harajuku Chicago Shimokitazawa",
              "category": "Ropa Vintage & Kimonos Retro",
              "note": "Tienda vintage con selección excelente de kimonos antiguos asequibles.",
              "locationQuery": "Harajuku Chicago Shimokitazawa"
            }
          ],
          "restaurants": [
            {
              "id": "rest-22-1",
              "name": "Rojiura Curry SAMURAI. Shimokitazawa",
              "specialty": "Soup Curry estilo Hokkaido",
              "recommendation": "Curry en sopa repleto de verduras frescas crujientes.",
              "locationQuery": "Rojiura Curry SAMURAI Shimokitazawa"
            },
            {
              "id": "rest-22-2",
              "name": "Shiro-Hige's Cream Puff Factory",
              "specialty": "Dulces & Choux de Totoro",
              "recommendation": "Pasteles con forma de Totoro autorizados oficialmente por Studio Ghibli.",
              "locationQuery": "Shiro-Hige's Cream Puff Factory Daita"
            }
          ]
        },
        {
          "dayIndex": 23,
          "date": "2027-01-12",
          "formattedDate": "Martes, 12 de Enero de 2027",
          "shortDate": "12 Ene",
          "title": "Kamakura (Excursión)",
          "location": "Kamakura",
          "accommodationId": "hotel-7",
          "activities": [
            {
              "id": "act-23-1",
              "title": "Kamakura Station",
              "locationQuery": "Kamakura Station",
              "type": "transit"
            },
            {
              "id": "act-23-2",
              "title": "Hongaku-ji",
              "locationQuery": "Hongaku-ji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-3",
              "title": "2nd Torii",
              "locationQuery": "2nd Torii Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-4",
              "title": "Myoryu-ji",
              "locationQuery": "Myoryu-ji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-5",
              "title": "Komachi Street",
              "locationQuery": "Komachi Street Kamakura",
              "type": "shopping",
              "learnInfo": {
                "title": "Calle Komachi-dori (Kamakura)",
                "subtitle": "12 de Enero • Kamakura 🕊️",
                "summary": "Concurrida calle peatonal llena de puestos de artesanía local, cerámica, aperitivos y dulces tradicionales.",
                "pills": [
                  {
                    "label": "Píldora Gastronómica",
                    "text": "En la calle Komachi-dori podéis probar las galletas Hato Sabure con forma de paloma y helados suaves de boniato púrpura.",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-23-6",
              "title": "Hokai-ji",
              "locationQuery": "Hokai-ji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-7",
              "title": "Tsurugaoka Hachiman-gū",
              "locationQuery": "Tsurugaoka Hachimangu Kamakura",
              "type": "sights",
              "learnInfo": {
                "title": "Gran Santuario Tsurugaoka Hachiman-gū",
                "subtitle": "12 de Enero • Kamakura 🗡️",
                "summary": "El corazón espiritual de los antiguos samuráis de Kamakura, fundado en 1063 por el clan Minamoto.",
                "pills": [
                  {
                    "label": "Historia Samurái",
                    "text": "Era el centro religioso y político de los guerreros samuráis durante el primer shogunato de Kamakura.",
                    "type": "historical"
                  },
                  {
                    "label": "Avenida Sagrada",
                    "text": "El camino de acceso Dankazu está flanqueado por cientos de cerezos y faroles que conectan con la costa.",
                    "type": "cultural"
                  }
                ]
              }
            },
            {
              "id": "act-23-8",
              "title": "Myohon-ji",
              "locationQuery": "Myohon-ji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-9",
              "title": "Jufukuji",
              "locationQuery": "Jufukuji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-10",
              "title": "Jokomyoji",
              "locationQuery": "Jokomyoji Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-11",
              "title": "Templo Sugimoto-dera",
              "locationQuery": "Sugimoto-dera Temple Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-12",
              "title": "Templo Kotoku-in (Gran Buda)",
              "locationQuery": "Kotoku-in Great Buddha Kamakura",
              "type": "sights",
              "learnInfo": {
                "title": "Gran Buda de Kamakura (Templo Kotoku-in)",
                "subtitle": "12 de Enero • Kamakura 🧘‍♂️",
                "summary": "Una monumental estatua de bronce de Buda sentado de 13 metros de altura y 121 toneladas, fundida en el año 1252.",
                "pills": [
                  {
                    "label": "Dato Sorprendente",
                    "text": "Originalmente estaba dentro de un gran hall de madera, pero un tsunami gigante destruyó el edificio en 1498. Desde entonces, el Buda permanece sentado al aire libre desafiando al tiempo.",
                    "type": "historical"
                  },
                  {
                    "label": "Misión para los Niños",
                    "text": "¡Se puede entrar literalmente dentro del vientre del Buda por una pequeña puerta lateral por solo 50 yenes!",
                    "type": "funFact"
                  }
                ]
              }
            },
            {
              "id": "act-23-13",
              "title": "Playa de Yuigahama",
              "locationQuery": "Yuigahama Beach Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-14",
              "title": "Goryo Shrine",
              "locationQuery": "Goryo Shrine Kamakura",
              "type": "sights"
            },
            {
              "id": "act-23-15",
              "title": "Hase-dera",
              "locationQuery": "Hase-dera Temple Kamakura",
              "type": "sights",
              "learnInfo": {
                "title": "Templo Hase-dera",
                "subtitle": "12 de Enero • Kamakura 🌸",
                "summary": "Templo construido en la ladera de la montaña con vistas a la costa, famoso por albergar miles de pequeñas estatuas de piedra de Jizō Bosatsu (el protector Shinto/Budista de los niños y viajeros).",
                "pills": [
                  {
                    "label": "Protector de los Niños",
                    "text": "Miles de estatuas de Jizō lucen gorritos y baberos rojos hechos a mano para proteger los espíritus de los niños y guiar a los viajeros.",
                    "type": "cultural"
                  },
                  {
                    "label": "Vistas al Pacífico",
                    "text": "Desde su terraza ajardinada se contempla una panorámica espléndida de la Bahía de Sagami y la playa de Yuigahama.",
                    "type": "geography"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-23-1",
              "name": "Komachi-dori Shopping Street",
              "category": "Artesanía & Dulces de Kamakura",
              "note": "Galletas Hato Sabure con forma de paloma y helados de boniato purpura.",
              "locationQuery": "Komachi Street Kamakura"
            }
          ],
          "restaurants": [
            {
              "id": "rest-23-1",
              "name": "Wasai Yakura Komachidori",
              "specialty": "Shirasu Don (Arroz con pececillos de Kamakura)",
              "recommendation": "Especialidad marinera típica de la costa de Kamakura.",
              "locationQuery": "Wasai Yakura Komachidori Kamakura"
            },
            {
              "id": "rest-23-2",
              "name": "Kamakura Rokuyata",
              "specialty": "Kamakura Tofu Hamburger",
              "recommendation": "Hamburguesas de tofu artesanal deliciosas y ligeras.",
              "locationQuery": "Kamakura Rokuyata"
            }
          ]
        },
        {
          "dayIndex": 24,
          "date": "2027-01-13",
          "formattedDate": "Miércoles, 13 de Enero de 2027",
          "shortDate": "13 Ene",
          "title": "Tokio (Tsukiji y Despedida)",
          "location": "Tokyo",
          "accommodationId": "hotel-7",
          "activities": [
            {
              "id": "act-24-1",
              "title": "Fish Market Tsukiji Outer Market",
              "locationQuery": "Tsukiji Outer Market Tokyo",
              "type": "food",
              "learnInfo": {
                "title": "Mercado Exterior de Tsukiji (Tsukiji Outer Market)",
                "subtitle": "13 de Enero • Tsukiji 🐟",
                "summary": "El histórico mercado callejero repleto de puestos donde desayunar brochetas de tortilla dulce japonesa recién hecha (Tamagoyaki), brochetas de atún marinado y frutas de temporada antes de tomar el transporte hacia el aeropuerto.",
                "pills": [
                  {
                    "label": "Tradición Culinaria",
                    "text": "A pesar del traslado del mercado mayorista a Toyosu, Tsukiji conserva la mejor atmósfera de puestos de comida marina fresca y tamagoyaki caliente.",
                    "type": "cultural"
                  },
                  {
                    "label": "Despedida del Viaje",
                    "text": "Un rincón ideal para tomar un desayuno marinero tradicional y comprar recuerdos gastronómicos en nuestro último día en Japón.",
                    "type": "funFact"
                  }
                ]
              }
            }
          ],
          "shops": [
            {
              "id": "shop-24-2",
              "name": "Tokyo Station Character Street",
              "category": "Tiendas de Souvenirs & Anime",
              "note": "Últimas compras de souvenirs y dulces de despedida en Tokyo Station.",
              "locationQuery": "Tokyo Station Character Street"
            }
          ],
          "restaurants": [
            {
              "id": "rest-24-1",
              "name": "Tsukiji Kagura",
              "specialty": "Kaisen Donburi (Bol de marisco y sushi fresco)",
              "recommendation": "Desayuno / Almuerzo de despedida con atún fresco y erizo de mar.",
              "locationQuery": "Tsukiji Kagura Tokyo"
            },
            {
              "id": "rest-24-2",
              "name": "Tamagoyaki Yamachō",
              "specialty": "Tamagoyaki (Tortilla dulce japonesa ensartada)",
              "recommendation": "Brocheta de tortilla caliente por solo 150 yenes recién hecha.",
              "locationQuery": "Yamacho Tsukiji"
            }
          ]
        }
      ]
    }
  ]
};

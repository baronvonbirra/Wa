import { TripItinerary, Accommodation } from '../types/itinerary';

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
    name: 'Hotel Gracery Shinjuku (Tokio Centro)',
    kanjiName: 'ホテルグレイスリー新宿',
    japaneseAddress: '〒160-0021 東京都新宿区歌舞伎町1-19-1',
    englishAddress: '1-19-1 Kabukicho, Shinjuku-ku, Tokyo 160-0021',
    check_in: '2026-12-23',
    check_out: '2026-12-28',
    nearestStation: 'Estación JR Shinjuku (Salida Este / East Exit)'
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
    name: 'Kouya Takayama (旅荘 耕や)',
    kanjiName: '旅荘 耕や (高山)',
    japaneseAddress: '〒506-0000 岐阜県高山市本町',
    englishAddress: 'Honmachi, Takayama, Gifu 506-0000',
    check_in: '2026-12-30',
    check_out: '2027-01-02',
    nearestStation: 'Estación JR Takayama (Línea Principal Takayama)'
  },
  {
    id: 'hotel-5',
    name: 'Kamon Inn Toji Higashi (カモンイン 東寺東)',
    kanjiName: 'カモンイン 東寺東 (京都)',
    japaneseAddress: '〒601-8428 京都府京都市南区東寺東門前町41',
    englishAddress: '41 Tojihigashimonzencho, Minami Ward, Kyoto 601-8428',
    check_in: '2027-01-02',
    check_out: '2027-01-07',
    nearestStation: 'Estación Kintetsu Toji / Estación JR Kyoto'
  },
  {
    id: 'hotel-6',
    name: 'Henn na Hotel Osaka Shinsaibashi (変なホテル大阪 心斎橋)',
    kanjiName: '変なホテル大阪 心斎橋',
    japaneseAddress: '〒542-0081 大阪府大阪市中央区南船場3-5-2',
    englishAddress: '3-5-2 Minamisenba, Chuo Ward, Osaka 542-0081',
    check_in: '2027-01-07',
    check_out: '2027-01-10',
    nearestStation: 'Estación Shinsaibashi (Osaka Metro Midosuji Line)'
  },
  {
    id: 'hotel-7',
    name: 'Hotel Vista Tokyo Tsukiji (ホテルビスタ東京築地)',
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
  id: 'japan-2026-2027',
  title: 'Viaje a Japón 2026 - 2027',
  start_date: '2026-12-21',
  end_date: '2027-01-13',
  totalDays: 24,
  stages: [
    {
      stage_id: 0,
      name: 'Tokio Inicial & Nikko',
      subtitle: 'Etapa 0',
      dateRange: '21 – 27 Dic',
      start_date: '2026-12-21',
      end_date: '2026-12-27',
      accommodations: [ACCOMMODATIONS_MAP['hotel-1'], ACCOMMODATIONS_MAP['hotel-2']],
      days: [
        {
          dayIndex: 1,
          date: '2026-12-21',
          formattedDate: 'Lunes, 21 de Diciembre de 2026',
          shortDate: '21 Dic',
          title: 'Llegada y Traslado a Disney',
          accommodationId: 'hotel-1',
          activities: [
            { id: 'act-1-1', title: 'Llegada a Aeropuerto de Haneda', locationQuery: 'Haneda Airport Tokyo' },
            { id: 'act-1-2', title: 'Traslado directo a Toy Story Hotel', locationQuery: 'Tokyo Disney Resort Toy Story Hotel' },
            { id: 'act-1-3', title: 'Check-in y paseo por Ikspiari', locationQuery: 'Ikspiari Maihama' }
          ]
        },
        {
          dayIndex: 2,
          date: '2026-12-22',
          formattedDate: 'Martes, 22 de Diciembre de 2026',
          shortDate: '22 Dic',
          title: 'Tokyo Disneyland',
          accommodationId: 'hotel-1',
          activities: [
            { id: 'act-2-1', title: 'Día completo en Tokyo Disneyland', locationQuery: 'Tokyo Disneyland' },
            { id: 'act-2-2', title: 'Espectáculo nocturno de fuegos artificiales', locationQuery: 'Tokyo Disneyland Fireworks' }
          ]
        },
        {
          dayIndex: 3,
          date: '2026-12-23',
          formattedDate: 'Miércoles, 23 de Diciembre de 2026',
          shortDate: '23 Dic',
          title: 'Tokyo DisneySea y Cambio de Base',
          accommodationId: 'hotel-2',
          activities: [
            { id: 'act-3-1', title: 'Día completo en Tokyo DisneySea', locationQuery: 'Tokyo DisneySea' },
            { id: 'act-3-2', title: 'Recogida de equipaje en Toy Story Hotel', locationQuery: 'Tokyo Disney Resort Toy Story Hotel' },
            { id: 'act-3-3', title: 'Traslado a Hotel Tokio Centro (Shinjuku)', locationQuery: 'Hotel Gracery Shinjuku' }
          ]
        },
        {
          dayIndex: 4,
          date: '2026-12-24',
          formattedDate: 'Jueves, 24 de Diciembre de 2026',
          shortDate: '24 Dic',
          title: 'Asakusa, Ueno y Akihabara',
          accommodationId: 'hotel-2',
          activities: [
            { id: 'act-4-1', title: 'Templo Sensō-ji y calle Nakamise', locationQuery: 'Senso-ji Temple Asakusa' },
            { id: 'act-4-2', title: 'Parque de Ueno y Ameyoko Market', locationQuery: 'Ueno Park Tokyo' },
            { id: 'act-4-3', title: 'Zona tecnológica y pop de Akihabara', locationQuery: 'Akihabara Station Tokyo' }
          ]
        },
        {
          dayIndex: 5,
          date: '2026-12-25',
          formattedDate: 'Viernes, 25 de Diciembre de 2026',
          shortDate: '25 Dic',
          title: 'Excursión a Nikko y Utsunomiya',
          accommodationId: 'hotel-2',
          activities: [
            { id: 'act-5-1', title: 'Santuario Tōshō-gū', locationQuery: 'Nikko Toshogu Shrine' },
            { id: 'act-5-2', title: 'Cascada Kegon y Lago Chuzenji', locationQuery: 'Kegon Falls Nikko' },
            { id: 'act-5-3', title: 'Parada gastronómica en Utsunomiya (Gyozas)', locationQuery: 'Utsunomiya Station Gyoza' }
          ]
        },
        {
          dayIndex: 6,
          date: '2026-12-26',
          formattedDate: 'Sábado, 26 de Diciembre de 2026',
          shortDate: '26 Dic',
          title: 'Shibuya, Harajuku y Roppongi',
          accommodationId: 'hotel-2',
          activities: [
            { id: 'act-6-1', title: 'Cruce de Shibuya y Estatua de Hachiko', locationQuery: 'Shibuya Crossing Tokyo' },
            { id: 'act-6-2', title: 'Calle Takeshita (Harajuku) y Santuario Meiji', locationQuery: 'Takeshita Street Harajuku' },
            { id: 'act-6-3', title: 'Avenida Omotesando', locationQuery: 'Omotesando Hills Tokyo' },
            { id: 'act-6-4', title: 'Roppongi Hills y vistas nocturnas', locationQuery: 'Roppongi Hills Mori Tower' }
          ]
        },
        {
          dayIndex: 7,
          date: '2026-12-27',
          formattedDate: 'Domingo, 27 de Diciembre de 2026',
          shortDate: '27 Dic',
          title: 'Shinjuku e Ikebukuro',
          accommodationId: 'hotel-2',
          activities: [
            { id: 'act-7-1', title: 'Distrito de rascacielos de Shinjuku y Shinjuku Gyoen', locationQuery: 'Shinjuku Gyoen National Garden' },
            { id: 'act-7-2', title: 'Zona de ocio en Ikebukuro y Sunshine City', locationQuery: 'Sunshine City Ikebukuro' },
            { id: 'act-7-3', title: 'Logística y preparativos para salida a Kawaguchiko', locationQuery: 'Shinjuku Station Bus Terminal' }
          ]
        }
      ]
    },
    {
      stage_id: 1,
      name: 'Monte Fuji & Alpes Japoneses',
      subtitle: 'Etapa 1',
      dateRange: '28 Dic – 1 Ene',
      start_date: '2026-12-28',
      end_date: '2027-01-01',
      accommodations: [ACCOMMODATIONS_MAP['hotel-3'], ACCOMMODATIONS_MAP['hotel-4']],
      days: [
        {
          dayIndex: 8,
          date: '2026-12-28',
          formattedDate: 'Lunes, 28 de Diciembre de 2026',
          shortDate: '28 Dic',
          title: 'Kawaguchiko Norte',
          accommodationId: 'hotel-3',
          activities: [
            { id: 'act-8-1', title: 'Kawaguchi Asama Shrine', locationQuery: 'Kawaguchi Asama Shrine' },
            { id: 'act-8-2', title: 'Tenku no Torii (Torii en el cielo)', locationQuery: 'Tenku no Torii Kawaguchiko' },
            { id: 'act-8-3', title: 'Haha-no-Shirataki', locationQuery: 'Haha-no-Shirataki Waterfall' },
            { id: 'act-8-4', title: 'Santuario Yama y Santuario Homi', locationQuery: 'Kawaguchiko Yamanashi' },
            { id: 'act-8-5', title: 'Parque Nagasaki y Parque Oishi', locationQuery: 'Oishi Park Lake Kawaguchiko' }
          ]
        },
        {
          dayIndex: 9,
          date: '2026-12-29',
          formattedDate: 'Martes, 29 de Diciembre de 2026',
          shortDate: '29 Dic',
          title: 'Kawaguchiko Sur, Fujiyoshida y Oshino',
          accommodationId: 'hotel-3',
          activities: [
            { id: 'act-9-1', title: 'Ubuyagasaki y Mirador Komagari', locationQuery: 'Ubuyagasaki Kawaguchiko' },
            { id: 'act-9-2', title: 'Teleférico Panorámico del Monte Fuji', locationQuery: 'Mt. Fuji Panoramic Ropeway' },
            { id: 'act-9-3', title: 'Barco por Lago Kawaguchiko', locationQuery: 'Lake Kawaguchi Sightseeing Boat' },
            { id: 'act-9-4', title: 'Pagoda Chureito (Arakurayama Sengen Park)', locationQuery: 'Chureito Pagoda Fujiyoshida' },
            { id: 'act-9-5', title: 'Kitaguchi Hongu Fuji Sengen Shrine', locationQuery: 'Kitaguchi Hongu Fuji Sengen Shrine' },
            { id: 'act-9-6', title: 'Calle Honcho 2-chome y Oshino Hakkai', locationQuery: 'Oshino Hakkai Village' },
            { id: 'act-9-7', title: 'Shinobi No Sato (Aldea Ninja)', locationQuery: 'Oshino Ninja Village Shinobi no Sato' }
          ]
        },
        {
          dayIndex: 10,
          date: '2026-12-30',
          formattedDate: 'Miércoles, 30 de Diciembre de 2026',
          shortDate: '30 Dic',
          title: 'Takayama - Centro Histórico y Templos',
          accommodationId: 'hotel-4',
          activities: [
            { id: 'act-10-1', title: 'Traslado a Takayama Nohi Bus Center', locationQuery: 'Takayama Nohi Bus Center' },
            { id: 'act-10-2', title: 'Santuario Sakurayama Hachiman', locationQuery: 'Sakurayama Hachimangu Takayama' },
            { id: 'act-10-3', title: 'Higashiyama Walk (Templos Daiohji y Zennoji)', locationQuery: 'Higashiyama Walking Course Takayama' },
            { id: 'act-10-4', title: 'Barrio histórico Hidatakayama Sanmachi', locationQuery: 'Sanmachi Suji Takayama' },
            { id: 'act-10-5', title: 'Fábrica de sake Funasaka y Puente Nakahashi', locationQuery: 'Nakahashi Bridge Takayama' }
          ]
        },
        {
          dayIndex: 11,
          date: '2026-12-31',
          formattedDate: 'Jueves, 31 de Diciembre de 2026',
          shortDate: '31 Dic',
          title: 'Takayama y Excursión a Shirakawa-go',
          accommodationId: 'hotel-4',
          activities: [
            { id: 'act-11-1', title: 'Takayama Jinya y Mercados matutinos (Miyagawa)', locationQuery: 'Miyagawa Morning Market Takayama' },
            { id: 'act-11-2', title: 'Excursión a aldea tradicional Shirakawa-go', locationQuery: 'Shirakawa-go Ogimachi Village' },
            { id: 'act-11-3', title: 'Casa Wada y Mirador del Castillo Ogimachi', locationQuery: 'Wada House Shirakawago' },
            { id: 'act-11-4', title: 'Puente Deai y Santuario Shirakawa Hachiman', locationQuery: 'Deai Bridge Shirakawago' }
          ]
        },
        {
          dayIndex: 12,
          date: '2027-01-01',
          formattedDate: 'Viernes, 1 de Enero de 2027',
          shortDate: '1 Ene',
          title: 'Transición hacia Kioto',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-12-1', title: 'Año Nuevo en Takayama (Hatsumode)', locationQuery: 'Takayama Shrine' },
            { id: 'act-12-2', title: 'Traslado de Takayama a Kioto en tren Hida Express', locationQuery: 'Takayama Station' },
            { id: 'act-12-3', title: 'Check-in en Kamakon Inn Toji Higashi (Kioto)', locationQuery: 'Kamon Inn Toji Higashi Kyoto' }
          ]
        }
      ]
    },
    {
      stage_id: 2,
      name: 'Kioto',
      subtitle: 'Etapa 2',
      dateRange: '2 – 6 Ene',
      start_date: '2027-01-02',
      end_date: '2027-01-06',
      accommodations: [ACCOMMODATIONS_MAP['hotel-5']],
      days: [
        {
          dayIndex: 13,
          date: '2027-01-02',
          formattedDate: 'Sábado, 2 de Enero de 2027',
          shortDate: '2 Ene',
          title: 'Kioto Sur y Templos Principales',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-13-1', title: 'Tō-ji y pagoda de 5 pisos', locationQuery: 'Toji Temple Kyoto' },
            { id: 'act-13-2', title: 'Santuario Fushimi Inari-taisha y Torii', locationQuery: 'Fushimi Inari Taisha Kyoto' },
            { id: 'act-13-3', title: 'Templo Tōfuku-ji y Sanjūsangen-dō', locationQuery: 'Sanjusangendo Temple Kyoto' },
            { id: 'act-13-4', title: 'Torre de Kioto y Estación de Kioto', locationQuery: 'Kyoto Tower' }
          ]
        },
        {
          dayIndex: 14,
          date: '2027-01-03',
          formattedDate: 'Domingo, 3 de Enero de 2027',
          shortDate: '3 Ene',
          title: 'Templos Noroeste y Arashiyama',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-14-1', title: 'Kinkaku-ji (Pabellón Dorado)', locationQuery: 'Kinkaku-ji Kyoto' },
            { id: 'act-14-2', title: 'Ryōan-ji (Jardín Zen) y Ninna-ji', locationQuery: 'Ryoanji Temple Kyoto' },
            { id: 'act-14-3', title: 'Bosque de Bambú de Arashiyama y Templo Tenryū-ji', locationQuery: 'Arashiyama Bamboo Grove Kyoto' },
            { id: 'act-14-4', title: 'Puente Togetsukyo y Santuario Nonomiya', locationQuery: 'Togetsukyo Bridge Kyoto' }
          ]
        },
        {
          dayIndex: 15,
          date: '2027-01-04',
          formattedDate: 'Lunes, 4 de Enero de 2027',
          shortDate: '4 Ene',
          title: 'Paseo del Filósofo y Higashiyama Norte',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-15-1', title: 'Ginkaku-ji (Pabellón de Plata)', locationQuery: 'Ginkaku-ji Kyoto' },
            { id: 'act-15-2', title: 'Recorrido por el Paseo del Filósofo', locationQuery: 'Philosopher Path Kyoto' },
            { id: 'act-15-3', title: 'Templo Honen-in y Eikan-do', locationQuery: 'Eikando Temple Kyoto' },
            { id: 'act-15-4', title: 'Templo Nanzen-ji y Santuario Heian Jingū', locationQuery: 'Nanzen-ji Temple Kyoto' }
          ]
        },
        {
          dayIndex: 16,
          date: '2027-01-05',
          formattedDate: 'Martes, 5 de Enero de 2027',
          shortDate: '5 Ene',
          title: 'Castillo Nijō y Centro',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-16-1', title: 'Castillo Nijō (Nijō-jō) y Palacio Ninomaru', locationQuery: 'Nijo Castle Kyoto' },
            { id: 'act-16-2', title: 'Mercado Nishiki y gastronomía local', locationQuery: 'Nishiki Market Kyoto' },
            { id: 'act-16-3', title: 'Palacio Imperial de Kioto (Kyoto Gosho)', locationQuery: 'Kyoto Imperial Palace' }
          ]
        },
        {
          dayIndex: 17,
          date: '2027-01-06',
          formattedDate: 'Miércoles, 6 de Enero de 2027',
          shortDate: '6 Ene',
          title: 'Higashiyama Sur, Gion y Pontocho',
          accommodationId: 'hotel-5',
          activities: [
            { id: 'act-17-1', title: 'Kiyomizu-dera y vistas de Kioto', locationQuery: 'Kiyomizu-dera Kyoto' },
            { id: 'act-17-2', title: 'Paseo por calles históricas Sannenzaka y Ninenzaka', locationQuery: 'Ninenzaka Sannenzaka Kyoto' },
            { id: 'act-17-3', title: 'Kōdai-ji y Santuario Yasaka', locationQuery: 'Yasaka Shrine Kyoto' },
            { id: 'act-17-4', title: 'Barrio de Gion (Calle Hanamikoji) y Callejón Pontocho', locationQuery: 'Pontocho Alley Kyoto' }
          ]
        }
      ]
    },
    {
      stage_id: 3,
      name: 'Osaka',
      subtitle: 'Etapa 3',
      dateRange: '7 – 9 Ene',
      start_date: '2027-01-07',
      end_date: '2027-01-09',
      accommodations: [ACCOMMODATIONS_MAP['hotel-6']],
      days: [
        {
          dayIndex: 18,
          date: '2027-01-07',
          formattedDate: 'Jueves, 7 de Enero de 2027',
          shortDate: '7 Ene',
          title: 'Llegada, Castillo y Dōtonbori',
          accommodationId: 'hotel-6',
          activities: [
            { id: 'act-18-1', title: 'Llegada a Osaka Station y Check-in en Henn na Hotel', locationQuery: 'Henn na Hotel Osaka Shinsaibashi' },
            { id: 'act-18-2', title: 'Castillo de Osaka y parque perimetral', locationQuery: 'Osaka Castle' },
            { id: 'act-18-3', title: 'Templo Shitennō-ji', locationQuery: 'Shitennoji Temple Osaka' },
            { id: 'act-18-4', title: 'Paseo nocturno por Dōtonbori y cartel de Glico', locationQuery: 'Dotonbori Glico Man Sign' },
            { id: 'act-18-5', title: 'Callejón Hozenji Yokocho', locationQuery: 'Hozenji Yokocho Osaka' }
          ]
        },
        {
          dayIndex: 19,
          date: '2027-01-08',
          formattedDate: 'Viernes, 8 de Enero de 2027',
          shortDate: '8 Ene',
          title: 'Mercados, Cultura Pop y Shinsekai',
          accommodationId: 'hotel-6',
          activities: [
            { id: 'act-19-1', title: 'Mercado Kuromon Ichiba', locationQuery: 'Kuromon Ichiba Market Osaka' },
            { id: 'act-19-2', title: 'Denden Town y Ota Road (Cultura Anime)', locationQuery: 'Nipponbashi Denden Town Osaka' },
            { id: 'act-19-3', title: 'Barrio alternativo Amerikamura (America-mura)', locationQuery: 'Amerikamura Osaka' },
            { id: 'act-19-4', title: 'Distrito Shinsekai y Torre Tsūtenkaku', locationQuery: 'Tsutenkaku Tower Osaka' }
          ]
        },
        {
          dayIndex: 20,
          date: '2027-01-09',
          formattedDate: 'Sábado, 9 de Enero de 2027',
          shortDate: '9 Ene',
          title: 'Universal Studios Japan',
          accommodationId: 'hotel-6',
          activities: [
            { id: 'act-20-1', title: 'Día completo en Universal Studios Japan (USJ)', locationQuery: 'Universal Studios Japan Osaka' },
            { id: 'act-20-2', title: 'Super Nintendo World', locationQuery: 'Super Nintendo World USJ' },
            { id: 'act-20-3', title: 'Cena en Universal CityWalk Osaka', locationQuery: 'Universal CityWalk Osaka' }
          ]
        }
      ]
    },
    {
      stage_id: 4,
      name: 'Tokio Final, Tsukiji & Kamakura',
      subtitle: 'Etapa 4',
      dateRange: '10 – 13 Ene',
      start_date: '2027-01-10',
      end_date: '2027-01-13',
      accommodations: [ACCOMMODATIONS_MAP['hotel-7']],
      days: [
        {
          dayIndex: 21,
          date: '2027-01-10',
          formattedDate: 'Domingo, 10 de Enero de 2027',
          shortDate: '10 Ene',
          title: 'Ginza, Bahía y Tsukishima',
          accommodationId: 'hotel-7',
          activities: [
            { id: 'act-21-1', title: 'Traslado a Tokio y check-in en Hotel Vista Tsukiji', locationQuery: 'Hotel Vista Tokyo Tsukiji' },
            { id: 'act-21-2', title: 'Barrio de Ginza, Teatro Kabuki-za y Seiko House', locationQuery: 'Ginza Six Tokyo' },
            { id: 'act-21-3', title: 'Jardines Hamarikyu', locationQuery: 'Hamarikyu Gardens Tokyo' },
            { id: 'act-21-4', title: 'Isla de Tsukishima y cena de Monjayaki', locationQuery: 'Tsukishima Monja Street Tokyo' }
          ]
        },
        {
          dayIndex: 22,
          date: '2027-01-11',
          formattedDate: 'Lunes, 11 de Enero de 2027',
          shortDate: '11 Ene',
          title: 'Nakano y Shimokitazawa',
          accommodationId: 'hotel-7',
          activities: [
            { id: 'act-22-1', title: 'Nakano Broadway (Mandarake y coleccionismo)', locationQuery: 'Nakano Broadway Tokyo' },
            { id: 'act-22-2', title: 'Calle Renga Zaka en Nakano', locationQuery: 'Nakano Renga Zaka Tokyo' },
            { id: 'act-22-3', title: 'Barrio vintage y tiendas retro de Shimokitazawa', locationQuery: 'Shimokitazawa Station Tokyo' },
            { id: 'act-22-4', title: 'Shiro-Hige’s Cream Puff Factory (Dulces Totoro)', locationQuery: 'Shiro-Hige Cream Puff Factory Daita' }
          ]
        },
        {
          dayIndex: 23,
          date: '2027-01-12',
          formattedDate: 'Martes, 12 de Enero de 2027',
          shortDate: '12 Ene',
          title: 'Excursión a Kamakura',
          accommodationId: 'hotel-7',
          activities: [
            { id: 'act-23-1', title: 'Llegada a Kamakura Station y calle Komachi-dori', locationQuery: 'Komachi-dori Kamakura' },
            { id: 'act-23-2', title: 'Santuario Tsurugaoka Hachiman-gū', locationQuery: 'Tsurugaoka Hachimangu Kamakura' },
            { id: 'act-23-3', title: 'Gran Buda de Kamakura (Kōtoku-in)', locationQuery: 'Kotoku-in Great Buddha Kamakura' },
            { id: 'act-23-4', title: 'Templo Hase-dera y vistas a la playa Yuigahama', locationQuery: 'Hase-dera Temple Kamakura' }
          ]
        },
        {
          dayIndex: 24,
          date: '2027-01-13',
          formattedDate: 'Miércoles, 13 de Enero de 2027',
          shortDate: '13 Ene',
          title: 'Gastronomía Final y Salida',
          accommodationId: 'hotel-7',
          activities: [
            { id: 'act-24-1', title: 'Mercado Exterior de Tsukiji (Desayuno de sushi y marisco)', locationQuery: 'Tsukiji Outer Market Tokyo' },
            { id: 'act-24-2', title: 'Últimas compras souvenirs en Tokio Station', locationQuery: 'Tokyo Station Character Street' },
            { id: 'act-24-3', title: 'Traslado a Aeropuerto (Haneda/Narita) y Vuelo de Regreso', locationQuery: 'Haneda Airport Tokyo' }
          ]
        }
      ]
    }
  ]
};

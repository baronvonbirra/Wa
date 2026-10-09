export interface MascotMessage {
  koji: string;
  tama: string;
  panko: string;
}

export const PRE_TRAVEL_MASCOT_MESSAGES: MascotMessage = {
  koji: '¡Falta muy poco para la gran aventura! Revisad que las mochilas y las consolas estén a punto.',
  tama: "El viaje a Japón está a la vuelta de la esquina. ¡Practicad vuestros 'Arigatō'!",
  panko: '¡Yo ya estoy contando los días para probar los primeros takoyakis calientitos!'
};

export const DAILY_MASCOT_MESSAGES: Record<string, MascotMessage> = {
  '2026-12-20': {
    koji: '¡Hoy despegamos! Tened a mano los pasaportes, la Suica digital y los cargadores en el equipaje de mano.',
    tama: 'En los vuelos largos es importante descansar bien y mantenerse hidratados. ¡Buen viaje hacia Tokio!',
    panko: '¡Atentos al menú del avión! Pero guardad espacio para las delicias que nos esperan al aterrizar en HND.'
  },
  '2026-12-21': {
    koji: '¡Llegamos a Tokio! Hoy activamos el Suica y nos instalamos cerca de Disney Resort.',
    tama: 'En el transporte público japonés recordad poner el móvil en modo silencio (Mano Mōdo).',
    panko: '¡Nada como una cena rápida y reconfortante en el Konbini tras volar cruzar el océano!'
  },
  '2026-12-22': {
    koji: '¡Día completo en Tokyo Disneyland! Acompañad a Mickey y disfrutad de la magia kawaii.',
    tama: 'Guardad los tickets del parque en un lugar seguro para acceder a los pases rápidos y espectáculos.',
    panko: '¡Tenéis que probar las palomitas de sabores mágicos como mantequilla de cacahuete o miel!'
  },
  '2026-12-23': {
    koji: '¡Explorando DisneySea! No os perdáis la atracción de Indiana Jones y la zona de Sinbad.',
    tama: 'Por la tarde nos trasladamos al centro de Tokio. Manteneos juntos en la estación de metro.',
    panko: '¡Aprovechad para degustar un helado temático o los snacks de curry en DisneySea!'
  },
  '2026-12-24': {
    koji: '¡Nochebuena en Shibuya y Harajuku! Cruzamos el cruce más famoso del planeta.',
    tama: 'Cerca del cruce está la estatua del fiel Hachiko. ¡Un lugar muy emotivo para nosotros los perritos!',
    panko: 'En Japón la tradición de Nochebuena es comer pollo frito de KFC y tarta de fresa (Shortcake).'
  },
  '2026-12-25': {
    koji: '¡Excursión a Nikko y Utsunomiya! Visitamos el santuario Toshogu entre montañas.',
    tama: 'En Toshogu veréis el grabado original de los Tres Monos Sabios: no ver, no oír, no decir el mal.',
    panko: '¡Llegando a Utsunomiya toca banquete de Gyozas! A la plancha, fritas y en sopa.'
  },
  '2026-12-26': {
    koji: '¡Día Otaku y Tradicional! Paseamos por Asakusa Senso-ji y luego la electrónica de Akihabara.',
    tama: 'Al cruzar la puerta Kaminarimon en Senso-ji, podéis abanicaros con el humo del incienso para la salud.',
    panko: '¡En Akihabara no olvides probar el Taiyaki relleno de anko o crema pastelera caliente!'
  },
  '2026-12-27': {
    koji: '¡Palacio Imperial, jardines y las luces deslumbrantes de Shinjuku!',
    tama: 'En los jardines imperiales caminad con tranquilidad y disfrutad del arte del paisajismo nipón.',
    panko: '¡En Shinjuku buscaremos un auténtico Ramen de caldo espeso para recargar energías!'
  },
  '2026-12-28': {
    koji: '¡Ponemos rumbo hacia el Monte Fuji y la relajante zona de Kawaguchiko!',
    tama: 'Con un poco de suerte con el cielo despejado, el Fuji nos regalará sus mejores vistas al atardecer.',
    panko: '¡Noche de Ryokan e Yutaka! Cena Kaiseki tradicional con productos frescos de montaña.'
  },
  '2026-12-29': {
    koji: '¡Ruta por Fujiyoshida y Oshino Hakkai! Los estanques cristalinos alimentados por la nieve del Fuji.',
    tama: 'Sacad fotos en el torii del santuario Kawaguchi Asama y la pagoda Chureito.',
    panko: '¡Probad los fideos Hōtō, la sopa típica de verduras y calabaza de la región del Fuji!'
  },
  '2026-12-30': {
    koji: '¡Viaje hacia los Alpes Japoneses! Llegamos a Takayama y su casco antiguo de madera.',
    tama: 'En Takayama el frío es intenso. Usad ropa térmica Heattech y calzado cómodo con buen agarre.',
    panko: '¡Llegó el momento de probar la famosa carne de ternera de Hida (Hida-gyu) a la piedra!'
  },
  '2026-12-31': {
    koji: '¡Nochevieja en las alpes y visita a la mágica aldea nevada de Shirakawa-go!',
    tama: 'En la medianoche escucharemos las 108 campanadas (Joya no Kane) en los templos de Takayama.',
    panko: '¡En Nochevieja los japoneses comen Toshikoshi Soba para atraer longevidad y prosperidad!'
  },
  '2027-01-01': {
    koji: '¡Feliz Año Nuevo 2027! Primer día del año (Hatsumode) paseando por los templos de Takayama.',
    tama: 'Podéis pedir un deseo para 2027 y comprar un amuleto Omamori de protección y suerte.',
    panko: '¡En Año Nuevo es típico el Ozōni, una deliciosa sopa tradicional con pastelitode arroz Mochi!'
  },
  '2027-01-02': {
    koji: '¡Nos trasladamos a Kioto, la antigua capital imperial repleta de historia!',
    tama: 'En Kioto los santuarios respiran una paz única. Sostened los palillos del temizuya con elegancia.',
    panko: '¡Probad los dulces tradicionales Yatsuhashi rellenos de té verde matcha o canela!'
  },
  '2027-01-03': {
    koji: '¡Explorando Arashiyama! El bosque de bambú y los monitos del parque Iwatayama.',
    tama: 'Al caminar por el bosque de bambú, escuchad el susurro del viento entre los tallos verdes.',
    panko: '¡Deliciosos dango a la parrilla con salsa dulce de soja para tomar junto al río Togetsukyo!'
  },
  '2027-01-04': {
    koji: '¡Paseo del Filósofo e Higashiyama Norte! Templos rodeados de jardines zen y estanques.',
    tama: 'Contemplad el Pabellón Dorado (Kinkaku-ji) reflejado en las aguas del estanque.',
    panko: '¡Parada técnica para un helado de té verde suave (Soft Soft) en los puestos de Higashiyama!'
  },
  '2027-01-05': {
    koji: '¡Excursión al Parque de Nara para saludar a los ciervos y ver el Gran Buda de Todai-ji!',
    tama: 'Los ciervos Sika de Nara se inclinan para pedir galletas (Senbei). ¡Saludadles inclinando la cabeza!',
    panko: '¡En Nara probaremos el Senbei especial de arroz tostado fresco y cruzaremos hacia el Castillo Nijō!'
  },
  '2027-01-06': {
    koji: '¡Fushimi Inari-taisha y los mil Torii rojos! Subimos por la ladera de la montaña sagrada.',
    tama: 'Buscad las estatuas de las zorras Kitsune que custodian el santuario con la llave en el hocico.',
    panko: '¡Parrillada de yakitori e Inari-zushi (bolsitas de tofu dulce con arroz) en los puestos del templo!'
  },
  '2027-01-07': {
    koji: '¡Bienvenidos a Osaka, la capital gastronómica y del entretenimiento del oeste!',
    tama: 'Visita al majestuoso Castillo de Osaka y paseo nocturno por las luces neón de Dōtonbori.',
    panko: '¡Es la hora oficial de los Takoyakis recién hechos y las brochetas crujientes de Kushikatsu!'
  },
  '2027-01-08': {
    koji: '¡Paseo por el vibrante barrio retro de Shinsekai y la torre Tsutenkaku!',
    tama: 'En Shinsekai podréis frotar los pies de la figura de Billiken para conseguir buena fortuna.',
    panko: '¡Probad el Okonomiyaki, la pizza/tortilla japonesa cocinada en plancha de hierro frente a vosotros!'
  },
  '2027-01-09': {
    koji: '¡Día épico en Universal Studios Japan! Super Nintendo World y Harry Potter.',
    tama: 'Poneos vuestra Power-Up Band para golpear los bloques "?" y juntar monedas virtuales.',
    panko: '¡Bebida de Cerveza de Mantequilla en Hogsmeade y hamburguesa de Mario en Toadstool Cafe!'
  },
  '2027-01-10': {
    koji: '¡De regreso a Tokio! Paseo por la elegante zona de Ginza y Tsukishima.',
    tama: 'En Ginza las aceras son amplias y los escaparates de arquitectura son obras de arte.',
    panko: '¡Hoy cenamos Monjayaki en la famosa calle Monja Street de Tsukishima!'
  },
  '2027-01-11': {
    koji: '¡Explorando Nakano Broadway y las tiendas vintage de Shimokitazawa!',
    tama: 'En Nakano encontraréis figuras coleccionables y recuerdos únicos de vuestra infancia.',
    panko: '¡Probad los crêpes dulces gigantes rellenos de nata, fresas y brownie en Shimokitazawa!'
  },
  '2027-01-12': {
    koji: '¡Excursión costera a Kamakura! El Gran Buda gigante de bronce (Daibutsu).',
    tama: 'El Daibutsu de Kamakura lleva desde el siglo XIII al aire libre soportando maremotos y terremotos.',
    panko: '¡Galletas de paloma Hato Sabure y croquetas de boniato morado junto a la estación!'
  },
  '2027-01-13': {
    koji: '¡Último día en Japón! Visita al mercado de Tsukiji para las últimas compras y despedida.',
    tama: 'Gracias por esta increíble aventura familiar por Japón. ¡Arigatō gozaimasu y hasta pronto!',
    panko: '¡Último broche de oro con sashimi fresco, nigiris y brochetas de tamagoyaki caliente!'
  }
};

export function getMascotMessages(now: Date = new Date()): MascotMessage {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dateStr = formatter.format(now);

  if (DAILY_MASCOT_MESSAGES[dateStr]) {
    return DAILY_MASCOT_MESSAGES[dateStr];
  }

  if (dateStr < '2026-12-20') {
    return PRE_TRAVEL_MASCOT_MESSAGES;
  }

  // Default fallback for dates after trip end
  return {
    koji: '¡Menudo viaje inolvidable hemos vivido! Es hora de revisar las fotos y recordar cada hito.',
    tama: 'La hospitalidad y belleza de Japón siempre nos acompañarán. ¡Hasta la próxima aventura!',
    panko: '¡Yo ya estoy echando de menos los ramen, takoyakis y melonpan calientitos!'
  };
}

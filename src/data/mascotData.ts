export interface MascotCharacter {
  id: 'koji' | 'tama' | 'panko';
  name: string;
  fullName: string;
  emoji: string;
  avatar: string;
  role: string;
  personality: string;
  bg: string;
  border: string;
  badgeBg: string;
}

export const MASCOT_CHARACTERS: MascotCharacter[] = [
  {
    id: 'koji',
    name: 'Koji',
    fullName: 'Koji el Shiba Inu',
    emoji: '🐕',
    avatar: '🐕🎒',
    role: 'Guía Explorador',
    personality: 'Entusiasta, activo y explorador de calles',
    bg: 'bg-[#FFDAC1]/60 dark:bg-amber-950/60',
    border: 'border-[#FFB7B2]',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200'
  },
  {
    id: 'tama',
    name: 'Tama',
    fullName: 'Tama la Maneki-Neko',
    emoji: '🐱',
    avatar: '🐱🐾',
    role: 'Espíritu de la Buena Suerte',
    personality: 'Sabia, experta en cultura, suerte y tradiciones',
    bg: 'bg-[#FFB7B2]/50 dark:bg-rose-950/60',
    border: 'border-[#FFB7B2]',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200'
  },
  {
    id: 'panko',
    name: 'Panko',
    fullName: 'Panko el Onigiri',
    emoji: '🍙',
    avatar: '🍙✨',
    role: 'Experto Gastronómico',
    personality: 'Divertido, glotón y experto en comida y curiosidades kawaii',
    bg: 'bg-[#B5EAD7]/60 dark:bg-emerald-950/60',
    border: 'border-[#B5EAD7]',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200'
  }
];

export interface DailyMascotTip {
  koji: string;
  tama: string;
  panko: string;
}

export const DAILY_MASCOT_TIPS: Record<string, DailyMascotTip> = {
  '2026-12-20': {
    koji: "¡Ajustad los relojes a la hora japonesa! Nos espera un gran vuelo cruzando continentes. Recordad mover las piernas y estiraros durante el viaje.",
    tama: "En el avión es el momento perfecto para repasar los saludos básicos. Practicad decir 'Arigatō gozaimasu' con una leve inclinación de cabeza.",
    panko: "¡Llevad algún snack de reserva en la mochila! Aunque la comida del avión mola, tener un tentempié a mano siempre alegra el vuelo."
  },
  '2026-12-21': {
    koji: "¡Al fin pisamos tierra japonesa! Tras pasar inmigración, buscad los carteles del monorraíl o autobús directo hacia Disney Resort.",
    tama: "¡Irasshaimase! Bienvenidos al País del Sol Naciente. Al entrar en la habitación del hotel, recordad dejar los zapatos de calle en el genkan (recibidor).",
    panko: "¡Entrad a un Konbini nada más llegar! Probad un paquete de galletas de fresa o un panecillo relleno dulce para celebrar el aterrizaje."
  },
  '2026-12-22': {
    koji: "¡A madrugar para estar en la puerta antes de que abran! Las atracciones como Space Mountain o Pooh's Hunny Hunt se llenan rápido.",
    tama: "Fijaos en el orden impecable de las familias al esperar los desfiles. Se sientan pacíficamente en el suelo para no tapar la vista a los de atrás.",
    panko: "¡Misión palomitas! Buscad los carritos con sabores locos: las de mantequilla con salsa de soja y las de miel son auténticos manjares."
  },
  '2026-12-23': {
    koji: "¡Atracción estrella: 'Journey to the Center of the Earth'! Si os gustan las emociones fuertes dentro del volcán, os va a encantar.",
    tama: "Admirad el diseño del parque: es el único Disney del mundo ambientado en leyendas náuticas, Julio Verne y el misterio del océano.",
    panko: "Para cenar al llegar al hotel de Asakusabashi, un bol de arroz caliente con cerdo empanado (Katsudon) nos devolverá toda la energía."
  },
  '2026-12-24': {
    koji: "¡A cruzar el paso de peatones de Shibuya corriendo de lado a lado! La foto desde la azotea de Shibuya SKY es sencillamente impresionante.",
    tama: "¡Meri Kurisumasu! En Japón la Nochebuena se celebra paseando bajo las luces de la ciudad. ¡Las iluminaciones de Roppongi Hills son mágicas!",
    panko: "La tradición navideña japonesa es cenar pollo frito y tarta de nata con fresas (Shortcake). ¡Hoy hay que cumplir la tradición!"
  },
  '2026-12-25': {
    koji: "¡Respirad el aire puro de las montañas entre cedros gigantes! El sendero hacia la cascada Kegon os dejará con la boca abierta.",
    tama: "¡Feliz Navidad! En el templo Tōshō-gū buscad el famoso grabado en madera de los 'Tres Monos Sabios': no ver, no oír y no decir el mal.",
    panko: "¡Cena navideña en Utsunomiya! Vamos a atiborrarnos a gyozas a la plancha. Probad las tradicionales de verdura y carne."
  },
  '2026-12-26': {
    koji: "¡A explorar Akihabara de arriba a abajo! Muchas de las mejores tiendas de cómics y videojuegos están en los pisos 3 y 4 de los edificios.",
    tama: "En el templo Sensō-ji, atraed el humo del gran quemador de incienso hacia vosotros con las manos para atraer la salud y la buena suerte.",
    panko: "En la calle Nakamise, probad los Ningyo-yaki: unos bizcochitos calientes rellenos de crema con formas de figuritas tradicionales."
  },
  '2026-12-27': {
    koji: "¡Subida a los miradores del Ayuntamiento de Tokio! Si el cielo está despejado, podremos contemplar el horizonte entero de la capital.",
    tama: "En el barrio de Yotsuya, subid las escaleras rojas del santuario Suga para recrear la escena final de la película de anime Your Name.",
    panko: "Para comer en el barrio de las librerías Jinbocho, el curry japonés de Curry Bondy acompañado de patata cocida es insuperable."
  },
  '2026-12-28': {
    koji: "¡Abrochaos bien los abrigos! La brisa junto al lago Kawaguchiko es fresquita pero contemplar el volcán tan cerca merece la pena.",
    tama: "La puerta Torii del Cielo encuadra el Monte Fuji de forma sagrada. Si conseguís una foto sin nubes, guardadla como amuleto de viaje.",
    panko: "Hoy cenamos un reconfortante bol de Houtou Udon: fideos anchos de montaña cocinados en caldo espeso con calabaza local."
  },
  '2026-12-29': {
    koji: "¡A entrenar esas piernas! Nos esperan 398 escalones hasta la Pagoda Chureito, pero la vista de la postal japonesa pagará el esfuerzo.",
    tama: "El agua cristalina de los estanques de Oshino Hakkai proviene de la nieve del Fuji filtrada bajo tierra durante más de 80 años.",
    panko: "En la aldea ninja, probad la puntería lanzando estrellas shuriken de metal. ¡El que clave más gana un postre de mochi!"
  },
  '2026-12-30': {
    koji: "Pasead por las calles de madera de Sanmachi Suji al atardecer cuando se encienden los farolillos. Parecerá que viajáis al Japón feudal.",
    tama: "Las grandes bolas de cedro (Sugidama) colgadas en las fachadas cambian de verde a marrón cuando el sake artesanal ha fermentado.",
    panko: "¡Momento gastronómico estelar! Probad el sushi de ternera de Hida servido sobre una galleta crujiente de arroz tostado."
  },
  '2026-12-31': {
    koji: "¡Cuidado al caminar por las callejuelas nevadas! Las casas de paja Gassho-zukuri rodeadas de nieve parecen un cuento de invierno.",
    tama: "¡Akemashite Omedetō! Esta noche los templos tocarán 108 campanadas (Joya no Kane) para purificar los 108 deseos mundanos antes del nuevo año.",
    panko: "En Nochevieja la tradición japonesa es cenar fideos finos Toshikoshi Soba, que simbolizan una vida larga y próspera para la familia."
  },
  '2027-01-01': {
    koji: "¡Feliz Año Nuevo 2027! Vamos a caminar hasta el santuario Hie para compartir el primer día del año junto a los habitantes locales.",
    tama: "Hoy realizamos el Hatsumode (primera visita del año al templo). Comprad un amuleto Omamori para proteger la salud de la familia.",
    panko: "Probad el Ozōni: una sopa caliente tradicional de Año Nuevo que lleva un pastelito de arroz mochi muy elástico en su interior."
  },
  '2027-01-02': {
    koji: "¡Adentrémonos en el túnel de miles de arcos Torii rojos! Cuanto más alto subáis por la colina, más tranquilo estará el camino.",
    tama: "Fijaos en las estatuas de los zorros Kitsune: muchos llevan llaves o pergaminos en la boca porque son los guardianes del templo.",
    panko: "Cerca de la estación de Kioto hay puestos de brochetas de carne a la parrilla y pastelitos de té matcha para reponer fuerzas."
  },
  '2027-01-03': {
    koji: "Cruzad el puente Togetsukyo en Arashiyama y subid a saludar a los monos en libertad del parque Iwatayama.",
    tama: "En el Pabellón Dorado Kinkaku-ji, contemplad cómo las dos plantas cubiertas de pan de oro puro se reflejan en el estanque Espejo.",
    panko: "En el templo Otagi Nenbutsu-ji buscad las estatuas de piedra más graciosas: ¡hay una bebiendo sake y otra con una raqueta!"
  },
  '2027-01-04': {
    koji: "Paseo relajado bordeando el canal. Un día magnífico para caminar sin prisas y disfrutar del silencio de los barrios tradicionales.",
    tama: "El templo Nanzen-ji oculta un auténtico acueducto romano de ladrillo rojo en su jardín posterior. ¡Un contraste arquitectónico único!",
    panko: "Tenéis que probar el helado cremoso de té verde matcha con brocheta de dango en las teterías a lo largo del camino."
  },
  '2027-01-05': {
    koji: "En el Castillo Nijō, pisad con ganas el 'Suelo de Ruiseñor'. Las maderas crujen emitiendo el canto de un pájaro para alertar de intrusos.",
    tama: "¡Modales con los ciervos de Nara! Hacedles una inclinación de cabeza y veréis cómo os devuelven la reverencia educadamente.",
    panko: "Comprad un paquete de galletas Shika-senbei para alimentar a los ciervos en la entrada del gran templo Tōdai-ji."
  },
  '2027-01-06': {
    koji: "A subir las empedradas cuestas de Sannenzaka y Ninenzaka explorando sus tiendas de artesanía y cerámica tradicional.",
    tama: "En Kiyomizu-dera, bebed de uno de los tres chorros de la cascada Otowa usando los cazos de mango largo: salud, éxito o amor.",
    panko: "Para cenar por el callejón Pontocho, buscad una taberna acogedora donde pedir brochetas Yakitori o un okonomiyaki bien sabroso."
  },
  '2027-01-07': {
    koji: "¡Llegamos a la ciudad más alegre de Japón! Hay que hacerse la foto obligatoria haciendo la pose del corredor de Glico Man.",
    tama: "En el templo Hozen-ji, verted un cazo de agua sobre la estatua de Buda cubierta de musgo verde para pedir prosperidad familiar.",
    panko: "¡Misión gastronómica! Comer Takoyaki recién hechos en los puestos callejeros de Dōtonbori. ¡Soplad bien antes de morder!"
  },
  '2027-01-08': {
    koji: "Recorred las tiendas de Ota Road en Nipponbashi. Es el epicentro de los videojuegos retro y las figuras en el oeste de Japón.",
    tama: "En el barrio retro de Shinsekai, buscad la estatua dorada de Billiken y rascadle las plantas de los pies para tener buena suerte.",
    panko: "En el mercado Kuromon encontraréis brochetas de marisco fresco, carne Wagyu a la plancha y fruta gigante en cada puesto."
  },
  '2027-01-09': {
    koji: "¡A poner rumbo directo a Super Nintendo World nada más entrar para exprimir cada atracción del parque al máximo!",
    tama: "Sincronizad la pulsera Power-Up Band con la aplicación para ir registrando cada bloque '?' que golpeéis durante el día.",
    panko: "En la zona de Harry Potter, la Butterbeer (cerveza de mantequilla sin alcohol) espumosa servida helada está riquísima."
  },
  '2027-01-10': {
    koji: "Paseo por la elegancia de Ginza y caminata cruzando los puentes sobre el río Sumida hacia la isla de Tsukishima al atardecer.",
    tama: "La torre del reloj de Seiko en la esquina de Ginza lleva marcando las horas de la capital desde hace casi un siglo.",
    panko: "¡Cena interactiva cocinando Monjayaki en la plancha de la mesa! Usad las pequeñas palitas metálicas para ir rascando la masa tostada."
  },
  '2027-01-11': {
    koji: "¡Cacería de tesoros retro en Nakano Broadway! Un laberinto de varias plantas repleto de juguetes vintage y coleccionismo.",
    tama: "En Shimokitazawa se respira la atmósfera más bohemia de Tokio. Un lugar perfecto para pasear entre tiendas de ropa de segunda mano.",
    panko: "¡Parada dulce en Shiro-Hige! Los profiteroles de crema horneados con la forma exacta del personaje Totoro son adorables."
  },
  '2027-01-12': {
    koji: "Caminata entre templos rodeados de bambú hasta bajar a la playa de Yuigahama para admirar el Océano Pacífico.",
    tama: "El Gran Buda de Kamakura lleva desde el año 1252 sentado al aire libre tras sobrevivir a un tsunami histórico que destruyó su templo.",
    panko: "Por una pequeña donación de 50 yenes se puede entrar dentro de la estatua de bronce del Buda. ¡Es una experiencia única!"
  },
  '2027-01-13': {
    koji: "¡Últimos paseos por Tokio! Toca empaquetar las maletas con cuidado para que todos los recuerdos y compras lleguen perfectos.",
    tama: "Agradecemos al País del Sol Naciente su hospitalidad y seguridad. Volvemos a casa con recuerdos inolvidables en el corazón.",
    panko: "Desayuno de despedida en el mercado exterior de Tsukiji con tortillas dulce Tamagoyaki recién hechas. ¡Hasta la próxima, Japón!"
  }
};

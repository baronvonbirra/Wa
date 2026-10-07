import { Wa2State } from './wa2Types';

export const INITIAL_WA2_STATE: Wa2State = {
  tripStartDate: "2026-12-20",
  tripEndDate: "2027-01-14",
  selectedDate: "2026-12-20",
  eurJpyRate: 160.0,
  darkMode: false,
  groupPinCode: "2026",
  isAuthenticated: false,

  cities: [
    {
      id: "city-tokyo",
      name: "Tokio",
      lat: 35.6762,
      lng: 139.6503,
      start_date: "2026-12-20",
      end_date: "2026-12-26",
      order_index: 1
    },
    {
      id: "city-kyoto",
      name: "Kioto",
      lat: 35.0116,
      lng: 135.7681,
      start_date: "2026-12-27",
      end_date: "2026-12-31",
      order_index: 2
    },
    {
      id: "city-osaka",
      name: "Osaka",
      lat: 34.6937,
      lng: 135.5023,
      start_date: "2027-01-01",
      end_date: "2027-01-05",
      order_index: 3
    }
  ],

  accommodations: [
    {
      id: "acc-disney",
      city_id: "city-tokyo",
      segment: "Disney",
      name: "Tokyo Disneyland Hotel",
      address: "29-1 Maihama, Urayasu, Chiba 279-8505",
      start_date: "2026-12-20",
      end_date: "2026-12-21",
      check_in_time: "15:00",
      check_out_time: "11:00",
      booking_code: "BK-DISNEY-101",
      notes: "Acceso directo a Disneyland Tokyo y DisneySea."
    },
    {
      id: "acc-tokyo1",
      city_id: "city-tokyo",
      segment: "Tokyo 1",
      name: "Hotel Gracery Shinjuku",
      address: "1-19-1 Kabukicho, Shinjuku-ku, Tokyo 160-8336",
      start_date: "2026-12-22",
      end_date: "2026-12-25",
      check_in_time: "15:00",
      check_out_time: "11:00",
      booking_code: "BK-TK1-88291",
      notes: "Cerca de la salida este de la estación de Shinjuku. Cabeza de Godzilla."
    },
    {
      id: "acc-kawaguchiko",
      city_id: "city-tokyo",
      segment: "Kawaguchiko",
      name: "Fuji Onsenji Yumedono Ryokan",
      address: "6677 Funatsu, Fujikawaguchiko, Yamanashi",
      start_date: "2026-12-26",
      end_date: "2026-12-27",
      check_in_time: "14:00",
      check_out_time: "10:00",
      booking_code: "BK-FUJI-303",
      notes: "Ryokan tradicional con Onsen privado y vistas al Monte Fuji."
    },
    {
      id: "acc-takayama",
      city_id: "city-kyoto",
      segment: "Takayama",
      name: "Takayama Ouan Ryokan",
      address: "4-313 Hanasatomachi, Takayama, Gifu",
      start_date: "2026-12-28",
      end_date: "2026-12-29",
      check_in_time: "15:00",
      check_out_time: "10:00",
      booking_code: "BK-TAK-404",
      notes: "Suelo de tatami completo en todo el hotel y baños termales al aire libre."
    },
    {
      id: "acc-kyoto",
      city_id: "city-kyoto",
      segment: "Kyoto",
      name: "Hotel Granvia Kyoto",
      address: "JR Kyoto Station Building, Karasuma St, Shimogyo Ward, Kyoto",
      start_date: "2026-12-30",
      end_date: "2027-01-02",
      check_in_time: "15:00",
      check_out_time: "11:00",
      booking_code: "BK-KY-77310",
      notes: "Ubicado directamente dentro del edificio de la Estación Central de Kioto."
    },
    {
      id: "acc-osaka",
      city_id: "city-osaka",
      segment: "Osaka",
      name: "Cross Hotel Osaka",
      address: "2-2-18 Shinsaibashisuji, Chuo Ward, Osaka",
      start_date: "2027-01-03",
      end_date: "2027-01-07",
      check_in_time: "15:00",
      check_out_time: "11:00",
      booking_code: "BK-OS-99124",
      notes: "A solo 3 minutos a pie del famoso cartel de Glico en Dotonbori."
    },
    {
      id: "acc-tokyo2",
      city_id: "city-tokyo",
      segment: "Tokyo 2",
      name: "Park Hotel Tokyo (Shiodome)",
      address: "Shiodome Media Tower 1-7-1 Higashi-Shinbashi, Minato-ku, Tokyo",
      start_date: "2027-01-08",
      end_date: "2027-01-13",
      check_in_time: "15:00",
      check_out_time: "11:00",
      booking_code: "BK-TK2-55102",
      notes: "Últimas compras y despedida de Tokio con vistas a la Torre de Tokio."
    },
    {
      id: "acc-flight",
      city_id: "city-tokyo",
      segment: "Vuelo / Tránsito",
      name: "Vuelo de Regreso a España (Llegada a Málaga)",
      address: "Aeropuerto de Málaga-Costa del Sol (AGP)",
      start_date: "2027-01-14",
      end_date: "2027-01-14",
      check_in_time: "08:00",
      check_out_time: "18:00",
      booking_code: "FLIGHT-AGP-2027",
      notes: "Llegada el 14 de Enero a Málaga (Offset JST UTC+9)."
    }
  ],

  itineraryItems: [
    // 2026-12-20 - Día 1: Llegada a Tokio
    {
      id: "itin-101",
      external_id: "mymaps-itin-101",
      date: "2026-12-20",
      time_start: "15:30",
      title: "Llegada al Aeropuerto de Haneda / Narita",
      description: "Recoger el JR Pass, tarjetas Suica / Pasmo y router Wi-Fi portátil en el mostrador.",
      google_maps_url: "https://maps.google.com/?q=Haneda+Airport+Tokyo",
      category: "transport",
      status: "pending",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-102",
      external_id: "mymaps-itin-102",
      date: "2026-12-20",
      time_start: "18:00",
      title: "Check-in en Hotel Gracery Shinjuku",
      description: "Dejar maletas, descansar y explorar la zona de Godzilla Road.",
      google_maps_url: "https://maps.google.com/?q=Hotel+Gracery+Shinjuku",
      category: "note",
      status: "pending",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-103",
      external_id: "mymaps-itin-103",
      date: "2026-12-20",
      time_start: "20:00",
      title: "Cena de Bienvenida: Omoide Yokocho (Shinjuku)",
      description: "Cenar yakitori y ramen tradicional en los míticos puestecillos retro.",
      google_maps_url: "https://maps.google.com/?q=Omoide+Yokocho+Shinjuku",
      category: "food",
      status: "pending",
      order_index: 3,
      created_at: new Date().toISOString()
    },

    // 2026-12-21 - Día 2: Asakusa & Akihabara
    {
      id: "itin-201",
      external_id: "mymaps-itin-201",
      date: "2026-12-21",
      time_start: "09:00",
      title: "Templo Senso-ji y calle Nakamise",
      description: "Visita al templo más antiguo de Tokio. Probar melopan y dulces tradicionales en Nakamise-dori.",
      google_maps_url: "https://maps.google.com/?q=Sensoji+Temple+Asakusa",
      category: "attraction",
      status: "pending",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-202",
      external_id: "mymaps-itin-202",
      date: "2026-12-21",
      time_start: "14:00",
      title: "Ruta de Compras por Akihabara Electric Town",
      description: "Explorar tiendas de figuras, manga y videojuegos retro: Mandarake, Radio Kaikan y Super Potato.",
      google_maps_url: "https://maps.google.com/?q=Akihabara+Radio+Kaikan",
      category: "attraction",
      status: "pending",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-203",
      external_id: "mymaps-itin-203",
      date: "2026-12-21",
      time_start: "19:30",
      title: "Cena en Ichiran Ramen Akihabara",
      description: "Disfrutar del famoso tonkotsu ramen en cabina individual.",
      google_maps_url: "https://maps.google.com/?q=Ichiran+Ramen+Akihabara",
      category: "food",
      status: "pending",
      order_index: 3,
      created_at: new Date().toISOString()
    },

    // 2026-12-22 - Día 3: Shibuya & Harajuku
    {
      id: "itin-301",
      external_id: "mymaps-itin-301",
      date: "2026-12-22",
      time_start: "10:00",
      title: "Santuario Meiji Jingu y Parque Yoyogi",
      description: "Paseo por el majestuoso bosque sagrado en pleno centro de Tokio.",
      google_maps_url: "https://maps.google.com/?q=Meiji+Jingu+Shrine",
      category: "attraction",
      status: "pending",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-302",
      external_id: "mymaps-itin-302",
      date: "2026-12-22",
      time_start: "12:30",
      title: "Calle Takeshita en Harajuku",
      description: "Probar las famosas crepas de Harajuku y ver moda urbana estrafalaria.",
      google_maps_url: "https://maps.google.com/?q=Takeshita+Street+Harajuku",
      category: "attraction",
      status: "pending",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-303",
      external_id: "mymaps-itin-303",
      date: "2026-12-22",
      time_start: "16:00",
      title: "Cruce de Shibuya & Mirador Shibuya Sky",
      description: "Ver el cruce peatonal más concurrido del mundo y subir al mirador panorámico.",
      google_maps_url: "https://maps.google.com/?q=Shibuya+Crossing",
      category: "attraction",
      status: "pending",
      order_index: 3,
      created_at: new Date().toISOString()
    },

    // 2026-12-27 - Traslado a Kioto
    {
      id: "itin-401",
      external_id: "mymaps-itin-401",
      date: "2026-12-27",
      time_start: "08:30",
      title: "Tren Shinkansen Tokio -> Kioto",
      description: "Tomar el tren bala Shinkansen Hikari desde Estación de Tokio hasta Estación de Kioto (aprox 2h 15min).",
      google_maps_url: "https://maps.google.com/?q=Tokyo+Station",
      category: "transport",
      status: "pending",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-402",
      external_id: "mymaps-itin-402",
      date: "2026-12-27",
      time_start: "12:00",
      title: "Santuario Fushimi Inari Taisha",
      description: "Recorrer los miles de toriis rojos subiendo por el monte sagrado del zorro Inari.",
      google_maps_url: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
      category: "attraction",
      status: "pending",
      order_index: 2,
      created_at: new Date().toISOString()
    },

    // 2027-01-01 - Año Nuevo en Osaka
    {
      id: "itin-501",
      external_id: "mymaps-itin-501",
      date: "2027-01-01",
      time_start: "11:00",
      title: "Castillo de Osaka & Parque Central",
      description: "Visita al imponente castillo histórico y sus jardines de invierno.",
      google_maps_url: "https://maps.google.com/?q=Osaka+Castle",
      category: "attraction",
      status: "pending",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "itin-502",
      external_id: "mymaps-itin-502",
      date: "2027-01-01",
      time_start: "17:00",
      title: "Dotonbori & Comida Callejera",
      description: "Probar Takoyaki caliente, Okonomiyaki y hacerse foto con el cartel de Glico Running Man.",
      google_maps_url: "https://maps.google.com/?q=Dotonbori+Osaka",
      category: "food",
      status: "pending",
      order_index: 2,
      created_at: new Date().toISOString()
    }
  ],

  savedPlaces: [
    {
      id: "place-1",
      external_id: "mymaps-place-1",
      city_id: "city-tokyo",
      name: "Super Potato Akihabara",
      category: "retro_gaming",
      google_maps_url: "https://maps.google.com/?q=Super+Potato+Akihabara",
      notes: "El templo del videojuego retro. Plantas 3, 4 y 5 repletas de consolas antiguas y arcade en la azotea.",
      visited: false,
      created_at: new Date().toISOString()
    },
    {
      id: "place-2",
      external_id: "mymaps-place-2",
      city_id: "city-tokyo",
      name: "Ichiran Ramen Shinjuku",
      category: "ramen",
      google_maps_url: "https://maps.google.com/?q=Ichiran+Ramen+Shinjuku",
      notes: "Excelente Tonkotsu ramen. Pedir huevo con sal de acompañamiento.",
      visited: true,
      created_at: new Date().toISOString()
    },
    {
      id: "place-3",
      external_id: "mymaps-place-3",
      city_id: "city-tokyo",
      name: "Gachapon Department Store Ikebukuro",
      category: "gachapon",
      google_maps_url: "https://maps.google.com/?q=Gashapon+Bandai+Official+Shop+Ikebukuro",
      notes: "La tienda de gachapones más grande del mundo con más de 3,000 máquinas gashapon.",
      visited: false,
      created_at: new Date().toISOString()
    },
    {
      id: "place-4",
      external_id: "mymaps-place-4",
      city_id: "city-kyoto",
      name: "Gion Duck Noodles",
      category: "ramen",
      google_maps_url: "https://maps.google.com/?q=Gion+Duck+Noodles+Kyoto",
      notes: "Famoso local secreto de ramen de pato con menú escrito exclusivamente en emojis.",
      visited: false,
      created_at: new Date().toISOString()
    },
    {
      id: "place-5",
      external_id: "mymaps-place-5",
      city_id: "city-osaka",
      name: "Kukuru Takoyaki Dotonbori",
      category: "izakaya",
      google_maps_url: "https://maps.google.com/?q=Kukuru+Takoyaki+Dotonbori",
      notes: "Los mejores takoyaki con trozos gigantes de pulpo fresco.",
      visited: false,
      created_at: new Date().toISOString()
    }
  ],

  wishlist: [
    {
      id: "wish-1",
      item_name: "Game Boy Advance SP (Edición Zelda / Famicom)",
      price_jpy: 18000,
      image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
      purchased: false,
      category: "retro_gaming",
      notes: "Buscar en Super Potato o Surugaya en Akihabara o Nipponbashi.",
      created_at: new Date().toISOString()
    },
    {
      id: "wish-2",
      item_name: "Figura Nendoroid Pikachu / Demon Slayer",
      price_jpy: 6500,
      image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
      purchased: true,
      category: "figuras",
      notes: "Comprada en AmiAmi Radio Kaikan Planta 4.",
      created_at: new Date().toISOString()
    },
    {
      id: "wish-3",
      item_name: "Camiseta Sukajan de Seda BORDADA (Dragón de Kioto)",
      price_jpy: 12000,
      image_url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80",
      purchased: false,
      category: "ropa",
      notes: "Buscar en el mercado Ameyoko en Ueno o Shin-Kyogoku en Kioto.",
      created_at: new Date().toISOString()
    },
    {
      id: "wish-4",
      item_name: "Caja de KitKat sabores exclusivos de Japón (Matcha, Sake, Yuzu)",
      price_jpy: 2500,
      image_url: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80",
      purchased: false,
      category: "souvenirs",
      notes: "Comprar en Don Quijote (Donki) con Tax-Free.",
      created_at: new Date().toISOString()
    }
  ],

  travelDocs: [
    {
      id: "doc-1",
      title: "Visit Japan Web QR (Inmigración y Aduanas)",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=VISIT-JAPAN-WEB-IMMIGRATION-2026-OK",
      notes: "Código QR oficial escaneable en el control automático de la llegada a Japón."
    },
    {
      id: "doc-2",
      title: "Pasaporte Principal (Familia)",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PASSPORT-TRAVEL-DOCS-JAPAN-2026",
      notes: "Copia digital segura de los pasaportes para compras Tax-Free."
    },
    {
      id: "doc-3",
      title: "Seguro de Viaje Internacional & Asistencia",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=INSURANCE-POLICY-POL-99281-JAP",
      notes: "Póliza con atención médica 24/7 en español. Teléfono emergencias: +81 3-1234-5678."
    },
    {
      id: "doc-4",
      title: "JR Rail Pass / Canje Exchange Order",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=JR-PASS-ORDINARY-7DAYS-2026",
      notes: "Bono para canjear en la oficina JR del aeropuerto."
    }
  ],

  packingChecklist: [
    { id: "pack-1", item_name: "Pasaportes vigentes", category: "Documentación", checked: true },
    { id: "pack-2", item_name: "Código QR Visit Japan Web", category: "Documentación", checked: true },
    { id: "pack-3", item_name: "Póliza del Seguro de Viaje", category: "Documentación", checked: true },
    { id: "pack-4", item_name: "Adaptador de enchufe tipo A (Japón)", category: "Electrónica", checked: false },
    { id: "pack-5", item_name: "Powerbank batería externa 20000mAh", category: "Electrónica", checked: true },
    { id: "pack-6", item_name: "Cargadores de móvil y cámara", category: "Electrónica", checked: false },
    { id: "pack-7", item_name: "Ropa térmica / abrigo de invierno", category: "Ropa", checked: false },
    { id: "pack-8", item_name: "Calzado cómodo para caminar 20k pasos", category: "Ropa", checked: true },
    { id: "pack-9", item_name: "Botiquín con analgésicos y tiritas", category: "Botiquín", checked: false }
  ],

  emergencyContacts: [
    {
      id: "em-1",
      title: "Policía (Emergencias)",
      phone: "110",
      notes: "Teléfono gratuito directo de la policía en Japón."
    },
    {
      id: "em-2",
      title: "Ambulancia & Bomberos",
      phone: "119",
      notes: "Servicios médicos de urgencia en Japón."
    },
    {
      id: "em-3",
      title: "Embajada de España en Tokio",
      phone: "+81 3-3583-8531",
      address: "1-3-29 Roppongi, Minato-ku, Tokio",
      notes: "Atención consular a ciudadanos españoles."
    },
    {
      id: "em-4",
      title: "Asistencia Médica Seguro de Viaje",
      phone: "+81 3-1234-5678",
      notes: "Atención 24/7 en español para autorizaciones médicas."
    }
  ],

  survivalPhrases: [
    {
      id: "ph-1",
      category: "basic",
      spanish: "Hola / Buenas tardes",
      romaji: "Konnichiwa",
      japanese: "こんにちは"
    },
    {
      id: "ph-2",
      category: "basic",
      spanish: "Muchas gracias",
      romaji: "Arigatou gozaimasu",
      japanese: "ありがとうございます"
    },
    {
      id: "ph-3",
      category: "basic",
      spanish: "Disculpe / Perdone (para llamar la atención)",
      romaji: "Sumimasen",
      japanese: "すみません"
    },
    {
      id: "ph-4",
      category: "restaurant",
      spanish: "¿Tienen menú en inglés?",
      romaji: "Eigo no menyuu wa arimasu ka?",
      japanese: "英語のメニューはありますか？"
    },
    {
      id: "ph-5",
      category: "restaurant",
      spanish: "La cuenta, por favor",
      romaji: "O-kaikei o-negai shimasu",
      japanese: "お会計をお願いします"
    },
    {
      id: "ph-6",
      category: "restaurant",
      spanish: "¡Estaba delicioso!",
      romaji: "Gochisousama deshita",
      japanese: "ごちそうさ meでした"
    },
    {
      id: "ph-7",
      category: "shopping",
      spanish: "¿Cuánto cuesta esto?",
      romaji: "Kore wa ikura desu ka?",
      japanese: "おいくらですか？"
    },
    {
      id: "ph-8",
      category: "shopping",
      spanish: "¿Tienen libre de impuestos (Tax-Free)?",
      romaji: "Menzai wa dekimasu ka?",
      japanese: "免税はできますか？"
    },
    {
      id: "ph-9",
      category: "transport",
      spanish: "¿Dónde está la estación de tren / metro?",
      romaji: "Eki wa doko desu ka?",
      japanese: "駅はどこですか？"
    },
    {
      id: "ph-10",
      category: "transport",
      spanish: "Quiero recargar la tarjeta Suica",
      romaji: "Suica ni chaaji shitai desu",
      japanese: "Suicaにチャージしたいです"
    },
    {
      id: "ph-11",
      category: "emergency",
      spanish: "Por favor, ayúdeme",
      romaji: "Tasukete kudasai",
      japanese: "助けてください"
    },
    {
      id: "ph-12",
      category: "emergency",
      spanish: "No hablo japonés",
      romaji: "Nihongo ga hanasemasen",
      japanese: "日本語が話せません"
    }
  ]
};

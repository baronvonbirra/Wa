import json

trip_json = {
  "trip": {
    "title": "Itinerario Completo de Viaje a Japón 2026-2027",
    "stages": [
      {
        "id": "stage-1",
        "region": "Tokio (Primera Parte), Disney y Nikko",
        "dates": "2026-12-21 / 2026-12-27",
        "daily_itinerary": [
          {
            "date": "2026-12-21",
            "location": "Llegada y Disney Resort",
            "activities": [
              { "name": "Llegada al Aeropuerto de Haneda", "type": "transit" },
              { "name": "Traslado y Check-in en Hotel Tokyo Disney Resort", "type": "hotel" }
            ]
          },
          {
            "date": "2026-12-22",
            "location": "Tokyo Disneyland",
            "activities": [
              { "name": "Día completo en Tokyo Disneyland", "type": "theme_park" }
            ]
          },
          {
            "date": "2026-12-23",
            "location": "Tokyo DisneySea y Traslado a Tokio Centro",
            "activities": [
              { "name": "Día completo en Tokyo DisneySea", "type": "theme_park" },
              { "name": "Traslado y Check-in en Toyoko Inn Tokyo Asakusabashi", "type": "hotel" }
            ]
          },
          {
            "date": "2026-12-24",
            "location": "Tokio (Shibuya, Harajuku y Roppongi)",
            "activities": [
              { "name": "Santuario Meiji Jingu", "type": "sights" },
              { "name": "Calle Takeshita (Harajuku)", "type": "sights" },
              { "name": "Avenida Omotesando", "type": "sights" },
              { "name": "Cruce de Shibuya (Shibuya Scramble)", "type": "sights" },
              { "name": "Mirador Shibuya Sky", "type": "sights" },
              { "name": "Roppongi Hills e Iluminaciones Navideñas", "type": "sights" }
            ]
          },
          {
            "date": "2026-12-25",
            "location": "Excursión a Nikko y Utsunomiya",
            "activities": [
              { "name": "Santuario Tōshō-gū (Nikko)", "type": "sights" },
              { "name": "Puente Shinkyo (Nikko)", "type": "sights" },
              { "name": "Cascada Kegon y Lago Chuzenji (Nikko)", "type": "sights" },
              { "name": "Parada gastronómica y cena de gyozas en Utsunomiya", "type": "food" }
            ]
          },
          {
            "date": "2026-12-26",
            "location": "Tokio (Asakusa, Ueno y Akihabara)",
            "activities": [
              { "name": "Templo Sensō-ji", "type": "sights" },
              { "name": "Calle comercial Nakamise-dori", "type": "shopping" },
              { "name": "Parque Ueno", "type": "sights" },
              { "name": "Calle comercial Ameyoko", "type": "shopping" },
              { "name": "Akihabara Electric Town", "type": "shopping" },
              { "name": "Akihabara Radio Kaikan", "type": "shopping" },
              { "name": "Super Potato Akihabara", "type": "shopping" },
              { "name": "Animate Akihabara", "type": "shopping" },
              { "name": "Yodobashi Camera Multimedia Akiba", "type": "shopping" }
            ]
          },
          {
            "date": "2026-12-27",
            "location": "Tokio (Shinjuku e Ikebukuro)",
            "activities": [
              { "name": "Jardín Nacional Shinjuku Gyoen", "type": "sights" },
              { "name": "Callejón Omoide Yokocho", "type": "sights" },
              { "name": "Distrito de Kabukicho", "type": "sights" },
              { "name": "Sunshine City Ikebukuro", "type": "shopping" },
              { "name": "Pokémon Center Mega Tokyo", "type": "shopping" },
              { "name": "Mandarake Ikebukuro", "type": "shopping" },
              { "name": "Animate Ikebukuro Main Store", "type": "shopping" }
            ]
          }
        ]
      },
      {
        "id": "stage-2",
        "region": "Monte Fuji y Alpes Japoneses",
        "dates": "2026-12-28 / 2027-01-01",
        "daily_itinerary": [
          {
            "date": "2026-12-28",
            "location": "Kawaguchiko",
            "activities": [
              { "name": "Santuario Kawaguchi Asama", "type": "sights" },
              { "name": "Santuario Yama", "type": "sights" },
              { "name": "Santuario Homi", "type": "sights" },
              { "name": "Mirador Tenku no Torii", "type": "sights" },
              { "name": "Cascada Haha-no-Shirataki", "type": "sights" },
              { "name": "Parque Nagasaki", "type": "sights" },
              { "name": "Parque Oishi", "type": "sights" }
            ]
          },
          {
            "date": "2026-12-29",
            "location": "Kawaguchiko, Fujiyoshida y Oshino",
            "activities": [
              { "name": "Mirador Ubuyagasaki", "type": "sights" },
              { "name": "Komagari Plaza", "type": "sights" },
              { "name": "Teleférico Panorámico del Monte Fuji", "type": "sights" },
              { "name": "Paseo en barco por el lago Kawaguchiko", "type": "sights" },
              { "name": "Parque Arakurayama Sengen", "type": "sights" },
              { "name": "Santuario Kitaguchi Hongu Fuji Sengen", "type": "sights" },
              { "name": "Santuario Arayayama", "type": "sights" },
              { "name": "Zona comercial Honcho 2-chome", "type": "shopping" },
              { "name": "Manantiales de Oshino Hakkai", "type": "sights" },
              { "name": "Shinobi No Sato Ninja Village", "type": "sights" }
            ]
          },
          {
            "date": "2026-12-30",
            "location": "Takayama (Centro y Templos)",
            "activities": [
              { "name": "Santuario Sakurayama Hachiman", "type": "sights" },
              { "name": "Templo Takayama Betsuin Shorenji", "type": "sights" },
              { "name": "Ruta de templos de Higashiyama (Hakusan, Daiohji, Zennoji)", "type": "sights" },
              { "name": "Santuario Akiba", "type": "sights" },
              { "name": "Santuario Akiha Shimoninomachi", "type": "sights" },
              { "name": "Residencia Yoshijima", "type": "sights" },
              { "name": "Residencia Kusakabe", "type": "sights" },
              { "name": "Centro de artesanía Hida Takayama Omoide Taikenkan", "type": "culture" },
              { "name": "Museo de la Ciudad de Takayama", "type": "culture" },
              { "name": "Distrito histórico Sanmachi Suji", "type": "sights" },
              { "name": "Destilería Kawashiri", "type": "food" },
              { "name": "Destilería Funasaka", "type": "food" },
              { "name": "Puente Nakahashi", "type": "sights" }
            ]
          },
          {
            "date": "2026-12-31",
            "location": "Takayama y Shirakawa-go",
            "activities": [
              { "name": "Nakabashi Park (Takayama)", "type": "sights" },
              { "name": "Takayama Jinya (Takayama)", "type": "sights" },
              { "name": "Mirador del Castillo de Ogimachi (Shirakawa-go)", "type": "sights" },
              { "name": "Aldea Gassho Village (Shirakawa-go)", "type": "sights" },
              { "name": "Casa Wada (Shirakawa-go)", "type": "sights" },
              { "name": "Casa Nagase (Shirakawa-go)", "type": "sights" },
              { "name": "Las Tres Casas de Shirakawago", "type": "sights" },
              { "name": "Museo al aire libre Minka-en (Shirakawa-go)", "type": "culture" },
              { "name": "Puente Deai (Shirakawa-go)", "type": "sights" },
              { "name": "Santuario Shirakawa Hachiman (Shirakawa-go)", "type": "sights" },
              { "name": "Santuario Ogimachi Akiba (Shirakawa-go)", "type": "sights" },
              { "name": "Santuario Hatoya Hachiman (Shirakawa-go)", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-01",
            "location": "Takayama (Zona Sur y Castillo)",
            "activities": [
              { "name": "Parque Shiroyama", "type": "sights" },
              { "name": "Templo Shoren-ji", "type": "sights" },
              { "name": "Ruinas del castillo de Takayama", "type": "sights" },
              { "name": "Ruinas del sur (Minaminoidemaru)", "type": "sights" },
              { "name": "Templo Dairyu", "type": "sights" },
              { "name": "Santuario Bentendo", "type": "sights" },
              { "name": "Santuario Hie", "type": "sights" },
              { "name": "Templo Hida Kokubunji", "type": "sights" }
            ]
          }
        ]
      },
      {
        "id": "stage-3",
        "region": "Kioto y Excursión a Nara",
        "dates": "2027-01-02 / 2027-01-06",
        "daily_itinerary": [
          {
            "date": "2027-01-02",
            "location": "Kioto (Zona Sur y Centro)",
            "activities": [
              { "name": "Templo Tō-ji", "type": "sights" },
              { "name": "Santuario Fushimi Inari-taisha", "type": "sights" },
              { "name": "Templo Tōfuku-ji (Puerta Kusaka)", "type": "sights" },
              { "name": "Sanjūsangen-dō (1001 estatuas)", "type": "sights" },
              { "name": "Templo Higashi Honganji", "type": "sights" },
              { "name": "Templo Nishi-Honganji", "type": "sights" },
              { "name": "Torre de Kioto", "type": "sights" },
              { "name": "Estación de Kioto", "type": "transit" }
            ]
          },
          {
            "date": "2027-01-03",
            "location": "Kioto (Norte y Arashiyama)",
            "activities": [
              { "name": "Pabellón Dorado (Kinkaku-ji)", "type": "sights" },
              { "name": "Jardín zen de Ryōan-ji", "type": "sights" },
              { "name": "Templo Ninna-ji", "type": "sights" },
              { "name": "Templo Tenryū-ji", "type": "sights" },
              { "name": "Parque Kameyama", "type": "sights" },
              { "name": "Santuario Nonomiya", "type": "sights" },
              { "name": "Templo Jōjakkō-ji", "type": "sights" },
              { "name": "Templo Seiryō-ji", "type": "sights" },
              { "name": "Templo Giō-ji", "type": "sights" },
              { "name": "Calle conservada Saga Toriimoto", "type": "sights" },
              { "name": "Templo Otagi Nenbutsu-ji", "type": "sights" },
              { "name": "Santuario Toriimotohachimangu", "type": "sights" },
              { "name": "Templo Daikaku-ji", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-04",
            "location": "Kioto (Paseo del Filósofo y Higashiyama Norte)",
            "activities": [
              { "name": "Pabellón de Plata (Ginkaku-ji)", "type": "sights" },
              { "name": "Paseo del Filósofo", "type": "sights" },
              { "name": "Templo Hōnen-in", "type": "sights" },
              { "name": "Mausoleo del Emperador Reizei", "type": "sights" },
              { "name": "Templo Kōun-ji", "type": "sights" },
              { "name": "Santuario Kumanonyakuōji", "type": "sights" },
              { "name": "Templo Eikan-dō (Zenrin-ji)", "type": "sights" },
              { "name": "Complejo Nanzen-ji", "type": "sights" },
              { "name": "Santuario Heian Jingū", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-05",
            "location": "Excursión a Nara y Kioto (Castillo Nijō)",
            "activities": [
              { "name": "Estación de Nara", "type": "transit" },
              { "name": "Templo Kōfuku-ji (Nara)", "type": "sights" },
              { "name": "Jardín Yoshikien (Nara)", "type": "sights" },
              { "name": "Jardín Isuien (Nara)", "type": "sights" },
              { "name": "Gran puerta Nandaimon (Nara)", "type": "sights" },
              { "name": "Templo Tōdai-ji - Gran Buda (Nara)", "type": "sights" },
              { "name": "Parque de Nara", "type": "sights" },
              { "name": "Santuario Kasuga-taisha (Nara)", "type": "sights" },
              { "name": "Templo Shin-Yakushiji Jizodo (Nara)", "type": "sights" },
              { "name": "Residencia histórica Imanishi-ke Shoin (Nara)", "type": "sights" },
              { "name": "Museo Naramachi (Nara)", "type": "culture" },
              { "name": "Casa machiya Naramachi Koshino Ie (Nara)", "type": "culture" },
              { "name": "Templo Gangō-ji (Nara)", "type": "sights" },
              { "name": "Castillo Nijō (Kioto - Tarde)", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-06",
            "location": "Kioto (Higashiyama Sur, Gion y Pontocho)",
            "activities": [
              { "name": "Templo Kiyomizu-dera", "type": "sights" },
              { "name": "Honke Nishio Yatsuhashi", "type": "shopping" },
              { "name": "Cuesta histórica Sannenzaka", "type": "sights" },
              { "name": "Cuesta histórica Ninenzaka", "type": "sights" },
              { "name": "Estatua Ryozen Kannon", "type": "sights" },
              { "name": "Templo Kōdai-ji", "type": "sights" },
              { "name": "Templo zen Entoku-in", "type": "sights" },
              { "name": "Santuario Yasaka", "type": "sights" },
              { "name": "Templo Chion-in", "type": "sights" },
              { "name": "Templo Shōren-in Monzeki", "type": "sights" },
              { "name": "Jardín Choontei", "type": "sights" },
              { "name": "Calle Hanamikoji", "type": "sights" },
              { "name": "Teatro Miyagawacho Kaburenjo", "type": "culture" },
              { "name": "Callejón Pontocho", "type": "sights" }
            ]
          }
        ]
      },
      {
        "id": "stage-4",
        "region": "Osaka",
        "dates": "2027-01-07 / 2027-01-09",
        "daily_itinerary": [
          {
            "date": "2027-01-07",
            "location": "Osaka (Castillo, Templos y Dōtonbori)",
            "activities": [
              { "name": "Castillo Osaka", "type": "sights" },
              { "name": "Shitennō-ji", "type": "sights" },
              { "name": "Ukiniwa Bridge", "type": "sights" },
              { "name": "Daikoku Bridge", "type": "sights" },
              { "name": "Ebisu Bridge", "type": "sights" },
              { "name": "Dōtonbori", "type": "sights" },
              { "name": "Kani Doraku Dotombori", "type": "sights" },
              { "name": "Ukiyo Koji", "type": "sights" },
              { "name": "Hozen-ji", "type": "sights" },
              { "name": "Hozenji Yokocho", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-08",
            "location": "Osaka (Mercados, Otaku y Shinsekai)",
            "activities": [
              { "name": "Kuromon Market", "type": "sights" },
              { "name": "Ota Road", "type": "shopping" },
              { "name": "Nipponbashi Denden Town", "type": "shopping" },
              { "name": "Namba Walk Forest Park", "type": "sights" },
              { "name": "America-mura", "type": "sights" },
              { "name": "BB Amemura/ AMERICAN VILLAGE FREEMARKET", "type": "shopping" },
              { "name": "Shinsaibashisuji", "type": "shopping" },
              { "name": "Mitsugu (Mitsuhachimangu)", "type": "sights" },
              { "name": "Calle comercial Shinsekai Hondori", "type": "sights" },
              { "name": "Tsūtenkaku", "type": "sights" },
              { "name": "Mercado Shin-sekai", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-09",
            "location": "Universal Studios Japan",
            "activities": [
              { "name": "Universal Studios Japan", "type": "theme_park" }
            ]
          }
        ]
      },
      {
        "id": "stage-5",
        "region": "Tokio (Segunda Parte) y Kamakura",
        "dates": "2027-01-10 / 2027-01-13",
        "daily_itinerary": [
          {
            "date": "2027-01-10",
            "location": "Tokio (Ginza, Tsukishima y Tsukuda)",
            "activities": [
              { "name": "Kabuki-za", "type": "culture" },
              { "name": "Asahi Inari Shrine", "type": "sights" },
              { "name": "Seiko House Ginza Clock Tower", "type": "sights" },
              { "name": "Kakugo Inari Shrine", "type": "sights" },
              { "name": "Ginza Lion Beer Hall (Ginza 7-chome)", "type": "food" },
              { "name": "Toyoiwa Inari Shrine", "type": "sights" },
              { "name": "Jardines de Hamarikyu", "type": "sights" },
              { "name": "隅田川テラス（月島）", "type": "sights" },
              { "name": "Nishinaka dori Street", "type": "sights" },
              { "name": "Triton Bridge", "type": "sights" },
              { "name": "Tsukuda Namiyoke Inari Daimyōjin & Osaki Inari Jinja", "type": "sights" },
              { "name": "Puente Aioi", "type": "sights" },
              { "name": "Tsukudako Bridge", "type": "sights" },
              { "name": "Sumiyoshi Jinja", "type": "sights" },
              { "name": "Ishikawa Island Lighthouse", "type": "sights" },
              { "name": "Tsukishima Monja Okoge Main Store", "type": "food" }
            ]
          },
          {
            "date": "2027-01-11",
            "location": "Tokio (Nakano y Shimokitazawa)",
            "activities": [
              { "name": "Nakano Station", "type": "transit" },
              { "name": "Renga Zaka", "type": "sights" },
              { "name": "Fureai Road", "type": "sights" },
              { "name": "Hakusen Street", "type": "sights" },
              { "name": "Nakano Broadway", "type": "shopping" },
              { "name": "Shimo-Kitazawa Station", "type": "transit" },
              { "name": "Marché Shimokitazawa", "type": "shopping" },
              { "name": "Mail Post", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-12",
            "location": "Kamakura (Excursión)",
            "activities": [
              { "name": "Kamakura Station", "type": "transit" },
              { "name": "Hongaku-ji", "type": "sights" },
              { "name": "2nd Torii", "type": "sights" },
              { "name": "Myoryu-ji", "type": "sights" },
              { "name": "Komachi Street", "type": "shopping" },
              { "name": "Hokai-ji", "type": "sights" },
              { "name": "Tsurugaoka Hachiman-gū", "type": "sights" },
              { "name": "Myohon-ji", "type": "sights" },
              { "name": "Jufukuji", "type": "sights" },
              { "name": "Jokomyoji", "type": "sights" },
              { "name": "Templo Sugimoto-dera", "type": "sights" },
              { "name": "Templo Kotoku-in (Gran Buda)", "type": "sights" },
              { "name": "Playa de Yuigahama", "type": "sights" },
              { "name": "Goryo Shrine", "type": "sights" },
              { "name": "Hase-dera", "type": "sights" }
            ]
          },
          {
            "date": "2027-01-13",
            "location": "Tokio (Tsukiji y Despedida)",
            "activities": [
              { "name": "Fish Market Tsukiji Outer Market", "type": "food" }
            ]
          }
        ]
      }
    ]
  }
}

print("JSON loaded successfully. Total stages:", len(trip_json['trip']['stages']))

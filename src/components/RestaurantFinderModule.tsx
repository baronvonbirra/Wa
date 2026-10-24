import React, { useState, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Utensils,
  Search,
  ExternalLink,
  Baby,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  Heart,
  Store,
  Calendar,
  Navigation,
  Volume2
} from 'lucide-react';
import { TRIP_DATA } from '../data/tripData';

// 1. Food Categories
export interface FoodCategory {
  id: string;
  name: string;
  emoji: string;
  searchTerm: string;
  description: string;
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: 'sushi',
    name: 'Sushi / Sashimi',
    emoji: '🍣',
    searchTerm: 'Sushi restaurant',
    description: 'Pescado fresco, kaitenzushi y nigiri'
  },
  {
    id: 'gyozas',
    name: 'Gyozas',
    emoji: '🥟',
    searchTerm: 'Gyoza restaurant',
    description: 'Empanadillas japonesas a la plancha'
  },
  {
    id: 'ramen',
    name: 'Ramen',
    emoji: '🍜',
    searchTerm: 'Ramen restaurant',
    description: 'Caldo tradicional con fideos'
  },
  {
    id: 'curry',
    name: 'Curry Japonés',
    emoji: '🍛',
    searchTerm: 'Japanese Curry restaurant',
    description: 'Katsu Curry, Bondy style'
  },
  {
    id: 'tonkatsu',
    name: 'Tonkatsu / Gyukatsu',
    emoji: '🥩',
    searchTerm: 'Tonkatsu Gyukatsu restaurant',
    description: 'Filetes empanados crujientes'
  },
  {
    id: 'izakaya',
    name: 'Yakitori / Izakaya',
    emoji: '🍢',
    searchTerm: 'Yakitori Izakaya restaurant',
    description: 'Brochetas, tabernas tradicionales con ambiente'
  },
  {
    id: 'streetfood',
    name: 'Takoyaki / Okonomiyaki',
    emoji: '🍱',
    searchTerm: 'Takoyaki Okonomiyaki restaurant',
    description: 'Comida rápida de Osaka, street food'
  },
  {
    id: 'noodle',
    name: 'Udon / Soba',
    emoji: '🌾',
    searchTerm: 'Udon Soba restaurant',
    description: 'Fideos de trigo o sarraceno'
  },
  {
    id: 'sweets',
    name: 'Sweets & Kawaii',
    emoji: '🥞',
    searchTerm: 'Fluffy Pancakes Kawaii Cafe Dessert',
    description: 'Fluffy pancakes, crepes, cafeterías temáticas'
  },
  {
    id: 'vegetarian',
    name: 'Vegetariano / Vegan',
    emoji: '🌿',
    searchTerm: 'Vegetarian Vegan friendly restaurant',
    description: 'Opciones adaptadas sin caldo dashi'
  }
];

// 2. Neighborhood List for Japan 2026/2027
export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  searchSuffix: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'akihabara', name: 'Akihabara', city: 'Tokio', searchSuffix: 'Akihabara Tokyo' },
  { id: 'shinjuku', name: 'Shinjuku', city: 'Tokio', searchSuffix: 'Shinjuku Tokyo' },
  { id: 'shibuya', name: 'Shibuya', city: 'Tokio', searchSuffix: 'Shibuya Tokyo' },
  { id: 'asakusa', name: 'Asakusa', city: 'Tokio', searchSuffix: 'Asakusa Tokyo' },
  { id: 'harajuku', name: 'Harajuku / Omotesando', city: 'Tokio', searchSuffix: 'Harajuku Tokyo' },
  { id: 'ueno', name: 'Ueno', city: 'Tokio', searchSuffix: 'Ueno Tokyo' },
  { id: 'ginza', name: 'Ginza', city: 'Tokio', searchSuffix: 'Ginza Tokyo' },
  { id: 'tsukiji', name: 'Tsukiji / Tsukishima', city: 'Tokio', searchSuffix: 'Tsukiji Tokyo' },
  { id: 'roppongi', name: 'Roppongi', city: 'Tokio', searchSuffix: 'Roppongi Tokyo' },
  { id: 'nakano', name: 'Nakano / Shimokitazawa', city: 'Tokio', searchSuffix: 'Nakano Tokyo' },
  { id: 'kyoto-gion', name: 'Gion / Higashiyama', city: 'Kioto', searchSuffix: 'Gion Kyoto' },
  { id: 'kyoto-station', name: 'Estación de Kioto', city: 'Kioto', searchSuffix: 'Kyoto Station Kyoto' },
  { id: 'kyoto-arashiyama', name: 'Arashiyama', city: 'Kioto', searchSuffix: 'Arashiyama Kyoto' },
  { id: 'osaka-dotonbori', name: 'Dōtonbori / Namba', city: 'Osaka', searchSuffix: 'Dotonbori Osaka' },
  { id: 'osaka-shinsekai', name: 'Shinsekai', city: 'Osaka', searchSuffix: 'Shinsekai Osaka' },
  { id: 'osaka-shinsaibashi', name: 'Shinsaibashi / Amemura', city: 'Osaka', searchSuffix: 'Shinsaibashi Osaka' },
  { id: 'takayama', name: 'Centro Histórico Takayama', city: 'Takayama', searchSuffix: 'Takayama Gifu' },
  { id: 'kawaguchiko', name: 'Lago Kawaguchiko / Fuji', city: 'Kawaguchiko', searchSuffix: 'Kawaguchiko Yamanashi' },
  { id: 'nikko', name: 'Nikko / Utsunomiya', city: 'Nikko', searchSuffix: 'Nikko Tochigi' },
  { id: 'kamakura', name: 'Kamakura', city: 'Kamakura', searchSuffix: 'Kamakura Kanagawa' },
  { id: 'nara', name: 'Nara Centro', city: 'Nara', searchSuffix: 'Nara Park Nara' }
];

// 3. Language Emergency Phrases
export interface WaiterPhrase {
  id: string;
  japanese: string;
  romaji: string;
  spanish: string;
  description: string;
}

export const WAITER_PHRASES: WaiterPhrase[] = [
  {
    id: 'table-family',
    japanese: '四人です。子供用の椅子や食器はありますか？',
    romaji: 'Yonin desu. Kodomo-yō no chairs/shokki wa arimasu ka?',
    spanish: 'Somos 4 personas. ¿Tienen cubiertos/sillas para niños?',
    description: 'Frase principal para pedir mesa familiar al entrar.'
  },
  {
    id: 'english-menu',
    japanese: '英語のメニューはありますか？',
    romaji: 'Eigo no menū wa arimasu ka?',
    spanish: '¿Tienen menú en inglés?',
    description: 'Solicitar carta traducida o con fotos.'
  },
  {
    id: 'recommendation',
    japanese: 'おすすめは何ですか？',
    romaji: 'Osusume wa nan desu ka?',
    spanish: '¿Qué plato nos recomienda?',
    description: 'Pedir la especialidad de la casa.'
  },
  {
    id: 'no-pork',
    japanese: '豚肉抜きでできますか？',
    romaji: 'Butaniku nuki de dekimasu ka?',
    spanish: '¿Se puede preparar sin carne de cerdo?',
    description: 'Adaptación de ingredientes para niños o dieta.'
  },
  {
    id: 'check-please',
    japanese: 'お会計をお願いします。',
    romaji: 'Okaikei o onegaishimasu.',
    spanish: 'La cuenta, por favor.',
    description: 'Pedir el importe total para pagar.'
  }
];

export const RestaurantFinderModule: React.FC = () => {
  // Navigation sub-tab: 'radar' vs 'itinerary-favorites'
  const [subTab, setSubTab] = useState<'radar' | 'itinerary-favorites'>('radar');

  // Radar State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['sushi']);
  const [locationMode, setLocationMode] = useState<'gps' | 'neighborhood'>('gps');
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>('akihabara');
  const [isKidsFriendly, setIsKidsFriendly] = useState<boolean>(true);
  const [isLangCardOpen, setIsLangCardOpen] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Favorites filter state
  const [favoriteSearch, setFavoriteSearch] = useState<string>('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');

  // Category toggle handler (single or multi-select, PRD allows flexible fast selection)
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Build the dynamic Google Maps query
  const searchUrl = useMemo(() => {
    const activeCats = FOOD_CATEGORIES.filter((c) => selectedCategories.includes(c.id));
    const catQuery = activeCats.map((c) => c.searchTerm).join(' OR ');

    const kidsTerm = isKidsFriendly ? 'family friendly' : '';
    const ratingTerm = 'rating 4+';
    const openNowTerm = 'open now';

    let locationTerm = 'near me';
    if (locationMode === 'neighborhood') {
      const neigh = NEIGHBORHOODS.find((n) => n.id === selectedNeighborhoodId);
      if (neigh) {
        locationTerm = `in ${neigh.searchSuffix}`;
      }
    }

    const fullQuery = `${catQuery} ${kidsTerm} ${ratingTerm} ${openNowTerm} ${locationTerm}`
      .replace(/\s+/g, ' ')
      .trim();

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;
  }, [selectedCategories, locationMode, selectedNeighborhoodId, isKidsFriendly]);

  // Extract all itinerary restaurants from TRIP_DATA
  const itineraryRestaurants = useMemo(() => {
    const list: {
      id: string;
      name: string;
      specialty: string;
      recommendation: string;
      locationQuery: string;
      dayTitle: string;
      shortDate: string;
      location: string;
    }[] = [];

    TRIP_DATA.stages.forEach((stage) => {
      stage.days.forEach((day) => {
        if (day.restaurants) {
          day.restaurants.forEach((rest) => {
            list.push({
              id: rest.id,
              name: rest.name,
              specialty: rest.specialty,
              recommendation: rest.recommendation || '',
              locationQuery: rest.locationQuery,
              dayTitle: day.title,
              shortDate: day.shortDate,
              location: day.location
            });
          });
        }
      });
    });

    return list;
  }, []);

  // Filtered itinerary favorites
  const filteredFavorites = useMemo(() => {
    return itineraryRestaurants.filter((rest) => {
      const matchesSearch =
        rest.name.toLowerCase().includes(favoriteSearch.toLowerCase()) ||
        rest.specialty.toLowerCase().includes(favoriteSearch.toLowerCase()) ||
        rest.recommendation.toLowerCase().includes(favoriteSearch.toLowerCase()) ||
        rest.location.toLowerCase().includes(favoriteSearch.toLowerCase());

      const matchesCity =
        selectedCityFilter === 'all' ||
        rest.location.toLowerCase().includes(selectedCityFilter.toLowerCase());

      return matchesSearch && matchesCity;
    });
  }, [itineraryRestaurants, favoriteSearch, selectedCityFilter]);

  // TTS playback function for Japanese emergency card
  const speakJapanese = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-rose-400/30">
        <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
          <Utensils className="w-56 h-56 text-white" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase text-rose-100">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Sprint 10 • Radar Gastronómico</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-2 sm:gap-3">
            <span>🍜</span> Taberna Finder
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium leading-relaxed">
            Encuentra dónde comer en 2 toques de pantalla. Genera búsquedas optimizadas en Google Maps con locales abiertos ahora, valoración ≥ 4.0 y ambiente familiar.
          </p>

          {/* Sub-Tabs Switcher */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setSubTab('radar')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                subTab === 'radar'
                  ? 'bg-white text-rose-600 shadow-md scale-[1.02]'
                  : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Radar Dinámico</span>
            </button>
            <button
              onClick={() => setSubTab('itinerary-favorites')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                subTab === 'itinerary-favorites'
                  ? 'bg-white text-rose-600 shadow-md scale-[1.02]'
                  : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Favoritos del Itinerario ({itineraryRestaurants.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: RADAR DINÁMICO */}
      {subTab === 'radar' && (
        <div className="space-y-6">
          {/* Card: Categorías */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>¿Qué os apetece comer hoy?</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Selecciona una o varias especialidades japonesas
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full">
                {selectedCategories.length} seleccionada{selectedCategories.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {FOOD_CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between relative overflow-hidden active:scale-95 ${
                      isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20 text-rose-950 dark:text-rose-100 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl mb-1">{cat.emoji}</span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm line-clamp-1">{cat.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {cat.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card: Ubicación y Filtro Niños */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-5">
            {/* Location selector */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>¿Dónde estáis?</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* GPS Radio option */}
                <label
                  onClick={() => setLocationMode('gps')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 active:scale-98 ${
                    locationMode === 'gps'
                      ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="locationMode"
                    checked={locationMode === 'gps'}
                    onChange={() => setLocationMode('gps')}
                    className="mt-1 text-rose-600 focus:ring-rose-500"
                  />
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>📍 Ubicación Actual (GPS)</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Busca tabernas cercanas alrededor de donde estéis en este instante exacto.
                    </p>
                  </div>
                </label>

                {/* Specific Neighborhood option */}
                <label
                  onClick={() => setLocationMode('neighborhood')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 active:scale-98 ${
                    locationMode === 'neighborhood'
                      ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="locationMode"
                    checked={locationMode === 'neighborhood'}
                    onChange={() => setLocationMode('neighborhood')}
                    className="mt-1 text-rose-600 focus:ring-rose-500"
                  />
                  <div className="w-full">
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>🗺️ Barrio Específico</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-2">
                      Planificación previa desde el hotel para una zona concreta.
                    </p>
                  </div>
                </label>
              </div>

              {/* Neighborhood Selector Dropdown */}
              {locationMode === 'neighborhood' && (
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    Selecciona el Barrio o Zona de Japón:
                  </label>
                  <select
                    value={selectedNeighborhoodId}
                    onChange={(e) => setSelectedNeighborhoodId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.city}: {n.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Kids Friendly Toggle (PM Value Add A) */}
            <div className="flex items-center justify-between bg-amber-50/80 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shrink-0">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                    <span>👶 Viajo con niños (Kids Friendly)</span>
                    <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-extrabold px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 max-w-md">
                    Filtra restaurantes no fumadores, con mesas cómodas bajas y ambiente familiar.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIsKidsFriendly(!isKidsFriendly)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isKidsFriendly ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isKidsFriendly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Launch Search Button */}
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-3 text-base sm:text-lg transition-all transform active:scale-98 text-center"
            >
              <Search className="w-6 h-6 animate-pulse" />
              <span>🔍 BUSCAR RESTAURANTES EN GOOGLE MAPS</span>
              <ExternalLink className="w-5 h-5 opacity-80" />
            </a>

            <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Abre directamente Google Maps con filtros de alta calidad (≥ 4.0★ + Abiertos Ahora).
            </div>
          </div>

          {/* Collapsible Waiter Emergency Card (PM Value Add C) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            <button
              onClick={() => setIsLangCardOpen(!isLangCardOpen)}
              className="w-full p-5 text-left flex items-center justify-between bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500 text-white rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-sm sm:text-base flex items-center gap-2">
                    <span>🗣️ Tarjeta de Emergencia Lingüística para el Camarero</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Muestra esta pantalla directamente al personal del restaurante al llegar
                  </div>
                </div>
              </div>
              {isLangCardOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {isLangCardOpen && (
              <div className="p-5 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                {WAITER_PHRASES.map((phrase, idx) => (
                  <div
                    key={phrase.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      idx === 0
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 shadow-md ring-2 ring-amber-400/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        {phrase.description}
                      </span>
                      <button
                        onClick={() => speakJapanese(phrase.japanese)}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Escuchar</span>
                      </button>
                    </div>

                    {/* Kanji Display */}
                    <div className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-wide my-2 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 select-all">
                      {phrase.japanese}
                    </div>

                    {/* Romaji */}
                    <div className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 italic">
                      🗣️ Romaji: "{phrase.romaji}"
                    </div>

                    {/* Spanish translation */}
                    <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                      🇪🇸 Español: {phrase.spanish}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FAVORITOS DEL ITINERARIO (PM Value Add B) */}
      {subTab === 'itinerary-favorites' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span>Restaurantes Guardados en la Ruta</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Locales emblemáticos planificados para vuestros días en Japón
                </p>
              </div>

              {/* City Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['all', 'Tokyo', 'Kyoto', 'Osaka', 'Takayama', 'Fujikawaguchiko', 'Nikko', 'Nara'].map(
                  (city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCityFilter(city)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        selectedCityFilter === city
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {city === 'all' ? 'Todos' : city}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, plato o especialidad..."
                value={favoriteSearch}
                onChange={(e) => setFavoriteSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Restaurants List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {filteredFavorites.map((rest) => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  rest.locationQuery || `${rest.name} ${rest.location}`
                )}`;

                return (
                  <div
                    key={rest.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 space-y-3 flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-800 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-black text-base text-slate-900 dark:text-white">
                          {rest.name}
                        </h3>
                        <span className="text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md whitespace-nowrap">
                          {rest.shortDate}
                        </span>
                      </div>

                      <div className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold rounded-md my-1">
                        🍜 {rest.specialty}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug mt-1">
                        {rest.recommendation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {rest.location}
                      </span>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Cómo llegar</span>
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredFavorites.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
                  <Store className="w-12 h-12 mx-auto mb-2 opacity-40 text-slate-400" />
                  <p className="font-bold text-sm">No se encontraron restaurantes con este filtro.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantFinderModule;

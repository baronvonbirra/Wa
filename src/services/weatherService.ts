// Weather service providing real live weather and date-specific estimation
// using the Open-Meteo API (free, open, no API key required)

export interface WeatherCoordinates {
  latitude: number;
  longitude: number;
  locationName: string;
  areaDescription: string;
}

export interface CurrentWeatherInfo {
  temperature: number; // in °C
  apparentTemperature?: number;
  weatherCode: number;
  condition: string;
  iconName: 'Sun' | 'Cloud' | 'CloudSun' | 'CloudRain' | 'Snowflake' | 'Wind';
  humidity?: number;
  windSpeed?: number; // km/h
  updatedAt: string;
}

export interface EstimatedWeatherInfo {
  date: string; // YYYY-MM-DD
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  condition: string;
  iconName: 'Sun' | 'Cloud' | 'CloudSun' | 'CloudRain' | 'Snowflake' | 'Wind';
  precipitationProbability?: number; // %
  source: 'forecast' | 'historical_climate' | 'fallback';
  clothingRecommendation: string;
}

export interface DayWeatherReport {
  locationName: string;
  areaDescription: string;
  isHotelLocation: boolean;
  hotelName?: string;
  current: CurrentWeatherInfo | null;
  estimation: EstimatedWeatherInfo;
  loading: boolean;
  error?: string | null;
}

// Precise coordinates for all accommodations in tripData
export const HOTEL_COORDINATES: Record<string, WeatherCoordinates> = {
  // Tokyo Disney Resort Toy Story Hotel (Maihama, Urayasu, Chiba)
  'hotel-1': {
    latitude: 35.6288,
    longitude: 139.8782,
    locationName: 'Tokyo Disney Resort (Maihama)',
    areaDescription: 'Bahía de Tokio / Disney Resort'
  },
  // Toyoko Inn Tokyo Akiba Asakusabashi-eki Higashi-guchi
  'hotel-2': {
    latitude: 35.6974,
    longitude: 139.7877,
    locationName: 'Asakusabashi / Akihabara (Tokio)',
    areaDescription: 'Tokio Centro (Taito)'
  },
  // Kawaguchiko Country Cottage Ban
  'hotel-3': {
    latitude: 35.5348,
    longitude: 138.7612,
    locationName: 'Kawaguchiko (Monte Fuji)',
    areaDescription: 'Lago Kawaguchi / Prefectura de Yamanashi'
  },
  // Kouya (Takayama)
  'hotel-4': {
    latitude: 36.1437,
    longitude: 137.2562,
    locationName: 'Takayama (Alpes Japoneses)',
    areaDescription: 'Hida-Takayama / Prefectura de Gifu'
  },
  // Kamon Inn Toji Higashi (Kyoto)
  'hotel-5': {
    latitude: 34.9815,
    longitude: 135.7482,
    locationName: 'Kioto (Zona Toji / Sur)',
    areaDescription: 'Kioto Centro-Sur'
  },
  // Henn na Hotel Osaka Shinsaibashi
  'hotel-6': {
    latitude: 34.6751,
    longitude: 135.5015,
    locationName: 'Osaka (Shinsaibashi)',
    areaDescription: 'Distrito Minami / Dōtonbori'
  },
  // Hotel Vista Tokyo Tsukiji
  'hotel-7': {
    latitude: 35.6644,
    longitude: 139.7698,
    locationName: 'Tsukiji / Ginza (Tokio)',
    areaDescription: 'Tokio Bahía (Chuo)'
  }
};

// General itinerary locations fallback
export const LOCATION_COORDINATES: Record<string, WeatherCoordinates> = {
  Tokyo: {
    latitude: 35.6762,
    longitude: 139.6503,
    locationName: 'Tokio Centro',
    areaDescription: 'Área Metropolitana de Tokio'
  },
  Fujikawaguchiko: {
    latitude: 35.5036,
    longitude: 138.7615,
    locationName: 'Fujikawaguchiko',
    areaDescription: 'Región de los Cinco Lagos del Fuji'
  },
  Takayama: {
    latitude: 36.1408,
    longitude: 137.2522,
    locationName: 'Takayama',
    areaDescription: 'Región montañosa de Hida'
  },
  Kyoto: {
    latitude: 35.0116,
    longitude: 135.7681,
    locationName: 'Kioto',
    areaDescription: 'Antigua Capital Imperial'
  },
  Osaka: {
    latitude: 34.6937,
    longitude: 135.5023,
    locationName: 'Osaka',
    areaDescription: 'Región de Kansai'
  },
  Kamakura: {
    latitude: 35.3192,
    longitude: 139.5467,
    locationName: 'Kamakura',
    areaDescription: 'Costa de Shonan / Prefectura de Kanagawa'
  }
};

// Map WMO Weather Interpretation Codes to descriptions and icons
export function interpretWeatherCode(code: number): {
  condition: string;
  iconName: 'Sun' | 'Cloud' | 'CloudSun' | 'CloudRain' | 'Snowflake' | 'Wind';
} {
  switch (code) {
    case 0:
      return { condition: 'Cielo despejado / Soleado', iconName: 'Sun' };
    case 1:
      return { condition: 'Principalmente despejado', iconName: 'CloudSun' };
    case 2:
      return { condition: 'Parcialmente nublado', iconName: 'CloudSun' };
    case 3:
      return { condition: 'Nublado', iconName: 'Cloud' };
    case 45:
    case 48:
      return { condition: 'Niebla / Neblina', iconName: 'Cloud' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Llovizna ligera', iconName: 'CloudRain' };
    case 56:
    case 57:
      return { condition: 'Llovizna helada', iconName: 'CloudRain' };
    case 61:
      return { condition: 'Lluvia débil', iconName: 'CloudRain' };
    case 63:
      return { condition: 'Lluvia moderada', iconName: 'CloudRain' };
    case 65:
      return { condition: 'Lluvia fuerte', iconName: 'CloudRain' };
    case 66:
    case 67:
      return { condition: 'Lluvia gélida', iconName: 'Snowflake' };
    case 71:
      return { condition: 'Nevada ligera', iconName: 'Snowflake' };
    case 73:
      return { condition: 'Nevada moderada', iconName: 'Snowflake' };
    case 75:
      return { condition: 'Nevada intensa', iconName: 'Snowflake' };
    case 77:
      return { condition: 'Granizo menudo / Nieve granular', iconName: 'Snowflake' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Chubascos de lluvia', iconName: 'CloudRain' };
    case 85:
    case 86:
      return { condition: 'Chubascos de nieve', iconName: 'Snowflake' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Tormenta eléctrica', iconName: 'Wind' };
    default:
      return { condition: 'Nuboso / Variable', iconName: 'CloudSun' };
  }
}

// Generate practical clothing recommendations based on temperature and condition
export function generateClothingRecommendation(
  tempMin: number,
  tempMax: number,
  conditionText: string,
  isSnowOrRain: boolean
): string {
  if (tempMin < -2 || conditionText.toLowerCase().includes('nieve') || isSnowOrRain && tempMax < 5) {
    return 'Frío invernal riguroso / nieve: Chaquetón térmico impermeable, capas interiores Heattech, gorro de lana, guantes térmicos y calzado antideslizante con suela de agarre.';
  }
  if (tempMax <= 8) {
    return 'Frío notable de invierno: Abrigo grueso acolchado o plumífero, bufanda, camiseta térmica interior y calzado cálido y cómodo.';
  }
  if (tempMax <= 13) {
    return 'Frío moderado: Chaqueta o abrigo de invierno, capas intermedias (polar o jersey) y bufanda ligera si refresca al anochecer.';
  }
  if (tempMax <= 18) {
    return 'Fresco y templado: Chaqueta ligera o cortavientos sobre jersey fino, ideal para caminar al aire libre.';
  }
  return 'Agradable: Ropa de entretiempo en capas, fácil de quitar al entrar a tiendas o trenes climatizados.';
}

// In-memory + LocalStorage cache
const CACHE_PREFIX = 'wa_weather_cache_v1_';
const CACHE_TTL_CURRENT_MS = 30 * 60 * 1000; // 30 minutes for live current weather
const CACHE_TTL_ESTIMATION_MS = 12 * 60 * 60 * 1000; // 12 hours for date estimations

function getCacheItem<T>(key: string, ttl: number): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > ttl) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return parsed.data as T;
  } catch {
    return null;
  }
}

function setCacheItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
  } catch {
    // Silently ignore quota exceeded
  }
}

// Determine best coordinates for day + hotel
export function resolveCoordinates(
  locationKey: string,
  accommodationId?: string
): WeatherCoordinates {
  if (accommodationId && HOTEL_COORDINATES[accommodationId]) {
    return HOTEL_COORDINATES[accommodationId];
  }
  if (LOCATION_COORDINATES[locationKey]) {
    return LOCATION_COORDINATES[locationKey];
  }
  return LOCATION_COORDINATES['Tokyo'];
}

// Fetch real live current weather from Open-Meteo
export async function fetchCurrentWeather(coords: WeatherCoordinates): Promise<CurrentWeatherInfo> {
  const cacheKey = `curr_${coords.latitude.toFixed(3)}_${coords.longitude.toFixed(3)}`;
  const cached = getCacheItem<CurrentWeatherInfo>(cacheKey, CACHE_TTL_CURRENT_MS);
  if (cached) {
    return cached;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FTokyo`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en API meteorológica (${response.status})`);
  }

  const json = await response.json();
  const current = json.current;
  const { condition, iconName } = interpretWeatherCode(current.weather_code);

  const result: CurrentWeatherInfo = {
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: current.apparent_temperature ? Math.round(current.apparent_temperature) : undefined,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m ? Math.round(current.wind_speed_10m) : undefined,
    weatherCode: current.weather_code,
    condition,
    iconName,
    updatedAt: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  };

  setCacheItem(cacheKey, result);
  return result;
}

// Fetch real date estimation
// If date is within next 14 days, uses forecast.
// Otherwise, queries real historical meteorological records for that exact calendar date (multi-year) to estimate real historical climate normal.
export async function fetchEstimatedWeather(
  coords: WeatherCoordinates,
  targetDate: string // YYYY-MM-DD
): Promise<EstimatedWeatherInfo> {
  const cacheKey = `est_${targetDate}_${coords.latitude.toFixed(3)}_${coords.longitude.toFixed(3)}`;
  const cached = getCacheItem<EstimatedWeatherInfo>(cacheKey, CACHE_TTL_ESTIMATION_MS);
  if (cached) {
    return cached;
  }

  const now = new Date();
  const target = new Date(targetDate + 'T12:00:00Z');
  const diffDays = Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // If within the standard 14-day forecast window
  if (diffDays >= 0 && diffDays <= 14) {
    try {
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo`;
      const res = await fetch(forecastUrl);
      if (res.ok) {
        const json = await res.json();
        const dateIdx = json.daily?.time?.indexOf(targetDate);
        if (dateIdx !== undefined && dateIdx >= 0) {
          const wCode = json.daily.weather_code[dateIdx];
          const min = Math.round(json.daily.temperature_2m_min[dateIdx]);
          const max = Math.round(json.daily.temperature_2m_max[dateIdx]);
          const precipProb = json.daily.precipitation_probability_max?.[dateIdx] ?? 15;
          const { condition, iconName } = interpretWeatherCode(wCode);

          const result: EstimatedWeatherInfo = {
            date: targetDate,
            tempMin: min,
            tempMax: max,
            weatherCode: wCode,
            condition,
            iconName,
            precipitationProbability: precipProb,
            source: 'forecast',
            clothingRecommendation: generateClothingRecommendation(
              min,
              max,
              condition,
              iconName === 'CloudRain' || iconName === 'Snowflake'
            )
          };
          setCacheItem(cacheKey, result);
          return result;
        }
      }
    } catch {
      // Fall through to historical climate
    }
  }

  // Real Multi-Year Climate Estimation for target calendar day (e.g. Dec 22 or Jan 5)
  // We query historical observations for this specific month & day across recent representative years (2022, 2023, 2024)
  const [targetYear, targetMonth, targetDay] = targetDate.split('-');
  const recentYears = [2024, 2023, 2022];

  try {
    const historicalPromises = recentYears.map(async (year) => {
      const hDate = `${year}-${targetMonth}-${targetDay}`;
      const hUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${coords.latitude}&longitude=${coords.longitude}&start_date=${hDate}&end_date=${hDate}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo`;
      const hRes = await fetch(hUrl);
      if (!hRes.ok) return null;
      const hJson = await hRes.json();
      if (hJson.daily?.temperature_2m_max?.[0] != null) {
        return {
          max: hJson.daily.temperature_2m_max[0] as number,
          min: hJson.daily.temperature_2m_min[0] as number,
          wCode: hJson.daily.weather_code[0] as number,
          precip: (hJson.daily.precipitation_sum?.[0] as number) || 0
        };
      }
      return null;
    });

    const records = (await Promise.all(historicalPromises)).filter(
      (r): r is NonNullable<typeof r> => r !== null
    );

    if (records.length > 0) {
      const avgMax = Math.round(records.reduce((acc, r) => acc + r.max, 0) / records.length);
      const avgMin = Math.round(records.reduce((acc, r) => acc + r.min, 0) / records.length);
      // Pick representative weather code (most common or latest)
      const representativeCode = records[0].wCode;
      const hadRainOrSnow = records.some((r) => r.precip > 0.5);
      const precipProbability = Math.round(
        (records.filter((r) => r.precip > 0.2).length / records.length) * 100
      );

      const { condition, iconName } = interpretWeatherCode(representativeCode);

      const result: EstimatedWeatherInfo = {
        date: targetDate,
        tempMin: avgMin,
        tempMax: avgMax,
        weatherCode: representativeCode,
        condition: `${condition} (Media climática real)`,
        iconName,
        precipitationProbability: precipProbability,
        source: 'historical_climate',
        clothingRecommendation: generateClothingRecommendation(
          avgMin,
          avgMax,
          condition,
          hadRainOrSnow
        )
      };

      setCacheItem(cacheKey, result);
      return result;
    }
  } catch {
    // Use realistic seasonal fallback
  }

  // Realistic fallback based on location seasonal averages for winter (Late Dec / Early Jan)
  const isHighCold = coords.locationName.includes('Takayama') || coords.locationName.includes('Kawaguchiko');
  const tempMin = isHighCold ? -3 : 2;
  const tempMax = isHighCold ? 4 : 11;
  const condition = isHighCold ? 'Frío invernal con posibles nevadas' : 'Soleado / Frío moderado de invierno';
  const iconName = isHighCold ? 'Snowflake' : 'Sun';

  const fallbackResult: EstimatedWeatherInfo = {
    date: targetDate,
    tempMin,
    tempMax,
    weatherCode: isHighCold ? 71 : 0,
    condition,
    iconName,
    precipitationProbability: isHighCold ? 35 : 15,
    source: 'fallback',
    clothingRecommendation: generateClothingRecommendation(tempMin, tempMax, condition, isHighCold)
  };

  return fallbackResult;
}

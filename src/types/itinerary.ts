export interface Accommodation {
  id: string;
  name: string;
  kanjiName: string;
  japaneseAddress: string;
  englishAddress: string;
  check_in: string;
  check_out: string;
  nearestStation: string;
  notes?: string;
}

export interface Activity {
  id: string;
  title: string;
  locationQuery: string;
  type?: 'transit' | 'hotel' | 'sights' | 'shopping' | 'food' | 'theme_park' | 'culture' | 'checkin' | 'tech_hub';
  coordinates?: [number, number];
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  note?: string;
  locationQuery: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  specialty: string;
  recommendation?: string;
  locationQuery: string;
}

export interface DayItinerary {
  dayIndex: number; // 1 to 24
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g., "Lunes, 21 de Diciembre de 2026"
  shortDate: string; // e.g., "21 Dic"
  title: string;
  location: string;
  accommodationId: string;
  activities: Activity[];
  shops?: ShopItem[];
  restaurants?: RestaurantItem[];
}

export interface WeatherLocationInfo {
  location: string;
  temp: string;
  condition: string;
  clothingRecommendation: string;
  iconName: string;
}

export interface Stage {
  stage_id: number;
  name: string;
  subtitle: string;
  dateRange: string;
  start_date: string;
  end_date: string;
  accommodations: Accommodation[];
  days: DayItinerary[];
}

export interface TripItinerary {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  totalDays: number;
  stages: Stage[];
}

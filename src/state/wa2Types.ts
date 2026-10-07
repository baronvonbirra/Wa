export type ItineraryStatus = 'pending' | 'done' | 'skipped';

export type ItineraryCategory = 'attraction' | 'transport' | 'food' | 'note';

export interface City {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  order_index: number;
}

export interface Accommodation {
  id: string;
  city_id: string;
  name: string;
  address: string;
  check_in_time: string;
  check_out_time: string;
  booking_code: string;
  notes: string;
}

export interface ItineraryItem {
  id: string;
  external_id?: string; // Unique ID for Google My Maps sync
  date: string; // YYYY-MM-DD
  time_start?: string; // HH:MM
  title: string;
  description?: string;
  google_maps_url: string;
  category: ItineraryCategory;
  status: ItineraryStatus;
  order_index: number;
  created_at: string;
}

export type PlaceCategory =
  | 'ramen'
  | 'sushi'
  | 'konbini'
  | 'izakaya'
  | 'anime'
  | 'retro_gaming'
  | 'gachapon'
  | 'cafe'
  | 'shopping'
  | 'sightseeing'
  | 'other';

export interface SavedPlace {
  id: string;
  external_id?: string; // Unique ID for Google My Maps sync
  city_id: string;
  name: string;
  category: PlaceCategory;
  google_maps_url: string;
  notes?: string;
  visited: boolean;
  created_at: string;
}

export type WishlistCategory = 'figuras' | 'retro_gaming' | 'ropa' | 'souvenirs' | 'otros';

export interface WishlistItem {
  id: string;
  item_name: string;
  price_jpy: number;
  image_url?: string;
  purchased: boolean;
  category: WishlistCategory;
  notes?: string;
  created_at: string;
}

export interface TravelDoc {
  id: string;
  title: string;
  qr_code_url?: string;
  file_url?: string;
  notes?: string;
}

export type PackingCategory = 'General' | 'Documentación' | 'Electrónica' | 'Ropa' | 'Botiquín';

export interface PackingItem {
  id: string;
  item_name: string;
  category: PackingCategory;
  checked: boolean;
}

export interface EmergencyContact {
  id: string;
  title: string;
  phone: string;
  address?: string;
  notes?: string;
}

export type SurvivalCategory = 'basic' | 'restaurant' | 'shopping' | 'transport' | 'emergency';

export interface SurvivalPhrase {
  id: string;
  category: SurvivalCategory;
  spanish: string;
  romaji: string;
  japanese: string;
  audio_url?: string;
}

export interface Wa2State {
  cities: City[];
  accommodations: Accommodation[];
  itineraryItems: ItineraryItem[];
  savedPlaces: SavedPlace[];
  wishlist: WishlistItem[];
  travelDocs: TravelDoc[];
  packingChecklist: PackingItem[];
  emergencyContacts: EmergencyContact[];
  survivalPhrases: SurvivalPhrase[];
  eurJpyRate: number; // e.g. 160
  tripStartDate: string; // Hardcoded "2026-12-20"
  tripEndDate: string; // "2027-01-05"
  selectedDate: string; // Current date in itinerary filter view
  darkMode: boolean;
  groupPinCode: string; // Default '2026'
  isAuthenticated: boolean;
}

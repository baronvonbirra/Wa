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

export type StaySegment =
  | 'Disney'
  | 'Tokyo 1'
  | 'Kawaguchiko'
  | 'Takayama'
  | 'Kyoto'
  | 'Osaka'
  | 'Tokyo 2'
  | 'Vuelo / Tránsito';

export interface Accommodation {
  id: string;
  city_id: string;
  city?: string;
  segment?: StaySegment;
  name: string;
  address: string;
  direccion?: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string;   // YYYY-MM-DD
  check_in?: string;   // YYYY-MM-DD
  check_out?: string;  // YYYY-MM-DD
  check_in_time: string;
  check_out_time: string;
  booking_code: string;
  notes: string;
}

export interface PlaceDetails {
  id?: string;
  nombre?: string;
  name?: string;
  descripcion?: string;
  description?: string;
  google_maps_url?: string;
  categoria?: string;
  category?: string;
  direccion?: string;
  [key: string]: any;
}

export interface ItineraryItem {
  id: string;
  external_id?: string; // Unique ID for Google My Maps sync
  date?: string; // YYYY-MM-DD (or visit_date)
  visit_date?: string | null; // YYYY-MM-DD or null if unassigned/optional
  is_visited?: boolean; // Persisted check status
  is_unassigned?: boolean; // True for "Sin fecha / Opcionales" POIs
  time_start?: string; // HH:MM
  title: string;
  description?: string;
  google_maps_url: string;
  category: ItineraryCategory | string;
  status: ItineraryStatus;
  order_index: number;
  created_at: string;
  // Supabase itinerario_dias join structure fields
  orden?: number;
  notas_dia?: string;
  city?: string;
  lugares?: PlaceDetails;
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
  city?: string;
  visit_date?: string | null;
  name: string;
  category: PlaceCategory | string;
  google_maps_url: string;
  notes?: string;
  visited: boolean;
  is_visited?: boolean;
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

export interface PackingListItem {
  id: string;
  item: string;
  item_name?: string;
  quantity: number;
  category: string;
  assigned_to: 'Todos' | 'Papi' | 'Mami' | 'Lily' | 'James' | string;
  is_packed: boolean;
}

export interface TripTask {
  id: string;
  title: string;
  due_date: string; // YYYY-MM-DD
  due_time?: string; // HH:MM (e.g., 07:00 h)
  category: 'Entradas' | 'Reservas' | 'Documentación' | 'Logística' | string;
  is_completed: boolean;
  details?: string;
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
  packingListItems?: PackingListItem[];
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

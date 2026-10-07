/**
 * Supabase client setup and synchronization layer for Wa 2.0.
 * Operates gracefully both with active Supabase credentials and in Offline-First mode.
 */

// Environment variables or fallback
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export interface SyncPayload {
  table: string;
  action: 'insert' | 'update' | 'delete';
  record: any;
}

export interface LugarSupabase {
  id?: string;
  nombre?: string;
  name?: string;
  descripcion?: string;
  direccion?: string;
  google_maps_url?: string;
  categoria?: string;
  [key: string]: any;
}

export interface ItinerarioDiaSupabase {
  id?: string;
  orden?: number;
  notas_dia?: string;
  fecha?: string;
  lugares?: LugarSupabase | LugarSupabase[];
  [key: string]: any;
}

/**
 * Mock/Safe Supabase Service Sync layer
 */
export class SupabaseService {
  /**
   * Fetches itinerary days filtered by date (fecha) and joined with places (lugares), ordered by orden.
   * Query structure:
   * supabase.from('itinerario_dias').select('orden, notas_dia, lugares(*)').eq('fecha', fechaSeleccionada).order('orden')
   */
  static async fetchItinerarioPorFecha(fecha: string): Promise<ItinerarioDiaSupabase[] | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      // Direct REST call to Supabase for itinerario_dias with join on lugares
      const selectParam = encodeURIComponent('orden,notas_dia,fecha,lugares(*)');
      const endpoint = `${SUPABASE_URL}/rest/v1/itinerario_dias?select=${selectParam}&fecha=eq.${fecha}&order=orden.asc`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn(`Supabase fetchItinerarioPorFecha warning: ${response.statusText}`);
        return null;
      }

      const data: ItinerarioDiaSupabase[] = await response.json();
      return data;
    } catch (err) {
      console.warn("Supabase Service fetchItinerarioPorFecha fallback activated:", err);
      return null;
    }
  }

  static async syncRecord(payload: SyncPayload): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      // Offline mode: simulated successful persistence locally
      return { success: true };
    }

    try {
      // If Supabase URL & Key are available in environment, perform REST calls
      const endpoint = `${SUPABASE_URL}/rest/v1/${payload.table}`;
      const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': payload.action === 'insert' ? 'return=representation' : 'return=minimal'
      };

      let response: Response;
      if (payload.action === 'insert') {
        response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload.record)
        });
      } else if (payload.action === 'update') {
        response = await fetch(`${endpoint}?id=eq.${payload.record.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(payload.record)
        });
      } else {
        response = await fetch(`${endpoint}?id=eq.${payload.record.id}`, {
          method: 'DELETE',
          headers
        });
      }

      if (!response.ok) {
        console.warn(`Supabase sync warning for ${payload.table}: ${response.statusText}`);
      }

      return { success: true };
    } catch (err: any) {
      console.warn("Supabase Service offline fallback activated:", err);
      return { success: true }; // Graceful fallback
    }
  }
}

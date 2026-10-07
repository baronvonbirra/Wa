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

export const normalizeCityName = (city?: string): string => {
  if (!city) return '';
  const c = city.trim().toLowerCase();
  if (c === 'tokio' || c === 'tokyo') return 'Tokyo';
  if (c === 'kioto' || c === 'kyoto') return 'Kyoto';
  if (c === 'osaka') return 'Osaka';
  if (c === 'kawaguchiko') return 'Kawaguchiko';
  if (c === 'takayama') return 'Takayama';
  return city;
};

export class SupabaseQueryBuilder {
  private table: string;
  private selectCols: string = '*';
  private filters: Array<{ type: 'eq' | 'is' | 'lte' | 'gte'; col: string; val: any }> = [];
  private orderOpts?: { col: string; ascending: boolean };
  private isMaybeSingle: boolean = false;
  private updateValues?: Record<string, any>;

  constructor(table: string) {
    this.table = table;
  }

  select(cols: string = '*') {
    this.selectCols = cols;
    return this;
  }

  eq(col: string, val: any) {
    this.filters.push({ type: 'eq', col, val });
    return this;
  }

  is(col: string, val: any) {
    this.filters.push({ type: 'is', col, val });
    return this;
  }

  lte(col: string, val: any) {
    this.filters.push({ type: 'lte', col, val });
    return this;
  }

  gte(col: string, val: any) {
    this.filters.push({ type: 'gte', col, val });
    return this;
  }

  order(col: string, options?: { ascending?: boolean }) {
    this.orderOpts = { col, ascending: options?.ascending ?? true };
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  single() {
    this.isMaybeSingle = true;
    return this;
  }

  update(values: Record<string, any>) {
    this.updateValues = values;
    return this;
  }

  async then(onfulfilled?: (value: { data: any; error: any }) => any) {
    try {
      const res = await this.execute();
      return onfulfilled ? onfulfilled(res) : res;
    } catch (err) {
      const errRes = { data: null, error: err };
      return onfulfilled ? onfulfilled(errRes) : errRes;
    }
  }

  private async execute(): Promise<{ data: any; error: any }> {
    if (isSupabaseConfigured()) {
      try {
        let url = `${SUPABASE_URL}/rest/v1/${this.table}`;
        const queryParams: string[] = [];

        if (this.updateValues) {
          const eqFilter = this.filters.find(f => f.type === 'eq');
          if (eqFilter) {
            url += `?${eqFilter.col}=eq.${encodeURIComponent(eqFilter.val)}`;
          }
          const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(this.updateValues)
          });
          if (response.ok) {
            const data = await response.json();
            return { data: this.isMaybeSingle ? (data[0] || null) : data, error: null };
          }
        } else {
          queryParams.push(`select=${encodeURIComponent(this.selectCols)}`);
          for (const f of this.filters) {
            if (f.type === 'eq') queryParams.push(`${f.col}=eq.${encodeURIComponent(f.val)}`);
            if (f.type === 'is') queryParams.push(`${f.col}=is.${f.val === null ? 'null' : encodeURIComponent(f.val)}`);
            if (f.type === 'lte') queryParams.push(`${f.col}=lte.${encodeURIComponent(f.val)}`);
            if (f.type === 'gte') queryParams.push(`${f.col}=gte.${encodeURIComponent(f.val)}`);
          }
          if (this.orderOpts) {
            queryParams.push(`order=${this.orderOpts.col}.${this.orderOpts.ascending ? 'asc' : 'desc'}`);
          }
          const fullUrl = `${url}?${queryParams.join('&')}`;
          const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            return { data: this.isMaybeSingle ? (data[0] || null) : data, error: null };
          }
        }
      } catch (e) {
        console.warn('Supabase REST query failed, falling back to local state:', e);
      }
    }

    return this.executeLocalFallback();
  }

  private executeLocalFallback(): { data: any; error: any } {
    let rawState: any = null;
    try {
      const saved = localStorage.getItem('WA_2_0_APP_STATE');
      if (saved) rawState = JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read local state in Supabase fallback:', e);
    }

    let items: any[] = [];
    if (this.table === 'hotels' || this.table === 'accommodations') {
      items = rawState?.accommodations || [];
      items = items.map(acc => ({
        ...acc,
        check_in: acc.check_in || acc.start_date,
        check_out: acc.check_out || acc.end_date,
        city: normalizeCityName(acc.city || (acc.city_id ? acc.city_id.replace('city-', '') : ''))
      }));
    } else if (this.table === 'itinerary_places' || this.table === 'itineraryItems') {
      items = rawState?.itineraryItems || [];
      const unassignedPlaces = (rawState?.savedPlaces || []).map((p: any) => ({
        id: p.id,
        title: p.name,
        name: p.name,
        description: p.notes,
        notes: p.notes,
        google_maps_url: p.google_maps_url,
        category: p.category === 'ramen' || p.category === 'sushi' || p.category === 'izakaya' || p.category === 'cafe' ? 'Restaurante' : (p.category === 'anime' || p.category === 'retro_gaming' || p.category === 'gachapon' || p.category === 'shopping' ? 'Tienda' : p.category),
        visit_date: p.visit_date || null,
        date: p.visit_date || null,
        city: normalizeCityName(p.city || (p.city_id ? p.city_id.replace('city-', '') : '')),
        is_visited: p.is_visited !== undefined ? p.is_visited : (p.visited || false),
        order_index: p.order_index ?? 0
      }));

      items = items.map((item: any) => ({
        ...item,
        visit_date: item?.visit_date || item?.date || null,
        order_index: item?.order_index ?? item?.orden ?? 0,
        is_visited: item?.is_visited !== undefined ? item.is_visited : (item?.status === 'done'),
        city: normalizeCityName(item?.city || '')
      })).concat(unassignedPlaces.filter((up: any) => !items.some((it: any) => Boolean(it?.id && up?.id && it.id === up.id))));
    } else if (this.table === 'packing_list_items') {
      items = rawState?.packingListItems || [
        { id: "pli-1", item: "Pasaportes vigentes", quantity: 4, category: "Documentación", assigned_to: "Todos", is_packed: true },
        { id: "pli-2", item: "Tarjeta de Crédito sin comisiones", quantity: 2, category: "Documentación", assigned_to: "Papi", is_packed: true },
        { id: "pli-3", item: "Cámara de Fotos + memorias", quantity: 1, category: "Electrónica", assigned_to: "Papi", is_packed: false },
        { id: "pli-4", item: "Neceser & Maquillaje", quantity: 1, category: "Ropa", assigned_to: "Mami", is_packed: true },
        { id: "pli-5", item: "Mochila escolar de viaje", quantity: 1, category: "General", assigned_to: "Lily", is_packed: false },
        { id: "pli-6", item: "Nintendo Switch & juegos", quantity: 1, category: "Electrónica", assigned_to: "James", is_packed: true },
        { id: "pli-7", item: "Abrigos de Invierno", quantity: 4, category: "Ropa", assigned_to: "Todos", is_packed: false },
        { id: "pli-8", item: "Adaptadores Enchufe Tipo A", quantity: 3, category: "Electrónica", assigned_to: "Todos", is_packed: true }
      ];
    }

    if (this.updateValues) {
      const eqFilter = this.filters.find(f => f.type === 'eq');
      if (eqFilter && rawState) {
        if (this.table === 'itinerary_places' || this.table === 'itineraryItems') {
          if (rawState.itineraryItems) {
            rawState.itineraryItems = rawState.itineraryItems.map((i: any) =>
              i?.id === eqFilter.val ? { ...i, ...this.updateValues, is_visited: this.updateValues?.is_visited } : i
            );
          }
          if (rawState.savedPlaces) {
            rawState.savedPlaces = rawState.savedPlaces.map((p: any) =>
              p?.id === eqFilter.val ? { ...p, ...this.updateValues, is_visited: this.updateValues?.is_visited, visited: this.updateValues?.is_visited } : p
            );
          }
        } else if (this.table === 'hotels' || this.table === 'accommodations') {
          if (rawState.accommodations) {
            rawState.accommodations = rawState.accommodations.map((a: any) =>
              a?.id === eqFilter.val ? { ...a, ...this.updateValues } : a
            );
          }
        } else if (this.table === 'packing_list_items') {
          if (rawState.packingListItems) {
            rawState.packingListItems = rawState.packingListItems.map((pli: any) =>
              pli?.id === eqFilter.val ? { ...pli, ...this.updateValues } : pli
            );
          }
        }
        try {
          localStorage.setItem('WA_2_0_APP_STATE', JSON.stringify(rawState));
        } catch (e) {}
      }
      return { data: this.updateValues, error: null };
    }

    let filtered = items.filter(item => {
      for (const f of this.filters) {
        if (f.type === 'eq') {
          if (f.col === 'city') {
            if (normalizeCityName(item.city) !== normalizeCityName(f.val)) return false;
          } else {
            if (item[f.col] !== f.val) return false;
          }
        } else if (f.type === 'is') {
          if (f.val === null && (item[f.col] !== null && item[f.col] !== undefined)) return false;
          if (f.val !== null && item[f.col] !== f.val) return false;
        } else if (f.type === 'lte') {
          if (!item[f.col] || item[f.col] > f.val) return false;
        } else if (f.type === 'gte') {
          if (!item[f.col] || item[f.col] < f.val) return false;
        }
      }
      return true;
    });

    if (this.orderOpts) {
      const { col, ascending } = this.orderOpts;
      filtered.sort((a, b) => {
        const valA = a[col] ?? 0;
        const valB = b[col] ?? 0;
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
      });
    }

    if (this.isMaybeSingle) {
      return { data: filtered[0] || null, error: null };
    }

    return { data: filtered, error: null };
  }
}

export const supabase = {
  from: (table: string) => new SupabaseQueryBuilder(table)
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

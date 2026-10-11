import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabaseConfig(): { url?: string; key?: string } {
  let url: string | undefined;
  let key: string | undefined;

  if (typeof import.meta !== 'undefined' && import.meta.env) {
    url = (import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.SUPABASE_URL as string);
    key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (import.meta.env.SUPABASE_ANON_KEY as string);
  }

  if (!url && typeof window !== 'undefined' && (window as any).__ENV__) {
    url = (window as any).__ENV__.VITE_SUPABASE_URL || (window as any).__ENV__.SUPABASE_URL;
  }
  if (!key && typeof window !== 'undefined' && (window as any).__ENV__) {
    key = (window as any).__ENV__.VITE_SUPABASE_ANON_KEY || (window as any).__ENV__.SUPABASE_ANON_KEY;
  }

  const procEnv = typeof globalThis !== 'undefined' ? (globalThis as any).process?.env : undefined;
  if (!url && procEnv) {
    url = procEnv.VITE_SUPABASE_URL || procEnv.SUPABASE_URL;
  }
  if (!key && procEnv) {
    key = procEnv.VITE_SUPABASE_ANON_KEY || procEnv.SUPABASE_ANON_KEY;
  }

  return { url: url?.trim(), key: key?.trim() };
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    cachedClient = createClient(url, key);
    return cachedClient;
  }
  return null;
}

export const isSupabaseConfigured = Boolean(getSupabaseConfig().url && getSupabaseConfig().key);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Credenciales no detectadas (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). La app está operando en modo almacenamiento local.'
  );
} else {
  console.log('[Supabase] Cliente de Supabase inicializado correctamente.');
}

export const supabase: SupabaseClient | null = getSupabaseClient();

export interface InteractiveItem {
  id: string;
  source: string;
  completed: boolean;
  updated_at?: string;
}

export async function fetchInteractiveItems(source?: string): Promise<InteractiveItem[]> {
  const client = getSupabaseClient() || supabase;
  if (!client) {
    console.warn('[Supabase] fetchInteractiveItems cancelado: Supabase no está configurado.');
    return [];
  }

  try {
    let query = client.from('interactive_items').select('id, source, completed, updated_at');
    if (source) {
      query = query.eq('source', source);
    }
    const { data, error } = await query;
    if (error) {
      console.warn('[Supabase] Error al consultar interactive_items:', error.message, error);
      return [];
    }
    console.log(`[Supabase] Petición SELECT completada para '${source || 'todas las fuentes'}'. Registros obtenidos: ${data?.length || 0}`);
    return (data as InteractiveItem[]) || [];
  } catch (err) {
    console.warn('[Supabase] Excepción durante fetchInteractiveItems:', err);
    return [];
  }
}

export async function upsertInteractiveItem(
  id: string,
  source: string,
  completed: boolean
): Promise<boolean> {
  const client = getSupabaseClient() || supabase;
  if (!client) {
    console.warn(`[Supabase] Omitiendo llamada UPSERT a BD para ${id}: Supabase no está configurado.`);
    return true;
  }

  try {
    const payload = {
      id: String(id),
      source: String(source),
      completed: Boolean(completed),
      updated_at: new Date().toISOString()
    };

    console.log(`[Supabase] Ejecutando UPSERT en la BD para '${id}' (${source}): completed=${completed}`);
    const { error } = await client.from('interactive_items').upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Error al guardar en interactive_items:', error.message, error.details);
      return false;
    }
    console.log(`[Supabase] UPSERT en BD exitoso para '${id}'`);
    return true;
  } catch (err) {
    console.warn('[Supabase] Excepción en upsertInteractiveItem:', err);
    return false;
  }
}

export async function bulkUpdateInteractiveItems(
  source: string,
  completed: boolean
): Promise<boolean> {
  const client = getSupabaseClient() || supabase;
  if (!client) {
    console.warn(`[Supabase] Omitiendo actualización masiva para '${source}': Supabase no está configurado.`);
    return true;
  }

  try {
    console.log(`[Supabase] Ejecutando UPDATE masivo para source '${source}': completed=${completed}`);
    const { error } = await client
      .from('interactive_items')
      .update({
        completed: Boolean(completed),
        updated_at: new Date().toISOString()
      })
      .eq('source', source);

    if (error) {
      console.warn('[Supabase] Error en actualización masiva de interactive_items:', error.message);
      return false;
    }
    console.log(`[Supabase] Actualización masiva en BD completada para '${source}'`);
    return true;
  } catch (err) {
    console.warn('[Supabase] Excepción en bulkUpdateInteractiveItems:', err);
    return false;
  }
}

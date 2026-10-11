import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseConfig(): { url?: string; key?: string } {
  let url: string | undefined;
  let key: string | undefined;

  // 1. Check URL parameters if in browser environment
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get('supabaseUrl') || params.get('supabase_url') || params.get('url');
      const keyParam = params.get('supabaseKey') || params.get('supabase_key') || params.get('supabaseAnonKey') || params.get('supabase_anon_key') || params.get('key');

      if (urlParam && keyParam) {
        url = urlParam;
        key = keyParam;
        try {
          localStorage.setItem('VITE_SUPABASE_URL', urlParam.trim());
          localStorage.setItem('VITE_SUPABASE_ANON_KEY', keyParam.trim());
          console.log('[Supabase] Credenciales guardadas automáticamente desde URL parameters.');
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }
  }

  // 2. Check import.meta.env
  if (!url || !key) {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (!url) url = (import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.SUPABASE_URL as string);
      if (!key) key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (import.meta.env.SUPABASE_ANON_KEY as string);
    }
  }

  // 3. Check window.__ENV__
  if ((!url || !key) && typeof window !== 'undefined' && (window as any).__ENV__) {
    if (!url) url = (window as any).__ENV__.VITE_SUPABASE_URL || (window as any).__ENV__.SUPABASE_URL;
    if (!key) key = (window as any).__ENV__.VITE_SUPABASE_ANON_KEY || (window as any).__ENV__.SUPABASE_ANON_KEY;
  }

  // 4. Check process.env
  if (!url || !key) {
    const procEnv = typeof globalThis !== 'undefined' ? (globalThis as any).process?.env : undefined;
    if (procEnv) {
      if (!url) url = procEnv.VITE_SUPABASE_URL || procEnv.SUPABASE_URL;
      if (!key) key = procEnv.VITE_SUPABASE_ANON_KEY || procEnv.SUPABASE_ANON_KEY;
    }
  }

  // 5. Check localStorage
  if ((!url || !key) && typeof window !== 'undefined') {
    try {
      if (!url) url = localStorage.getItem('VITE_SUPABASE_URL') || localStorage.getItem('SUPABASE_URL') || undefined;
      if (!key) key = localStorage.getItem('VITE_SUPABASE_ANON_KEY') || localStorage.getItem('SUPABASE_ANON_KEY') || undefined;
    } catch {
      // ignore
    }
  }

  return { url: url?.trim(), key: key?.trim() };
}

let cachedClient: SupabaseClient | null = null;

export function resetSupabaseClient(): void {
  cachedClient = null;
}

export function setSupabaseCredentials(url: string, key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VITE_SUPABASE_URL', url.trim());
    localStorage.setItem('VITE_SUPABASE_ANON_KEY', key.trim());
  }
  resetSupabaseClient();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('supabase-config-changed'));
  }
}

export function clearSupabaseCredentials(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('VITE_SUPABASE_URL');
    localStorage.removeItem('SUPABASE_URL');
    localStorage.removeItem('VITE_SUPABASE_ANON_KEY');
    localStorage.removeItem('SUPABASE_ANON_KEY');
  }
  resetSupabaseClient();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('supabase-config-changed'));
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      cachedClient = createClient(url, key);
      return cachedClient;
    } catch (err) {
      console.error('[Supabase] Error al instanciar cliente de Supabase:', err);
      return null;
    }
  }
  return null;
}

export function checkIsSupabaseConfigured(): boolean {
  return Boolean(getSupabaseClient());
}

export const isSupabaseConfigured = checkIsSupabaseConfigured();

export const supabase: SupabaseClient | null = getSupabaseClient();

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  details?: string;
  count?: number;
}

export async function testSupabaseConnection(customUrl?: string, customKey?: string): Promise<ConnectionTestResult> {
  let testClient: SupabaseClient | null = null;

  if (customUrl && customKey) {
    try {
      testClient = createClient(customUrl.trim(), customKey.trim());
    } catch (e: any) {
      return {
        success: false,
        message: 'Error de sintaxis o formato en la URL / API Key ingresada.',
        details: e?.message || String(e)
      };
    }
  } else {
    testClient = getSupabaseClient();
  }

  if (!testClient) {
    return {
      success: false,
      message: 'No hay credenciales de Supabase configuradas (URL y API Key requeridas).'
    };
  }

  try {
    // 1. Probar lectura (SELECT)
    const { data, error: selectError } = await testClient.from('interactive_items').select('id').limit(1);

    if (selectError) {
      let friendlyError = selectError.message;
      if (selectError.code === '42P01' || selectError.message?.includes('does not exist')) {
        friendlyError = 'La tabla "interactive_items" no existe en la base de datos. Ejecuta los scripts SQL de creación de tabla.';
      } else if (selectError.code === '42501' || selectError.message?.includes('row-level security') || selectError.message?.includes('permission denied')) {
        friendlyError = 'Acceso de lectura denegado por Row-Level Security (RLS). Ejecuta el script "supabase_rls_policies.sql" en Supabase.';
      } else if (selectError.message?.includes('JWT') || selectError.code === 'PGRST301') {
        friendlyError = 'API Key inválida o expirada (JWT error).';
      } else if (selectError.message?.includes('FetchError') || selectError.message?.includes('Failed to fetch')) {
        friendlyError = 'Error de conexión / red. Verifica la URL de Supabase y el estado del proyecto.';
      }

      return {
        success: false,
        message: friendlyError,
        details: `Código: ${selectError.code || 'N/A'} - ${selectError.details || selectError.hint || selectError.message}`
      };
    }

    // 2. Probar escritura (UPSERT test record)
    const { error: writeError } = await testClient
      .from('interactive_items')
      .upsert(
        { id: '__healthcheck__', source: 'system', completed: false, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
      .select();

    if (writeError) {
      let friendlyError = writeError.message;
      if (writeError.code === '42501' || writeError.message?.includes('row-level security') || writeError.message?.includes('permission denied')) {
        friendlyError = 'Lectura exitosa, pero la ESCRITURA fue denegada por políticas RLS en Supabase. Ejecuta el script "supabase_rls_policies.sql" en el Editor SQL de Supabase.';
      } else {
        friendlyError = `Lectura OK, pero falló la prueba de escritura/UPSERT: ${writeError.message}`;
      }

      return {
        success: false,
        message: friendlyError,
        details: `Código: ${writeError.code || 'N/A'} - ${writeError.details || writeError.hint || writeError.message}`
      };
    }

    return {
      success: true,
      message: 'Conexión y permisos de lectura/escritura verificados correctamente en Supabase.',
      count: data ? data.length : 0
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Excepción de red o servidor al intentar conectar con Supabase.',
      details: err?.message || String(err)
    };
  }
}

export interface InteractiveItem {
  id: string;
  source: string;
  completed: boolean;
  updated_at?: string;
}

export async function fetchInteractiveItems(source?: string): Promise<InteractiveItem[]> {
  const client = getSupabaseClient();
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
  const client = getSupabaseClient();
  if (!client) {
    console.warn(`[Supabase] Omitiendo llamada UPSERT a BD para ${id}: Supabase no está configurado.`);
    return false;
  }

  try {
    const payload = {
      id: String(id),
      source: String(source),
      completed: Boolean(completed),
      updated_at: new Date().toISOString()
    };

    console.log(`[Supabase] Ejecutando UPSERT en la BD para '${id}' (${source}): completed=${completed}`);
    const { data, error } = await client.from('interactive_items').upsert(payload, { onConflict: 'id' }).select();

    if (error) {
      console.warn('[Supabase] Error al guardar en interactive_items:', error.message, error.details);
      return false;
    }
    console.log(`[Supabase] UPSERT en BD exitoso para '${id}':`, data);
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
  const client = getSupabaseClient();
  if (!client) {
    console.warn(`[Supabase] Omitiendo actualización masiva para '${source}': Supabase no está configurado.`);
    return false;
  }

  try {
    console.log(`[Supabase] Ejecutando UPDATE masivo para source '${source}': completed=${completed}`);
    const { data, error } = await client
      .from('interactive_items')
      .update({
        completed: Boolean(completed),
        updated_at: new Date().toISOString()
      })
      .eq('source', source)
      .select();

    if (error) {
      console.warn('[Supabase] Error en actualización masiva de interactive_items:', error.message);
      return false;
    }
    console.log(`[Supabase] Actualización masiva en BD completada para '${source}':`, data);
    return true;
  } catch (err) {
    console.warn('[Supabase] Excepción en bulkUpdateInteractiveItems:', err);
    return false;
  }
}

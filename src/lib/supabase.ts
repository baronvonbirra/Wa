import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (key: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key] as string;
  }
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Credenciales no detectadas (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). La app está operando en modo almacenamiento local.'
  );
} else {
  console.log('[Supabase] Cliente de Supabase inicializado correctamente.');
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface InteractiveItem {
  id: string;
  source: string;
  completed: boolean;
  updated_at?: string;
}

export async function fetchInteractiveItems(source?: string): Promise<InteractiveItem[]> {
  if (!supabase) {
    console.warn('[Supabase] fetchInteractiveItems cancelado: Supabase no está configurado.');
    return [];
  }

  try {
    let query = supabase.from('interactive_items').select('id, source, completed, updated_at');
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
  if (!supabase) {
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
    const { error } = await supabase.from('interactive_items').upsert(payload, { onConflict: 'id' });

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
  if (!supabase) {
    console.warn(`[Supabase] Omitiendo actualización masiva para '${source}': Supabase no está configurado.`);
    return true;
  }

  try {
    console.log(`[Supabase] Ejecutando UPDATE masivo para source '${source}': completed=${completed}`);
    const { error } = await supabase
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

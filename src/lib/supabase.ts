import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

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
    return [];
  }

  try {
    let query = supabase.from('interactive_items').select('id, source, completed, updated_at');
    if (source) {
      query = query.eq('source', source);
    }
    const { data, error } = await query;
    if (error) {
      console.warn('[Supabase] Error fetching interactive items:', error.message);
      return [];
    }
    return (data as InteractiveItem[]) || [];
  } catch (err) {
    console.warn('[Supabase] Fetch exception:', err);
    return [];
  }
}

export async function upsertInteractiveItem(
  id: string,
  source: string,
  completed: boolean
): Promise<boolean> {
  if (!supabase) {
    // Return true in offline / unconfigured mode to prevent rolling back local optimistic state
    return true;
  }

  try {
    const payload = {
      id: String(id),
      source: String(source),
      completed: Boolean(completed),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('interactive_items').upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Error upserting interactive item:', error.message, error.details);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Upsert exception:', err);
    return false;
  }
}

export async function bulkUpdateInteractiveItems(
  source: string,
  completed: boolean
): Promise<boolean> {
  if (!supabase) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('interactive_items')
      .update({
        completed: Boolean(completed),
        updated_at: new Date().toISOString()
      })
      .eq('source', source);

    if (error) {
      console.warn('[Supabase] Error bulk updating interactive items:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Bulk update exception:', err);
    return false;
  }
}

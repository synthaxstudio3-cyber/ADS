import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PlayerRegistration } from '../types';

// Supabase project credentials provided by the user
export const SUPABASE_PROJECT_ID = 'rmkalviluxpknpaaviyb';
export const SUPABASE_DEFAULT_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_DEFAULT_KEY = 'sb_publishable_MHGPpgxpwFv25g27wVUblQ_AQm7Z_WK';

/**
 * Normalizes any URL string or bare project ID into a valid https://<project-ref>.supabase.co URL.
 * Handles cases where the user/environment passes only the project ref like 'rmkalviluxpknpaaviyb'.
 */
export function normalizeSupabaseUrl(raw?: string): string {
  if (!raw || typeof raw !== 'string' || !raw.trim()) {
    return SUPABASE_DEFAULT_URL;
  }
  const trimmed = raw.trim();

  // If already starts with http:// or https://
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      // Invalid URL format, fallback to default
      return SUPABASE_DEFAULT_URL;
    }
  }

  // If bare project ID or domain without protocol (e.g. 'rmkalviluxpknpaaviyb' or 'rmkalviluxpknpaaviyb.supabase.co')
  const cleanId = trimmed.replace(/\.supabase\.co.*$/, '').replace(/[^a-zA-Z0-9_-]/g, '');
  if (cleanId) {
    return `https://${cleanId}.supabase.co`;
  }

  return SUPABASE_DEFAULT_URL;
}

export function getResolvedSupabaseConfig() {
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : undefined;
  const envKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined;

  const url = normalizeSupabaseUrl(envUrl);
  const key = (envKey && typeof envKey === 'string' && envKey.trim()) || SUPABASE_DEFAULT_KEY;

  return { url, key };
}

let cachedClient: SupabaseClient | null = null;

/**
 * Safely returns or creates a Supabase client with lazy initialization
 * and guardrails against invalid URLs or startup crashes.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  try {
    const { url, key } = getResolvedSupabaseConfig();
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

// Export a proxy for backward-compatible `supabase.from(...)` calls that won't throw at load time
export const supabase: any = new Proxy(
  {},
  {
    get: (_target, prop) => {
      const client = getSupabaseClient();
      if (!client) {
        return () => ({
          insert: () => ({ select: () => Promise.resolve({ data: null, error: new Error('Supabase client unavailable') }) }),
          select: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) }),
        });
      }
      const value = (client as any)[prop];
      if (typeof value === 'function') {
        return value.bind(client);
      }
      return value;
    },
  }
);

export interface SupabaseSyncResult {
  success: boolean;
  table?: string;
  error?: string;
  data?: any;
}

/**
 * Saves a player/team registration record to Supabase.
 * Tries the standard 'registrations' table, falling back to 'tournament_registrations' if needed.
 */
export async function saveRegistrationToSupabase(
  reg: PlayerRegistration
): Promise<SupabaseSyncResult> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      error: 'Supabase client could not be initialized.',
    };
  }

  const payload = {
    ticket_id: reg.ticketId,
    format: reg.format,
    team_name: reg.teamName,
    captain_name: reg.captainName,
    captain_ign: reg.captainIGN,
    captain_uid: reg.captainUID,
    whatsapp_number: reg.whatsappNumber,
    discord_tag: reg.discordTag,
    instagram_handle: reg.instagramHandle || '',
    slot_id: reg.slotId,
    map: reg.map,
    teammates: reg.teammates || [],
    registered_at: reg.registeredAt || new Date().toISOString(),
  };

  try {
    // Attempt insert into 'registrations'
    const { data, error } = await client.from('registrations').insert([payload]).select();

    if (!error) {
      return { success: true, table: 'registrations', data };
    }

    // If 'registrations' fails (e.g. table not found or different name), try 'tournament_registrations'
    const fallbackAttempt = await client
      .from('tournament_registrations')
      .insert([payload])
      .select();

    if (!fallbackAttempt.error) {
      return { success: true, table: 'tournament_registrations', data: fallbackAttempt.data };
    }

    // Also attempt with camelCase in case the user created columns matching JS property names
    const camelPayload = {
      ticketId: reg.ticketId,
      format: reg.format,
      teamName: reg.teamName,
      captainName: reg.captainName,
      captainIGN: reg.captainIGN,
      captainUID: reg.captainUID,
      whatsappNumber: reg.whatsappNumber,
      discordTag: reg.discordTag,
      instagramHandle: reg.instagramHandle || '',
      slotId: reg.slotId,
      map: reg.map,
      teammates: reg.teammates || [],
      registeredAt: reg.registeredAt || new Date().toISOString(),
    };

    const camelAttempt = await client.from('registrations').insert([camelPayload]).select();
    if (!camelAttempt.error) {
      return { success: true, table: 'registrations', data: camelAttempt.data };
    }

    console.warn('Supabase insert notice:', error?.message || fallbackAttempt.error?.message);
    return {
      success: false,
      error: error?.message || fallbackAttempt.error?.message || 'Failed to insert to Supabase table',
    };
  } catch (err: any) {
    console.error('Supabase registration error:', err);
    return {
      success: false,
      error: err?.message || 'Network error while connecting to Supabase',
    };
  }
}

/**
 * Fetches recent registrations from Supabase (if available)
 */
export async function getRecentRegistrations(): Promise<PlayerRegistration[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false })
      .limit(20);

    if (error || !data) {
      return [];
    }

    return data.map((item: any) => ({
      id: item.ticket_id || item.ticketId || item.id,
      ticketId: item.ticket_id || item.ticketId || item.id,
      format: item.format,
      teamName: item.team_name || item.teamName,
      captainName: item.captain_name || item.captainName,
      captainIGN: item.captain_ign || item.captainIGN,
      captainUID: item.captain_uid || item.captainUID,
      whatsappNumber: item.whatsapp_number || item.whatsappNumber,
      discordTag: item.discord_tag || item.discordTag,
      instagramHandle: item.instagram_handle || item.instagramHandle || '',
      slotId: item.slot_id || item.slotId,
      map: item.map,
      teammates: item.teammates || [],
      registeredAt: item.registered_at || item.registeredAt,
    }));
  } catch (err) {
    console.warn('Could not retrieve registrations from Supabase:', err);
    return [];
  }
}

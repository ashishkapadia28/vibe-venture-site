import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Built lazily, on first call, instead of at module import time — Next.js
 * imports every API route to collect its metadata during the build step,
 * and a top-level createClient() call would throw the whole build if the
 * env vars aren't set for that deployment, not just fail the one route.
 */
export function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  if (!client) {
    client = createClient(supabaseUrl, supabaseKey);
  }
  return client;
}

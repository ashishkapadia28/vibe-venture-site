import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Server-side client used by API routes. Uses the publishable (anon) key —
 * safe to hold server-side too since writes are gated by RLS insert-only
 * policies, not by key secrecy.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — used everywhere except /admin server actions.
// RLS policies (see supabase_schema.sql) only allow this client to
// read prices and insert shop registrations — never to edit price
// or SSP values directly. That's what keeps the price system honest.
export const supabase = createClient(url, anonKey);
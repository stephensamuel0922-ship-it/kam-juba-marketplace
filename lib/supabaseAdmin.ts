import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// SERVER-ONLY client. Bypasses RLS — only ever import this inside
// files under app/admin/actions.ts or other server actions/route
// handlers, never in a "use client" component.
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
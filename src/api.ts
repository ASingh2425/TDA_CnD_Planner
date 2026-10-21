import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL,
  key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const db =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: false, detectSessionInUrl: true },
      })
    : null;
export async function rpc(name: string, args: Record<string, unknown>) {
  if (!db) throw Error("Shared workspace is not configured.");
  const { data, error } = await db.rpc(name, args);
  if (error) throw Error(error.message);
  return data;
}

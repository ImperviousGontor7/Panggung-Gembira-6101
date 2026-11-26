import { createClient } from "@supabase/supabase-js";

// =====================================
// SUPABASE ENVIRONMENT VARIABLES
// =====================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// =====================================
// ENVIRONMENT VALIDATION
// =====================================

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase URL or Publishable Key is missing. Check client/.env.local",
  );
}

// =====================================
// CREATE SUPABASE CLIENT
// =====================================

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

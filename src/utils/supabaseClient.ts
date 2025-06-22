import { createClient } from "@supabase/supabase-js";

// Ganti dengan URL dan anon key project Supabase Anda
export const supabase = createClient(
  "https://kxpzukvdbudxoyitkdup.supabase.co", // Ganti dengan URL project Supabase Anda
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cHp1a3ZkYnVkeG95aXRrZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1OTA0OTMsImV4cCI6MjA2NjE2NjQ5M30.0GTXwGjapodqqjq9_7vHFXwHqtdsAwD3xTRSxxvRj7s" // Ganti dengan anon/public API key Supabase Anda
);

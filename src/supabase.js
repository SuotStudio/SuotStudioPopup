import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://euasmoknisfykndjcqjz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1YXNtb2tuaXNmeWtuZGpjcWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NDk3NjksImV4cCI6MjAxNjIyNTc2OX0.Iq53CCV9E6a91NzUttHhd9cmThNKwOxfNh7MOPV2Xyo";

export const supabase = createClient(supabaseUrl, supabaseKey);

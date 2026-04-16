import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("ENV CHECK — URL:", url ? url.substring(0, 20) + "..." : "UNDEFINED");
  console.log("ENV CHECK — KEY:", key ? key.substring(0, 12) + "..." : "UNDEFINED");

  if (!url || !key) {
    throw new Error(
      `Missing Supabase env vars. URL: ${url ? "set" : "MISSING"}, KEY: ${key ? "set" : "MISSING"}. ` +
      `Check .env.local is in the project root and you restarted the dev server.`
    );
  }

  return createClient(url, key);
}
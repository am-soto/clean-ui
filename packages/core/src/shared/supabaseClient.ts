import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

//@ts-ignore
const url = import.meta.env.VITE_API_SUPABASE_URL || "";
//@ts-ignore
const key = import.meta.env.VITE_API_SUPABASE_KEY || "";

export const supabase = createClient<Database>(url, key);

import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export const supabase = createClient<Database>(
    "https://umvsvltrpmfcpvsjbdvz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdnN2bHRycG1mY3B2c2piZHZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDM2NTAyMiwiZXhwIjoyMDA1OTQxMDIyfQ.sY5ZC1IbVmek9vwXUtNt7YiHB5UF05Z4Amulg4QMs2A"
);
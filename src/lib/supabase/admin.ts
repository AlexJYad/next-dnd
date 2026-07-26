import "server-only"; // спец-пакет, кинет ошибку сборки если случайно попадёт в клиентский бандл
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.SUPABASE_SERVICE_KEY!,
);

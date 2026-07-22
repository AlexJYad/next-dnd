// lib/gods.ts
import { getSession } from "@/lib/getSession";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.SUPABASE_SERVICE_KEY!,
);

const roleRank: Record<string, number> = { guest: 0, player: 1, admin: 2 };

export async function getGods() {
   const user = await getSession();
   const userRank = roleRank[user?.role ?? "guest"] ?? 0;

   const { data, error } = await supabase
      .from("gods")
      .select("*")
      .order("order");

   if (error) throw error;

   return data.filter((god) => (roleRank[god.min_role] ?? 0) <= userRank);
}

export async function getGodsGrouped() {
   const gods = await getGods();

   const grouped = gods.reduce<Record<string, typeof gods>>((acc, god) => {
      (acc[god.category] ??= []).push(god);
      return acc;
   }, {});

   return grouped;
}

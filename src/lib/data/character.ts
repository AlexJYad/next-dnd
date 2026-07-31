import { supabaseAdmin } from "@/lib/supabase/admin";
import { SessionUser } from "@/lib/session";

import type { Database } from "@/lib/database.types";

type Character = Database["public"]["Tables"]["characters"]["Row"];

export async function getCharacter(user: SessionUser): Promise<Character> {
   const { data, error } = await supabaseAdmin
      .from("characters")
      .select("*")
      .eq("user_id", user.id)
      .single();

   if (error) {
      console.error("Failed to fetch character", {
         userId: user.id,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

export async function getAllCharacters(
   requester: SessionUser,
): Promise<Character[]> {
   if (requester.role !== "admin") {
      throw new Error("Forbidden: admin access required");
   }

   const { data, error } = await supabaseAdmin
      .from("characters")
      .select("*")
      .order("name");

   if (error) {
      console.error("Failed to fetch all characters", {
         requesterId: requester.id,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

export async function getCharacterById(
   requester: SessionUser,
   characterId: number,
): Promise<Character> {
   if (requester.role !== "admin") {
      throw new Error("Forbidden: admin access required");
   }

   const { data, error } = await supabaseAdmin
      .from("characters")
      .select("*")
      .eq("id", characterId)
      .single();

   if (error) {
      console.error("Failed to fetch character by id", {
         requesterId: requester.id,
         characterId,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

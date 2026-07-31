"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";

type CurrencyField = "gold" | "silver" | "copper" | "platinum" | "electrum";
const CURRENCY_FIELDS: CurrencyField[] = [
   "gold",
   "silver",
   "copper",
   "platinum",
   "electrum",
];

export async function updateOwnCharacter(formData: FormData) {
   const session = await getSession();
   if (!session) {
      throw new Error("Unauthorized");
   }

   const { data: character, error: fetchError } = await supabaseAdmin
      .from("characters")
      .select("max_hp, gold, silver, copper, platinum, electrum")
      .eq("user_id", session.id) // было session.user.id
      .single();

   if (fetchError || !character) {
      throw new Error("Character not found");
   }

   const name = (formData.get("name") as string)?.trim();
   const notes = (formData.get("notes") as string) ?? "";
   const currentHp = Number(formData.get("current_hp"));
   const inventoryRaw = formData.get("inventory") as string;

   if (!name) {
      throw new Error("Name is required");
   }
   if (
      Number.isNaN(currentHp) ||
      currentHp < 0 ||
      currentHp > character.max_hp
   ) {
      throw new Error(`current_hp must be between 0 and ${character.max_hp}`);
   }

   let inventory: unknown;
   try {
      inventory = JSON.parse(inventoryRaw || "[]");
   } catch {
      throw new Error("Invalid inventory format");
   }

   // трата валюты: каждое поле формы — сколько ПОТРАТИТЬ (только неотрицательное число)
   const currencyUpdates: Partial<Record<CurrencyField, number>> = {};

   for (const field of CURRENCY_FIELDS) {
      const spendRaw = formData.get(`spend_${field}`);
      const spend = spendRaw ? Number(spendRaw) : 0;

      if (Number.isNaN(spend) || spend < 0) {
         throw new Error(`Invalid amount for ${field}`);
      }
      if (spend === 0) continue;

      const newValue = character[field] - spend;
      if (newValue < 0) {
         throw new Error(`Not enough ${field}`);
      }

      currencyUpdates[field] = newValue;
   }

   const { error } = await supabaseAdmin
      .from("characters")
      .update({
         name,
         notes,
         current_hp: currentHp,
         inventory,
         ...currencyUpdates,
      })
      .eq("user_id", session.id);

   if (error) {
      console.error("Failed to update own character", {
         userId: session.id,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   revalidatePath("/profile");
}

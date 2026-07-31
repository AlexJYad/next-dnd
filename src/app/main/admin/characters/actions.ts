"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";

export async function updateCharacterAsMaster(
   characterId: number,
   formData: FormData,
) {
   const session = await getSession();

   if (!session) {
      throw new Error("Unauthorized");
   }
   if (session.role !== "admin") {
      throw new Error("Forbidden: admin access required");
   }

   const name = (formData.get("name") as string)?.trim();
   if (!name) {
      throw new Error("Name is required");
   }

   const numberField = (key: string) => {
      const raw = formData.get(key);
      const value = Number(raw);
      if (raw === null || Number.isNaN(value)) {
         throw new Error(`Invalid value for ${key}`);
      }
      return value;
   };

   const maxHp = numberField("max_hp");
   const currentHp = numberField("current_hp");
   const maxMana = numberField("max_mana");
   const currentMana = numberField("current_mana");

   if (currentHp < 0 || currentHp > maxHp) {
      throw new Error("current_hp must be between 0 and max_hp");
   }
   if (currentMana < 0 || currentMana > maxMana) {
      throw new Error("current_mana must be between 0 and max_mana");
   }

   let inventory: unknown;
   let skills: unknown;
   try {
      inventory = JSON.parse((formData.get("inventory") as string) || "[]");
      skills = JSON.parse((formData.get("skills") as string) || "{}");
   } catch {
      throw new Error("Invalid JSON in inventory or skills");
   }

   const updatePayload = {
      name,
      notes: (formData.get("notes") as string) || null,
      backstory: (formData.get("backstory") as string) || null,
      avatar_url: (formData.get("avatar_url") as string) || null,
      age: formData.get("age") ? numberField("age") : null,
      level: numberField("level"),
      experience: numberField("experience"),
      max_hp: maxHp,
      current_hp: currentHp,
      max_mana: maxMana,
      current_mana: currentMana,
      armor_class: numberField("armor_class"),
      strength: numberField("strength"),
      dexterity: numberField("dexterity"),
      constitution: numberField("constitution"),
      intelligence: numberField("intelligence"),
      wisdom: numberField("wisdom"),
      charisma: numberField("charisma"),
      gold: numberField("gold"),
      silver: numberField("silver"),
      copper: numberField("copper"),
      platinum: numberField("platinum"),
      electrum: numberField("electrum"),
      inventory,
      skills,
   };

   const { error } = await supabaseAdmin
      .from("characters")
      .update(updatePayload)
      .eq("id", characterId);

   if (error) {
      console.error("Failed to update character as master", {
         adminId: session.id,
         characterId,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   revalidatePath(`/admin/characters/${characterId}`);
   revalidatePath("/admin/characters");
}

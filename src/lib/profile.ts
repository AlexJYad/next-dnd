import { supabaseAdmin } from "@/lib/supabase/admin";
import { SessionUser } from "@/lib/session";

import type { Database } from "@/lib/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];

type UserProfile = Pick<User, "id" | "email" | "name" | "role">;

export async function getOwnProfile(user: SessionUser): Promise<UserProfile> {
   const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, role")
      .eq("id", user.id)
      .single();

   if (error) {
      console.error("Failed to fetch profile", {
         userId: user.id,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

export async function getAllProfiles(
   requester: SessionUser,
): Promise<UserProfile[]> {
   if (requester.role !== "admin") {
      throw new Error("Forbidden: admin access required");
   }

   const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, role");

   if (error) {
      console.error("Failed to fetch all profiles", {
         requesterId: requester.id,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

export async function getProfileById(
   requester: SessionUser,
   targetId: number,
): Promise<UserProfile> {
   if (requester.role !== "admin") {
      throw new Error("Forbidden: admin access required");
   }

   const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, name, role")
      .eq("id", targetId)
      .single();

   if (error) {
      console.error("Failed to fetch profile by id", {
         requesterId: requester.id,
         targetId,
         code: error.code,
         message: error.message,
      });
      throw error;
   }

   return data;
}

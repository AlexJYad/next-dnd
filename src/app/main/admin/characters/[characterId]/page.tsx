import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { getCharacterById } from "@/lib/data/character";
import { MasterCharacterForm } from "./master-character-form";

export default async function AdminCharacterPage({
   params,
}: {
   params: Promise<{ characterId: string }>;
}) {
   const session = await getSession();

   if (!session) {
      redirect("/login");
   }
   if (session.role !== "admin") {
      redirect("/profile");
   }

   const { characterId } = await params;
   const id = Number(characterId);

   if (Number.isNaN(id)) {
      notFound();
   }

   const character = await getCharacterById(session, id);
   if (!character) {
      notFound();
   }

   return <MasterCharacterForm character={character} />;
}

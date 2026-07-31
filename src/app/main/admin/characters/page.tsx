// app/admin/characters/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/getSession";
import { getAllCharacters } from "@/lib/data/character";

export default async function AdminCharactersPage() {
   const session = await getSession();

   if (!session) {
      redirect("/login");
   }
   if (session.role !== "admin") {
      redirect("/profile");
   }

   const characters = await getAllCharacters(session);

   return (
      <div>
         <h1>Все персонажи</h1>
         <ul>
            {characters.map((char) => (
               <li key={char.id}>
                  <Link href={`/main/admin/characters/${char.id}`}>
                     {char.name} — ур. {char.level}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

import { getSession } from "@/lib/getSession";
import { getCharacter } from "@/lib/getCharacter";
import { redirect } from "next/navigation";

export default async function HomePage() {
   const user = await getSession();
   if (!user) {
      redirect("/login");
   }

   const character = await getCharacter(user);

   return (
      <div className="flex flex-col flex-1 items-center w-full">
         <h1>☯ Black And White ☯</h1>
         <h2>Добро пожаловать, дорогой {character.name}!</h2>
         {/* только залогиненные не гости */}
         {user && user.role !== "guest" && (
            <div>
               <h3>Это блок для игроков</h3>
            </div>
         )}
         {/* только мастер */}
         {user?.role === "admin" && (
            <div>
               <h3>Блок для мастера</h3>
            </div>
         )}
      </div>
   );
}

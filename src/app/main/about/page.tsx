import { getSession } from "@/lib/getSession";
import { getCharacter } from "@/lib/getCharacter";
import { redirect } from "next/navigation";
import "./about.css";

export default async function HomePage() {
   const user = await getSession();

   if (!user) {
      redirect("/login");
   }

   const character = await getCharacter(user);

   return (
      <div className="news-container flex flex-col flex-1 self-center w-m-xl">
         <h4>Обновление: Beta 0.1.1</h4>
         <p>
            <em>Дата обновления:</em> <strong>18 июля 2026 года</strong>
         </p>
         <ul>
            <li>add header with dropdown navigation</li>
            <li>implement authentication</li>
            <li>connect Supabase database</li>
            <li>port dynamic background component from old project</li>
            <li>start spell deriver feature</li>
            <li>add initial error/loading pages</li>
         </ul>
      </div>
   );
}

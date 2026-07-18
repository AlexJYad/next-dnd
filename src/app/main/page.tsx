import Image from "next/image";
import { getSession } from "@/lib/getSession";

export default async function HomePage() {
   const user = await getSession();

   return (
      <div className="flex flex-col flex-1 items-center justify-center">
         <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white/70 dark:bg-black/70 sm:items-start">
            <div>
               <h1>Главная</h1>

               {/* видят все */}
               <p>Добро пожаловать</p>

               {/* видят гости */}
               {user && user.role == "guest" && <div>Дорогой гость</div>}

               {/* только залогиненные не гости */}
               {user && user.role !== "guest" && <div>Блок для игроков</div>}

               {/* только мастер */}
               {user?.role === "master" && <div>Блок для мастера</div>}
            </div>
         </main>
      </div>
   );
}

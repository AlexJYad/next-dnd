import { getSession } from "@/lib/getSession";
import { getCharacter } from "@/lib/getCharacter";
import SkillTree from "@/components/SkillTree/SkillTree";
import { redirect } from "next/navigation";

export default async function HomePage() {
   const user = await getSession();

   if (!user) {
      redirect("/login");
   }

   const character = await getCharacter(user);

   return <SkillTree />;
}

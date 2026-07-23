import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionUser } from "./session";

export async function getSession() {
   const session = await getIronSession<{ user?: SessionUser }>(
      await cookies(),
      sessionOptions,
   );
   return session.user ?? null;
}

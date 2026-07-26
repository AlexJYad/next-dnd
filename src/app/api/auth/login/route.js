import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request) {
   try {
      const { email, password } = await request.json();

      const { data: user, error } = await supabaseAdmin
         .from("users")
         .select("*")
         .eq("email", email)
         .single();

      if (error || !user) {
         return NextResponse.json(
            { message: "Неверный email или пароль" },
            { status: 401 },
         );
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
         return NextResponse.json(
            { message: "Неверный email или пароль" },
            { status: 401 },
         );
      }

      // сохраняем сессию
      const session = await getIronSession(await cookies(), sessionOptions);
      session.user = {
         id: user.id,
         email: user.email,
         role: user.role,
         name: user.name,
      };
      await session.save();

      return NextResponse.json({ ok: true });
   } catch (err) {
      console.error(err);
      return NextResponse.json(
         { message: "Внутренняя ошибка сервера" },
         { status: 500 },
      );
   }
}

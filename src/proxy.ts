import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "app-session";

const authRoutes = ["/auth"];
const publicRoutes = ["/auth"];

export default function proxy(req: NextRequest) {
   const { pathname } = req.nextUrl;
   const token = req.cookies.get(AUTH_COOKIE)?.value;
   const isLoggedIn = Boolean(token);

   if (pathname === "/") {
      return NextResponse.redirect(
         new URL(isLoggedIn ? "/main" : "/auth", req.url),
      );
   }

   if (isLoggedIn && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/main", req.url));
   }

   if (!isLoggedIn && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/auth", req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

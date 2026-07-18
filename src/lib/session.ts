import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
   password: process.env.SESSION_SECRET!,
   cookieName: "app-session",
   cookieOptions: {
      secure: process.env.NODE_ENV === "production",
   },
};

export type SessionUser = {
   id: number;
   email: string;
   role: string;
   name: string;
};

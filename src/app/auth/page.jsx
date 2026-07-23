"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   async function handleLogin(e) {
      e.preventDefault();
      setError("");
      setLoading(true);

      const res = await fetch("/api/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
         router.push("/");
      } else {
         setError(data.message);
      }
   }

   async function handleGuestLogin() {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_GUEST_EMAIL,
            password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
         }),
      });

      setLoading(false);
      if (res.ok) router.push("/main");
   }

   return (
      <div className="page">
         <div className="card">
            <h1 className="logo"></h1>
            <p className="subtitle">Войдите чтобы продолжить</p>

            {error && <p className="error">{error}</p>}

            <div className="field">
               <label>Email</label>
               <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="field">
               <label>Пароль</label>
               <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <button
               className="btn btn-primary"
               onClick={handleLogin}
               disabled={loading}
            >
               {loading ? "Загрузка..." : "Войти"}
            </button>

            <div className="divider">
               <span className="divider-line" />
               <span className="divider-text">или</span>
               <span className="divider-line" />
            </div>

            <button
               className="btn-test"
               onClick={handleGuestLogin}
               disabled={loading}
            >
               <span className="badge">demo</span>
               Войти как гость
            </button>
         </div>
      </div>
   );
}

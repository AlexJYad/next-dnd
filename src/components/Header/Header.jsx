"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Header.css";

export default function Header({ user }) {
   const pathname = usePathname();

   const links = [
      { href: "/main", label: "Главная" },
      { href: "/about", label: "О нас" },
      { href: "/contact", label: "Контакты" },
   ];

   return (
      <header className="header">
         <div className="header-inner">
            <Link href="/" className="header-logo">
               <span className="header-logo-mark" />
               <span></span>
            </Link>

            <nav className="header-nav">
               {links.map((link) => (
                  <Link
                     key={link.href}
                     href={link.href}
                     className={`header-link ${pathname === link.href ? "active" : ""}`}
                  >
                     {link.label}
                  </Link>
               ))}
            </nav>

            <div className="header-actions">
               <div className="header-divider" />
               <LogoutButton className="header-logout" />
            </div>
         </div>
      </header>
   );
}

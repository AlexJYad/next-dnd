// app/not-found.tsx
import Link from "next/link";
import "./not-found.css";
import "./globals.css";

export default function NotFound() {
   return (
      <div className="page">
         <div className="notfound-card">
            <div className="notfound-icon-row">
               <span className="notfound-digit">4</span>
               <div className="notfound-circle">
                  <svg
                     width="26"
                     height="26"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="var(--foreground-muted)"
                     strokeWidth="1.5"
                  >
                     <path d="M12 21c-4-4.5-7-8-7-11a7 7 0 0 1 14 0c0 3-3 6.5-7 11z" />
                     <circle cx="12" cy="10" r="2.5" />
                     <line x1="4" y1="4" x2="20" y2="20" />
                  </svg>
               </div>
               <span className="notfound-digit">4</span>
            </div>

            <h1 className="notfound-title">Страница не найдена</h1>
            <p className="notfound-text">
               Возможно, страница была удалена или адрес введён неверно.
            </p>
            <Link href="/" className="btn btn-primary">
               На главную
            </Link>
         </div>
      </div>
   );
}

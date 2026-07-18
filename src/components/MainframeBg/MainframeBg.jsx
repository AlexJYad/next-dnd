"use client";

import { useState, useEffect } from "react";
import "./MainframeBg.css";

const RHOMBUS_COUNT = 10;

const TIMEOUT = 1000; // ms

const COLORS = [
   "rgb(255, 255, 255)",
   "rgba(0, 0, 0, 0.8)",
   "rgba(255, 255, 255, 0)",
];

function random(min, max) {
   return Math.random() * (max - min) + min;
}

export default function MainframeBg({ style = {}, fixed = true }) {
   const [rhombuses, setRhombuses] = useState(null);

   useEffect(() => {
      const cols = Math.ceil(window.innerWidth / 80);
      const rows = Math.ceil(window.innerHeight / 138);

      // ← сразу даём случайный цвет, не transparent
      const initial = Array.from({ length: RHOMBUS_COUNT }, (_, i) => ({
         id: i,
         col: Math.floor(random(0, cols)),
         row: Math.floor(random(0, rows)),
         color: COLORS[Math.floor(random(0, COLORS.length))],
         opacity: random(0.3, 0.9),
      }));

      setRhombuses(initial);

      const interval = setInterval(() => {
         setRhombuses((prev) => {
            const next = [...prev];
            const index = Math.floor(random(0, next.length));

            next[index] = {
               ...next[index],
               color: COLORS[Math.floor(random(0, COLORS.length))],
               opacity: random(0.3, 0.9),
            };

            return next;
         });
      }, TIMEOUT);

      return () => clearInterval(interval);
   }, []);

   return (
      <>
         <div
            className={`mainframe-bg-container ${fixed ? "mainframe-bg-container--fixed" : ""}`}
            style={style}
            aria-hidden="true"
         >
            <div className="mainframe-bg__pattern" />
         </div>

         <div
            style={{
               position: "fixed",
               top: 0,
               left: 0,
               width: "100vw",
               height: "100vh",
               pointerEvents: "none",
               zIndex: -1,
            }}
            aria-hidden="true"
         >
            {rhombuses?.map((r) => (
               <div
                  key={r.id}
                  style={{
                     position: "absolute",
                     width: "80px",
                     height: "138px",
                     clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                     left: `${r.col * 80}px`,
                     top: `${r.row * 138}px`,
                     background: r.color,
                     opacity: r.opacity,
                     transition: "background 1s ease, opacity 1.5s ease",
                  }}
               />
            ))}
         </div>
      </>
   );
}

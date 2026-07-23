import {
   SunIcon,
   MoonIcon,
   ScaleIcon,
   PinIcon,
} from "@/components/icons/AlignmentIcons";

import "./GodCard.css";
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";

type God = {
   id: string;
   name: string;
   title: string;
   description: string;
   alignment: "light" | "dark" | "neutral";
   region: string | null;
   image_url: string | null;
};

const alignmentConfig = {
   light: { icon: SunIcon, label: "Светлый", className: "badge--light" },
   dark: { icon: MoonIcon, label: "Тёмный", className: "badge--dark" },
   neutral: {
      icon: ScaleIcon,
      label: "Нейтральный",
      className: "badge--neutral",
   },
} as const;

export function GodCard({ god, reverse }: { god: God; reverse: boolean }) {
   const {
      icon: AlignmentIcon,
      label,
      className,
   } = alignmentConfig[god.alignment];

   return (
      <details className={`god-card god-card--${god.alignment}`}>
         <summary>
            <span
               className={
                  god.alignment === "light" ? "white text-outline"
                  : god.alignment === "dark" ?
                     "black"
                  :  ""
               }
            >
               {god.name}
            </span>{" "}
            — {god.title}
            <span className="god-badges">
               <span className={`badge ${className}`} title={label}>
                  <AlignmentIcon />
               </span>
               {god.region && (
                  <span className="badge badge--region" title={god.region}>
                     <PinIcon />
                     {god.region}
                  </span>
               )}
            </span>
         </summary>

         <div className={`gods ${reverse ? "reverse" : ""}`}>
            {god.image_url && (
               <ImageWithFallback
                  src={god.image_url}
                  alt={`${god.name} — ${god.title}`}
                  fallbackSrc="/images/gods/placeholder.jpg"
                  className="god-image"
               />
            )}
            <div>
               <p>{god.description}</p>
            </div>
         </div>
      </details>
   );
}

"use client";

import { useState } from "react";
import "./ImageWithFallback.css";

type ImageWithFallbackProps = {
   src: string | null | undefined;
   alt: string;
   fallbackSrc?: string;
   className?: string;
};

const DEFAULT_PLACEHOLDER = "/images/placeholder.png";

export function ImageWithFallback({
   src,
   alt,
   fallbackSrc = DEFAULT_PLACEHOLDER,
   className = "",
}: ImageWithFallbackProps) {
   const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
   const [status, setStatus] = useState<"loading" | "loaded" | "error">(
      "loading",
   );

   return (
      <div className={`img-wrapper ${className}`}>
         {status === "loading" && <div className="img-skeleton" />}
         <img
            src={imgSrc}
            alt={alt}
            className={`img-content ${status === "loaded" ? "img-content--visible" : ""}`}
            onLoad={() => setStatus("loaded")}
            onError={() => {
               if (status !== "error") {
                  setStatus("error");
                  setImgSrc(fallbackSrc);
               }
            }}
         />
      </div>
   );
}

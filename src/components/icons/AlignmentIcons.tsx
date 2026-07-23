export function SunIcon({ className }: { className?: string }) {
   return (
      <svg
         viewBox="0 0 24 24"
         width="16"
         height="16"
         className={className}
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
      >
         <circle cx="12" cy="12" r="4" />
         <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
   );
}

export function MoonIcon({ className }: { className?: string }) {
   return (
      <svg
         viewBox="0 0 24 24"
         width="16"
         height="16"
         className={className}
         fill="currentColor"
      >
         <path d="M20.354 15.354A9 9 0 018.646 3.646a9.003 9.003 0 1011.708 11.708z" />
      </svg>
   );
}

export function ScaleIcon({ className }: { className?: string }) {
   return (
      <svg
         viewBox="0 0 24 24"
         width="16"
         height="16"
         className={className}
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M12 3v18M7 21h10M5 7l4-1.5M5 7l-3 6a3 3 0 006 0l-3-6zM19 7l-4-1.5M19 7l-3 6a3 3 0 006 0l-3-6z" />
      </svg>
   );
}

export function PinIcon({ className }: { className?: string }) {
   return (
      <svg
         viewBox="0 0 24 24"
         width="14"
         height="14"
         className={className}
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
         <circle cx="12" cy="10" r="3" />
      </svg>
   );
}

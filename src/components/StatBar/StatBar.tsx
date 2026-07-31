export function StatBar({
   label,
   current,
   max,
   variant,
}: {
   label: string;
   current: number;
   max: number;
   variant: "hp" | "mana";
}) {
   const percent = max > 0 ? Math.min(100, (current / max) * 100) : 0;
   return (
      <div className="stat-bar">
         <div className="stat-bar-label">
            <span>{label}</span>
            {variant === "hp" && (
               <span>
                  {current} / {max}
               </span>
            )}
         </div>
         <div className="stat-bar-track">
            <div
               className={`stat-bar-fill stat-bar-fill--${variant}`}
               style={{ width: `${percent}%` }}
            />
         </div>
      </div>
   );
}

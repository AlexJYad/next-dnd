import type { Database } from "@/lib/database.types";
import "./character-sheet.css";

type Character = Database["public"]["Tables"]["characters"]["Row"];

export function CharacterSheet({ character }: { character: Character }) {
   const skills = (character.skills ?? {}) as Record<string, number>;

   return (
      <div className="character-sheet">
         <div className="character-sheet-header">
            {character.avatar_url && (
               <img
                  src={character.avatar_url}
                  alt={character.name ?? "Персонаж"}
                  className="character-avatar"
               />
            )}
            <div>
               <h1>{character.name}</h1>
               <p className="character-meta">
                  {character.age ?
                     `${character.age} лет`
                  :  "Возраст неизвестен"}
               </p>
            </div>
         </div>

         <div className="character-sheet-bars">
            <StatBar
               label="HP"
               current={character.current_hp}
               max={character.max_hp}
               variant="hp"
            />
            <StatBar
               label="Мана"
               current={character.current_mana}
               max={character.max_mana}
               variant="mana"
            />
         </div>

         <div className="character-sheet-grid">
            <InfoCard label="Уровень" value={character.level ?? 0} />
            <InfoCard label="Класс брони" value={character.armor_class} />
            <InfoCard label="Опыт" value={character.experience} />
            <InfoCard
               label="Бонус мастерства"
               value={2 + Math.floor((character.level ?? 0 - 1) / 4)}
            />
         </div>

         <fieldset className="character-sheet-section">
            <legend>Характеристики</legend>
            <div className="stats-grid">
               <StatBox label="Сила" value={character.strength} />
               <StatBox label="Ловкость" value={character.dexterity} />
               <StatBox label="Телосложение" value={character.constitution} />
               <StatBox label="Интелект" value={character.intelligence} />
               <StatBox label="Мудрость" value={character.wisdom} />
               <StatBox label="Харизма" value={character.charisma} />
            </div>
         </fieldset>

         {Object.keys(skills).length > 0 && (
            <fieldset className="character-sheet-section">
               <legend>Навыки</legend>
               <div className="skills-list">
                  {Object.entries(skills).map(([skill, bonus]) => (
                     <div key={skill} className="skill-row">
                        <span>{skill}</span>
                        <span>{bonus}</span>
                     </div>
                  ))}
               </div>
            </fieldset>
         )}

         <fieldset className="character-sheet-section">
            <legend>Кошелёк</legend>
            <div className="currency-display">
               <span className="coin-box">
                  <i className="bi bi-record-circle-fill cp coin"></i>
                  {character.copper}
               </span>
               <span className="coin-box">
                  <i className="bi bi-record-circle-fill sp coin"></i>
                  {character.silver}
               </span>
               <span className="coin-box">
                  <i className="bi bi-record-circle-fill gp coin"></i>
                  {character.gold}
               </span>
               <span className="coin-box">
                  <i className="bi bi-record-circle-fill ep coin"></i>
                  {character.electrum}
               </span>
               <span className="coin-box">
                  <i className="bi bi-record-circle-fill pp coin"></i>{" "}
                  {character.platinum}
               </span>
            </div>
         </fieldset>
      </div>
   );
}

function InfoCard({ label, value }: { label: string; value: number }) {
   return (
      <div className="info-card">
         <span className="info-card-label">{label}</span>
         <span className="info-card-value">{value}</span>
      </div>
   );
}

function StatBox({ label, value }: { label: string; value: number }) {
   const mod = Math.floor((value - 10) / 2);
   const modText = mod >= 0 ? `+${mod}` : `${mod}`;

   return (
      <div className="stat-box">
         <span className="stat-box-label">{label}</span>
         <span className="stat-box-mod">{modText}</span>
         <span className="stat-box-value">{value}</span>
      </div>
   );
}

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

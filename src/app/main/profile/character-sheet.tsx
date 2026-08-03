import type { Database } from "@/lib/database.types";
import { StatBar } from "@/components/StatBar/StatBar";
import "./character-sheet.css";
import { ImageWithFallback } from "@/components/ImageWithFallback/ImageWithFallback";

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
               <StatBox label="Интелекти" value={character.intelligence} />
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
               <span>
                  <i className="bi bi-record-circle-fill cp"></i>{" "}
                  {character.copper}
               </span>
               <span>
                  <i className="bi bi-record-circle-fill sp"></i>{" "}
                  {character.silver}
               </span>
               <span>
                  <i className="bi bi-record-circle-fill gp"></i>{" "}
                  {character.gold}
               </span>
               <span>
                  <i className="bi bi-record-circle-fill ep"></i>{" "}
                  {character.electrum}
               </span>
               <span>
                  <i className="bi bi-record-circle-fill pp"></i>{" "}
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
   return (
      <div className="stat-box">
         <span className="stat-box-label">{label}</span>
         <span className="stat-box-value">{value}</span>
         <span className="stat-box-value-mod">
            {Math.floor((value - 10) / 2)}
         </span>
      </div>
   );
}

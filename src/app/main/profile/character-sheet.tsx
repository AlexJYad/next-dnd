import type { Database } from "@/lib/database.types";
import { StatBar } from "@/components/StatBar/StatBar";
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
                  Уровень {character.level} ·{" "}
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
            <InfoCard label="Класс брони" value={character.armor_class} />
            <InfoCard label="Опыт" value={character.experience} />
         </div>

         <fieldset className="character-sheet-section">
            <legend>Характеристики</legend>
            <div className="stats-grid">
               <StatBox label="СИЛ" value={character.strength} />
               <StatBox label="ЛОВ" value={character.dexterity} />
               <StatBox label="ТЕЛ" value={character.constitution} />
               <StatBox label="ИНТ" value={character.intelligence} />
               <StatBox label="МУД" value={character.wisdom} />
               <StatBox label="ХАР" value={character.charisma} />
            </div>
         </fieldset>

         {Object.keys(skills).length > 0 && (
            <fieldset className="character-sheet-section">
               <legend>Навыки</legend>
               <div className="skills-list">
                  {Object.entries(skills).map(([skill, bonus]) => (
                     <div key={skill} className="skill-row">
                        <span>{skill}</span>
                        <span>+{bonus}</span>
                     </div>
                  ))}
               </div>
            </fieldset>
         )}

         <fieldset className="character-sheet-section">
            <legend>Кошелёк</legend>
            <div className="currency-display">
               <span>сp {character.copper}</span>
               <span>sp {character.silver}</span>
               <span>gp {character.gold}</span>
               <span>ep {character.electrum}</span>
               <span>pp {character.platinum}</span>
            </div>
         </fieldset>

         {character.backstory && (
            <fieldset className="character-sheet-section">
               <legend>Предыстория</legend>
               <p className="backstory-text">{character.backstory}</p>
            </fieldset>
         )}
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
      </div>
   );
}

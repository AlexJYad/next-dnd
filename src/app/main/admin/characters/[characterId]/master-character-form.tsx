"use client";

import { useState } from "react";
import { updateCharacterAsMaster } from "../actions";
import type { Database } from "@/lib/database.types";
import "./master-form.css";

type Character = Database["public"]["Tables"]["characters"]["Row"];

export function MasterCharacterForm({ character }: { character: Character }) {
   const [error, setError] = useState<string | null>(null);
   const updateWithId = updateCharacterAsMaster.bind(null, character.id);

   async function handleSubmit(formData: FormData) {
      setError(null);
      try {
         await updateWithId(formData);
      } catch (e) {
         setError(e instanceof Error ? e.message : "Something went wrong");
      }
   }

   return (
      <form action={handleSubmit} className="master-form">
         {error && <p className="error-message">{error}</p>}

         <label>
            Имя
            <input name="name" defaultValue={character.name ?? ""} required />
         </label>

         <label>
            Аватар (URL)
            <input
               name="avatar_url"
               defaultValue={character.avatar_url ?? ""}
            />
         </label>

         <label>
            Предыстория
            <textarea
               name="backstory"
               defaultValue={character.backstory ?? ""}
            />
         </label>

         <label>
            Заметки
            <textarea name="notes" defaultValue={character.notes ?? ""} />
         </label>

         <label>
            Возраст
            <input
               type="number"
               name="age"
               defaultValue={character.age ?? ""}
            />
         </label>

         <label>
            Уровень
            <input
               type="number"
               name="level"
               defaultValue={character.level ?? ""}
               required
            />
         </label>

         <label>
            Опыт
            <input
               type="number"
               name="experience"
               defaultValue={character.experience}
               required
            />
         </label>

         <label>
            Класс брони
            <input
               type="number"
               name="armor_class"
               defaultValue={character.armor_class}
               required
            />
         </label>

         <fieldset>
            <legend>Здоровье и мана</legend>
            <label>
               Текущее HP
               <input
                  type="number"
                  name="current_hp"
                  defaultValue={character.current_hp}
                  required
               />
            </label>
            <label>
               Максимум HP
               <input
                  type="number"
                  name="max_hp"
                  defaultValue={character.max_hp}
                  required
               />
            </label>
            <label>
               Текущая мана
               <input
                  type="number"
                  name="current_mana"
                  defaultValue={character.current_mana}
                  required
               />
            </label>
            <label>
               Максимум маны
               <input
                  type="number"
                  name="max_mana"
                  defaultValue={character.max_mana}
                  required
               />
            </label>
         </fieldset>

         <fieldset>
            <legend>Характеристики</legend>
            {(
               [
                  "strength",
                  "dexterity",
                  "constitution",
                  "intelligence",
                  "wisdom",
                  "charisma",
               ] as const
            ).map((stat) => (
               <label key={stat}>
                  {stat}
                  <input
                     type="number"
                     name={stat}
                     defaultValue={character[stat]}
                     required
                  />
               </label>
            ))}
         </fieldset>

         <fieldset>
            <legend>Валюта</legend>
            {(
               ["gold", "silver", "copper", "platinum", "electrum"] as const
            ).map((field) => (
               <label key={field}>
                  {field}
                  <input
                     type="number"
                     name={field}
                     defaultValue={character[field]}
                     required
                  />
               </label>
            ))}
         </fieldset>

         <label>
            Инвентарь (JSON)
            <textarea
               name="inventory"
               defaultValue={JSON.stringify(character.inventory, null, 2)}
            />
         </label>

         <label>
            Навыки (JSON)
            <textarea
               name="skills"
               defaultValue={JSON.stringify(character.skills, null, 2)}
            />
         </label>

         <button type="submit">Сохранить</button>
      </form>
   );
}

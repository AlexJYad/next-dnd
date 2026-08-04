"use client";

import { useState } from "react";
import { updateCharacterAsMaster } from "../actions";
import type { Database } from "@/lib/database.types";
import "./master-form.css";

type Character = Database["public"]["Tables"]["characters"]["Row"];

interface InventoryItem {
   name: string;
   quantity: number;
}

interface SkillEntry {
   name: string;
   value: string;
}

function parseInventory(raw: unknown): InventoryItem[] {
   if (!Array.isArray(raw)) return [];
   return raw
      .filter(
         (item): item is Record<string, unknown> =>
            typeof item === "object" && item !== null,
      )
      .map((item) => ({
         name: typeof item.name === "string" ? item.name : "",
         quantity: typeof item.quantity === "number" ? item.quantity : 0,
      }));
}

function parseSkills(raw: unknown): SkillEntry[] {
   if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      return [];
   }
   return Object.entries(raw as Record<string, unknown>).map(
      ([name, value]) => ({
         name,
         value: typeof value === "string" ? value : String(value ?? ""),
      }),
   );
}

export function MasterCharacterForm({ character }: { character: Character }) {
   const [error, setError] = useState<string | null>(null);
   const [inventory, setInventory] = useState<InventoryItem[]>(() =>
      parseInventory(character.inventory),
   );
   const [skills, setSkills] = useState<SkillEntry[]>(() =>
      parseSkills(character.skills),
   );

   const updateWithId = updateCharacterAsMaster.bind(null, character.id);

   async function handleSubmit(formData: FormData) {
      setError(null);
      try {
         await updateWithId(formData);
      } catch (e) {
         setError(e instanceof Error ? e.message : "Something went wrong");
      }
   }

   function updateInventoryItem(index: number, patch: Partial<InventoryItem>) {
      setInventory((prev) =>
         prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
      );
   }

   function removeInventoryItem(index: number) {
      setInventory((prev) => prev.filter((_, i) => i !== index));
   }

   function addInventoryItem() {
      setInventory((prev) => [...prev, { name: "", quantity: 1 }]);
   }

   function updateSkill(index: number, patch: Partial<SkillEntry>) {
      setSkills((prev) =>
         prev.map((skill, i) => (i === index ? { ...skill, ...patch } : skill)),
      );
   }

   function removeSkill(index: number) {
      setSkills((prev) => prev.filter((_, i) => i !== index));
   }

   function addSkill() {
      setSkills((prev) => [...prev, { name: "", value: "" }]);
   }

   const inventoryJson = JSON.stringify(inventory);
   const skillsJson = JSON.stringify(
      Object.fromEntries(skills.map((s) => [s.name, s.value])),
   );

   return (
      <form action={handleSubmit} className="master-form">
         {error && <p className="error-message">{error}</p>}

         <label style={{ display: "none" }}>
            Имя
            <input name="name" defaultValue={character.name ?? ""} required />
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

         <fieldset>
            <legend>Инвентарь</legend>
            <div className="editable-list">
               {inventory.map((item, index) => (
                  <div className="editable-row" key={index}>
                     <input
                        type="text"
                        placeholder="Название предмета"
                        value={item.name}
                        onChange={(e) =>
                           updateInventoryItem(index, { name: e.target.value })
                        }
                     />
                     <input
                        type="number"
                        min={0}
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) =>
                           updateInventoryItem(index, {
                              quantity: Number(e.target.value),
                           })
                        }
                     />
                     <button
                        type="button"
                        className="remove-row-button"
                        onClick={() => removeInventoryItem(index)}
                        aria-label="Удалить предмет"
                     >
                        ×
                     </button>
                  </div>
               ))}
            </div>
            <button
               type="button"
               className="add-row-button"
               onClick={addInventoryItem}
            >
               + Добавить предмет
            </button>
            <input type="hidden" name="inventory" value={inventoryJson} />
         </fieldset>

         <fieldset>
            <legend>Навыки</legend>
            <div className="editable-list">
               {skills.map((skill, index) => (
                  <div className="editable-row" key={index}>
                     <input
                        type="text"
                        placeholder="Название навыка"
                        value={skill.name}
                        onChange={(e) =>
                           updateSkill(index, { name: e.target.value })
                        }
                     />
                     <input
                        type="text"
                        placeholder="Значение"
                        className="skill-value-input"
                        value={skill.value}
                        onChange={(e) =>
                           updateSkill(index, { value: e.target.value })
                        }
                     />
                     <button
                        type="button"
                        className="remove-row-button"
                        onClick={() => removeSkill(index)}
                        aria-label="Удалить навык"
                     >
                        ×
                     </button>
                  </div>
               ))}
            </div>
            <button type="button" className="add-row-button" onClick={addSkill}>
               + Добавить навык
            </button>
            <input type="hidden" name="skills" value={skillsJson} />
         </fieldset>

         <button type="submit">Сохранить</button>
      </form>
   );
}

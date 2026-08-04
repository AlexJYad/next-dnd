"use client";

import { useState } from "react";
import { updateOwnCharacter } from "./actions";
import "./character-form.css";

type InventoryItem = { name: string; quantity: number };

type CharacterFormProps = {
   character: {
      name: string;
      notes: string | null;
      current_hp: number;
      max_hp: number;
      inventory: InventoryItem[];
      gold: number;
      silver: number;
      copper: number;
      platinum: number;
      electrum: number;
   };
};

export function CharacterForm({ character }: CharacterFormProps) {
   const [inventory, setInventory] = useState<InventoryItem[]>(
      character.inventory,
   );
   const [error, setError] = useState<string | null>(null);

   function addItem() {
      setInventory([...inventory, { name: "", quantity: 1 }]);
   }

   function removeItem(index: number) {
      setInventory(inventory.filter((_, i) => i !== index));
   }

   function updateItem(
      index: number,
      field: keyof InventoryItem,
      value: string | number,
   ) {
      const next = [...inventory];
      next[index] = { ...next[index], [field]: value };
      setInventory(next);
   }

   async function handleSubmit(formData: FormData) {
      setError(null);
      formData.set("inventory", JSON.stringify(inventory));
      try {
         await updateOwnCharacter(formData);
      } catch (e) {
         setError(e instanceof Error ? e.message : "Something went wrong");
      }
   }

   return (
      <form action={handleSubmit} className="character-form">
         {error && <p className="error-message">{error}</p>}

         <label style={{ display: "none" }}>
            <input name="name" defaultValue={character.name} required />
         </label>

         <label>
            Заметки
            <textarea name="notes" defaultValue={character.notes ?? ""} />
         </label>

         <label>
            Текущее HP (макс. {character.max_hp})
            <input
               type="number"
               name="current_hp"
               defaultValue={character.current_hp}
               min={0}
               max={character.max_hp}
               required
            />
         </label>

         <fieldset>
            <legend>Инвентарь</legend>
            <div className="inventory">
               {inventory.map((item, index) => (
                  <div key={index} className="inventory-item">
                     <input
                        type="text"
                        placeholder="Название"
                        value={item.name}
                        onChange={(e) =>
                           updateItem(index, "name", e.target.value)
                        }
                     />
                     <input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={(e) =>
                           updateItem(index, "quantity", Number(e.target.value))
                        }
                     />
                     <button type="button" onClick={() => removeItem(index)}>
                        ×
                     </button>
                  </div>
               ))}
               <button type="button" className="add-item-btn" onClick={addItem}>
                  + Добавить предмет
               </button>
            </div>
         </fieldset>

         <fieldset className="character-sheet-section">
            <legend>Потратить валюту</legend>
            <div className="currency-display currency-input-grid">
               {(
                  [
                     { field: "copper", cls: "cp" },
                     { field: "silver", cls: "sp" },
                     { field: "gold", cls: "gp" },
                     { field: "electrum", cls: "ep" },
                     { field: "platinum", cls: "pp" },
                  ] as const
               ).map(({ field, cls }) => (
                  <label key={field} className="coin-box">
                     <i className={`bi bi-record-circle-fill ${cls} coin`}></i>
                     <input
                        type="number"
                        name={`spend_${field}`}
                        min={0}
                        defaultValue={0}
                     />
                  </label>
               ))}
            </div>
         </fieldset>

         <button type="submit" className="submit-btn">
            Сохранить
         </button>
      </form>
   );
}

import cytoscape from "cytoscape";

export const elements: cytoscape.ElementDefinition[] = [
   //
   // ===== Светочь =====
   //
   {
      data: {
         id: "svetoch",
         label: "Светочь",
         type: "root",
      },
   },

   //
   // ===== Огонь =====
   //
   {
      data: {
         id: "plamya",
         label: "Сотворение\nпламени",
         school: "fire",
      },
   },
   {
      data: {
         id: "kontrol",
         label: "Контроль\nпламени",
         school: "fire",
      },
   },
   {
      data: {
         id: "koster",
         label: "Сотворение\nкостра",
         school: "fire",
      },
   },

   //
   // ===== Управление =====
   //
   {
      data: {
         id: "ogni",
         label: "Блуждающие\nогоньки",
         school: "control",
      },
   },

   {
      data: {
         id: "vspyshka",
         label: "Вспышка",
         school: "control",
      },
   },

   {
      data: {
         id: "vspyshka_z",
         label: "Вспышка\nс задержкой",
         school: "control",
      },
   },

   {
      data: {
         id: "snaryad",
         label: "Огненный\nснаряд",
         school: "projectile",
      },
   },

   {
      data: {
         id: "shar",
         label: "Огненный\nшар",
         school: "projectile",
      },
   },

   {
      data: {
         id: "sv_plamya",
         label: "Священное\nпламя",
         school: "combo",
      },
   },

   {
      data: {
         id: "luch",
         label: "Луч\nсвета",
         school: "control",
      },
   },

   {
      data: {
         id: "brizgi",
         label: "Сверкающие\nбрызги",
         school: "control",
      },
   },

   {
      data: {
         id: "mistika",
         label: "Мистический\nзаряд",
         school: "control",
      },
   },

   {
      data: {
         id: "hlyst",
         label: "Светохлыст",
         school: "control",
      },
   },

   {
      data: {
         id: "kinzhal",
         label: "Кинжал\nсвета",
         school: "control",
      },
   },

   {
      data: {
         id: "mech",
         label: "Меч",
         school: "control",
      },
   },

   {
      data: {
         id: "molot",
         label: "Молот",
         school: "combo",
      },
   },

   {
      data: {
         id: "tancy",
         label: "Танцующие\nкинжалы",
         school: "combo",
      },
   },

   //
   // ===== Аура =====
   //
   {
      data: {
         id: "light_flash",
         label: "Вспышка\nсвета",
         school: "aura",
      },
   },

   {
      data: {
         id: "stigmum_a",
         label: "Стигмум\nАура",
         school: "aura",
      },
   },

   {
      data: {
         id: "stigmum_s",
         label: "Стигмум\nСимпла",
         school: "shield",
      },
   },

   {
      data: {
         id: "stigmum_o",
         label: "Стигмум\nОниум",
         school: "shield",
      },
   },

   {
      data: {
         id: "stigmum_b",
         label: "Стигмум\nКупол",
         school: "shield",
      },
   },

   //
   // ===== Связи =====
   //

   { data: { source: "svetoch", target: "plamya" } },
   { data: { source: "svetoch", target: "ogni" } },
   { data: { source: "svetoch", target: "light_flash" } },

   { data: { source: "plamya", target: "kontrol" } },
   { data: { source: "kontrol", target: "koster" } },

   { data: { source: "ogni", target: "vspyshka" } },
   { data: { source: "vspyshka", target: "vspyshka_z" } },

   { data: { source: "vspyshka", target: "snaryad" } },
   { data: { source: "snaryad", target: "shar" } },

   { data: { source: "ogni", target: "luch" } },
   { data: { source: "luch", target: "brizgi" } },
   { data: { source: "brizgi", target: "mistika" } },

   { data: { source: "ogni", target: "hlyst" } },
   { data: { source: "hlyst", target: "kinzhal" } },
   { data: { source: "kinzhal", target: "mech" } },

   { data: { source: "mech", target: "molot" } },
   { data: { source: "vspyshka_z", target: "molot" } },

   { data: { source: "kinzhal", target: "tancy" } },
   { data: { source: "light_flash", target: "tancy" } },

   { data: { source: "light_flash", target: "sv_plamya" } },
   { data: { source: "vspyshka", target: "sv_plamya" } },

   { data: { source: "koster", target: "snaryad" } },

   { data: { source: "light_flash", target: "stigmum_a" } },

   { data: { source: "stigmum_a", target: "stigmum_s" } },
   { data: { source: "stigmum_a", target: "stigmum_o" } },
   { data: { source: "stigmum_a", target: "stigmum_b" } },
];

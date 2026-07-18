"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

import { elements } from "@/data/skills";

export default function SkillTree() {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!containerRef.current) return;

      const cy = cytoscape({
         container: containerRef.current,

         elements,

         style: [
            {
               selector: "node",
               style: {
                  label: "data(label)",

                  width: 70,
                  height: 70,

                  shape: "roundrectangle",

                  "background-color": "#2563eb",

                  color: "#ffffff",

                  "text-wrap": "wrap",
                  "text-max-width": "60",

                  "text-valign": "center",
                  "text-halign": "center",

                  "font-size": 12,

                  "border-width": 2,
                  "border-color": "#ffffff",
               },
            },

            {
               selector: "edge",
               style: {
                  width: 2,

                  "line-color": "#94a3b8",

                  "target-arrow-color": "#94a3b8",
                  "target-arrow-shape": "triangle",

                  "curve-style": "bezier",
               },
            },
         ],

         layout: {
            name: "breadthfirst",
            directed: true,
            spacingFactor: 1.5,
            padding: 50,
         },

         wheelSensitivity: 0.2,
      });

      return () => cy.destroy();
   }, []);

   return (
      <div
         ref={containerRef}
         className="w-full h-[700px] border border-gray-300 dark:border-gray-700 rounded-lg"
      />
   );
}

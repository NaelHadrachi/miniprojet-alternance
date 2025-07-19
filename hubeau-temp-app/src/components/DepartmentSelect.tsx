"use client";
import React from "react";

const departments = [
  { code: "33", name: "Gironde" },           // Garonne, Dordogne
  { code: "69", name: "Rhône" },             // Rhône, Saône
  { code: "13", name: "Bouches-du-Rhône" },  // Durance, Rhône
  { code: "31", name: "Haute-Garonne" },     // Garonne
  { code: "38", name: "Isère" },             // Isère, Drac
  { code: "73", name: "Savoie" },            // Isère, Arc
  { code: "74", name: "Haute-Savoie" },      // Arve, Dranse
  { code: "67", name: "Bas-Rhin" },          // Rhin, Ill
  { code: "68", name: "Haut-Rhin" },         // Rhin, Thur
  { code: "35", name: "Ille-et-Vilaine" },   // Vilaine
  { code: "56", name: "Morbihan" },          // Blavet, Vilaine
  { code: "44", name: "Loire-Atlantique" },  // Loire
];

export default function DepartmentSelect({ onChange }: { onChange: (code: string) => void }) {
  return (
    <select
      className="p-2 border rounded w-full"
      onChange={(e) => onChange(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>Sélectionnez un département</option>
      {departments.map((dep) => (
        <option key={dep.code} value={dep.code}>{dep.name}</option>
      ))}
    </select>
  );
}

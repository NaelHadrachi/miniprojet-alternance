"use client";
import React from "react";

interface Props {
  records: {
    code_station: string;
    libelle_station: string;
    date_mesure_temp: string;
    heure_mesure_temp: string;
    resultat: number;
    symbole_unite: string;
  }[];
}

const TemperatureTable: React.FC<Props> = ({ records }) => {
  return (
    <table className="min-w-full border border-black-300">
      <thead>
        <tr className="bg-black-100">
          <th className="border px-2 py-1">Station</th>
          <th className="border px-2 py-1">Date</th>
          <th className="border px-2 py-1">Heure</th>
          <th className="border px-2 py-1">Température</th>
          <th className="border px-2 py-1">Unité</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, idx) => (
          <tr key={idx}>
            <td className="border px-2 py-1">{record.libelle_station}</td>
            <td className="border px-2 py-1">{record.date_mesure_temp}</td>
            <td className="border px-2 py-1">{record.heure_mesure_temp}</td>
            <td className="border px-2 py-1">{record.resultat}</td>
            <td className="border px-2 py-1">{record.symbole_unite}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TemperatureTable;

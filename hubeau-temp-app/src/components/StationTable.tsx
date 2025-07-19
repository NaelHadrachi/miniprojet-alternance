"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StationTable({ stations }: { stations: any[] }) {
  const [latestTemps, setLatestTemps] = useState<any>({});

  useEffect(() => {
    stations.forEach((station) => {
      axios.get(` https://miniprojet-alternance.onrender.com/api/latest-temperature?stationCode=${station.code_station}`)
        .then(res => setLatestTemps((prev: any) => ({ ...prev, [station.code_station]: res.data })))
        .catch(() => console.log("Erreur température"));
    });
  }, [stations]);

  return (
    <table className="w-full border mt-4">
      <thead className="bg-blue-600 text-black">
        <tr>
          <th className="p-2">Cours d'eau</th>
          <th className="p-2">Station</th>
          <th className="p-2">Température</th>
          <th className="p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {stations.map(station => {
          const temp = latestTemps[station.code_station];
          return (
            <tr key={station.code_station} className="border-t">
              <td className="p-2">{station.libelle_cours_eau}</td>
              <td className="p-2">{station.code_station} - {station.libelle_station}</td>
              <td className="p-2">{temp ? `${temp.resultat} °C` : "-"}</td>
              <td className="p-2">{temp ? `${temp.date_mesure_temp} ${temp.heure_mesure_temp}` : "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

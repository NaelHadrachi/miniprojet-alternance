"use client";
import React, { useState } from "react";
import TemperatureChart from "./TemperatureChart";

type Station = {
  code_station: string;
  libelle_station: string;
  libelle_cours_eau: string;
  derniere_temperature?: number;
  date_derniere_mesure?: string;
};

export default function StationCard({ station }: { station: Station }) {
  const [lastTemperature, setLastTemperature] = useState<number | null>(null);
  const [lastMeasureDate, setLastMeasureDate] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-semibold">{station.libelle_cours_eau}</h2>
      <p className="text-black">Station : {station.code_station} - {station.libelle_station}</p>
      <p className="text-black mt-1">
        🌡 Température la plus récente : <span className="font-medium">{lastTemperature ?? "N/A"} °C</span>
      </p>
      <p className="text-black text-sm">
        Date mesure : {lastMeasureDate ?? station.date_derniere_mesure ?? "N/A"}
      </p>
      <TemperatureChart 
        stationCode={station.code_station} 
        onLastTemperature={setLastTemperature} 
        onLastMeasureDate={setLastMeasureDate} 
      />
    </div>
  );
}

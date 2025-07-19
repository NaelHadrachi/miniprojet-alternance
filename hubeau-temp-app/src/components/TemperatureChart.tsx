"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function TemperatureChart({ stationCode, onLastTemperature, onLastMeasureDate }: { stationCode: string; onLastTemperature?: (temperature: number | null) => void; onLastMeasureDate?: (date: string | null) => void }) {
  const [data, setData] = useState<any[]>([]);
  const [lastTemperature, setLastTemperature] = useState<number | null>(null);
  const [lastMeasureDate, setLastMeasureDate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Calculer la date 7 jours avant aujourd'hui
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const dateMin = sevenDaysAgo.toISOString().split("T")[0];

        const res = await axios.get(
          "https://hubeau.eaufrance.fr/api/v1/temperature/chronique",
          {
            params: {
              code_station: stationCode,
              date_debut_mesure_temp: dateMin,
              size: 500,
              sort: "desc"
            }
          }
        );

        // Grouper par jour
        const grouped: Record<string, number[]> = {};
        for (const item of res.data.data) {
          const day = item.date_mesure_temp.split("T")[0];
          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(item.resultat);
        }

        // Construire le tableau : moyenne par jour
        const finalData = Object.entries(grouped).map(([date, values]) => ({
          date,
          temperature: parseFloat(
            (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
          )
        }));

        // Trier par date ascendante
        finalData.sort((a, b) => a.date.localeCompare(b.date));

        setData(finalData);

        // Stocker la dernière température et la date de mesure
        if (finalData.length > 0) {
          const lastTemp = finalData[finalData.length - 1].temperature;
          const lastDate = finalData[finalData.length - 1].date;
          setLastTemperature(lastTemp);
          setLastMeasureDate(lastDate);
          if (onLastTemperature) {
            onLastTemperature(lastTemp);
          }
          if (onLastMeasureDate) {
            onLastMeasureDate(lastDate);
          }
        } else {
          if (onLastTemperature) {
            onLastTemperature(null);
          }
          if (onLastMeasureDate) {
            onLastMeasureDate(null);
          }
        }

        //console.log("Données graphiques chargées", finalData);
      } catch (e) {
        console.error("Erreur chargement graphique", e);
        if (onLastTemperature) {
          onLastTemperature(null);
        }
        if (onLastMeasureDate) {
          onLastMeasureDate(null);
        }
      }
    }
    fetchData();
  }, [stationCode, onLastTemperature, onLastMeasureDate]);

  if (!data.length)
    return <p className="text-center text-black text-sm">Chargement graphique...</p>;

  return (
    <div className="mt-8">
      <h3 className="text-sm text-black font-medium mb-1">
        Évolution températures (7 derniers jours)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={10} />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

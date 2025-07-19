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
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#d946ef"];

type Station = {
  code_station: string;
  libelle_station: string;
  libelle_cours_eau: string;
};

type Props = {
  stations: Station[];
};

export default function ComparativeChart({ stations }: Props) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stations.length === 0) return;

    setLoading(true);
    setError(null);

    Promise.all(
      stations.map(station =>
        axios
          .get("https://hubeau.eaufrance.fr/api/v1/temperature/chronique", {
            params: {
              code_station: station.code_station,
              date_debut_mesure_temp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              size: 500,
              sort: "desc"
            }
          })
          .then(res => ({
            code: station.code_station,
            name: station.libelle_cours_eau,
            data: res.data.data
          }))
          .catch(err => {
            console.error(`Erreur chargement station ${station.code_station}:`, err);
            return { code: station.code_station, name: station.libelle_cours_eau, data: [] };
          })
      )
    )
      .then(results => {
        const merged: Record<string, any> = {};

        results.forEach(({ code, data }) => {
          data.forEach((d: { date_mesure_temp: string; resultat: number }) => {
            const date = d.date_mesure_temp.split("T")[0];
            if (!merged[date]) merged[date] = { date };
            merged[date][code] = d.resultat;
          });
        });

        const sortedData = Object.values(merged).sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setChartData(sortedData);
      })
      .catch(err => {
        console.error("Erreur chargement du comparatif:", err);
        setError("Erreur lors du chargement des données.");
      })
      .finally(() => setLoading(false));
  }, [stations]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Comparatif des températures pour les cours d'eau</h2>
      {loading && <p className="text-black">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && chartData.length === 0 && (
        <p className="text-black">Aucune donnée disponible pour ces stations.</p>
      )}
      {!loading && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit="°C" />
            <Tooltip />
            <Legend />
            {stations.map((station, idx) => (
              <Line
                key={station.code_station}
                type="monotone"
                dataKey={station.code_station}
                name={station.libelle_cours_eau}
                stroke={COLORS[idx % COLORS.length]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

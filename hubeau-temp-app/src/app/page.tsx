"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartmentSelect from "../components/DepartmentSelect";
import StationCard from "../components/StationCard";
import ComparativeChart from "../components/ComparativeChart";

export default function Home() {
  const [department, setDepartment] = useState<string>("");
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (department) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/api/stations?department=${department}`)
        .then(res => setStations(res.data))
        .catch(() => alert("Erreur lors du chargement des stations"))
        .finally(() => setLoading(false));
    }
  }, [department]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            🌊 Dashboard Températures des cours d'eau Nael alternance ! 
          </h1>
          <p className="text-black text-lg">Suivi et comparatif en temps réel</p>
        </header>

        <div className="flex justify-center">
          <DepartmentSelect onChange={setDepartment} />
        </div>

        {loading && (
          <p className="text-center text-black mt-4 animate-pulse">Chargement...</p>
        )}

        {!loading && department && stations.length === 0 && (
          <p className="text-center text-black mt-4">
            Aucune station trouvée pour ce département.
          </p>
        )}

        {stations.length > 0 && (
          <section className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
              📊 <span className="ml-2">Comparatif général</span>
            </h2>
            <ComparativeChart stations={stations} />
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold text-black mb-4">
            🗺️ Stations disponibles
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stations.map(station => (
              <StationCard key={station.code_station} station={station} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

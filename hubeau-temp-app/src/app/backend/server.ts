// backend/server.ts
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.get("/api/stations", async (req, res) => {
  const { department } = req.query;
  try {
    const stations = await axios.get(
      `https://hubeau.eaufrance.fr/api/v1/temperature/station`,
      {
        params: { code_departement: department, size: 50 },
      }
    );
    res.json(stations.data.data);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des stations" });
  }
});

app.get("/api/latest-temperature", async (req, res) => {
  const { stationCode } = req.query;
  try {
    const response = await axios.get(
      `https://hubeau.eaufrance.fr/api/v1/temperature/chronique`,
      {
        params: { code_station: stationCode, size: 500, sort: "date_mesure desc" },
      }
    );
    res.json(response.data.data[0]);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la température" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

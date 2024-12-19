import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { fetchReports } from "../../controllers/firebase/auth";

const MapScreen = () => {
  const [heatmapLayer, setHeatmapLayer] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch heatmap data (mocked here)
    fetchReports().then((data)=>{
      setHeatmapLayer(data)
    })
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map only if it hasn't been initialized
      mapRef.current = L.map("map").setView([12.9757, 77.7496], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    let points = []
    if(heatmapLayer){
      console.log(heatmapLayer)
      points = heatmapLayer.map((p) => [p[0], p[1], 15]);
    }
    const heatLayer = L.heatLayer(points).addTo(mapRef.current);

    return () => {
      // Clean up the heat layer when the component unmounts or heatmapLayer changes
      mapRef.current.removeLayer(heatLayer);
    };
  }, [heatmapLayer]);

  return <div id="map" style={{ height: "100%", width: "100%"}}></div>;
};

export default MapScreen;
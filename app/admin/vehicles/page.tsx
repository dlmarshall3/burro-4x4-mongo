"use client";

import { useEffect, useState } from "react";
import VehicleCard from "../../../components/VehicleCard";

interface Vehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
  clientId: string;
  clientName: string;
}

export default function UpdateVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("/api/getAllVehicles");
        if (response.ok) {
          const jsonVehicles = await response.json();
          setVehicles(jsonVehicles);
        } else {
          console.error("Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicleData={vehicle} />
        ))
      ) : (
        <p>Loading vehicles...</p>
      )}
    </div>
  );
}

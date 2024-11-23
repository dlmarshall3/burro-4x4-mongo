"use client";

import { useEffect, useState } from "react";
import VehicleCard from "../../../components/VehicleCard";

interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  image_url: string;
  client: string;
}

export default function UpdateVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("/api/updateVehicle");
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
    <div>
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicleData={vehicle} />
        ))
      ) : (
        <p>Loading vehicles...</p>
      )}
    </div>
  );
}

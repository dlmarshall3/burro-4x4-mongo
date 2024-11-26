"use client";

import { useEffect, useState } from "react";

import VehicleCard from "../../../components/VehicleCard";
import Loader from "@/components/Loader";

interface Vehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
  clientId: string;
  clientName: string;
}

const ERROR = "Unable to fetch vehicles. Please try again.";

export default function UpdateVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("/api/getAllVehicles");
        if (response.ok) {
          const jsonVehicles = await response.json();
          setVehicles(jsonVehicles);
        } else {
          setErrorMessage(ERROR);
        }
      } catch (error) {
        setErrorMessage(ERROR);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col flex-wrap">
      <h2 className="mb-4 text-3xl">Vehicle dashboard</h2>
      {vehicles.length > 0 && !errorMessage ? (
        vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicleData={vehicle} />
        ))
      ) : (
        <Loader />
      )}
      {errorMessage && <h4 className="text-lg text-red-500">{errorMessage}</h4>}
    </div>
  );
}

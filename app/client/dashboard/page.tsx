"use client";

import Loader from "@/components/Loader";
import VehicleCard from "@/components/VehicleCard";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Vehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
  clientId: string;
  clientName: string;
}

export default function ClientDashboard() {
  const { data: session } = useSession();
  const clientId = session?.user.id;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (clientId) {
      fetchVehicles();
    }

    async function fetchVehicles() {
      try {
        const response = await fetch(
          `/api/getAllClientVehicles?clientId=${clientId}`,
        );
        if (response.ok) {
          const jsonVehicles = await response.json();
          setVehicles(jsonVehicles);
        } else {
          setErrorMessage(
            "There was an error retrieving your vehicles. Please try again.",
          );
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("No vehicles found.");
      }
    }
  }, [clientId]);

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

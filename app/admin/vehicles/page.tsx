"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import VehicleCard from "../../../components/VehicleCard";
import Loader from "@/components/Loader";

type Vehicle = {
  _id: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
  clientId: string;
  clientName: string;
};

export default function UpdateVehicle() {
  const { data: session } = useSession();
  const isAdmin = session?.user.admin;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("/api/getAllVehicles");
        if (response.ok) {
          const jsonVehicles = await response.json();
          setVehicles(jsonVehicles);
        } else {
          throw new Error("Unable to fetch vehicles. Please try again.");
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "There was an unknown error. Please try again.";
        setErrorMessage(errorMsg);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col flex-wrap">
      <h2 className="mb-4 text-3xl">Vehicle dashboard</h2>
      {vehicles.length > 0 && !errorMessage ? (
        vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicleData={vehicle}
            isAdmin={isAdmin ?? false}
          />
        ))
      ) : (
        <Loader />
      )}
      {errorMessage && <h4 className="text-lg text-red-500">{errorMessage}</h4>}
    </div>
  );
}

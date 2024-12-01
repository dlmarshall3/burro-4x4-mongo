"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

import VehicleUpdateCard from "@/components/UpdateCard";
import Loader from "@/components/Loader";

type Vehicle = {
  vehicle: {
    year: string;
    make: string;
    model: string;
    imageUrl: string;
  };
  vehicleUpdates: [VehicleUpdate];
};

type VehicleUpdate = {
  _id: string;
  update: string;
  date: string;
  imageUrls: [string];
};

export default function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vehicleName, setVehicleName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(`/api/getVehicleUpdateData?id=${id}`);
        const reqVehicle = await response.json();
        if (reqVehicle) {
          setVehicle(reqVehicle);
          const { year, make, model } = reqVehicle.vehicle;
          setVehicleName(year + " " + make + " " + model);
        } else {
          throw new Error(
            "There was an error loading the vehicle. Please try again.",
          );
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "There was an unknown error. Please try again.";
        setErrorMessage(errorMsg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVehicleData();
  }, []);

  return (
    <div>
      {vehicle && !errorMessage && !isLoading && (
        <>
          <h2 className="mb-4 text-2xl underline">{vehicleName}</h2>
          <Image
            src={vehicle.vehicle.imageUrl}
            alt="Vehicle Image"
            width={400}
            height={100}
            className="mb-4"
          />
          <div>
            {vehicle.vehicleUpdates.map((update) => (
              <VehicleUpdateCard update={update} key={update._id} />
            ))}
          </div>
        </>
      )}
      {isLoading && <Loader />}
      {errorMessage && (
        <>
          {errorMessage && (
            <h4 className="text-lg text-red-500">{errorMessage}</h4>
          )}
        </>
      )}
    </div>
  );
}

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
}

type VehicleUpdate = {
  _id: string;
  update: string;
  date: string;
  imageUrls: [string];
}

export default function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vehicleName, setVehicleName] = useState("");

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(`/api/getVehicleUpdateData?id=${id}`);
        const reqVehicle = await response.json();
        if (reqVehicle) {
          setVehicle(reqVehicle);
          const { year, make, model } = reqVehicle.vehicle;
          setVehicleName(year + " " + make + " " + model);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchVehicleData();
  }, []);

  return (
    <div>
      {vehicle ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
}

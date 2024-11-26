"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

import VehicleUpdateCard from "@/components/UpdateCard";
import Loader from "@/components/Loader";

interface Vehicle {
  vehicle: {
    year: string;
    make: string;
    model: string;
    imageUrl: string;
  };
  vehicleUpdates: [VehicleUpdate];
}

interface VehicleUpdate {
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

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(`/api/getVehicleUpdateData?id=${id}`);
        const reqVehicle = await response.json();
        if (reqVehicle) {
          setVehicle(reqVehicle);
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
          <h2 className="mb-4 text-2xl underline">
            {vehicle.vehicle.year} {vehicle.vehicle.make}{" "}
            {vehicle.vehicle.model}
          </h2>
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

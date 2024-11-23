"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

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
  const [vehicle, setVehicle] = useState<Vehicle>();

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
      <h2>
        {vehicle?.vehicle?.year} {vehicle?.vehicle.make}{" "}
        {vehicle?.vehicle.model}
      </h2>
      <Image
        src={vehicle?.vehicle.imageUrl}
        alt={"a"}
        width={400}
        height={100}
      />
      <div>
        {vehicle?.vehicleUpdates.map((update) => (
          <div key={update._id}>
            <h1>{update.date}</h1>
            <p>{update.update}</p>
            {update.imageUrls.map((url) => (
              <Image src={url} key={url} alt={"b"} height={100} width={200} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

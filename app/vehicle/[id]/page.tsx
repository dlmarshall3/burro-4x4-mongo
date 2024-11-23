"use client";

import { use, useEffect, useState } from "react";

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
      } catch (error) {}
    }

    fetchVehicleData();
  }, []);

  return (
    <div>
      <h2>
        {vehicle?.vehicle?.year} {vehicle?.vehicle.make}{" "}
        {vehicle?.vehicle.model}
      </h2>
      <img src={vehicle?.vehicle.imageUrl} />
      <div>
        {vehicle?.vehicleUpdates.map((update) => (
          <div key={update._id}>
            <h1>{update.date}</h1>
            <p>{update.update}</p>
            {update.imageUrls.map((url) => (
              <img src={url} key={url} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

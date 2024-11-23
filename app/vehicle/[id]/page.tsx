"use client";

import { use, useEffect, useState } from "react";

interface Vehicle {
  year: string;
  make: string;
  model: string;
  imageUrl: string;
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
        const response = await fetch(`/api/getVehicleData?id=${id}`);
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
        {vehicle?.year} {vehicle?.make} {vehicle?.model}
      </h2>
      <img src={vehicle?.imageUrl} />
    </div>
  );
}

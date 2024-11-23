"use client";

import { ChangeEvent, use, useEffect, useState } from "react";

interface Vehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
  clientName: string;
  clientId: string;
}

interface VehicleUpdate {
  update: string;
  files: File[] | null;
}

export default function UpdateVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<Vehicle>({
    _id: "",
    year: "",
    make: "",
    model: "",
    imageUrl: "",
    clientName: "",
    clientId: "",
  });
  const [vehicleUpdate, setVehicleUpdate] = useState<VehicleUpdate>({
    update: "",
    files: [],
  });

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

  function handleUpdateChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setVehicleUpdate({ ...vehicleUpdate, update: event.target.value });
  }

  function onFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setVehicleUpdate({ ...vehicleUpdate, files: Array.from(input.files) });
    }
  }

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { update, files } = vehicleUpdate;

    const date = new Date().toLocaleString().split(",")[0];

    if (!update || !date) {
      alert("form bad");
    }

    const formData = new FormData();
    formData.append("update", update);
    formData.append("date", date);
    files?.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("vehicleId", vehicle?._id);
    formData.append("clientId", vehicle?.clientId);

    try {
      const response = await fetch("/api/updateVehicle", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // success
      } else {
        alert("boopo");
      }
    } catch (error) {}
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex flex-col">
        <h2>
          {vehicle?.year} {vehicle?.make} {vehicle?.model}
        </h2>
        <h2>{vehicle?.clientName}</h2>

        <textarea
          name=""
          id=""
          placeholder="Update..."
          onChange={handleUpdateChange}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onFileSelection}
        />
        <button className="bg-green-500 py-2 px-4 rounded-full w-1/4 mb-4">
          Update Vehicle
        </button>
      </div>
    </form>
  );
}

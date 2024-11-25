"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface VehicleData {
  year: string;
  make: string;
  model: string;
  clientId: string;
  clientName: string;
  file: File | null;
}

interface User {
  _id: string;
  name: string;
}

export default function AddVehiclePage() {
  const { data: session } = useSession();

  if (session && !session.user.admin) {
    redirect("/");
  }

  const [newVehicle, setNewVehicle] = useState<VehicleData>({
    year: "",
    make: "",
    model: "",
    clientId: "",
    clientName: "",
    file: null,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function getNonAdminUsers() {
      try {
        const response = await fetch("/api/getAllUsers");
        if (response.ok) {
          const users = await response.json();
          setUsers(users);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getNonAdminUsers();
  }, []);

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { year, make, model, clientId, file, clientName } = newVehicle;

    if (!year || !make || !model || !clientId || !file || !clientName) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("year", year);
    formData.append("make", make);
    formData.append("model", model);
    formData.append("clientId", clientId);
    formData.append("clientName", clientName);
    formData.append("file", file);

    const response = await fetch("/api/addVehicle", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccessMessage("Vehicle added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setErrorMessage("");
      setNewVehicle({
        year: "",
        make: "",
        model: "",
        clientId: "",
        clientName: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      const error = await response.text();
      setErrorMessage(error || "An error occurred while adding the vehicle.");
    }
  }

  function onFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setNewVehicle({ ...newVehicle, file: input.files[0] });
    }
  }

  function onClientSelection(e: ChangeEvent<HTMLSelectElement>) {
    const selectedUser = users.find((user) => user._id === e.target.value);
    if (selectedUser) {
      setNewVehicle({
        ...newVehicle,
        clientId: selectedUser._id,
        clientName: selectedUser.name,
      });
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex flex-col rounded-lg">
        <h2 className="mb-4 text-3xl">Add New Vehicle</h2>
        <div className="mb-4 flex flex-col">
          <input
            value={newVehicle.year}
            required
            type="text"
            placeholder="Year"
            className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/4"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, year: e.target.value })
            }
          />
          <input
            value={newVehicle.make}
            required
            type="text"
            placeholder="Make"
            className="border-1 border-gray mb-2 w-full sm:w-1/4 rounded-md border px-2"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, make: e.target.value })
            }
          />
          <input
            value={newVehicle.model}
            required
            type="text"
            placeholder="Model"
            className="border-1 border-gray mb-2 w-full sm:w-1/4 rounded-md border px-2"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, model: e.target.value })
            }
          />
          <select
            onChange={onClientSelection}
            value={newVehicle.clientId}
            className="border-1 border-gray mb-2 w-full sm:w-1/4 rounded-md border px-2"
          >
            <option value="">Select Client</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelection}
            ref={fileInputRef}
          />
        </div>
        <button className="mb-2 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black sm:w-1/2 lg:w-1/3">
          + New Vehicle
        </button>
        {errorMessage && (
          <h4 className="text-lg text-red-500">{errorMessage}</h4>
        )}
        {successMessage && (
          <h4 className="text-lg text-green-500">{successMessage}</h4>
        )}
      </div>
    </form>
  );
}

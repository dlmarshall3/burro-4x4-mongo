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
        //
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
      <div className="p-8 rounded-lg flex flex-col">
        <h2 className="text-3xl mb-4">Add New Vehicle</h2>
        <div className="flex flex-col mb-4">
          <input
            value={newVehicle.year}
            required
            type="text"
            placeholder="Year"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, year: e.target.value })
            }
          />
          <input
            value={newVehicle.make}
            required
            type="text"
            placeholder="Make"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, make: e.target.value })
            }
          />
          <input
            value={newVehicle.model}
            required
            type="text"
            placeholder="Model"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, model: e.target.value })
            }
          />
          <select onChange={onClientSelection} value={newVehicle.clientId}>
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
        <button className="bg-green-500 py-2 px-4 rounded-full w-1/4 mb-4">
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

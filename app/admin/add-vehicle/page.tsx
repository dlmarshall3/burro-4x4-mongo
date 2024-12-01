"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import Loader from "../../../components/Loader";

type VehicleData = {
  year: string;
  make: string;
  model: string;
  clientId: string;
  clientName: string;
  file: File | null;
};

type Users = {
  _id: string;
  name: string;
};

export default function AddVehiclePage() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user.admin;

  const [newVehicle, setNewVehicle] = useState<VehicleData>({
    year: "",
    make: "",
    model: "",
    clientId: "",
    clientName: "",
    file: null,
  });
  const [users, setUsers] = useState<[Users]>([
    {
      _id: "",
      name: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (!isAdmin) {
      redirect("../client/dashboard");
    }
  }, [isAdmin, status]);

  useEffect(() => {
    async function getNonAdminUsers() {
      try {
        const response = await fetch("/api/getAllUsers");
        if (response.ok) {
          const users = await response.json();
          setUsers(users);
        } else {
          throw new Error(
            "There was an error fetching the clients. Please try again.",
          );
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "There was an unknown error. Please try again.";
        setErrorMessage(errorMsg);
      }
    }

    getNonAdminUsers();
  }, []);

  async function onFormSubmission(event: FormEvent<HTMLFormElement>) {
    setFormSubmitted(true);
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

    try {
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
        throw new Error(
          "There was an error creating the vehicle. Please try again.",
        );
      }
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "There was an unknown error. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setFormSubmitted(false);
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
    <>
      {isAdmin && (
        <form onSubmit={onFormSubmission}>
          <div className="flex flex-col rounded-lg">
            <h2 className="mb-4 text-3xl">Add New Vehicle</h2>
            <div className="mb-4 flex flex-col">
              <input
                value={newVehicle.year}
                required
                type="text"
                placeholder="Year"
                className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, year: e.target.value })
                }
              />
              <input
                value={newVehicle.make}
                required
                type="text"
                placeholder="Make"
                className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, make: e.target.value })
                }
              />
              <input
                value={newVehicle.model}
                required
                type="text"
                placeholder="Model"
                className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, model: e.target.value })
                }
              />
              <select
                onChange={onClientSelection}
                value={newVehicle.clientId}
                className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
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

            {!formSubmitted && (
              <button className="mb-2 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3">
                + New Vehicle
              </button>
            )}
            {errorMessage && !formSubmitted && (
              <h4 className="text-lg text-red-500">{errorMessage}</h4>
            )}
            {successMessage && !formSubmitted && (
              <h4 className="text-lg text-green-500">{successMessage}</h4>
            )}
            {formSubmitted && <Loader />}
          </div>
        </form>
      )}
    </>
  );
}

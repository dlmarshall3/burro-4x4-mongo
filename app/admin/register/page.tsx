"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Loader from "@/components/Loader";

type User = {
  name: string;
  email: string;
};

export default function Register() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user.admin;

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (!isAdmin) {
      redirect("../client/dashboard");
    }
  }, [isAdmin, status]);

  async function onFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
  
    const { name, email } = user;

    if (!name || !email) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    try {
      const response = await fetch("/api/createClient", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setErrorMessage("");
        setSuccessMessage("Client added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          setUser({ name: "", email: "" });
        }, 3000);
      } else {
        throw new Error(
          "There was an error creating the client. Please try again.",
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

  return (
    <>
      {isAdmin && (
        <form
          onSubmit={onFormSubmission}
          className="flex w-3/4 max-w-[400px] flex-col"
        >
          <h1 className="mb-4 w-full text-2xl font-bold">Register</h1>
          <div className="mb-4 flex flex-col">
            <label className="w-full text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="w-full text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {!formSubmitted && (
            <button className="mb-2 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3">
              Create
            </button>
          )}
          {errorMessage && !formSubmitted && (
            <h4 className="text-lg text-red-500">{errorMessage}</h4>
          )}
          {successMessage && !formSubmitted && (
            <h4 className="text-lg text-green-500">{successMessage}</h4>
          )}
          {formSubmitted && <Loader />}
        </form>
      )}
    </>
  );
}

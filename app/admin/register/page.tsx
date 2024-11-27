"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { register } from "@/actions/register";
import Loader from "@/components/Loader";
import { redirect } from "next/navigation";

export default function Register() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user.admin;

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (!isAdmin) {
      redirect("../client/dashboard");
    }
  }, [isAdmin, status]);

  const handleSubmit = async (formData: FormData) => {
    setFormSubmitted(true);
    const user = await register({
      email: formData.get("email"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (user?.error) {
      setErrorMessage(
        "There was an error creating the client. Please try again.",
      );
      return;
    } else {
      setSuccessMessage("Client created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
    setFormSubmitted(false);
  };

  return (
    <>
      {isAdmin && (
        <form
          ref={ref}
          action={handleSubmit}
          className="flex w-3/4 max-w-[400px] flex-col"
        >
          {errorMessage && <div className="">{errorMessage}</div>}
          <h1 className="mb-4 w-full text-2xl font-bold">Register</h1>
          <div className="mb-4 flex flex-col">
            <label className="w-full text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
              name="name"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="w-full text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
              name="email"
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

"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import Loader from "@/components/Loader";

export default function Login() {
  const { data: session } = useSession();
  const isAdmin = session?.user.admin;
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isAdmin) {
      redirect("/admin/dashboard");
    }
    setIsLoading(false);
  }, [session]);

  async function onFormSubmission(event: FormEvent<HTMLFormElement>) {
    setFormSubmitted(true);
    setErrorMessage("");
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (res?.ok) {
        router.push("/");
      } else {
        throw new Error(
          "There was an error logging in. Please confirm your email and/or password.",
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
      {!isLoading && (
        <form
          className="flex w-3/4 max-w-[400px] flex-col"
          onSubmit={onFormSubmission}
        >
          <h1 className="mb-4 w-full text-2xl font-bold">Sign In</h1>
          <div className="mb-4 flex flex-col">
            <label className="w-full text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
              name="email"
            />
          </div>
          <div className="mb-4 flex-col">
            <label className="w-full text-sm">Password</label>
            <div className="flex w-full">
              <input
                type="password"
                placeholder="Password"
                className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
                name="password"
              />
            </div>
          </div>

          {!formSubmitted && (
            <button className="mb-2 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3">
              Sign In
            </button>
          )}
          {formSubmitted && <Loader />}
          {errorMessage && !formSubmitted && (
            <h4 className="text-lg text-red-500">{errorMessage}</h4>
          )}
        </form>
      )}
      {isLoading && <Loader />}
    </>
  );
}

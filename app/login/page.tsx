"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setFormSubmitted(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
      setFormSubmitted(false);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <form className="flex w-3/4 max-w-[400px] flex-col" onSubmit={handleSubmit}>
      {error && <div className="text-black">{error}</div>}
      <h1 className="mb-4 w-full text-2xl font-bold">Sign In</h1>
      <div className="mb-4">
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="h-8 w-full rounded border border-solid border-black p-2"
          name="email"
        />
      </div>
      <div className="mb-4">
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="h-8 w-full rounded border border-solid border-black p-2"
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
    </form>
  );
}

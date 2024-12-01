"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default function SetPasswordPage() {
  const { data: session } = useSession();
  const clientId = session?.user.id;
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [passwordIsValid, setPasswordValidity] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function onPasswordChange(passwordString: string) {
    const validPassword = PASSWORD_REGEX.test(passwordString);
    if (validPassword) {
      setPassword(passwordString);
    }
  }

  function onConfirmedPasswordChange(passwordString: string) {
    console.log(passwordString);
    const validPassword = PASSWORD_REGEX.test(passwordString);
    if (validPassword && password === passwordString) {
      setConfirmedPassword(passwordString);
      setPasswordValidity(true);
    }
  }

  function generateConfirmedPasswordValidationMessage() {
    if (confirmedPassword.length > 0 && password === confirmedPassword)
      return "Passwords match.";
    if (!PASSWORD_REGEX.test(confirmedPassword) && confirmedPassword.length > 0)
      return "Invalid password";
    if (
      PASSWORD_REGEX.test(confirmedPassword) &&
      password !== confirmedPassword
    )
      return "Passwords do not match.";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);

    if (!passwordIsValid) {
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("clientId", clientId!);

    try {
      const response = await fetch("/api/changePassword", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.push("/client/dashboard");
      } else {
        throw new Error(
          "There was an error resetting the password. Please try again.",
        );
      }
    } catch (error) {
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
      <form
        onSubmit={handleSubmit}
        className="flex w-3/4 max-w-[400px] flex-col"
      >
        <div className="mb-4">
          <h1 className="mb-4 text-2xl">Set new password</h1>
          <p className="mb-4">Your new password must have:</p>
          <ul className="list-inside list-disc">
            <li>Minimum of 8 characters</li>
            <li>At least one lowercase and uppercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>

        <div className="mb-4 flex flex-col">
          <label className="w-full text-sm">Password</label>
          <input
            onChange={(e) => onPasswordChange(e.target.value)}
            type="password"
            placeholder="Password"
            className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
            name="password"
          />
          <span className={password ? "text-green-700" : "text-red-500"}>
            {password.length === 0
              ? ""
              : password
                ? "Valid password."
                : "Invalid password."}
          </span>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="w-full text-sm">Confirm password</label>

          <input
            onChange={(e) => onConfirmedPasswordChange(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className="border-1 border-gray mb-2 w-full rounded-md border px-2 sm:w-1/2"
            name="confirmedPassword"
          />
          <span
            className={
              password === confirmedPassword ? "text-green-700" : "text-red-500"
            }
          >
            {generateConfirmedPasswordValidationMessage()}
          </span>
        </div>
        {!formSubmitted && (
          <button
            disabled={!passwordIsValid}
            className="mb-2 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3"
          >
            Set password
          </button>
        )}
        {formSubmitted && <Loader />}
        {errorMessage && !formSubmitted && (
          <h4 className="text-lg text-red-500">{errorMessage}</h4>
        )}
      </form>
    </>
  );
}

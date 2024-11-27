//

"use client";

import { useState } from "react";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordIsValid, setPasswordValidity] = useState(false);
  const [confirmedPasswordIsValid, setConfirmedPasswordValidity] =
    useState(false);

  function onPasswordChange(passwordString: string) {
    setPassword(passwordString);
    let validPassword = PASSWORD_REGEX.test(passwordString);
    setPasswordValidity(validPassword);
  }

  function onConfirmedPasswordChange(passwordString: string) {
    setConfirmedPassword(passwordString);
    let validPassword =
      PASSWORD_REGEX.test(passwordString) && password === confirmedPassword;
    setConfirmedPasswordValidity(validPassword);
  }

  function generateConfirmedPasswordValidationMessage() {
    if (password === confirmedPassword) return "Valid password.";
    if (!PASSWORD_REGEX.test(confirmedPassword) && confirmedPassword.length > 0)
      return "Invalid password";
    if (
      PASSWORD_REGEX.test(confirmedPassword) &&
      password !== confirmedPassword
    )
      return "Passwords do not match.";
  }

  return (
    <>
      <form className="flex w-3/4 max-w-[400px] flex-col">
        <div className="mb-4">
          <h1 className="text-2xl">Set new password</h1>
          <p>Your new password must have:</p>
          <ul>
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
          <span className={passwordIsValid ? "text-green-700" : "text-red-500"}>
            {password.length === 0
              ? ""
              : passwordIsValid
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
            name="password"
          />
          <span
            className={
              password === confirmedPassword ? "text-green-700" : "text-red-500"
            }
          >
            {generateConfirmedPasswordValidationMessage()}
          </span>
        </div>
      </form>
    </>
  );
}

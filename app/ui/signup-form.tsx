"use client";

import { useState } from "react";
import Input from "./input";
import Button from "./button";
import {
  AtSymbolIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useFormStatus, useFormState } from "react-dom";
import { createAccount } from "../lib/actions/user";
import Loader from "./loader";

export default function SignupForm() {
  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAccount, initialState);

  // REACT STATES //
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  // CONTROLLED INPUTS //
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // HANDLERS //
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePasswordConfirmationVisibility = () => {
    setIsPasswordConfirmationVisible((prevState) => !prevState);
  };

  return (
    <form className="mt-5 flex flex-col gap-2" action={dispatch}>
      <div className="md:flex md:justify-between">
        <Input
          label="Nom"
          isRequired
          type="text"
          name="lastname"
          errMessage={state?.errors?.lastname}
          value={lastname}
          onChange={setLastname}
        />

        <Input
          label="Prénom"
          isRequired
          type="text"
          name="firstname"
          errMessage={state?.errors?.firstname}
          value={firstname}
          onChange={setFirstname}
        />
      </div>

      <Input
        label="Email"
        isRequired
        type="email"
        name="email"
        className="mt-5"
        errMessage={state?.errors?.email}
        value={email}
        onChange={setEmail}
      >
        <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]" />
      </Input>

      <Input
        label="Mot de passe"
        isRequired
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        className="my-5"
        errMessage={state?.errors?.password}
        value={password}
        onChange={setPassword}
      >
        {isPasswordVisible ? (
          <EyeIcon
            onClick={handlePasswordVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        ) : (
          <EyeSlashIcon
            onClick={handlePasswordVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        )}
      </Input>

      <Input
        label="Confirmation de mot de passe"
        isRequired
        name="passwordConfirmation"
        errMessage={state?.errors?.passwordConfirmation}
        type={isPasswordConfirmationVisible ? "text" : "password"}
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
      >
        {isPasswordConfirmationVisible ? (
          <EyeIcon
            onClick={handlePasswordConfirmationVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        ) : (
          <EyeSlashIcon
            onClick={handlePasswordConfirmationVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        )}
      </Input>

      {state?.message && (
        <p className="text-red-400 italic text-sm font-semibold my-5">
          {state.message}
        </p>
      )}

      <SignupButton />
    </form>
  );
}

// We need to separate the logic of this Button Component to be able to use useFormStatus and its pending state.
function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="mt-4 w-full"
    >
      {pending ? <Loader minWidth={20} maxWidth={25} /> : "S'inscrire"}
    </Button>
  );
}

"use client";

import { useState } from "react";
import Input from "./input";
import Button from "./button";
import Link from "next/link";
import {
  AtSymbolIcon,
  EyeSlashIcon,
  EyeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormStatus, useFormState } from "react-dom";
import { authenticate } from "../lib/actions";
import Loader from "./loader";

export default function SigninForm() {
  // DISPATCHER //
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  // REACT STATE //
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLER //
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <form className="mt-5 flex flex-col gap-2" action={dispatch}>
        <Input
          label="Email de connexion"
          isRequired
          type="email"
          name="email"
          value={email}
          onChange={setEmail}
        >
          <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]" />
        </Input>

        <Input
          label="Mot de passe"
          isRequired
          type={isPasswordVisible ? "text" : "password"}
          name="password"
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

        {/* ERROR HANDLER */}
        {errorMessage && (
          <div className="flex h-8 items-end space-x-1">
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          </div>
        )}

        <LoginButton />
      </form>

      {/* Send to the reset page */}
      <Link
        className="italic text-center block rhd text-xs mt-4 hover:underline"
        href="/"
      >
        Mot de passe oublié ?
      </Link>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="mt-4 w-full"
    >
      {pending ? <Loader minWidth={20} maxWidth={25}/> : "Se connecter"}
    </Button>
  );
}

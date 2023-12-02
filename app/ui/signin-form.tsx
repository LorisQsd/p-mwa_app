import { useState } from "react";
import Input from "./input";
import Button from "./button";
import Link from "next/link";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form className="mt-5 flex flex-col gap-2">
        <Input
          label="Email de connexion"
          isRequired
          type="email"
          value={email}
          onChange={setEmail}
        >
          <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]" />
        </Input>

        <Input
          label="Mot de passe"
          isRequired
          type="password"
          value={password}
          onChange={setPassword}
        >
          <KeyIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]" />
        </Input>

        <Button content="Se connecter" type="submit" className="mt-10" />
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

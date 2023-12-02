'use client';

import { useState } from "react";
import Logo from "../ui/logo";
import Footer from "../ui/semantic/footer";
import Input from "../ui/input";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  return (
    <>
      <Logo to="/" />
      <main className="grow items-center flex px-2">
        <div className="rounded-lg bg-white mx-auto text-black py-10 px-4 min-w-[320px]">
          <h1 className="text-center mb-5 text-xl">Connectez-vous</h1>

          <div className="flex gap-5 justify-between">
            <button type="button">Connexion</button>
            <button type="button">Inscription</button>
          </div>

          <form className="my-10 flex flex-col gap-5">
            <Input
              label="Email de connexion"
              isRequired
              type="email"
              value={email}
              onChange={setEmail}
            >
              <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px]" />
            </Input>

            <Input
            label="Mot de passe"
            isRequired
            type="password"
            value={password}
            onChange={setPassword}>
              <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px]" />
            </Input>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import Logo from "../ui/logo";
import Footer from "../ui/semantic/footer";
import SigninForm from "../ui/signin-form";
import SignupForm from "../ui/signup-form";
import clsx from "clsx";

export default function Page() {
  // REACT STATE //
  const [activeForm, setActiveForm] = useState("signin");

  return (
    <>
      <Logo to="/" />
      <main className="grow flex px-2 pt-20 md:pt-32 py-10">
        <div className="rounded-lg bg-white mx-auto text-black py-10 md:px-10 px-4 h-fit max-w-[450px] w-full">
          {/* TITLE */}
          <h1 className="text-center mb-10 text-xl sm:text-2xl">{activeForm === "signin" ? "Connectez-vous" : "Inscrivez-vous"}</h1>

          <div className="flex gap-5 justify-between rhd font-bold text-xl mx-auto w-full sm:w-3/4 max-w-[250px]">
            {/* CONNEXION BTN */}
            <button
              className={clsx("duration-300", {
                "text-primary-400 relative scale-105 after:content-[''] after:w-[5px] after:aspect-square after:rounded-full after:bg-primary-400 after:absolute after:-top-2 after:left-1/2 after:-transalte-x-1/2":
                  activeForm === "signin",
              })}
              type="button"
              onClick={() => setActiveForm("signin")}
            >
              Connexion
            </button>
            {/* INSCRIPTION BTN */}
            <button type="button" onClick={() => setActiveForm("signup")} className={clsx("duration-300", {
                "text-primary-400 relative scale-105 after:content-[''] after:w-[5px] after:aspect-square after:rounded-full after:bg-primary-400 after:absolute after:-top-2 after:left-1/2 after:-transalte-x-1/2":
                  activeForm === "signup",
              })}>
              Inscription
            </button>
          </div>

          {activeForm === "signin" ? <SigninForm /> : <SignupForm />}
        </div>
      </main>

      <Footer />
    </>
  );
}

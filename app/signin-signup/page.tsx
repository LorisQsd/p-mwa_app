"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Logo from "../ui/logo";
import Footer from "../ui/semantic/footer";
import SigninForm from "../ui/signin-form";
import SignupForm from "../ui/signup-form";
import clsx from "clsx";

export default function Page() {
  // URL //
  const searchParams = useSearchParams();
  // !! BETTER NAMING POSSIBLE !! //
  // I can improve the naming of the search param.
  // I set q for "query"
  const qSearchParams = searchParams.get("q");

  // We want to get the current pathname and the replace method from the useRouter hook
  // Because depending of the current active form (client side) we want to change the url
  const pathname = usePathname();
  const { replace } = useRouter();

  // REACT STATE //
  // We want the query to be "signin" to prevent the fact that the user goes to the signin-up page through the url WITHOUT passing a query params "q"
  const [activeForm, setActiveForm] = useState<string>(qSearchParams || "signin");

  // HANDLER //
  const handleActiveForm = (query: string) => {
    // Depending of the query (see the jsx bellow) we change the url so it will change the form to display
    const params = new URLSearchParams(searchParams);

    params.set("q", query);

    replace(`${pathname}?${params.toString()}`);

    setActiveForm(query);
  };

  return (
    <>
      <Logo to="/" />
      <main className="grow flex px-2 pt-20 md:pt-32 py-10">
        <div className="rounded-lg bg-white mx-auto text-black py-10 md:px-10 px-4 h-fit max-w-[500px] w-full">
          {/* TITLE */}
          <h1 className="text-center mb-10 text-xl sm:text-2xl">
            {activeForm === "signin" ? "Connectez-vous" : "Inscrivez-vous"}
          </h1>

          <div className="flex gap-5 justify-between rhd font-bold text-xl mx-auto w-full sm:w-3/4 max-w-[250px]">
            {/* CONNEXION BTN */}
            <button
              className={clsx("duration-300", {
                "text-primary-400 relative scale-105 after:content-[''] after:w-[5px] after:aspect-square after:rounded-full after:bg-primary-400 after:absolute after:-top-2 after:left-1/2 after:-transalte-x-1/2":
                  activeForm === "signin",
              })}
              type="button"
              onClick={() => handleActiveForm("signin")}
            >
              Connexion
            </button>
            {/* INSCRIPTION BTN */}
            <button
              className={clsx("duration-300", {
                "text-primary-400 relative scale-105 after:content-[''] after:w-[5px] after:aspect-square after:rounded-full after:bg-primary-400 after:absolute after:-top-2 after:left-1/2 after:-transalte-x-1/2":
                  activeForm === "signup",
              })}
              type="button"
              onClick={() => handleActiveForm("signup")}
            >
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

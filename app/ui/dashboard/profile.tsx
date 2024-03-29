"use client";

import Link from "next/link";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/lib/actions/authentication";
import Button from "../button";

export default function Profile() {
  // REACTE STATE //
  const [profileToast, setProfileToast] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setProfileToast((prevState) => !prevState)}
        className="w-[50px] aspect-square bg-slate-200 rounded-full p-2"
      >
        <UserIcon title="Icone Utilisateur" className="w-full text-black" />
      </button>
      {profileToast && (
        <div className="bg-white rounded-lg absolute top-14 p-4 right-6 text-black w-[200px] flex flex-col items-center justify-center gap-2">
          {/* CLOSE TOAST BUTTON */}
          <button
            type="button"
            onClick={() => setProfileToast(false)}
            className="w-[20px] h-[20px] rounded-full bg-red-500 text-white rhd absolute top-1 right-1 flex items-center justify-center"
          >
            x
          </button>

          <Link href={"/dashboard/profile"} className="rhd">
            Mon Profile
          </Link>
          <Link href={"/dashboard/support"} className="rhd">
            Contacter le support
          </Link>

          <form action={logout}>
            <Button type="submit">Déconnexion</Button>
          </form>
        </div>
      )}
    </div>
  );
}

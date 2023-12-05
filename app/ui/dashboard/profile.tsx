"use client";

import Link from "next/link";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/lib/actions";
import Button from "../button";
import { useFormState } from "react-dom";

export default function Profile() {
  // DISPATCHER //
  const [errorMessage, dispatch] = useFormState(logout, undefined);

  // React state //
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
        <div className="bg-white rounded-lg absolute top-14 p-4 right-6 text-black w-[200px]">
          <form
            action={logout}
          >
            <Button content="Se deconnecter" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
}

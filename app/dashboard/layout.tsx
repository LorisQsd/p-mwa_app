import SideNav from "../ui/dashboard/sidenav";
import Logo from "../ui/logo";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    console.log(session);
  }

  return (
    <>
      <Logo to="/dashboard" />
      <header className="p-5 flex justify-end items-center gap-4">
        {session?.user && (
          <p>
            Bonjour{" "}
            <span className="font-semibold text-lg">
              {session.user.firstname} {session.user.lastname}
            </span>
          </p>
        )}
        <div className="w-[50px] aspect-square bg-slate-200 rounded-full p-2">
          <UserIcon title="Icone Utilisateur" className="w-full text-black" />
        </div>
      </header>
      <SideNav />
      {children}
    </>
  );
}

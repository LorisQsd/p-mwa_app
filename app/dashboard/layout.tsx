import SideNav from "../ui/dashboard/sidenav";
import Logo from "../ui/logo";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Logo to="/dashboard" />
      <header className="p-5">
        <div className="w-[50px] aspect-square bg-slate-200 rounded-full p-2 block ml-auto">
          <UserIcon title="Icone Utilisateur" className="w-full text-black" />
        </div>
      </header>
      <SideNav />
      {children}
    </>
  );
}

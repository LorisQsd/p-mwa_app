import SideNav from "../ui/dashboard/sidenav";
import Logo from "../ui/logo";
import { auth } from "@/auth";
import Profile from "../ui/dashboard/profile";

// The async component rendering is not compatible with the "use client"
// That's why I need to transform the Profile into a component
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We want to get the session info
  const session = await auth();

  return (
    <>
      <Logo to="/dashboard" />
      <header className="p-5 flex justify-end items-center gap-4 retative">
        {session?.user && (
          <p>
            Bonjour{" "}
            <span className="font-semibold text-lg">
              {session.user.firstname} {session.user.lastname}
            </span>
          </p>
        )}
        <Profile />
      </header>
      <main className="grow flex p-2 sm:p-4 mb-24 sm:mb-0">
        <SideNav />
        {children}
      </main>
    </>
  );
}

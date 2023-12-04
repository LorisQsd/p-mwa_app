import Link from "next/link";
import { signOut } from "@/auth";
import Button from "../button";

export default function SideNav() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/signin-signup?q=signin" });
        }}
      >
        <Button content="Se deconnecter" type="submit" />
      </form>
    </div>
  );
}

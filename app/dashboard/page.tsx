import { signOut } from "@/auth";
import Button from "../ui/button";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard Page</h1>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button content="Se deconnecter" type="submit" />
      </form>
    </>
  );
}

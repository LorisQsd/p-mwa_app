"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// === LOGOUT === //
export async function logout() {
  try {
    await signOut({ redirectTo: "/signin-signup?q=signin" });
  } catch (error) {
    throw error;
  }
}

// === LOGIN === //
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

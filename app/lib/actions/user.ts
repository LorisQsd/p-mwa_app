"use server";

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

// === CREATE USER ACCOUNT === //
const CreateUserEntries = z
  .object({
    lastname: z
      .string({
        invalid_type_error: "Veuillez entrer un Nom valide.",
      })
      .nonempty("Un nom est requis."),
    firstname: z
      .string({
        invalid_type_error: "Veuillez entrer un Prénom valide.",
      })
      .nonempty("Un prénom est requis."),
    email: z
      .string()
      .nonempty("Un email est requis.")
      .email({ message: "Veuillez entrer un email valide." }),
    password: z
      .string()
      .nonempty("Un mot de passe est requis.")
      .min(8, {
        message: "Votre mot de passe doit contenir au minimum 8 caractères.",
      })
      .refine(
        (password) => {
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/;
          return regex.test(password);
        },
        {
          message:
            "Le mot de passe doit contenir au moins une majuscule et un caractère spécial.",
        }
      ),
    passwordConfirmation: z
      .string()
      .nonempty("Un mot de passe de confirmation est requis."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passes ne correspondent pas.",
    path: ["passwordConfirmation"],
  });

export type UserState = {
  errors?: {
    lastname?: string[];
    firstname?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string | null;
};

export async function createAccount(
  prevState: UserState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateUserEntries.safeParse({
    lastname: formData.get("lastname"),
    firstname: formData.get("firstname"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  // If form validation fails, return errors earl. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le compte n'a pas pu être créé.",
    };
  }

  // Preprare data for insertion into the DB
  const { lastname, firstname, email, password } = validatedFields.data;

  // Insert into the DB
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultAvatarId = "3958dc9e-712f-4377-85e9-fec4b6a6442a";

    await sql`
        INSERT INTO users (lastname, firstname, email, password, avatar_id)
        VALUES (${lastname}, ${firstname}, ${email}, ${hashedPassword}, ${defaultAvatarId});
      `;

    console.log(`Le compte de ${lastname} ${firstname} a bien été créé.`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la création d'un compte utilisateur.",
    };
  }

  // We don't need to revalidate path, there isn't any data on the login page.

  // !! ISSUE !! //
  // Ideally, we want to redirect the user through the same page "/signin-signup?q=signin"
  // He will be able to connect himself directly BUT once the form is dispatched, the "activeForm" state from the page component is not updating
  redirect("/");
}
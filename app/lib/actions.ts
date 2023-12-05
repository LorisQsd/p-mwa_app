"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function logout() {
  try {
    await signOut({ redirectTo: "/signin-signup?q=signin" });
  } catch (error) {
    throw error;
  }
}

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

const CreateAccountEntries = z
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

export type AccountState = {
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
  prevState: AccountState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateAccountEntries.safeParse({
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

// === CREATE DEBTOR === //
const CreateDebtorEntries = z
  .object({
    id: z.string(),
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
    email: z.string().email({ message: "Veuillez entrer un email valide." }),
    phone: z
      .string({ invalid_type_error: "Veuillez entrer un Téléphone valide" })
      .length(10, { message: "Veuillez renseigner 10 chiffres" }),
    user_id: z.string(),
    status_id: z.enum(["En cours", "Archivé"], {
      invalid_type_error: "Le status sélectionné n'est pas valide.",
    }),
    date: z.string(),
  })
  .omit({ id: true, date: true, status_id: true, user_id: true });

export type DebtorState = {
  errors?: {
    lastname?: string[];
    firstname?: string[];
    email?: string[];
    phone?: string[];
  };
  message?: string | null;
};

export async function createDebtor(prevState: DebtorState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateDebtorEntries.safeParse({
    lastname: formData.get("lastname"),
    firstname: formData.get("firstname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
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
  const { lastname, firstname, email, phone } = validatedFields.data;

  // Insert into the DB
  try {
    const session = await auth();

    const userId: string = session?.user?.id as string;
    // !! We could to way better for maintanibility !! //
    const defaultStatusId = "fdd1bc89-f681-4a2a-83db-b62e6fdabdeb";
    // We want the date to be in ISO Format
    const date = new Date().toISOString()

    await sql`
        INSERT INTO debtors (lastname, firstname, email, phone, date, user_id, status_id)
        VALUES (${lastname}, ${firstname}, ${email}, ${phone}, ${date}, ${userId}, ${defaultStatusId});
      `;

    console.log(`Le débiteur ${lastname} ${firstname} a bien été créé.`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la création d'un débiteur.",
    };
  }

  revalidatePath("/dashboard")
  redirect("/dashboard");
}

"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";

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
    email: z
      .string()
      .email({ message: "Veuillez entrer un email valide." })
      .optional()
      .or(z.literal("")),
    phone: z
      .string({ invalid_type_error: "Veuillez entrer un Téléphone valide" })
      .length(10, { message: "Veuillez renseigner 10 chiffres" })
      .optional()
      .or(z.literal("")),
    user_id: z.string(),
    status_id: z.enum(["En cours", "Archivé"], {
      invalid_type_error: "Le status sélectionné n'est pas valide.",
    }),
    date: z.string(),
  })
  .omit({ id: true, date: true, status_id: true, user_id: true });

// TYPE //
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
    // !! We could do way better for maintanibility !! //
    const defaultStatusId = "fdd1bc89-f681-4a2a-83db-b62e6fdabdeb";
    // We want the date to be in ISO Format
    const date = new Date().toISOString();

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

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// === UPDATE DEBTOR === //
// === UPDATE DEBT === //
export async function updateDebtor(
  debtorId: string,
  prevState: DebtorState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateDebtorEntries.safeParse({
    lastname: formData.get("lastname"),
    firstname: formData.get("firstname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le débiteur n'a pas pu être modifié.",
    };
  }

  // Preprare data for update it into the DB
  const { lastname, firstname, email, phone } = validatedFields.data;

  // Update into DB
  try {
    await sql`
        UPDATE debtors
        SET lastname = ${lastname}, firstname = ${firstname}, email = ${email}, phone = ${phone}
        WHERE id = ${debtorId};
      `;

    console.log(
      `Le débiteur ${lastname} ${firstname} a bien été modifié.`
    );
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la modification d'un débiteur.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === DELETE DEBTOR === //
export async function deleteDebtor(id: string) {
  try {
    await sql`
        DELETE FROM debtors
        WHERE id=${id}
    `;

    revalidatePath("/dashboard/resume");
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la suppression d'un débiteur.",
    };
  }
}
"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";

// === VALIDATION SCHEMA === //
const debtSchema = z
  .object({
    id: z.string(),
    name: z
      .string({
        invalid_type_error: "Veuillez entrer un libellé valide.",
      })
      .nonempty("Un libellé est requis."),
    amount: z.coerce
      .number({
        invalid_type_error: "Veuillez enter un montant valide.",
      })
      .gt(0, { message: "Veuillez entrer un montant supérieur à 0 €." }),
    date: z.string(),
    debtor_id: z.string({
      invalid_type_error: "Veuillez renseigner un debtor_id valide",
    }),
  })
  .omit({ id: true, date: true, debtor_id: true });

// === STATE === //
export type DebtState = {
  errors?: {
    name?: string[];
    amount?: string[];
  };
  message?: string | null;
};

// === CREATE DEBT === //
export async function createDebt(
  debtorId: string,
  prevState: DebtState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = debtSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. La dette n'a pas pu être créé.",
    };
  }

  // Preprare data for insertion into the DB
  const { name, amount } = validatedFields.data;

  // Insert into the DB
  try {
    // We want the date to be in ISO Format
    const date = new Date().toISOString();

    await sql`
        INSERT INTO debts (name, amount, debtor_id, date)
        VALUES (${name}, ${amount}, ${debtorId}, ${date});
      `;

    console.log(
      `La dette ${name} d'un montant de : ${amount} € a bien été créé.`
    );
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la création d'une dette.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === UPDATE DEBT === //
export async function updateDebt(
  id: string,
  debtorId: string,
  prevState: DebtState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = debtSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. La dette n'a pas pu être modifiée.",
    };
  }

  // Preprare data for update it into the DB
  const { name, amount } = validatedFields.data;

  // Update into DB
  try {
    await sql`
        UPDATE debts
        SET name = ${name}, amount = ${amount}
        WHERE id = ${id};
      `;

    console.log(
      `La dette ${name} d'un montant de : ${amount} € a bien été modifiée.`
    );
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la modification d'une dette.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === DELETE DEBT === //
export async function deleteDebt(id: string, debtorId: string) {
  try {
    await sql`
        DELETE FROM debts
        WHERE id=${id}
        AND debtor_id=${debtorId};
    `;

    revalidatePath(`/dashboard/resume/${debtorId}`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la suppression d'une dette.",
    };
  }
}

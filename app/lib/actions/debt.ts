"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";

// === CREATE DEBT === //
const CreateDebtEntries = z
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
  .omit({ id: true, date: true });

export type DebtState = {
  errors?: {
    name?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function createDebt(prevState: DebtState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateDebtEntries.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    debtor_id: formData.get("debtor_id"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le dette n'a pas pu être créé.",
    };
  }

  // Preprare data for insertion into the DB
  const { name, amount, debtor_id } = validatedFields.data;

  // Insert into the DB
  try {
    // We want the date to be in ISO Format
    const date = new Date().toISOString();

    await sql`
        INSERT INTO debts (name, amount, debtor_id, date)
        VALUES (${name}, ${amount}, ${debtor_id}, ${date});
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

  revalidatePath(`/dashboard/resume/${debtor_id}`);
  redirect(`/dashboard/resume/${debtor_id}`);
}

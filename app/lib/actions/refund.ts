"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";

// === VALIDATION SCHEMA === //
const refundSchema = z.object({
  id: z.string(),
  source: z
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
}).omit({id: true, date: true, debtor_id: true});

// === STATE === //
export type RefundState = {
  errors?: {
    source?: string[];
    amount?: string[];
  };
  message?: string | null;
};

// === CREATE REFUND === //
export async function createRefund(debtorId: string, prevState: RefundState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = refundSchema.safeParse({
    source: formData.get("source"),
    amount: formData.get("amount"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le remboursement n'a pas pu être créé.",
    };
  }

  // Preprare data for insertion into the DB
  const { source, amount } = validatedFields.data;

  // Insert into the DB
  try {
    // We want the date to be in ISO Format
    const date = new Date().toISOString();

    await sql`
        INSERT INTO refunds (source, amount, debtor_id, date)
        VALUES (${source}, ${amount}, ${debtorId}, ${date});
      `;

    console.log(
      `Le remboursement ${source} d'un montant de : ${amount} € a bien été créé.`
    );
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la création d'un remboursement.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === UPDATE REFUND === //
export async function updateRefund(
  id: string,
  debtorId: string,
  prevState: RefundState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = refundSchema.safeParse({
    source: formData.get("source"),
    amount: formData.get("amount"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le remboursement n'a pas pu être modifié.",
    };
  }

  // Preprare data for update it into the DB
  const { source, amount } = validatedFields.data;

  // Update into DB
  try {
    await sql`
        UPDATE refunds
        SET source = ${source}, amount = ${amount}
        WHERE id = ${id};
      `;

    console.log(
      `Le remboursement ${source} d'un montant de : ${amount} € a bien été modifié.`
    );
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la modification d'un remboursement.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === DELETE REFUND === //
export async function deleteRefund(id: string, debtorId: string) {
  try {
    await sql`
        DELETE FROM refunds
        WHERE id=${id}
        AND debtor_id=${debtorId};
    `;

    revalidatePath(`/dashboard/resume/${debtorId}`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la suppression d'un remboursement.",
    };
  }
}

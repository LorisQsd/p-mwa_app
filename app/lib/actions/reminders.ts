"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";

// === VALIDATION SCHEMA === //
const reminderSchema = z
  .object({
    id: z.string(),
    comment: z
      .string({
        invalid_type_error: "Veuillez entrer un libellé valide.",
      })
      .nonempty("Un libellé est requis."),
    date: z
      .string({ invalid_type_error: "Veuillez entrer une date valide" })
      .nonempty({ message: "Une date de notification est requise." }),
    debtor_id: z.string({
      invalid_type_error: "Veuillez renseigner un debtor_id valide",
    }),
  })
  .omit({ id: true, debtor_id: true });

// === STATE === //
export type ReminderState = {
  errors?: {
    comment?: string[];
    date?: string[];
  };
  message?: string | null;
};

// === CREATE REMINDER === //
export async function createReminder(
  debtorId: string,
  prevState: ReminderState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = reminderSchema.safeParse({
    comment: formData.get("comment"),
    date: formData.get("date"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le rappel n'a pas pu être créé.",
    };
  }

  // Preprare data for insertion into the DB
  const { comment, date } = validatedFields.data;

  // Insert into the DB
  try {
    await sql`
        INSERT INTO reminders (comment, debtor_id, date)
        VALUES (${comment}, ${debtorId}, ${date});
      `;

    console.log(`Le rappel ${comment} a bien été créé.`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la création d'un rappel.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === UPDATE REMINDER === //
export async function updateReminder(
  id: string,
  debtorId: string,
  prevState: ReminderState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = reminderSchema.safeParse({
    comment: formData.get("comment"),
    date: formData.get("date"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Certains champs ne sont pas valide. Le rappel n'a pas pu être modifié.",
    };
  }

  // Preprare data for update it into the DB
  const { comment, date } = validatedFields.data;

  // Update into DB
  try {
    await sql`
        UPDATE reminders
        SET comment = ${comment}, date = ${date}
        WHERE id = ${id};
      `;

    console.log(`Le rappel ${comment} a bien été modifié.`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la modification d'un rappel.",
    };
  }

  revalidatePath(`/dashboard/resume/${debtorId}`);
  redirect(`/dashboard/resume/${debtorId}`);
}

// === DELETE REMINDER === //
export async function deleteReminder(id: string, debtorId: string) {
  try {
    await sql`
        DELETE FROM reminders
        WHERE id=${id}
        AND debtor_id=${debtorId};
    `;

    revalidatePath(`/dashboard/resume/${debtorId}`);
  } catch (error) {
    return {
      message:
        "Erreur de base de données: Echec lors de la suppression d'un rappel.",
    };
  }
}

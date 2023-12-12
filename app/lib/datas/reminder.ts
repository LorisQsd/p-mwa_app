import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Reminder } from "../definitions";

// Maybe we could improve this request
// The idea is to sort reminders by date AFTER the current date and take only the nearest
export async function fetchNextReminderByDebtor(id: string) {
  // Add noStore() here prevents the response from being cached
  // This is equivalent to fetch (..., {cache: 'no store'})
  noStore();

  try {
    const data = await sql<Reminder>`
            SELECT reminders.date FROM debtors
                JOIN reminders ON debtors.id = reminders.debtor_id
                WHERE debtors.id = ${id}
                ORDER BY reminders.date DESC
                LIMIT 1;
          `;

    const lastReminder = data.rows[0];

    return lastReminder;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Echec lors de la récupération d'une date de relance.");
  }
}

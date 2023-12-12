import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Debt } from "../definitions";

export async function fetchNextReminderByDebtor(id: string) {
  // Add noStore() here prevents the response from being cached
  // This is equivalent to fetch (..., {cache: 'no store'})
  noStore();

  try {
    const data = await sql<Debt>`
            SELECT reminders.date FROM debtors
                JOIN reminders ON debtors.id = reminders.debtor_id
                WHERE debtors.id = ${id}
                ORDER BY reminders.date DESC
                LIMIT 1;
          `;

    const lastReminder = data.rows[0].date;

    return lastReminder;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Echec lors de la récupération d'une dette.");
  }
}
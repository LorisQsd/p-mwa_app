import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { RemainingCapital } from "../definitions";
import { auth } from "@/auth";

export async function fetchRemainingCapital() {
  noStore();

  try {
    const session = await auth();
    const userId = session?.user.id;

    const data = await sql<RemainingCapital>`
        SELECT
      (
        SELECT COALESCE(SUM(amount), 0)
        FROM debts
        WHERE debtor_id 
          IN (SELECT id FROM debtors WHERE user_id = ${userId})
      ) AS total_debts,
      (
        SELECT COALESCE(SUM(amount), 0)
        FROM refunds
        WHERE debtor_id 
          IN (SELECT id FROM debtors WHERE user_id = ${userId})
      ) AS total_refunds;
    `;

    const remainingCapital = data.rows[0];

    return remainingCapital;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      "Echec lors de la récupération du total capital restant dû."
    );
  }
}

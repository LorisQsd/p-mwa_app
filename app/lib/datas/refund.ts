import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Refund } from "../definitions";

export async function fetchRefundsByDebtorId(id: string) {
  // Add noStore() here prevents the response from being cached
  // This is equivalent to fetch (..., {cache: 'no store'})
  noStore();

  try {
    const data = await sql<Refund>`
              SELECT refunds.id, refunds.debtor_id, source, amount, refunds.date FROM debtors
              JOIN refunds ON debtors.id = refunds.debtor_id
              WHERE debtors.id = ${id}
              ORDER BY refunds.date DESC;
          `;

    const refunds = data.rows;

    return refunds;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Echec lors de la récupération d'un remboursement.");
  }
}
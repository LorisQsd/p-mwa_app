import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Debt } from "../definitions";

export async function fetchDebtsByDebtorId(id: string) {
  // Add noStore() here prevents the response from being cached
  // This is equivalent to fetch (..., {cache: 'no store'})
  noStore();

  try {
    const data = await sql<Debt>`
              SELECT debts.id, debts.debtor_id, name, amount, debts.date FROM debtors
              JOIN debts ON debtors.id = debts.debtor_id
              WHERE debtors.id = ${id}
              ORDER BY debts.date DESC;
          `;

    const debts = data.rows;

    return debts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Echec lors de la récupération d'une dette.");
  }
}
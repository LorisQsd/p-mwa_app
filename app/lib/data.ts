import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Debtor, Status } from "./definitions";
import { auth } from "@/auth";

export async function fetchDebtors() {
  // Add noStore() here prevents the response from being cached
  // This is equivalent to fetch (..., {cache: 'no store'})
  noStore();

  try {
    const session = await auth();
    const userId = session?.user.id;

    const data = await sql<Debtor & Status>`
            SELECT debtors.id, lastname, firstname, email, phone, status, user_id, date FROM debtors 
            JOIN status ON debtors.status_id = status.id
            WHERE debtors.user_id = ${userId}
        `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Echec lors de la récupération des débiteurs.");
  }
}

export async function fetchDebtorById(id: string) {
    // Add noStore() here prevents the response from being cached
    // This is equivalent to fetch (..., {cache: 'no store'})
    noStore();
  
    try {
      const session = await auth();
      const userId = session?.user.id;
  
      const data = await sql<Debtor & Status>`
              SELECT * FROM debtors 
              JOIN status ON debtors.status_id = status.id
              WHERE debtors.user_id = ${userId}
              AND debtors.id = ${id}
          `;
  
      return data.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Echec lors de la récupération des débiteurs.");
    }
  }
  

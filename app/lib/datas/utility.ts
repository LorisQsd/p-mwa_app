import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

// === GET REMAINING CAPITAL === //
type RemainingCapital = {
  total_debts: string;
  total_refunds: string;
}

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

// === GET 3 BEST DEBTORS === //
export type BestDebtors = {
  id: string;
  firstname: string;
  lastname: string;
  total_debts: string;
  total_refunds: string;
  remaining_capital: string;
}

export async function fetchBestDebtors(){
  noStore();

  try {
    const session = await auth();
    const userId = session?.user.id;

    const data = await sql<BestDebtors>`
        SELECT
          debtors.id,
          firstname,
          lastname,
          COALESCE(total_debts, 0) AS total_debts,
          COALESCE(total_refunds, 0) AS total_refunds,
          COALESCE(total_debts, 0) - COALESCE(total_refunds, 0) AS remaining_capital
        FROM
          debtors
        LEFT JOIN (
          SELECT debtor_id, COALESCE(SUM(amount), 0) AS total_debts
          FROM debts
          GROUP BY debtor_id
        ) AS debts ON debtors.id = debts.debtor_id
        LEFT JOIN (
          SELECT debtor_id, COALESCE(SUM(amount), 0) AS total_refunds
          FROM refunds
          GROUP BY debtor_id
        ) AS refunds ON debtors.id = refunds.debtor_id
        WHERE
          debtors.user_id = ${userId}
        ORDER BY
          remaining_capital DESC
        LIMIT 3;
    `;

    const bestDebtors = data.rows;

    return bestDebtors;
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error(
      "Echec lors de la récupération du total capital restant dû."
    );
  }
}

export async function fetchRemainingCapitalByDebtorId(debtorId: string){
  noStore();

  try {
    const data = await sql<{remaining_capital: string}>`
        SELECT
          COALESCE(total_debts, 0) - COALESCE(total_refunds, 0) AS remaining_capital
        FROM (
          SELECT
            debtors.id,
            COALESCE(SUM(debts.amount), 0) AS total_debts
          FROM
            debtors
          LEFT JOIN debts ON debtors.id = debts.debtor_id
          WHERE
            debtors.id = ${debtorId}
          GROUP BY
            debtors.id
        ) AS debt_totals
        LEFT JOIN (
          SELECT
            debtors.id,
            COALESCE(SUM(refunds.amount), 0) AS total_refunds
          FROM
            debtors
          LEFT JOIN refunds ON debtors.id = refunds.debtor_id
          WHERE
            debtors.id = ${debtorId}
          GROUP BY
            debtors.id
        ) AS refund_totals ON debt_totals.id = refund_totals.id;
    `;

    const response = data.rows[0];

    return response.remaining_capital;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      "Echec lors de la récupération du total capital restant dû pour un débiteur."
    );
  }
}
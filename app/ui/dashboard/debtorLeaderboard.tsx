import { fetchBestDebtors } from "@/app/lib/datas/utility";
import BestDebtorCard from "./bestDebtorCard";

export default async function DebtorLeaderboard() {
  const bestDebtors = await fetchBestDebtors();

  return (
    <>
      {bestDebtors ? (
        bestDebtors.map((debtor, index) => (
          <BestDebtorCard key={debtor.id} {...debtor} index={index} />
        ))
      ) : (
        <p className="italic">Pas encore de débiteur à classer.</p>
      )}
    </>
  );
}

import { fetchDebtors } from "@/app/lib/datas/debtor";
import DebtorCard from "@/app/ui/dashboard/debtorCard";

export default async function Resume() {
  const debtors = await fetchDebtors();

  return (
    <div className="w-full overflow-y-auto pr-2">
      <h1>Vos débiteurs</h1>

        {debtors.map((debtor) => (
          <DebtorCard key={debtor.id} {...debtor} />
        ))}
    </div>
  );
}

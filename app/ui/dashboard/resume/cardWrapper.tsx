import { fetchDebtors } from "@/app/lib/datas/debtor";
import DebtorCard from "@/app/ui/dashboard/debtorCard";

export default async function CardWrapper() {
  const debtors = await fetchDebtors();

  return (
    <>
      {debtors.map((debtor) => (
        <DebtorCard key={debtor.id} {...debtor} />
      ))}
    </>
  );
}

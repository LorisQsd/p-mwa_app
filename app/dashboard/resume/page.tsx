import { fetchDebtors } from "@/app/lib/data"
import DebtorCard from "@/app/ui/dashboard/debtorCard";

export default async function Resume() {
    const debtors = await fetchDebtors();

    return (
        <div className="w-full">
            <h1>Vos débiteurs</h1>

            {debtors.map((debtor) => (
                <DebtorCard key={debtor.id} {...debtor} />
            ))}
        </div>
    )
}
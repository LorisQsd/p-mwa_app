import { fetchDebtorById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params } : {params : {id : string}}) {
    const debtorId = params.id;

    const debtor = await fetchDebtorById(debtorId);

    if (!debtor) {
        return notFound();
    }
    
    console.log(debtor)

    return (
        <h1>Page de détail d&apos;un débiteur</h1>
    )
}
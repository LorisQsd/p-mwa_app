import { fetchDebtByDebtorId, fetchDebtorById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { PlusIcon } from "@heroicons/react/24/solid";
import DebtButton from "@/app/ui/dashboard/resume/debtButton";
import DebtCard from "@/app/ui/dashboard/resume/debtCard";
import RefundButton from "@/app/ui/dashboard/resume/refundButton";

export default async function Page({ params }: { params: { id: string } }) {
  const debtorId = params.id;

  const debtor = await fetchDebtorById(debtorId);
  const debts = await fetchDebtByDebtorId(debtorId);

  if (!debtor) {
    return notFound();
  }

  const formatedDate = dayjs(debtor.date.toString()).format("DD/MM/YYYY");
  // Better naming :
  const statusName = debtor.name;

  return (
    <>
      <div className="w-full overflow-y-auto pr-2">
        <section className="w-full bg-slate-100 rounded-md text-black p-4 max-w-[600px] mx-auto">
          <h2 className="text-center mb-4">Informations du débiteur</h2>

          <div className="flex justify-between mb-2">
            <p className="font-bold">Nom</p>
            <p>
              {debtor.lastname} {debtor.firstname}
            </p>
          </div>

          {debtor.email && (
            <div className="flex justify-between mb-2">
              <p className="font-bold">Email</p>
              <p>{debtor.email}</p>
            </div>
          )}

          {debtor.phone && (
            <div className="flex justify-between mb-2">
              <p className="font-bold">Téléphone</p>
              <p>{formatPhoneNumber(debtor.phone)}</p>
            </div>
          )}

          <div className="flex justify-between mb-2">
            <p className="font-bold">Débiteur depuis le</p>
            <p>{formatedDate}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="font-bold">Status</p>
            <p>{statusName}</p>
          </div>
        </section>

        <h2 className="text-center my-4">Compte rendu financier</h2>

        {debts && debts.map((debt) => <DebtCard key={debt.id} {...debt} />)}

        {/* ADD REFUND BUTTON */}
        <RefundButton debtorId={debtorId} />

        {/* ADD DEBT BUTTON */}
        <DebtButton debtorId={debtorId} />
      </div>
    </>
  );
}

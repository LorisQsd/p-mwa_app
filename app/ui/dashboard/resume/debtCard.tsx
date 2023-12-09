import { Debt } from "@/app/lib/definitions";
import dayjs from "dayjs";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { deleteDebt } from "@/app/lib/actions/debt";

export default function DebtCard({ id, name, amount, date, debtor_id: debtorId }: Debt) {
  const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY");

  const deleteDebtorWithId = deleteDebt.bind(null, id, debtorId);

  return (
    <article className="w-full bg-orange-400 my-2 rounded-md p-6 flex flex-wrap justify-between text-black">
      <div className="flex flex-col justify-center items-center">
        <h2>Raison</h2>
        <p>{name}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2>Montant</h2>
        <p>{amount}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center">Depuis le</h2>
        <p>{formatedDate}</p>
      </div>

      <div className="flex flex-col">
        {/* DELETE DEBT */}
        <form action={deleteDebtorWithId}>
          <button type="submit" className="hover:scale-110 duration-300 text-red-600 hover:text-red-500" title="Supprimer">
            <TrashIcon className="w-[25px]" />
          </button>
        </form>

        {/* EDIT DEBT */}
        <form action="">
          <button type="submit" className="hover:scale-110 duration-300 text-primary-700 hover:text-primary-400" title="Éditer">
            <PencilSquareIcon className="w-[25px]" />
          </button>
        </form>
      </div>
    </article>
  );
}

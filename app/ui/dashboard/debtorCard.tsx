import { Debtor, Status } from "@/app/lib/definitions";
import Link from "next/link";
import { deleteDebtor } from "@/app/lib/actions/debtor";
import dayjs from "dayjs";
import clsx from "clsx";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

export default function DebtorCard({
  id,
  lastname,
  firstname,
  email,
  phone,
  date,
  name: statusName,
}: Debtor & Status) {
  // We want to bind the id to the deleteDebtor function so it will add a new id context to execute the async function
  const deleteDebtorWithId = deleteDebtor.bind(null, id);

  const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY");

  return (
    <article className="w-full bg-slate-100 rounded-md text-black py-2 px-8 mb-5 grid grid-cols-12 justify-between items-center gap-4">
      <div className="flex flex-col gap-2 items-center justify-center col-span-6 sm:col-span-4 lg:col-span-2 lg:row-start-1">
        <h3>Nom</h3>
        <p>
          {lastname} {firstname}
        </p>
      </div>

      {email && (
        <div className="flex flex-col gap-2 items-center justify-center col-span-6 sm:col-span-4 lg:col-span-2 lg:row-start-1">
          <h3>Email</h3>
          <p>{email}</p>
        </div>
      )}

      {phone && (
        <div className="flex flex-col gap-2 items-center justify-center col-span-12 sm:col-span-4 lg:col-span-2 lg:row-start-1">
          <h3>Téléphone</h3>
          <p>{formatPhoneNumber(phone)}</p>
        </div>
      )}

      <div className="flex flex-col gap-2 items-center justify-center col-span-12 sm:col-span-6 sm:row-start-2 lg:col-start-7 lg:col-end-9 lg:row-start-1">
        <h3 className="text-center">Débiteur depuis</h3>
        <p>{formatedDate}</p>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center col-span-12 sm:col-span-6 sm:row-start-2 lg:col-start-9 lg:col-end-11 lg:row-start-1">
        <h3>Status</h3>
        <p
          className={clsx(
            "font-semibold italic",
            { "text-primary-700": statusName === "En cours" },
            { "text-orange-400": statusName === "Archivé" }
          )}
        >
          {statusName}
        </p>
      </div>

      <div className="flex gap-2 col-span-12 flex-wrap justify-center sm:gap-6 lg:col-start-11 lg:col-end-13">
        <Link
          className="bg-primary-400 rounded-md p-2 text-center hover:shadow-custom duration-300 hover:bg-primary-700 flex items-center justify-center h-fit"
          href={`/dashboard/resume/${id}`}
        >
          Voir plus
        </Link>

        <form action={deleteDebtorWithId}>
          <button
            type="submit"
            className=" bg-red-500 rounded-md hover:bg-red-600 duration-150 p-2 text-black"
          >
            Supprimer
          </button>
        </form>
      </div>
    </article>
  );
}

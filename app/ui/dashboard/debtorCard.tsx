import { Debtor } from "@/app/lib/definitions";
import Link from "next/link";

export default function DebtorCard({
  id,
  lastname,
  firstname,
  email,
  phone,
}: Debtor) {
  return (
    <div className="w-full bg-slate-100 rounded-md text-black p-2 mb-5 grid items-center grid-cols-12 gap-4">
      <div className="flex flex-col gap-2 items-center justify-center col-span-6 sm:col-span-4">
        <h3>Nom</h3>
        <p>
          {lastname} {firstname}
        </p>
      </div>

      {email && (
        <div className="flex flex-col gap-2 items-center justify-center col-span-6 sm:col-span-4">
          <h3>Email</h3>
          <p>{email}</p>
        </div>
      )}

      {phone && (
        <div className="flex flex-col gap-2 items-center justify-center col-span-6 sm:col-span-4">
          <h3>Téléphone</h3>
          <p>{phone}</p>
        </div>
      )}

      <Link
        className="bg-primary-400 rounded-md p-2 text-center hover:shadow-custom duration-300 hover:bg-primary-700 flex items-center justify-center h-fit"
        href={`/dashboard/resume/${id}`}
      >
        Voir plus
      </Link>

      <form action="">
        <button
          type="submit"
          className=" bg-red-500 rounded-md hover:bg-red-600 duration-150 p-2 text-black"
        >
          Supprimer
        </button>
      </form>
    </div>
  );
}

import { TrophyIcon } from "@heroicons/react/24/solid";
import { BestDebtors } from "@/app/lib/datas/utility";
import clsx from "clsx";

export default function BestDebtorCard({
  index,
  firstname,
  lastname,
  remaining_capital: remainingCapital,
}: BestDebtors & { index: number }) {
  return (
    <div className="w-full flex justify-between items-center font-bold text-lg p-3 sm:p-4 bg-white shadow-lg rounded-md mb-4">
      <TrophyIcon
        className={clsx(
          "w-[35px]",
          { "text-amber-300": index === 0 },
          { "text-zinc-400": index === 1 },
          { "text-amber-900": index === 2 }
        )}
      />
      <p>
        {lastname.toLocaleUpperCase()} {firstname}
      </p>

      <p
        className={clsx(
          Number(remainingCapital) >= 0 ? "text-orange-400" : "text-green-400"
        )}
      >
        {Number(remainingCapital) >= 0 ? "-" : "+"}&nbsp;
        {Math.abs(Number(remainingCapital)).toFixed(2).toString()} €
      </p>
    </div>
  );
}

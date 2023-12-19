import { fetchRemainingCapital } from "@/app/lib/datas/utility";
import clsx from "clsx";
import { CurrencyEuroIcon } from "@heroicons/react/24/solid";

export default async function RemainingCapital() {
  const remainingCapital = await fetchRemainingCapital();
  const { total_debts: debts, total_refunds: refunds } = remainingCapital;

  // CAREFUL ! We need to fixed (2) on this calcul because numbers are float and there's a lack of precision
  // Issue without toFixed(2) : 40.30 - 15.00 = 22.299999999997
  const calcTotalBalance = (Number(debts) - Number(refunds)).toFixed(2);

  return (
    <section className="w-full min-h-[100px] bg-slate-50 rounded-md p-4 sm:mb-0 mb-2 sm:col-span-6 sm:row-span-1">
      <h2 className="flex gap-2 items-center">
        <CurrencyEuroIcon className="w-[40px]" />
        TOTAL Capital restant dû
      </h2>

      {/* UI IMPROVMENTS TO MAKE HERE ! */}
      {Number(calcTotalBalance) ? (
        <p
          className={clsx(
            "mt-4 font-bold text-lg",
            Number(calcTotalBalance) > 0 ? "text-orange-400" : "text-green-400"
          )}
        >
          {Number(calcTotalBalance) > 0 ? "-" : "+"}{" "}
          {Math.abs(Number(calcTotalBalance)).toFixed(2)} €
        </p>
      ) : (
        <p className="mt-4 italic">
          Aucune balance à afficher pour le moment...
        </p>
      )}
    </section>
  );
}

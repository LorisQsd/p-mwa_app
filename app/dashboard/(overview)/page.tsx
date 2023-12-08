import {
  ChartPieIcon,
  ChartBarIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/solid";
import DebtorButton from "@/app/ui/dashboard/debtorButton";
import { fetchRemainingCapital } from "@/app/lib/datas/utility";
import clsx from "clsx";

// This component is in an overview because later, we want to avoid rendering pending issues with skeletons between each components.
export default async function Dashboard() {
  const [remainingCapital] = await Promise.all([fetchRemainingCapital()]);
  const { total_debts: debts, total_refunds: refunds } = remainingCapital;

  // CAREFUL ! We need to fixed (2) on this calcul because numbers are float and there's a lack of precision
  // Issue without toFixed(2) : 40.30 - 15.00 = 22.299999999997
  const calcTotalBalance = (Number(debts) - Number(refunds)).toFixed(2);

  return (
    <div className="w-full text-black sm:grid sm:grid-cols-12 sm:gap-3 overflow-y-auto">
      <section className="w-full min-h-[200px] bg-slate-50 rounded-md p-4 mb-2 sm:mb-0 sm:col-span-6 sm:row-span-4">
        <h2 className="flex gap-2 items-center">
          <ChartPieIcon className="w-[40px]" />
          Balance Financière
        </h2>

        <p className="italic">Feature à venir...</p>
      </section>

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
              Number(calcTotalBalance) > 0
                ? "text-orange-400"
                : "text-green-400"
            )}
          >
            {Number(calcTotalBalance) > 0 ? "-" : "+"}{" "}
            {Math.abs(Number(calcTotalBalance))} €
          </p>
        ) : (
          <p className="mt-4 italic">
            Aucune balance à afficher pour le moment...
          </p>
        )}
      </section>

      <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 sm:mb-0 mb-2 sm:col-span-6 sm:row-span-3">
        <h2 className="flex gap-2 items-center">
          <ChartBarIcon className="w-[40px]" />
          Classement des débiteurs
        </h2>

        <p className="italic">Feature à venir...</p>
      </section>

      <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 mb-2 sm:mb-0 md:col-span-12 hidden md:block">
        <h2 className="flex gap-2 items-center">FEATURE A VENIR</h2>

        <p className="italic">Feature à venir...</p>
      </section>

      <DebtorButton />
    </div>
  );
}

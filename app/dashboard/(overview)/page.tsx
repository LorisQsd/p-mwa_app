import { ChartPieIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import DebtorButton from "@/app/ui/dashboard/debtorButton";
import { fetchBestDebtors } from "@/app/lib/datas/utility";
import BestDebtorCard from "@/app/ui/dashboard/bestDebtorCard";
import { Suspense } from "react";
import RemainingCapital from "@/app/ui/dashboard/remainingCapital";

// This component is in an overview because later, we want to avoid rendering pending issues with skeletons between each components.
export default async function Dashboard() {
  const bestDebtors = await fetchBestDebtors();

  return (
    <div className="w-full text-black sm:grid sm:grid-cols-12 sm:gap-3 overflow-y-auto">
      <section className="w-full min-h-[200px] bg-slate-50 rounded-md p-4 mb-2 sm:mb-0 sm:col-span-6 sm:row-span-4">
        <h2 className="flex gap-2 items-center">
          <ChartPieIcon className="w-[40px]" />
          Balance Financière
        </h2>

        <p className="italic">Feature à venir...</p>
      </section>

      <RemainingCapital />

      {/* DEBTORS LEADER BOARD */}
      <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 sm:mb-0 mb-2 sm:col-span-6 sm:row-span-3 overflow-auto">
        <h2 className="flex gap-2 items-center mb-2">
          <ChartBarIcon className="w-[40px]" />
          Classement des débiteurs
        </h2>

        {bestDebtors ? (
          bestDebtors.map((debtor, index) => (
            <BestDebtorCard key={debtor.id} {...debtor} index={index} />
          ))
        ) : (
          <p className="italic">Pas encore de débiteur à classer.</p>
        )}
      </section>

      <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 mb-2 sm:mb-0 md:col-span-12 hidden md:block">
        <h2 className="flex gap-2 items-center">FEATURE A VENIR</h2>

        <p className="italic">Feature à venir...</p>
      </section>

      <DebtorButton />
    </div>
  );
}

import { ChartPieIcon, CurrencyEuroIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  return (
    <>
      <div className="w-full text-black sm:grid sm:grid-cols-12 sm:gap-3">
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

          <p className="italic">Feature à venir...</p>
        </section>

        <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 sm:mb-0 mb-2 sm:col-span-6 sm:row-span-3">
          <h2 className="flex gap-2 items-center">
            <ChartBarIcon className="w-[40px]" />
            Classement des débiteurs
          </h2>

          <p className="italic">Feature à venir...</p>
        </section>

        <section className="w-full min-h-[250px] bg-slate-50 rounded-md p-4 mb-2 sm:mb-0 md:col-span-12 hidden md:block">
          <h2 className="flex gap-2 items-center">
            FEATURE A VENIR
          </h2>

          <p className="italic">Feature à venir...</p>
        </section>
      </div>
    </>
  );
}

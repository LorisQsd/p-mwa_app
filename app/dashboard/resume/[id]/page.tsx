import { fetchRefundsByDebtorId } from "@/app/lib/datas/refund";
import { fetchDebtsByDebtorId } from "@/app/lib/datas/debt";
import { fetchDebtorById } from "@/app/lib/datas/debtor";
import { fetchRemainingCapitalByDebtorId } from "@/app/lib/datas/utility";
import { fetchNextReminderByDebtor } from "@/app/lib/datas/reminder";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import DebtButton from "@/app/ui/dashboard/resume/debtButton";
import DebtCard from "@/app/ui/dashboard/resume/debtCard";
import RefundButton from "@/app/ui/dashboard/resume/refundButton";
import RefundCard from "@/app/ui/dashboard/resume/refundCard";
import ReminderButton from "@/app/ui/dashboard/resume/reminderButton";
import clsx from "clsx";
import DebtorInformationSection from "@/app/ui/dashboard/resume/DebtorInformationSection";

export default async function Page({ params }: { params: { id: string } }) {
  const debtorId = params.id;

  const [debtor, debts, refunds, remainingCapital, lastReminder] =
    await Promise.all([
      fetchDebtorById(debtorId),
      fetchDebtsByDebtorId(debtorId),
      fetchRefundsByDebtorId(debtorId),
      fetchRemainingCapitalByDebtorId(debtorId),
      fetchNextReminderByDebtor(debtorId),
    ]);

  if (!debtor) {
    return notFound();
  }

  // FORMAT DATES //
  const dateFormat = "DD/MM/YYYY";
  // We want to format the next reminder only if we get a reminder
  const formatedNextReminder =
    lastReminder?.date &&
    dayjs(lastReminder.date.toString()).format(dateFormat);

  // Better naming :
  const statusName = debtor.name;

  return (
    <>
      <div className="w-full overflow-y-auto pr-2">
        <div className="md:flex gap-4 items-start">
          {/* DEBTOR INFORMATIONS SECTION */}
          <DebtorInformationSection {...debtor} />

          {/* REMINDERS SECTION */}
          <section className="w-full bg-slate-100 rounded-md text-black p-4 max-w-[600px] mx-auto">
            <h2 className="text-center mb-4">Historique des relances</h2>

            <div className="flex justify-between">
              {formatedNextReminder ? (
                <>
                  <p className="font-bold">Prochaine relance le</p>
                  <p>{formatedNextReminder}</p>
                </>
              ) : (
                <p className="text-center w-full italic">
                  Pas encore de relance prévue
                </p>
              )}
            </div>
            <button
              type="button"
              className="rhd italic text-sm mb-4 text-end w-full hover:underline"
            >
              Voir plus
            </button>

            <ReminderButton debtorId={debtorId} />
          </section>
        </div>

        <h2 className="text-center my-4">Compte rendu financier</h2>

        {remainingCapital && (
          <aside
            className={clsx(
              "bg-slate-100 rounded-md text-black p-4 w-fit",
              Number(remainingCapital) >= 0
                ? "text-orange-400"
                : "text-green-400"
            )}
          >
            <h2>
              {Number(remainingCapital) >= 0 ? "-" : "+"}{" "}
              {Math.abs(Number(remainingCapital))} €
            </h2>
          </aside>
        )}
        {debts && debts.map((debt) => <DebtCard key={debt.id} {...debt} />)}
        {refunds &&
          refunds.map((refund) => <RefundCard key={refund.id} {...refund} />)}

        {/* ADD REFUND BUTTON */}
        <RefundButton debtorId={debtorId} />

        {/* ADD DEBT BUTTON */}
        <DebtButton debtorId={debtorId} />
      </div>
    </>
  );
}

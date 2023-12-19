export function RemainingCapitalSkeleton() {
  return (
    <div className="mt-4">
      <div className="w-[100px] bg-gray-300 rounded-sm animate-pulse text-transparent" >.</div>
    </div>
  );
}

export function DebtorCardSkeleton() {
  return (
    <div className="w-full flex justify-between items-center font-bold text-lg p-3 sm:p-4 bg-white shadow-lg rounded-md mb-4 animate-pulse">
      {/* TROPHY ICON */}
      <div className="w-[35px] aspect-square rounded-full bg-gray-300" />
      {/* FULLNAME */}
      <div className="text-transparent bg-gray-300 rounded-sm w-20">.</div>
      {/* REMAINING CAPITAL */}
      <div className="text-transparent bg-gray-300 rounded-sm w-20">.</div>
    </div>
  );
}

export function DebtorCardsSkeleton() {
  return (
    <>
      <DebtorCardSkeleton />
      <DebtorCardSkeleton />
      <DebtorCardSkeleton />
    </>
  );
}

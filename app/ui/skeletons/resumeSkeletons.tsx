export function ResumeCardSkeleton() {
  // MAINTAINABILITY //
  const contentClasses = "bg-gray-300 rounded";
  const itemClasses =
    "flex flex-col gap-2 justify-center w-20 animate-pulse w-[90%]";

  return (
    <div className="w-full bg-slate-100 rounded-md py-2 px-8 mb-5 grid grid-cols-12 justify-between items-center gap-4 text-transparent">
      {/* FULLNAME */}
      <div
        className={`${itemClasses} col-span-6 sm:col-span-4 lg:col-span-2 lg:row-start-1`}
      >
        <div className={`${contentClasses} w-full`}>.</div>
        <div className={`${contentClasses} w-1/2`}>.</div>
      </div>
      {/* EMAIL */}
      <div
        className={`${itemClasses} col-span-6 sm:col-span-4 lg:col-span-2 lg:row-start-1`}
      >
        <div className={`${contentClasses} w-full`}>.</div>
        <div className={`${contentClasses} w-1/2`}>.</div>
      </div>
      {/* PHONE */}
      <div
        className={`${itemClasses} col-span-12 sm:col-span-4 lg:col-span-2 lg:row-start-1`}
      >
        <div className={`${contentClasses} w-full`}>.</div>
        <div className={`${contentClasses} w-1/2`}>.</div>
      </div>
      {/* DATE */}
      <div
        className={`${itemClasses} col-span-12 sm:col-span-6 sm:row-start-2 lg:col-start-7 lg:col-end-9 lg:row-start-1`}
      >
        <div className={`${contentClasses} w-full`}>.</div>
        <div className={`${contentClasses} w-1/2`}>.</div>
      </div>
      {/* STATUS */}
      <div
        className={`${itemClasses} col-span-12 sm:col-span-6 sm:row-start-2 lg:col-start-9 lg:col-end-11 lg:row-start-1`}
      >
        <div className={`${contentClasses} w-full`}>.</div>
        <div className={`${contentClasses} w-1/2`}>.</div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 col-span-12 flex-wrap justify-center sm:gap-6 lg:col-start-11 lg:col-end-13 animate-pulse">
        <div className="rounded-md p-2 bg-gray-300 w-28">.</div>

        <div className="rounded-md p-2 bg-gray-300 w-28">.</div>
      </div>
    </div>
  );
}

export function ResumeCardsSkeleton() {
  return (
    <>
      <ResumeCardSkeleton />
      <ResumeCardSkeleton />
      <ResumeCardSkeleton />
    </>
  );
}

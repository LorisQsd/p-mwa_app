import { Suspense } from "react";
import CardWrapper from "@/app/ui/dashboard/resume/cardWrapper";
import { ResumeCardsSkeleton } from "@/app/ui/skeletons/resumeSkeletons";

export default function Resume() {
  return (
    <div className="w-full overflow-y-auto pr-2">
      <h1>Vos débiteurs</h1>

      <Suspense fallback={<ResumeCardsSkeleton />}>
        <CardWrapper />
      </Suspense>
    </div>
  );
}

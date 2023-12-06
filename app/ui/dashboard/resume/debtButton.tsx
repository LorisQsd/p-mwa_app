"use client";
// We need to make a client component to separate the logic with states
// We are using a modale into the dashboard/resume/id page so we need to manage a state with use State and make a component for it

import { useState } from "react";
import { createPortal } from "react-dom";
import AddDebtModale from "../addDebtModale";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function DebtButton({debtorId}: {debtorId: string}) {
  // REACT STATE //
  const [modale, setModale] = useState(false);

  // HANDLERS //
  const handleCancelClick = () => {
    setModale(false);
  };

  return (
    <>
      <button
        onClick={() => setModale(true)}
        type="button"
        className="flex justify-center items-center bg-orange-500 text-black p-2 rounded-lg hover:shadow-custom fixed bottom-32 sm:bottom-16 right-2 gap-2"
      >
        <PlusIcon className="w-[25px]" /> Dette
      </button>
      {modale &&
        createPortal(
          <AddDebtModale debtorId={debtorId} modaleStateSetter={handleCancelClick} />,
          document.body
        )}
    </>
  );
}

"use client";
// We need to make a client component to separate the logic with states
// We are using a modal into the dashboard/resume/id page so we need to manage a state with use State and make a component for it

import { useState } from "react";
import { createPortal } from "react-dom";
import AddReminderModal from "../addReminderModal";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function ReminderButton({ debtorId }: { debtorId: string }) {
  // REACT STATE //
  const [modal, setModal] = useState(false);

  // HANDLERS //
  const handleCancelClick = () => {
    setModal(false);
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        type="button"
        className="flex justify-center items-center bg-primary-400 text-black p-2 rounded-lg hover:shadow-custom mx-auto gap-2 text-sm duration-300"
      >
        Actualiser la relance
        <ChevronDoubleRightIcon className="w-[20px]" />
      </button>
      {modal &&
        createPortal(
          <AddReminderModal
            debtorId={debtorId}
            modalStateSetter={handleCancelClick}
          />,
          document.body
        )}
    </>
  );
}

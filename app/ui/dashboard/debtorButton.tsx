"use client";
// We need to make a client component to separate the logic with states
// We are using a modal into the dashboard/resume/id page so we need to manage a state with use State and make a component for it

import { useState } from "react";
import { createPortal } from "react-dom";
import AddDebtorModal from "./addDebtorModal";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function DebtorButton() {
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
        className="w-[50px] bg-primary-400 shadow-lg hover:shadow-custom hover:scale-105 duration-300 rounded-full text-white p-1 fixed bottom-24 right-5 flex md:w-fit items-center gap-2 sm:bottom-5"
      >
        <PlusIcon className="-[50px] md:w-[40px] text-black" />
        <span className="hidden md:block md:mr-2 text-sm tracking-wider md:text-black">
            Ajouter un débiteur
          </span>
      </button>
      {modal && createPortal(<AddDebtorModal modalStateSetter={setModal} />, document.body)}
    </>
  );
}

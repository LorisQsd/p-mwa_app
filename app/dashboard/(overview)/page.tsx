"use client";

import { useState } from "react";
// === REACT ROUTER DOM === //
import { createPortal } from "react-dom";
import {
  ChartPieIcon,
  CurrencyEuroIcon,
  ChartBarIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import AddDebtorModale from "@/app/ui/dashboard/addDebtorModale";

export default function Dashboard() {
  const [modal, setModal] = useState(true);

  // Handlers //
  const showModal = () => {
    setModal(true);
  }

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
          <h2 className="flex gap-2 items-center">FEATURE A VENIR</h2>

          <p className="italic">Feature à venir...</p>
        </section>

        <button
          type="button"
          onClick={showModal}
          className="w-[50px] bg-primary-400 shadow-lg hover:shadow-custom rounded-full text-white p-1 fixed bottom-24 right-5 flex md:w-fit items-center gap-2 sm:bottom-5"
        >
          <PlusIcon className="w-[50px] md:w-[40px]" />
          <span className="hidden md:block md:mr-2 text-sm tracking-wider">
            Ajouter un débiteur
          </span>
        </button>
      </div>

      {/* DISPLAY ADD INFO MODAL */}
      {modal && createPortal(<AddDebtorModale modaleState={modal} modaleStateSetter={setModal} />, document.body)}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Debt } from "@/app/lib/definitions";
import dayjs from "dayjs";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { deleteDebt, updateDebt } from "@/app/lib/actions/debt";
import Input from "../../input";
import Button from "../../button";
import { useFormState } from "react-dom";

export default function DebtCard({
  id,
  name,
  amount,
  date,
  debtor_id: debtorId,
}: Debt) {
  // BIND TO ALLOW DELETE DEBT ACTION //
  const deleteDebtWithId = deleteDebt.bind(null, id, debtorId);
  // BIND TO ALLOW UPDATE DEBT ACTION //
  const updateDebtWithId = updateDebt.bind(null, id, debtorId);

  // FORM STATE TO SEND IT //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(updateDebtWithId, initialState);

  // REACT STATE //
  const [editing, setEditing] = useState(false);

  // CONTROLLED INPUTS //
  const [debtName, setDebtName] = useState(name);
  const [debtAmount, setDebtAmount] = useState(amount.toString());

  // FORMATED DATE //
  const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY");

  // We want to close the form with a useEffect
  // Once the form is sent, we want to check whether there are messages or errors
  // If not, we can close the form by setting its state to false
  useEffect(() => {
    if (errorMessage?.message || errorMessage?.errors) return;

    setEditing(false);
  }, [errorMessage]);

  return (
    <article className="w-full bg-orange-400 my-2 rounded-md p-6 flex flex-wrap justify-between text-black">
      {editing ? (
        <form
          action={dispatch}
          className="flex gap-2 items-center justify-between grow mr-4"
        >
          <Input
            isRequired
            name="name"
            label="* Raison"
            type="text"
            value={debtName}
            onChange={setDebtName}
            errMessage={errorMessage?.errors?.name}
          />

          <Input
            isRequired
            name="amount"
            label="* Montant"
            type="number"
            value={debtAmount}
            onChange={setDebtAmount}
            errMessage={errorMessage?.errors?.amount}
          />

          <Button type="submit">Confirmer</Button>
        </form>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h2>Raison</h2>
            <p>{name}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2>Montant</h2>
            <p>{amount} €</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-center">Depuis le</h2>
            <p>{formatedDate}</p>
          </div>
        </>
      )}

      <div className="flex flex-col">
        {/* DELETE DEBT */}
        <form action={deleteDebtWithId}>
          <button
            type="submit"
            className="hover:scale-110 duration-300 text-red-600 hover:text-red-500"
            title="Supprimer"
          >
            <TrashIcon className="w-[25px]" />
          </button>
        </form>

        {/* EDIT DEBT */}
        <button
          type="button"
          className="hover:scale-110 duration-300 text-primary-700 hover:text-primary-400"
          title="Éditer"
          onClick={() => setEditing((prevState) => !prevState)}
        >
          <PencilSquareIcon className="w-[25px]" />
        </button>
      </div>
    </article>
  );
}

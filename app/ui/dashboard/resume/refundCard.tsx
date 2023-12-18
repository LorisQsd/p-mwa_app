"use client";

import { useState } from "react";
import { Refund } from "@/app/lib/definitions";
import dayjs from "dayjs";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { deleteRefund, updateRefund } from "@/app/lib/actions/refund";
import Input from "../../input";
import Button from "../../button";
import { useFormState } from "react-dom";

export default function RefundCard({
  id,
  source,
  amount,
  date,
  debtor_id: debtorId,
}: Refund) {
  // BIND TO ALLOW DELETE REFUND ACTION //
  const deleteRefundWithId = deleteRefund.bind(null, id, debtorId);
  // BIND TO ALLOW UPDATE REFUND ACTION //
  const updateRefundWithId = updateRefund.bind(null, id, debtorId);

  // FORM STATE TO SEND IT //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(
    updateRefundWithId,
    initialState
  );

  // REACT STATE //
  const [editing, setEditing] = useState(false);

  // CONTROLLED INPUTS //
  const [refundSource, setRefundSource] = useState(source);
  const [refundAmount, setRefundAmount] = useState(amount.toString());

  // FORMATED DATE //
  const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY");

  // HANDLER //
  // !! I could improve this behavior by handling it with skeletons later !! //
  const handleSubmit = () => {
    console.log(errorMessage);
    if (!errorMessage.errors && !errorMessage.message) {
      // If there isn't any errMessage we can close the form
      setEditing(false);
      // It will rerender the component and display content 'cause editing will be false
    }
  };

  return (
    <article className="w-full bg-green-400 my-2 rounded-md p-6 flex flex-wrap justify-between text-black">
      {editing ? (
        <form
          action={dispatch}
          className="flex gap-2 items-center justify-between grow mr-4"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            name="source"
            label="* Source"
            type="text"
            value={refundSource}
            onChange={setRefundSource}
            errMessage={errorMessage?.errors?.source}
          />

          <Input
            isRequired
            name="amount"
            label="* Montant"
            type="number"
            value={refundAmount}
            onChange={setRefundAmount}
            errMessage={errorMessage?.errors?.amount}
          />

          <Button type="submit">Confirmer</Button>
        </form>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h2>Source</h2>
            <p>{source}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2>Montant</h2>
            <p>{amount} €</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-center">Éffectué le</h2>
            <p>{formatedDate}</p>
          </div>
        </>
      )}

      <div className="flex flex-col">
        {/* DELETE REFUND */}
        <form action={deleteRefundWithId}>
          <button
            type="submit"
            className="hover:scale-110 duration-300 text-red-600 hover:text-red-500"
            title="Supprimer"
          >
            <TrashIcon className="w-[25px]" />
          </button>
        </form>

        {/* EDIT REFUND */}
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

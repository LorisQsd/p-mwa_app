import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
import { createRefund } from "@/app/lib/actions/refund";

type AddRefundModalProps = {
  modalStateSetter: Dispatch<SetStateAction<boolean>>;
  debtorId: string;
};

export default function AddRefundModal({
  modalStateSetter,
  debtorId,
}: AddRefundModalProps) {
  // BIND TO ALLOW CREATE REFUND WITH DEBTOR ID //
  const createRefundWithDebtorId = createRefund.bind(null, debtorId);

  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(
    createRefundWithDebtorId,
    initialState
  );

  // HANDLERS //
  const handleCancelClick = () => {
    modalStateSetter(false);
  };
  // We want to close the form with a useEffect
  // Once the form is sent, we want to check whether there are messages or errors
  // If not, we can close the form by setting its state to false
  useEffect(() => {
    if (errorMessage?.message || errorMessage?.errors) return;

    modalStateSetter(false);
  }, [errorMessage, modalStateSetter]);

  // REACT STATES //
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;un remboursement</h1>

      <form action={dispatch} className="flex flex-col items-center">
        <Input
          label="* Source"
          isRequired
          type="text"
          name="source"
          value={source}
          onChange={setSource}
        />

        <Input
          label="* Montant"
          isRequired
          type="number"
          name="amount"
          value={amount}
          onChange={setAmount}
        />

        <Button type="submit" className="w-1/2 mt-5">
          Valider
        </Button>
      </form>
    </Modal>
  );
}

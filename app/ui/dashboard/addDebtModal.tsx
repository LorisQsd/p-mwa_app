import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { createDebt } from "@/app/lib/actions/debt";

type AddDebtModalProps = {
  modalStateSetter: Dispatch<SetStateAction<boolean>>;
  debtorId: string;
};

export default function AddDebtModal({
  modalStateSetter,
  debtorId,
}: AddDebtModalProps) {
  // BIND TO ALLOW CREATE DEBT WITH DEBTOR ID //
  const createDebtWithDebtorId = createDebt.bind(null, debtorId);

  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(
    createDebtWithDebtorId,
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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;une dette</h1>

      <form action={dispatch} className="flex flex-col items-center">
        <Input
          label="* Raison"
          isRequired
          type="text"
          name="name"
          value={name}
          onChange={setName}
        />

        <Input
          label="* Montant"
          isRequired
          type="number"
          name="amount"
          value={amount}
          onChange={setAmount}
        />

        <SubmitButton />
      </form>
    </Modal>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-1/2 mt-5" pending={pending}>
      Valider
    </Button>
  );
}

import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
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
  const [errorMessage, dispatch] = useFormState(createDebtWithDebtorId, initialState);

  // HANDLERS //
  const handleCancelClick = () => {
    modalStateSetter(false);
  };

  // When we submit the form, we want to hide the modal if there's no errorMessage sent to the client
  // Otherwise, the modal will stay open even if the request is successful
  const handleSubmit = () => {
    if (!errorMessage.message) handleCancelClick();
    else console.log(errorMessage);
  };

  // REACT STATES //
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;une dette</h1>

      <form
        action={dispatch}
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
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

        <Button type="submit" className="w-1/2 mt-5">
          Valider
        </Button>
      </form>
    </Modal>
  );
}

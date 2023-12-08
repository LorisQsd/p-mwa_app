import { Dispatch, SetStateAction, useState } from "react";
import Modale from "./modal";
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
  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(createRefund, initialState);

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
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [debtorIdState, setDebtorIdState] = useState(debtorId);

  return (
    <Modale closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;un remboursement</h1>

      <form
        action={dispatch}
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
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

        <Input
          label="debtor_id"
          isRequired
          type="hidden"
          name="debtor_id"
          value={debtorIdState}
          onChange={setDebtorIdState}
        />

        <Button type="submit" className="w-1/2 mt-5">
          Valider
        </Button>
      </form>
    </Modale>
  );
}

import { Dispatch, SetStateAction, useState } from "react";
import Modale from "./modale";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
import { createDebt } from "@/app/lib/actions";

type AddDebtModaleProps = {
  modaleStateSetter: Dispatch<SetStateAction<boolean>>;
  debtorId: string;
};

export default function AddDebtModale({
  modaleStateSetter,
  debtorId,
}: AddDebtModaleProps) {
  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(createDebt, initialState);

  // HANDLERS //
  const handleCancelClick = () => {
    modaleStateSetter(false);
  };

  const handleSubmit = () => {

    console.log(errorMessage)

    if (!errorMessage.message) handleCancelClick();
    else console.log(errorMessage);
  };

  // REACT STATES //
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [debtorIdState, setDebtorIdState] = useState(debtorId);

  return (
    <Modale closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;une dette</h1>

      <form action={dispatch} className="flex flex-col items-center" onSubmit={handleSubmit}>
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

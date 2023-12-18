import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
import { createDebtor } from "@/app/lib/actions/debtor";

type AddDebtorModalProps = {
  modalStateSetter: Dispatch<SetStateAction<boolean>>;
};

export default function AddDebtorModal({
  modalStateSetter,
}: AddDebtorModalProps) {
  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(createDebtor, initialState);

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
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;un débiteur</h1>

      <form className="flex flex-col items-center" action={dispatch}>
        <div className="flex gap-4">
          <Input
            label="* Nom"
            isRequired
            type="text"
            name="lastname"
            value={lastname}
            onChange={setLastname}
            errMessage={errorMessage?.errors?.lastname}
          />

          <Input
            label="* Prénom"
            isRequired
            type="text"
            name="firstname"
            value={firstname}
            onChange={setFirstname}
            errMessage={errorMessage?.errors?.firstname}
          />
        </div>

        <Input
          label="Email"
          type="email"
          name="email"
          className="w-full"
          value={email}
          onChange={setEmail}
          errMessage={errorMessage?.errors?.email}
        />

        <Input
          label="Téléphone"
          type="text"
          name="phone"
          className="w-full"
          value={phone}
          onChange={setPhone}
          errMessage={errorMessage?.errors?.phone}
        />

        <Button type="submit" className="w-1/2 mt-5">
          Valider
        </Button>
      </form>
    </Modal>
  );
}

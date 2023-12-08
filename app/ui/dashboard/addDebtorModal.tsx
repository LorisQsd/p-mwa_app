import { Dispatch, SetStateAction, useState } from "react";
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

  // When we submit the form, we want to hide the modal if there's no errorMessage sent to the client
  // Otherwise, the modal will stay open even if the request is successful
  const handleSubmit = () => {
    if (!errorMessage.message) handleCancelClick()
    else console.log(errorMessage);
  }

  // REACT STATES //
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;un débiteur</h1>

      <form className="flex flex-col items-center" action={dispatch} onSubmit={handleSubmit}>
        <div className="flex gap-4">
        <Input
          label="* Nom"
          isRequired
          type="text"
          name="lastname"
          value={lastname}
          onChange={setLastname}
        />

        <Input
          label="* Prénom"
          isRequired
          type="text"
          name="firstname"
          value={firstname}
          onChange={setFirstname}
        />

        </div>

        <Input
          label="Email"
          type="email"
          name="email"
          className="w-full"
          value={email}
          onChange={setEmail}
        />

        <Input
          label="Téléphone"
          type="text"
          name="phone"
          className="w-full"
          value={phone}
          onChange={setPhone}
        />

        <Button type="submit" className="w-1/2 mt-5">Valider</Button>
      </form>
    </Modal>
  );
}

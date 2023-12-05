import { Dispatch, SetStateAction, useState } from "react";
import Modale from "./modale";
import Input from "../input";
import Button from "../button";

type AddDebtorModaleProps = {
  modaleState: boolean;
  modaleStateSetter: Dispatch<SetStateAction<boolean>>;
};

export default function AddDebtorModale({
  modaleState,
  modaleStateSetter,
}: AddDebtorModaleProps) {
  // HANDLERS //
  const handleCancelClick = () => {
    modaleStateSetter(false);
  };

  // REACT STATES //
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Modale closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;un débiteur</h1>

      <form className="flex flex-col items-center">
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

        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={setEmail}
        />

        <Input
          label="Téléphone"
          type="text"
          name="phone"
          value={phone}
          onChange={setPhone}
        />

        <Button type="submit" content="Valider" className="w-1/2 mt-5" />
      </form>
    </Modale>
  );
}

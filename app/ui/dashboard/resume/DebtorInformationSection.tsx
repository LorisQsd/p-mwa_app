"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { Debtor, Status } from "@/app/lib/definitions";
import Input from "../../input";
import Button from "../../button";
import { updateDebtor } from "@/app/lib/actions/debtor";
import { useFormState } from "react-dom";

export default function DebtorInformationSection({
  debtorId,
  lastname,
  firstname,
  email,
  phone,
  name: statusName,
  date,
}: Debtor & Status & { debtorId: string }) {
  // BIND TO ALLOW UPDATE DEBTOR ACTION //
  const updateDebtorWithId = updateDebtor.bind(null, debtorId);

  // FORM STATE TO SEND IT //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(
    updateDebtorWithId,
    initialState
  );

  // REACT STATES //
  const [editing, setEditing] = useState<boolean>(false);

  // CONTROLLED INPUTS //
  const [editFirstname, setEditFirstname] = useState<string>(firstname);
  const [editLastname, setEditLastname] = useState<string>(lastname);
  const [editEmail, setEditEmail] = useState<string>(email || "");
  const [editPhone, setEditPhone] = useState<string>(phone || "");

  // FORMAT DATES //
  const dateFormat = "DD/MM/YYYY";
  const formatedDate = dayjs(date.toString()).format(dateFormat);

  // We want to close the form with a useEffect
  // Once the form is sent, we want to check whether there are messages or errors
  // If not, we can close the form by setting its state to false
  useEffect(() => {
    if (errorMessage?.message || errorMessage?.errors) return;

    setEditing(false);
  }, [errorMessage]);

  return (
    <section className="w-full bg-slate-100 rounded-md text-black p-4 max-w-[600px] mx-auto mb-4">
      <div className="flex justify-center items-center gap-2 mb-4">
        <h2 className="text-center">Informations du débiteur</h2>
        <button
          type="button"
          onClick={() => setEditing((prevState) => !prevState)}
          title="Feature à venir"
        >
          <PencilSquareIcon className="w-[25px] hover:text-black/75 duration-150" />
        </button>
      </div>

      {editing ? (
        <form action={dispatch}>
          <Input
            label="* Nom"
            isRequired
            name="lastname"
            type="text"
            value={editLastname}
            onChange={setEditLastname}
            errMessage={errorMessage?.errors?.lastname}
          />

          <Input
            label="* Prénom"
            isRequired
            name="firstname"
            type="text"
            value={editFirstname}
            onChange={setEditFirstname}
            errMessage={errorMessage?.errors?.firstname}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={editEmail}
            onChange={setEditEmail}
            errMessage={errorMessage?.errors?.email}
          />

          <Input
            label="Téléphone"
            name="phone"
            type="number"
            value={editPhone}
            onChange={setEditPhone}
            errMessage={errorMessage?.errors?.phone}
          />

          <Button type="submit" className="mx-auto block mt-2">
            Valider
          </Button>
        </form>
      ) : (
        <>
          <div className="flex justify-between mb-2">
            <p className="font-bold">Nom</p>
            <p>
              {lastname} {firstname}
            </p>
          </div>

          {email && (
            <div className="flex justify-between mb-2">
              <p className="font-bold">Email</p>
              <p>{email}</p>
            </div>
          )}

          {phone && (
            <div className="flex justify-between mb-2">
              <p className="font-bold">Téléphone</p>
              <p>{formatPhoneNumber(phone)}</p>
            </div>
          )}

          <div className="flex justify-between mb-2">
            <p className="font-bold">Débiteur depuis le</p>
            <p>{formatedDate}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="font-bold">Status</p>
            <p>{statusName}</p>
          </div>
        </>
      )}
    </section>
  );
}

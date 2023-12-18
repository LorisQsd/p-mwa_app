"use client";

import { useState, useId } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { Debtor, Status } from "@/app/lib/definitions";
import Input from "../../input";
import Button from "../../button";

export default function DebtorInformationSection({
  lastname,
  firstname,
  email,
  phone,
  name: statusName,
  date,
}: Debtor & Status) {
  const inputId = useId();

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
        <form>
          <Input
            label="* Nom"
            isRequired
            name="lastname"
            type="text"
            value={editLastname}
            onChange={setEditLastname}
          />

          <Input
            label="* Prénom"
            isRequired
            name="firstname"
            type="text"
            value={editFirstname}
            onChange={setEditFirstname}
          />

          <Input
            label="Email"
            isRequired
            name="email"
            type="email"
            value={editEmail}
            onChange={setEditEmail}
          />

          <Input
            label="Téléphone"
            isRequired
            name="phone"
            type="number"
            value={editPhone}
            onChange={setEditPhone}
          />

          <Button type="submit" className="mx-auto block mt-2">Valider</Button>
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

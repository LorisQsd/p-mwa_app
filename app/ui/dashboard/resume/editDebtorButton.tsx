"use client";

import { useState } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function EditDebtorButton() {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <button type="button" onClick={() => setEditing((prevState) => !prevState)} title="Feature à venir">
      <PencilSquareIcon className="w-[25px] hover:text-black/75 duration-150" />
    </button>
  );
}

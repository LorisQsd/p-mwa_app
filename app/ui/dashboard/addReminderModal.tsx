import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { createReminder } from "@/app/lib/actions/reminders";

type AddReminderModalProps = {
  modalStateSetter: Dispatch<SetStateAction<boolean>>;
  debtorId: string;
};

export default function AddReminderModal({
  modalStateSetter,
  debtorId,
}: AddReminderModalProps) {
  // BIND TO ALLOW CREATE REMINDER WITH DEBTOR ID //
  const createReminderWithDebtorId = createReminder.bind(null, debtorId);

  // DISPATCHER //
  const initialState = { message: null, errors: {} };
  const [errorMessage, dispatch] = useFormState(
    createReminderWithDebtorId,
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
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;une relance</h1>

      <form action={dispatch} className="flex flex-col items-center">
        <Input
          label="* Libellé"
          isRequired
          type="text"
          name="comment"
          value={comment}
          onChange={setComment}
        />

        <Input
          label="* Date de relance"
          isRequired
          type="date"
          name="date"
          value={date}
          onChange={setDate}
        />

        <SubmitButton />
      </form>
    </Modal>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-1/2 mt-5"
      pending={pending}
    >
      Valider
    </Button>
  );
}

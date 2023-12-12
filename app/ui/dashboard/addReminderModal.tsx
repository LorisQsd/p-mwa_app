import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./modal";
import Input from "../input";
import Button from "../button";
import { useFormState } from "react-dom";
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
  const [errorMessage, dispatch] = useFormState(createReminderWithDebtorId, initialState);

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
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  return (
    <Modal closeModal={handleCancelClick}>
      <h1 className="text-center">Ajout d&apos;une relance</h1>

      <form
        action={dispatch}
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
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

        <Button type="submit" className="w-1/2 mt-5">
          Valider
        </Button>
      </form>
    </Modal>
  );
}

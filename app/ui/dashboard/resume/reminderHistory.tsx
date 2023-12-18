"use client";

import { useState } from "react";
import { Reminder } from "@/app/lib/definitions";
import dayjs from "dayjs";

export default function ReminderHistory({reminders}: {reminders: Reminder[]}) {
  // REACT STATE //
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="rhd italic text-sm text-end w-full hover:underline"
        onClick={() => setIsHistoryVisible((prevState) => !prevState)}
      >
        {isHistoryVisible ? "Cacher" : "Afficher"} l&apos;historique
      </button>

      {isHistoryVisible && (
        <ul className="border-2 border-gray-400 rounded-md p-2 italic">
          {reminders.map((reminder) => (
            <ReminderListItem key={reminder.id} {...reminder} />
          ))}
        </ul>
      )}
    </>
  );
}

function ReminderListItem({ comment, date }: Reminder) {
  // FORMAT DATES //
  const dateFormat = "DD/MM/YYYY";
  // We want to format the next reminder only if we get a reminder
  const formatedDate = date && dayjs(date.toString()).format(dateFormat);
  return (
    <li className="flex justify-between">
      <span className="font-bold">{comment}</span> <span>{formatedDate}</span>
    </li>
  );
}

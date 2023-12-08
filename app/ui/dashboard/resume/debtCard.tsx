import { Debt } from "@/app/lib/definitions";
import dayjs from "dayjs";

export default function DebtCard({ name, amount, date } : Debt) {
    const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY")

    return(
        <div className="w-full bg-orange-400 my-2 rounded-md py-2 px-4 flex flex-wrap justify-between text-black">

            <div className="flex flex-col justify-center items-center">
                <h2>Raison</h2>
                <p>{name}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2>Montant</h2>
                <p>{amount}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-center">Depuis le</h2>
                <p>{formatedDate}</p>
            </div>
        </div>
    )
}
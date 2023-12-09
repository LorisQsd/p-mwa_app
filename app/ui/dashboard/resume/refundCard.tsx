import { Refund } from "@/app/lib/definitions";
import dayjs from "dayjs";

export default function RefundCard({ source, amount, date } : Refund) {
    const formatedDate = dayjs(date.toString()).format("DD/MM/YYYY")

    return(
        <article className="w-full bg-green-400 my-2 rounded-md p-6 flex flex-wrap justify-between text-black">

            <div className="flex flex-col justify-center items-center">
                <h2>Source</h2>
                <p>{source}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2>Montant</h2>
                <p>{amount}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-center">Depuis le</h2>
                <p>{formatedDate}</p>
            </div>
        </article>
    )
}
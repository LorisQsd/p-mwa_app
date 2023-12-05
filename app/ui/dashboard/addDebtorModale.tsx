import { Dispatch, SetStateAction } from "react";
import Modale from "./modale";

type AddDebtorModaleProps = {
    modaleState: boolean,
    modaleStateSetter: Dispatch<SetStateAction<boolean>>
}

export default function AddDebtorModale({ modaleState, modaleStateSetter }: AddDebtorModaleProps) {
    // HANDLERS //
    const handleCancelClick = () => {
        modaleStateSetter(false)
    }
    
    return (
        <Modale closeModal={handleCancelClick}>
            <h1>Test modale</h1>
        </Modale>
    )
}
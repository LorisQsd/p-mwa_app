export type User = {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    avatar_id: string;
}

export type Debtor = {
    id: string;
    lastname: string;
    firstname: string;
    email: string | null;
    phone: string | null;
    date: string;
    user_id: string;
    status_id: string;
}

export type Debt = {
    id: string;
    name: string;
    amount: number;
    date: string;
    debtor_id: string;
}

export type Status = {
    id: string;
    name: string;
}
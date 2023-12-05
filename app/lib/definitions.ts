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
    user_id: string;
    status_id: string;
}
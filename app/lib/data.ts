import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Debtor, Status } from './definitions';

export async function fetchDebtors() {
    // Add noStore() here prevents the response from being cached
    // This is equivalent to fetch (..., {cache: 'no store'})
    noStore();

    try {
        const data = await sql<Debtor & Status >`SELECT * FROM debtors JOIN status ON debtors.status_id = status.id`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Echec lors de la récupération des débiteurs.')
    }
}
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Debtor } from './definitions';

export async function fetchDebtors() {
    // Add noStore() here prevents the response from being cached
    // This is equivalent to fetch (..., {cache: 'no store'})
    noStore();

    try {
        const data = await sql<Debtor>`SELECT * FROM debtors`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Echec lors de la récupération des débiteurs.')
    }
}
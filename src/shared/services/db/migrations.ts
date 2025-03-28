import { sql } from "drizzle-orm";

export const migrations = [
    sql`
        CREATE TABLE IF NOT EXISTS loads (
            client text NOT NULL,
            plate text NOT NULL,
            material text NOT NULL,
            quantity real NOT NULL,
            signaturePath text NOT NULL,
            paymentMethod text NOT NULL,
            insertedAt integer NOT NULL
        );
    `,
    sql`
        CREATE TABLE IF NOT EXISTS clients (
            id integer NOT NULL,
            name text NOT NULL
        );
    `,
    sql`
        CREATE TABLE IF NOT EXISTS plates (
            id integer NOT NULL,
            client_id integer NOT NULL,
            name text NOT NULL
        );
    `,
    sql`
        CREATE TABLE IF NOT EXISTS materials (
            id integer NOT NULL,
            name text NOT NULL
        );
    `
]


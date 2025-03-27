import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

type Holder = {
    name: string,
    id: number
}

export const loads = sqliteTable('loads', {
    client: text({ mode: "json" }).$type<Holder>().notNull(),
    plate: text({ mode: "json" }).$type<Holder>().notNull(),
    material: text({ mode: "json" }).$type<Holder>().notNull(),
    quantity: real().notNull(),
    signaturePath: text().notNull(),
    paymentMethod: text({ enum: ["installment", "cash"] }).notNull(),
    insertedAt: integer({ mode: "timestamp" }).notNull()
})

export const materials = sqliteTable('materials', {
    id: integer().unique().notNull(),
    name: text().notNull(),
})

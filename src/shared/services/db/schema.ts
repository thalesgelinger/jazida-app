import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const loads = sqliteTable('loads', {
    clientId: integer(),
    plateId: integer(),
    materialId: integer(),
    quantity: real(),
    signaturePath: text(),
    insertedAt: integer({ mode: "timestamp" })
})

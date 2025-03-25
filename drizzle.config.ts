import type { Config } from 'drizzle-kit';

const path = "./src/shared/services/db"

export default {
    schema: `${path}/schema.ts`,
    out: `${path}/drizzle`,
    dialect: 'sqlite',
    driver: 'expo',
} satisfies Config;


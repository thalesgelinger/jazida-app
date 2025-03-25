import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

const connection = openDatabaseSync('app.db', { enableChangeListener: true });

export const db = drizzle(connection);

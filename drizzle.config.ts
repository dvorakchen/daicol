import { defineConfig } from 'drizzle-kit';
import process from 'node:process';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema',
	dialect: 'postgresql',
	dbCredentials: { url: DATABASE_URL },
	verbose: true
	// strict: true
});

import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { apps } from './apps.ts';
import { bytea } from './index.ts';

export const visitHistories = pgTable(
	'app_reference_imgs',
	{
		appId: integer('app_id')
			.references(() => apps.id, { onDelete: 'cascade' })
			.notNull(),
		mimeType: varchar('mime_type', { length: 32 }),
		content: bytea('content')
	},
	(table) => [primaryKey({ columns: [table.appId] })]
);

export type visitHistory = typeof visitHistories.$inferSelect;

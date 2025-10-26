import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { apps } from './apps.ts';
import { bytea } from './index.ts';
import { relations } from 'drizzle-orm';

export const appReferenceImgs = pgTable(
	'app_reference_imgs',
	{
		appId: integer('app_id')
			.references(() => apps.id, { onDelete: 'cascade' })
			.notNull(),
		mimeType: varchar('mime_type', { length: 32 }).notNull().default(''),
		content: bytea('content')
	},
	(table) => [primaryKey({ columns: [table.appId] })]
);

export const appReferenceImgsRelations = relations(appReferenceImgs, ({ one }) => ({
	author: one(apps, {
		fields: [appReferenceImgs.appId],
		references: [apps.id]
	})
}));

export type appReferenceImg = typeof appReferenceImgs.$inferSelect;

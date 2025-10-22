import { date, integer, jsonb, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { AccessType } from '../../../share/app.ts';
import { apps } from './apps.ts';
import { users } from './users.ts';

export const visitHistories = pgTable(
	'visit_histories',
	{
		appId: integer('app_id')
			.references(() => apps.id)
			.notNull(),
		userId: integer('user_id').references(() => users.id),
		visitCount: integer('visitCount').notNull().default(0),
		accessType: varchar('access_type', { length: 16 }).notNull().default(AccessType.PageView),
		accessDate: date('access_date', { mode: 'date' }).notNull().defaultNow(),
		deviceInfo: jsonb('device_info').default({})
	},
	(table) => [primaryKey({ columns: [table.appId, table.accessDate] })]
);

export type visitHistory = typeof visitHistories.$inferSelect;

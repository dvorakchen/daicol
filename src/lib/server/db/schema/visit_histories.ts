import { date, integer, jsonb, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { AccessType } from '../../../share/app.ts';
import { apps } from './apps.ts';
import { users } from './users.ts';

export const visitHistories = pgTable('visit_histories', {
	id: serial('id').primaryKey(),
	appId: integer('app_id')
		.references(() => apps.id)
		.notNull(),
	userId: integer('user_id').references(() => users.id),
	accessType: varchar('access_type', { length: 16 })
		.array()
		.notNull()
		.default([AccessType.PageView]),
	accessDate: date('access_date', { mode: 'date' }).notNull().defaultNow(),
	deviceInfo: jsonb('device_info').default({})
});

import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const smsCaptcha = pgTable('sms_captcha', {
	id: serial('id').primaryKey(),
	phoneNumber: varchar('phone_number', { length: 16 }).notNull().default('').unique(),
	code: varchar('code', { length: 4 }).notNull().default(''),
	isUsed: boolean('is_used').notNull().default(false),
	createAt: timestamp('create_at', { withTimezone: true }).notNull().defaultNow()
});

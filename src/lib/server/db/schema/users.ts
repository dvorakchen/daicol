import { integer, jsonb, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	userName: varchar('user_name', { length: 64 }).notNull().default('').unique(),
	phoneNumber: varchar('phone_number', { length: 16 }).notNull().default('').unique(),
	email: varchar('email', { length: 64 }).notNull().default('').unique(),
	passwordHash: varchar('password_hash', { length: 256 }).notNull().default(''),
	profilePicture: text('profile_picture').notNull().default(''),
	attributes: jsonb('attributes').notNull().default({}),
	status: integer('status').notNull().default(0),
	createAt: timestamp('create_at', { withTimezone: true }).notNull().defaultNow(),
	updateAt: timestamp('update_at', { withTimezone: true }).notNull().defaultNow()
});

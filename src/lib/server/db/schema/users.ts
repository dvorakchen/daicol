import {
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
	uuid
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserStatus } from '../../../share/user.ts';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	authId: uuid('auth_id'),
	authGroups: varchar('auth_groups', { length: 512 }).notNull().default(''),
	userName: varchar('user_name', { length: 64 }).notNull().default(''),
	phoneNumber: varchar('phone_number', { length: 16 }).notNull().default('').unique(),
	email: varchar('email', { length: 64 }).notNull().default(''),
	passwordHash: varchar('password_hash', { length: 256 }).notNull().default(''),
	profilePicture: text('profile_picture').notNull().default(''),
	freeCount: integer('free_count').notNull().default(0),
	points: integer('points').notNull().default(0),
	attributes: jsonb('attributes').notNull().default({}),
	permissions: varchar('permissions', { length: 64 })
		.array()
		.notNull()
		.default(sql`'{}'::varchar[]`),
	status: varchar('status', { length: 32 }).notNull().default(UserStatus.Enabled),
	createAt: timestamp('create_at', { withTimezone: true }).notNull().defaultNow(),
	updateAt: timestamp('update_at', { withTimezone: true }).notNull().defaultNow()
});

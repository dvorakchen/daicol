import {
	integer,
	jsonb,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
	primaryKey,
	date
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { AppStatus } from '../../../share/app.ts';

export const apps = pgTable('apps', {
	id: serial('id').primaryKey(),
	routeId: integer('route_id').notNull().unique(),
	name: varchar('name', { length: 64 }).notNull().unique().default(''),
	category: varchar('category', { length: 32 }).notNull().default(''),
	tags: varchar('tags', { length: 32 }).array().notNull().default([]),
	description: varchar('description', { length: 1024 }).notNull().default(''),
	seoKeywords: varchar('seo_keywords', { length: 1024 })
		.array()
		.notNull()
		.default(sql`'{}'::varchar[]`),
	seoDescription: varchar('seo_description', { length: 1024 }).notNull().default(''),
	model: varchar('model', { length: 64 }).notNull().default(''),
	source: varchar('source', { length: 64 }).notNull().default(''),
	prompt: text('prompt').notNull().default(''),
	promptPlugIn: jsonb('prompt-plugin').notNull().default({}),
	referenceImgs: varchar('reference-imgs').array().default([]),
	originImg: varchar('origin_img', { length: 1024 }).notNull().default(''),
	handledImg: varchar('handled_img', { length: 1024 }).notNull().default(''),
	icon: varchar('icon', { length: 1024 }).notNull().default(''),
	barImg: varchar('bar_img', { length: 1024 }).notNull().default(''),
	rate: numeric('rate', { precision: 5, scale: 1 }).notNull().default('0.0'),
	useCount: integer('use_count').notNull().default(0),
	points: integer('points').notNull().default(0),
	status: varchar('status', { length: 32 }).notNull().default(AppStatus.Enabled),
	createAt: timestamp('create_at', { withTimezone: true }).notNull().defaultNow(),
	updateAt: timestamp('update_at', { withTimezone: true }).notNull().defaultNow()
});

export type App = typeof apps.$inferSelect;

export type AppWithoutPrompt = Omit<App, 'prompt' | 'referenceImgs'>;

import { UserStatus } from '../../../share/user.ts';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	userName: varchar('user_name', { length: 64 }).notNull().default(''),
	hashedPassword: varchar('hashed_password', { length: 256 }).notNull().default(''),
	phoneNumber: varchar('phone_number', { length: 16 }).notNull().default('').unique(),
	email: varchar('email', { length: 64 }).notNull().default(''),
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

export type User = typeof users.$inferSelect;

import { AccessType } from '../../../share/app.ts';

export const visitHistories = pgTable(
	'visit_histories',
	{
		appId: integer('app_id')
			.references(() => apps.id, { onDelete: 'cascade' })
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

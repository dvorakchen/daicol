import { integer, numeric, pgTable, serial, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { AppStatus } from '../../../share/app.ts';

export const apps = pgTable('apps', {
	id: serial('id').primaryKey(),
	routeId: integer('route_id').notNull().unique(),
	name: varchar('name', { length: 64 }).notNull().unique().default(''),
	category: varchar('category', { length: 32 }).notNull().default(''),
	tags: varchar('tags', { length: 32 }).array().notNull().default([]),
	keywords: varchar('keywords', { length: 256 })
		.array()
		.notNull()
		.default(sql`'{}'::varchar[]`),
	description: varchar('description', { length: 256 }).notNull().default(''),
	seoKeywords: varchar('seo_keywords', { length: 256 })
		.array()
		.notNull()
		.default(sql`'{}'::varchar[]`),
	seoDescription: varchar('seo_description', { length: 256 }).notNull().default(''),
	model: varchar('model', { length: 64 }).notNull().default(''),
	source: varchar('source', { length: 64 }).notNull().default(''),
	prompt: text('prompt').notNull().default(''),
	icon: varchar('icon', { length: 256 }).notNull().default(''),
	barImg: varchar('bar_img', { length: 256 }).notNull().default(''),
	rate: numeric('rate', { precision: 5, scale: 2 }).notNull().default('0.0'),
	useCount: integer('use_count').notNull().default(0),
	points: integer('points').notNull().default(0),
	status: varchar('status', { length: 32 }).notNull().default(AppStatus.Enabled),
	createAt: timestamp('create_at', { withTimezone: true }).notNull().defaultNow(),
	updateAt: timestamp('update_at', { withTimezone: true }).notNull().defaultNow()
});

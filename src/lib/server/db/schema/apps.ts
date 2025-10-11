import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique().default(""),
  category: varchar("category", { length: 32 }).notNull().default(""),
  keywords: varchar("keywords", { length: 256 }).array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  description: varchar("description", { length: 256 }).notNull().default(""),
  seoKeywords: varchar("seo_keywords", { length: 256 }).array().notNull()
    .default(sql`'{}'::varchar[]`),
  seoDescription: varchar("seo_description", { length: 256 }).notNull().default(
    "",
  ),
  model: varchar("model", { length: 64 }).notNull().default(""),
  source: varchar("source", { length: 64 }).notNull().default(""),
  icon: varchar("icon", { length: 256 }).notNull().default(""),
  barImg: varchar("bar_img", { length: 256 }).notNull().default(""),
  rate: integer("rate").notNull().default(0),
  useCound: integer("use_count").notNull().default(0),
  points: integer("points").notNull().default(0),
  status: integer("status").notNull().default(0),
  createAt: timestamp("create_at", { withTimezone: true }).notNull()
    .defaultNow(),
  updateAt: timestamp("update_at", { withTimezone: true }).notNull()
    .defaultNow(),
});

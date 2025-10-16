import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { AppStatus } from "../../../share/app.ts";

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").notNull().unique(),
  name: varchar("name", { length: 64 }).notNull().unique().default(""),
  category: varchar("category", { length: 32 }).notNull().default(""),
  tags: varchar("tags", { length: 32 }).array().notNull().default([]),
  description: varchar("description", { length: 1024 }).notNull().default(""),
  seoKeywords: varchar("seo_keywords", { length: 1024 })
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  seoDescription: varchar("seo_description", { length: 1024 }).notNull()
    .default(""),
  model: varchar("model", { length: 64 }).notNull().default(""),
  source: varchar("source", { length: 64 }).notNull().default(""),
  prompt: text("prompt").notNull().default(""),
  originImg: varchar("origin_img", { length: 1024 }).notNull().default(""),
  handledImg: varchar("handled_img", { length: 1024 }).notNull().default(""),
  icon: varchar("icon", { length: 1024 }).notNull().default(""),
  barImg: varchar("bar_img", { length: 1024 }).notNull().default(""),
  rate: numeric("rate", { precision: 5, scale: 1 }).notNull().default("0.0"),
  useCount: integer("use_count").notNull().default(0),
  points: integer("points").notNull().default(0),
  status: varchar("status", { length: 32 }).notNull().default(
    AppStatus.Enabled,
  ),
  createAt: timestamp("create_at", { withTimezone: true }).notNull()
    .defaultNow(),
  updateAt: timestamp("update_at", { withTimezone: true }).notNull()
    .defaultNow(),
});

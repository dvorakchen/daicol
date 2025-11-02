CREATE TABLE "apps" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_id" integer NOT NULL,
	"name" varchar(64) DEFAULT '' NOT NULL,
	"category" varchar(32) DEFAULT '' NOT NULL,
	"tags" varchar(32)[] DEFAULT '{}' NOT NULL,
	"description" varchar(1024) DEFAULT '' NOT NULL,
	"seo_keywords" varchar(1024)[] DEFAULT '{}'::varchar[] NOT NULL,
	"seo_description" varchar(1024) DEFAULT '' NOT NULL,
	"model" varchar(64) DEFAULT '' NOT NULL,
	"source" varchar(64) DEFAULT '' NOT NULL,
	"prompt" text DEFAULT '' NOT NULL,
	"prompt-plugin" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"reference-imgs" "bytea"[] DEFAULT '{}',
	"origin_img" varchar(1024) DEFAULT '' NOT NULL,
	"handled_img" varchar(1024) DEFAULT '' NOT NULL,
	"icon" varchar(1024) DEFAULT '' NOT NULL,
	"bar_img" varchar(1024) DEFAULT '' NOT NULL,
	"rate" numeric(5, 1) DEFAULT '0.0' NOT NULL,
	"use_count" integer DEFAULT 0 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"status" varchar(32) DEFAULT 'Enabled' NOT NULL,
	"create_at" timestamp with time zone DEFAULT now() NOT NULL,
	"update_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "apps_route_id_unique" UNIQUE("route_id"),
	CONSTRAINT "apps_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "sms_captcha" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone_number" varchar(16) DEFAULT '' NOT NULL,
	"code" varchar(4) DEFAULT '' NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"create_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sms_captcha_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(64) DEFAULT '' NOT NULL,
	"hashed_password" varchar(256) DEFAULT '' NOT NULL,
	"phone_number" varchar(16) DEFAULT '' NOT NULL,
	"email" varchar(64) DEFAULT '' NOT NULL,
	"profile_picture" text DEFAULT '' NOT NULL,
	"free_count" integer DEFAULT 0 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"attributes" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"permissions" varchar(64)[] DEFAULT '{}'::varchar[] NOT NULL,
	"status" varchar(32) DEFAULT 'Enabled' NOT NULL,
	"create_at" timestamp with time zone DEFAULT now() NOT NULL,
	"update_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "visit_histories" (
	"app_id" integer NOT NULL,
	"user_id" integer,
	"visitCount" integer DEFAULT 0 NOT NULL,
	"access_type" varchar(16) DEFAULT 'PageView' NOT NULL,
	"access_date" date DEFAULT now() NOT NULL,
	"device_info" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "visit_histories_app_id_access_date_pk" PRIMARY KEY("app_id","access_date")
);
--> statement-breakpoint
ALTER TABLE "visit_histories" ADD CONSTRAINT "visit_histories_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_histories" ADD CONSTRAINT "visit_histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
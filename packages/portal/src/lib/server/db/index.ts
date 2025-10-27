import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as usersSchema from './schema/users.ts';
import * as smsCaptchaSchema from './schema/sms_captcha.ts';
import * as appsSchema from './schema/apps.ts';
import * as visitHistoriesSchema from './schema/visit_histories.ts';
import * as appReferenceImgsSchema from './schema/app_reference_imgs.ts';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const mergedSchema = {
	...usersSchema,
	...smsCaptchaSchema,
	...appsSchema,
	...visitHistoriesSchema,
	...appReferenceImgsSchema
};

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema: mergedSchema });

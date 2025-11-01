import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
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

const pool = new Pool({
	connectionString: env.DATABASE_URL
});

export const db = drizzle({ client: pool, schema: mergedSchema });

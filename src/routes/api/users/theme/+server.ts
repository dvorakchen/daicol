import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { users } from '$lib/server/db/schema/users.ts';
import { eq, sql } from 'drizzle-orm';
import logger from '$lib/server/log.ts';

export async function POST({ request, cookies }: RequestEvent) {
	logger.info('Handling theme update request');

	const sub = getJWTPayloadSubFromCookie(cookies);
	if (!sub) {
		return json({});
	}

	const { theme }: { theme: string } = await request.json();

	logger.info(`Received theme update: ${theme}`);

	const user = await db.query.users.findFirst({
		where: eq(users.id, sub)
	});
	if (!user) {
		logger.warn(`No User Id: ${sub}, RETURNED`);
		return json({});
	}

	logger.info(`Updating theme for user ${user.id} to ${theme}`);

	await db
		.update(users)
		.set({
			attributes: sql`jsonb_set(${users.attributes}, '{theme}', ${JSON.stringify(
				theme
			)}::jsonb, true)`
		})
		.where(eq(users.id, user.id));

	return json({});
}

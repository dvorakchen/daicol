import { json, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import logger from '$lib/server/log.ts';
import { getUserById, updateUserTheme } from '$lib/server/repo/users.ts';

export async function POST({ request, cookies }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies);
	if (!sub) {
		return json({});
	}

	const { theme }: { theme: string } = await request.json();

	const user = await getUserById(sub);

	if (!user) {
		logger.warn(`No User Id: ${sub}, RETURNED`);
		return json({});
	}

	await updateUserTheme(user.id, theme);

	return json({});
}

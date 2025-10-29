import { json, type RequestEvent } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { setJWTCookie, signJWT } from '$lib/server/jwt.ts';
import { DateTime } from 'luxon';
import logger from '$lib/server/log.ts';
import type { UserSignInInfo } from '$lib/share/user.ts';
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '$lib/server/repo/users';

export async function POST({ request, cookies }: RequestEvent) {
	const { username, password }: { username: string; password: string } = await request.json();

	if (!username || !password) {
		logger.error(`invalid: ${username} - ${password}`);
		return json({ error: m['sign_in.error.invalid_username_password']() }, { status: 422 });
	}

	const user = await getUserByUsername(username);
	if (!user) {
		return json(
			{
				error: m['sign_in.error.username_not_exist']()
			},
			{ status: 422 }
		);
	}

	if (!(await bcrypt.compare(password, user.hashedPassword))) {
		return json(
			{
				error: m['sign_in.error.wrong_password']()
			},
			{ status: 422 }
		);
	}

	const token = signJWT(user.id, DateTime.utc().plus({ weeks: 1 }).toSeconds());

	setJWTCookie(cookies, token);

	return json({
		id: user.id,
		username: user.userName,
		points: user.points
	} as UserSignInInfo);
}

import { json, type RequestEvent } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { setJWTCookie, signJWT } from '$lib/server/jwt.ts';
import { DateTime } from 'luxon';
import type { UserSignInInfo } from '$lib/share/user.ts';
import bcrypt from 'bcryptjs';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

export async function POST({ request, cookies, locals }: RequestEvent) {
	const { username, password }: { username: string; password: string } = await request.json();

	if (!username || !password) {
		locals.logger.error(`invalid: ${username} - ${password}`);
		return json(
			{ error: m['sign_in.error.invalid_username_password']() },
			{
				status: 422
			}
		);
	}

	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);
	const user = await userRepo.getUserByUsername(username);
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

	const token = signJWT(
		user.id,
		DateTime.utc().plus({ weeks: 1 }).toSeconds(),
		locals.privateEnv.JWT_KEY
	);

	setJWTCookie(cookies, token);

	return json({
		id: user.id,
		username: user.userName,
		points: user.points
	} as UserSignInInfo);
}

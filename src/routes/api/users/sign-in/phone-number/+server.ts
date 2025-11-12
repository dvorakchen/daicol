import { json, type RequestEvent } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { setJWTCookie, signJWT } from '$lib/server/jwt.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';
import { DateTime } from 'luxon';
import type { UserSignInInfo } from '$lib/share/user.ts';
import { getUnusedSms, updateToUsed } from '$lib/server/repo/smsCaptcha.ts';

export async function POST({ request, cookies, locals }: RequestEvent) {
	const data: { phone: string; code: string } = await request.json();
	const phone = data.phone?.toString() ?? '';
	const code = data.code?.toString() ?? '';

	if (!phone || phone.length !== 11 || !code || code.length !== 4) {
		locals.logger.error(`invalid: ${phone} - ${code}`);
		return json({ error: m['sign_in.error.invalid']() }, { status: 422 });
	}

	const sms = await getUnusedSms(phone, code);
	if (!sms) {
		locals.logger.info(m['sign_in.error.no_code']());
		return json(
			{
				error: m['sign_in.error.no_code']()
			},
			{ status: 422 }
		);
	}

	await updateToUsed(phone);

	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);
	let user = await userRepo.getUserByPhone(phone);

	if (!user) {
		user = await userRepo.createUserByPhone(phone);
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

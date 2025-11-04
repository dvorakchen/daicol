import { json, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { type UserSignInInfo } from '$lib/share/user.ts';
import { getEnabledUserById } from '$lib/server/repo/users.ts';

const EMPTY_USER_SIGN_IN_INFO = {} as UserSignInInfo;

export async function GET({ cookies }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies);
	if (!sub) {
		return json(EMPTY_USER_SIGN_IN_INFO);
	}

	const user = await getEnabledUserById(sub);

	if (!user) {
		return json(EMPTY_USER_SIGN_IN_INFO);
	}

	return json({
		id: user.id,
		username: user.userName + new Date().toString(),
		points: user.points,
		permissions: user.permissions
	} as UserSignInInfo);
}

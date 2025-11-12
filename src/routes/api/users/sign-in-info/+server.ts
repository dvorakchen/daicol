import { json, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { type UserSignInInfo } from '$lib/share/user.ts';
import { type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';

const EMPTY_USER_SIGN_IN_INFO = {} as UserSignInInfo;

export async function GET({ cookies, locals }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies, locals.privateEnv.JWT_KEY);
	if (!sub) {
		return json(EMPTY_USER_SIGN_IN_INFO);
	}

	const userRepo = locals.di.get<UserRepo>(userRepoServiceId);
	const user = await userRepo.getEnabledUserById(sub);

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

import { json, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { type UserSignInInfo, UserStatus } from '$lib/share/user.ts';
import { db } from '$lib/server/db/index.ts';
import { and, eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema/users.ts';

const EMPTY_USER_SIGN_IN_INFO = {} as UserSignInInfo;

export async function GET({ cookies }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies);
	if (!sub) {
		return json(EMPTY_USER_SIGN_IN_INFO);
	}

	const user = await db.query.users.findFirst({
		where: and(eq(users.id, sub), eq(users.status, UserStatus.Enabled))
	});

	if (!user) {
		return json(EMPTY_USER_SIGN_IN_INFO);
	}

	return json({
		id: user.id,
		username: user.userName + new Date().toString(),
		points: user.points
	} as UserSignInInfo);
}

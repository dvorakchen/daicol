import { redirect, type RequestEvent } from '@sveltejs/kit';
import { getJWTPayloadSubFromCookie } from '$lib/server/jwt.ts';
import { db } from '$lib/server/db/index.ts';
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema/users.ts';
import { UserPermissions } from '$lib/share/user.ts';

export async function load({ cookies }: RequestEvent) {
	const sub = getJWTPayloadSubFromCookie(cookies);

	if (sub === null) {
		return redirect(302, `/signin`);
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, sub)
	});

	if (!user) {
		return redirect(302, '/signin');
	}

	if (!user.permissions.some((t) => t === UserPermissions.AdminAccess)) {
		return redirect(302, '/signin');
	}
}

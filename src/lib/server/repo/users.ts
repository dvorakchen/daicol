import { users } from '$lib/server/db/schema/users.ts';
import { db } from '$lib/server/db/index.ts';
import { eq, sql } from 'drizzle-orm';
import { UserStatus } from '../../share/user.ts';

export async function createUserByPhone(phone: string) {
	const user = await db.query.users.findFirst({
		where: eq(users.phoneNumber, phone)
	});

	if (user) {
		throw `phone number: ${phone} already exists`;
	}

	const newUser = await db
		.insert(users)
		.values({
			userName: '',
			phoneNumber: phone,
			email: '',
			passwordHash: '',
			profilePicture: '',
			attributes: {},
			status: UserStatus.Enabled,
			createAt: sql`now()`,
			updateAt: sql`now()`
		})
		.returning()!;

	return newUser[0];
}

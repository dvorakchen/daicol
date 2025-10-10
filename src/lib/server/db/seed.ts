import { db } from '$lib/server/db/index.ts';
import { users } from '$lib/server/db/schema/users.ts';
import logger from '$lib/server/log.ts';
import { UserPermissions } from '$lib/share/user.ts';
import { env } from '$env/dynamic/private';

export async function plantingSeed() {
	logger.info(`plainting database seed`);
	await db.transaction(async (tx) => {
		const count = await tx.$count(users);
		if (count > 0) {
			logger.info('table users already has data, skip plainting');
			return;
		}
		logger.info('table users has not data, plainting');

		const USERNAME = 'ADMIN';
		const PHONE_NUMBER = env.INIT_ADMIN_PHONE;
		await tx.insert(users).values({
			userName: USERNAME,
			phoneNumber: PHONE_NUMBER,
			permissions: [UserPermissions.BaseAccess, UserPermissions.AdminAccess]
		});
		logger.info(`table users plainted, user_name: ${USERNAME}, phone_number: ${PHONE_NUMBER}`);
	});
}

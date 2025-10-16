import { db } from '$lib/server/db/index.ts';
// import { users } from '$lib/server/db/schema/users.ts';
import logger from '$lib/server/log.ts';
// import { UserPermissions } from '$lib/share/user.ts';
// import { env } from '$env/dynamic/private';
import { apps } from '$lib/server/db/schema/apps.ts';
import { eq } from 'drizzle-orm';
import apps10001_10050 from "$lib/server/db/apps-seed/10001-10050.ts";

export async function plantingSeed() {
	logger.info(`plainting database seed`);
	// await db.transaction(async (tx) => {
	// 	const count = await tx.$count(users);
	// 	if (count > 0) {
	// 		logger.info('table users already has data, skip plainting');
	// 		return;
	// 	}
	// 	logger.info('table users has not data, plainting');

	// 	const USERNAME = 'ADMIN';
	// 	const PHONE_NUMBER = env.INIT_ADMIN_PHONE;
	// 	await tx.insert(users).values({
	// 		authId: '42a290bf-5b9c-4f9a-a49f-14a458273d89',
	// 		userName: USERNAME,
	// 		phoneNumber: PHONE_NUMBER,
	// 		permissions: [UserPermissions.BaseAccess, UserPermissions.AdminAccess]
	// 	});
	// 	logger.info(`table users plainted, user_name: ${USERNAME}, phone_number: ${PHONE_NUMBER}`);
	// });

	await db.transaction(async (tx) => {
		const count = await tx.$count(apps);
		if (count > 0) {
			logger.info('table apps already has data, skip plainting');
			return;
		}
		logger.info('table apps has not data, plainting');

		for (const item of initApps) {
			const existApp = await tx.query.apps.findFirst({
				where: eq(apps.routeId, item.routeId)
			});

			if (!existApp) {
				await tx.insert(apps).values(item);
			}
		}
	});
}
const initApps = [
	...apps10001_10050
];

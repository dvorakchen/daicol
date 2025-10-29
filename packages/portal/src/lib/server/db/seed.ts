import { db } from '$lib/server/db/index.ts';
import { users, apps } from '$lib/server/db/schema/index.ts';
import logger from '$lib/server/log.ts';
import { UserPermissions } from '$lib/share/user.ts';
import { eq } from 'drizzle-orm';
import apps10001_10050 from '$lib/server/db/apps-seed/10001-10050.ts';

export async function plantingSeed() {
	logger.info(`plainting database seed`);
	await db.transaction(async (tx) => {
		const count = await tx.$count(users);
		if (count > 0) {
			logger.info('table users already has data, skip plainting');
			return;
		}
		logger.info('table users has not data, plainting');

		const USERNAME = 'admin';
		// password: aaa
		const PASSWORD_aaa = '$2b$10$9jTobG3IO5VrXxNzs4Oo3OdPen9VMk8dGq5.MrNN4MrTea4zsGmvG';
		await tx.insert(users).values({
			userName: USERNAME,
			hashedPassword: PASSWORD_aaa,
			permissions: [UserPermissions.BaseAccess, UserPermissions.AdminAccess]
		});
		logger.info(`table users plainted, user_name: ${USERNAME}`);
	});

	await db.transaction(async (tx) => {
		for (const item of initApps) {
			const existApp = await tx.query.apps.findFirst({
				where: eq(apps.routeId, item.routeId)
			});

			if (!existApp) {
				await tx.insert(apps).values(item);
			}

			logger.info(`Seed app routeId: ${item.routeId} exists: ${Boolean(existApp)}`);
		}
	});
}
const initApps = [...apps10001_10050];

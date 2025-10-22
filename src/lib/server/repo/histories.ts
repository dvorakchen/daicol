import type { AccessType } from '$lib/share/app.ts';
import { db } from '$lib/server/db/index.ts';
import { and, eq, sql } from 'drizzle-orm';
import { apps, visitHistories } from '$lib/server/db/schema/index.ts';
import logger from '$lib/server/log.ts';

export async function addHistory(routeId: number, accessType: AccessType) {
	const app = await db.query.apps.findFirst({
		where: eq(apps.routeId, routeId)
	});

	if (!app) {
		return;
	}

	try {
		await db.transaction(async (tx) => {
			const record = await tx.query.visitHistories.findFirst({
				where: and(
					eq(visitHistories.appId, app.id),
					eq(visitHistories.accessDate, sql`CURRENT_DATE`)
				)
			});

			if (record) {
				await tx
					.update(visitHistories)
					.set({
						visitCount: record.visitCount + 1
					})
					.where(
						and(
							eq(visitHistories.appId, record.appId),
							eq(visitHistories.accessDate, record.accessDate)
						)
					);
			} else {
				await tx.insert(visitHistories).values({
					appId: app.id,
					visitCount: 1,
					accessType
				});
			}
		});
	} catch (error) {
		logger.error(
			`Append history failed, routeId: ${routeId}, accessType: ${accessType}. error: ${error}`
		);
	}
}

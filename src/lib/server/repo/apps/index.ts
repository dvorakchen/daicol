import { db } from '$lib/server/db/index.ts';
import { eq } from 'drizzle-orm';
import { apps } from '$lib/server/db/schema/index.ts';
export * from '$lib/server/repo/apps/apps.ts';
export * from '$lib/server/repo/apps/create.ts';

export async function getPrompt(routeId: number) {
	return (
		(
			await db.query.apps.findFirst({
				where: eq(apps.routeId, routeId)
			})
		)?.prompt ?? ''
	);
}

export async function increaseUsedCount(routeId: number) {
	const app = await db.query.apps.findFirst({
		where: eq(apps.routeId, routeId)
	});

	if (app) {
		await db
			.update(apps)
			.set({
				useCount: app.useCount + 1
			})
			.where(eq(apps.routeId, routeId));
	}
}

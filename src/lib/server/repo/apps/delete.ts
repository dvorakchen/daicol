import { db } from '$lib/server/db/index.ts';
import { apps } from '$lib/server/db/schema.ts';
import { eq } from 'drizzle-orm';

export async function removeApp(routeId: number) {
	await db.delete(apps).where(eq(apps.routeId, routeId));
}

import { db } from "$lib/server/db/index.ts";
import { and, desc, eq } from "drizzle-orm";
import { apps } from "$lib/server/db/schema/apps.ts";
import logger from "$lib/server/log.ts";
import { AppStatus } from "$lib/share/app.ts";

export async function getHotApps(count: number = 10) {
  const hotApps = await db.query.apps.findMany({
    where: and(eq(apps.status, AppStatus.Enabled)),
    orderBy: [desc(apps.createAt), desc(apps.rate), desc(apps.useCount)],
    limit: count,
  });

  logger.info(`get hot apps: ${hotApps.length}`);
  return hotApps;
}

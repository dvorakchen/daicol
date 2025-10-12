import { db } from "$lib/server/db/index.ts";
import { and, desc, eq, gte, inArray, SQL, sql } from "drizzle-orm";
import { apps } from "$lib/server/db/schema/apps.ts";
import logger from "$lib/server/log.ts";
import { AppStatus, RankTypes } from "$lib/share/app.ts";
import { visitHistories } from "../db/schema/visit_histories.ts";

export async function getHotApps(count: number = 10) {
  const hotApps = await db.query.apps.findMany({
    where: and(eq(apps.status, AppStatus.Enabled)),
    orderBy: [desc(apps.createAt), desc(apps.rate), desc(apps.useCount)],
    limit: count,
  });

  logger.info(`get hot apps: ${hotApps.length}`);
  return hotApps;
}

const RANK_APPS_COUNT = 10;

export async function getRankApps(rankType: RankTypes) {
  let appIdArray: { appId: number; count: number }[];

  switch (rankType) {
    case RankTypes.Week:
      appIdArray = await getWeekRankApps();
      break;
    case RankTypes.Month:
      appIdArray = await getMonthRankApps();
      break;
    case RankTypes.Total:
      appIdArray = await getTotalRankApps();
      break;
  }

  let rest = 0;
  if (appIdArray.length < 10) {
    rest = RANK_APPS_COUNT - appIdArray.length;
  }

  let rankApps;
  if (appIdArray.length > 0) {
    const appIdList = appIdArray.map((t) => t.appId);
    const caseStatements = appIdList
      .map((id, index) => sql`WHEN ${id} THEN ${index}`)
      .reduce((acc, current) => sql`${acc} ${current}`);

    const customOrder = sql`CASE ${apps.id} ${caseStatements} END`;

    rankApps = await db
      .select()
      .from(apps)
      .where(inArray(apps.id, appIdList))
      .orderBy(customOrder);
  }

  if (rest > 0) {
    rankApps = rankApps ?? [];
    rankApps.push(...(await getHotApps(rest)));
  }

  logger.info(
    `get rank apps: type: ${rankType}, apps: ${JSON.stringify(rankApps)}`,
  );
  rankApps = rankApps ?? [];

  return rankApps;
}

async function getWeekRankApps() {
  const getStartOfWeek: SQL<Date> = sql`date_trunc('week', NOW())`;
  const count = sql<number>`count(*)`.as("count");

  return await db.select({
    appId: visitHistories.appId,
    count: count,
  })
    .from(visitHistories)
    .where(
      gte(visitHistories.accessDate, getStartOfWeek),
    )
    .groupBy(visitHistories.appId)
    .orderBy(desc(count))
    .limit(RANK_APPS_COUNT);
}

async function getMonthRankApps() {
  const getStartOfWeek: SQL<Date> = sql`date_trunc('month', NOW())`;
  const count = sql<number>`count(*)`.as("count");

  return await db.select({
    appId: visitHistories.appId,
    count: count,
  })
    .from(visitHistories)
    .where(
      gte(visitHistories.accessDate, getStartOfWeek),
    )
    .groupBy(visitHistories.appId)
    .orderBy(desc(count)).limit(RANK_APPS_COUNT);
}

async function getTotalRankApps() {
  const count = sql<number>`count(*)`.as("count");

  return await db.select({
    appId: visitHistories.appId,
    count: count,
  })
    .from(visitHistories)
    .groupBy(visitHistories.appId)
    .orderBy(desc(count)).limit(RANK_APPS_COUNT);
}

import { db } from '$lib/server/db/index.ts';
import { and, desc, eq, gte, inArray, SQL, sql, notInArray } from 'drizzle-orm';
import { apps } from '$lib/server/db/schema/apps.ts';
import logger from '$lib/server/log.ts';
import {
	AppCategories,
	type AppEntityTypeWithPrompt,
	AppStatus,
	RankTypes
} from '$lib/share/app.ts';
import { visitHistories } from '$lib/server/db/schema/visit_histories.ts';
import type { SearchType } from '$lib/share/search.ts';

const COLUMNS_WITHOUT_PROMPT = {
	id: true,
	name: true,
	points: true,
	status: true,
	createAt: true,
	updateAt: true,
	routeId: true,
	category: true,
	tags: true,
	keywords: true,
	description: true,
	seoKeywords: true,
	seoDescription: true,
	model: true,
	source: true,
	icon: true,
	barImg: true,
	rate: true,
	useCount: true
};

export async function getHotApps(count: number = 10, excludeIds: number[] = []) {
	const baseCondition = eq(apps.status, AppStatus.Enabled);
	let exclusionCondition = undefined;

	if (excludeIds.length > 0) {
		exclusionCondition = notInArray(apps.id, excludeIds);
	}

	const hotApps = await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: and(baseCondition, exclusionCondition),
		orderBy: [desc(apps.createAt), desc(apps.rate), desc(apps.useCount)],
		limit: count
	});

	logger.info(`get hot apps: ${hotApps.length}`);
	return hotApps as AppEntityTypeWithPrompt[];
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
	let appIdList: number[] = [];
	if (appIdArray.length > 0) {
		appIdList = appIdArray.map((t) => t.appId);
		const caseStatements = appIdList
			.map((id, index) => sql`WHEN ${id} THEN ${index}`)
			.reduce((acc, current) => sql`${acc} ${current}`);

		const customOrder = sql`CASE ${apps.id} ${caseStatements} END`;

		rankApps = await db.query.apps.findMany({
			columns: COLUMNS_WITHOUT_PROMPT,
			where: inArray(apps.id, appIdList),
			orderBy: customOrder
		});
	}

	if (rest > 0) {
		rankApps = rankApps ?? [];
		rankApps.push(...(await getHotApps(rest, appIdList)));
	}

	logger.info(`get rank apps: type: ${rankType}, apps: ${JSON.stringify(rankApps)}`);
	rankApps = rankApps ?? [];

	return rankApps as AppEntityTypeWithPrompt[];
}

async function getWeekRankApps() {
	const getStartOfWeek: SQL<Date> = sql`date_trunc('week', NOW())`;
	const count = sql<number>`count(*)`.as('count');

	return await db
		.select({
			appId: visitHistories.appId,
			count: count
		})
		.from(visitHistories)
		.where(gte(visitHistories.accessDate, getStartOfWeek))
		.groupBy(visitHistories.appId)
		.orderBy(desc(count))
		.limit(RANK_APPS_COUNT);
}

async function getMonthRankApps() {
	const getStartOfWeek: SQL<Date> = sql`date_trunc('month', NOW())`;
	const count = sql<number>`count(*)`.as('count');

	return await db
		.select({
			appId: visitHistories.appId,
			count: count
		})
		.from(visitHistories)
		.where(gte(visitHistories.accessDate, getStartOfWeek))
		.groupBy(visitHistories.appId)
		.orderBy(desc(count))
		.limit(RANK_APPS_COUNT);
}

async function getTotalRankApps() {
	const count = sql<number>`count(*)`.as('count');

	return await db
		.select({
			appId: visitHistories.appId,
			count: count
		})
		.from(visitHistories)
		.groupBy(visitHistories.appId)
		.orderBy(desc(count))
		.limit(RANK_APPS_COUNT);
}

export async function getRankAppsByCategory(category: AppCategories) {
	const APPS_LIMIT = 5;
	return (await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: and(eq(apps.category, category), eq(apps.status, AppStatus.Enabled)),
		orderBy: desc(apps.rate),
		limit: APPS_LIMIT
	})) as AppEntityTypeWithPrompt[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function searchApps(search: string, type: SearchType) {
	throw 'not implemention';
}

export async function getAppByRouteId(routeId: number) {
	return await db.query.apps.findFirst({
		columns: COLUMNS_WITHOUT_PROMPT,

		where: and(eq(apps.routeId, routeId), eq(apps.status, AppStatus.Enabled))
	});
}

export async function getPrompt(routeId: number) {
	return (
		(
			await db.query.apps.findFirst({
				where: eq(apps.routeId, routeId)
			})
		)?.prompt ?? ''
	);
}

import { db } from '$lib/server/db/index.ts';
import {
	and,
	arrayContained,
	arrayOverlaps,
	desc,
	eq,
	gte,
	inArray,
	like,
	ne,
	notInArray,
	or,
	SQL,
	sql
} from 'drizzle-orm';
import { apps, visitHistories, type AppWithoutPrompt } from '$lib/server/db/schema/index.ts';
import logger from '$lib/server/log.ts';
import { AppCategories, AppStatus, RankTypes, type GetAppFilter } from '$lib/share/app.ts';
import { SearchType } from '$lib/share/search.ts';

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
	originImg: true,
	handledImg: true,
	icon: true,
	barImg: true,
	rate: true,
	useCount: true
};

export async function getRecommendApps(count: number = 10) {
	const apps = await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		orderBy: [sql`random()`],
		limit: count
	});

	return apps as AppWithoutPrompt[];
}

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
	return (hotApps as AppWithoutPrompt[]).toSorted((a, b) => b.useCount - a.useCount);
}

export async function getLatestApps(count: number) {
	const hotApps = await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: eq(apps.status, AppStatus.Enabled),
		orderBy: [desc(apps.createAt)],
		limit: count
	});

	return hotApps as AppWithoutPrompt[];
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

	return (rankApps as AppWithoutPrompt[]).toSorted((a, b) => b.useCount - a.useCount);
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
	})) as AppWithoutPrompt[];
}

export async function searchApps(search: string, type: SearchType) {
	search = search.trim();
	logger.info(`search: ${search}, type: ${type}`);

	const baseCondition = eq(apps.status, AppStatus.Enabled);
	let orderByCondition = [];
	let searchConditions = undefined;

	switch (type) {
		case SearchType.None:
			{
				orderByCondition.push(desc(apps.rate));
				orderByCondition.push(desc(apps.useCount));
			}
			break;
		case SearchType.Latest:
			{
				orderByCondition.push(desc(apps.createAt));
			}
			break;
	}

	if (search) {
		searchConditions = or(
			like(apps.name, `%${search}%`),
			like(apps.description, `%${search}%`),
			like(apps.category, `%${search}%`),
			arrayContained(apps.tags, [search])
		);
	} else if (type === SearchType.None) {
		// look around
		orderByCondition = [sql`random()`];
	}

	const LIMIT = 30;

	const list = await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: and(baseCondition, searchConditions),
		orderBy: orderByCondition,
		limit: LIMIT
	});

	return list as AppWithoutPrompt[];
}

export async function getAppByRouteId(routeId: number) {
	return await db.query.apps.findFirst({
		columns: COLUMNS_WITHOUT_PROMPT,

		where: and(eq(apps.routeId, routeId), eq(apps.status, AppStatus.Enabled))
	});
}

export async function getRelationApps(routeId: number) {
	const LIMIT = 8;
	const app = await db.query.apps.findFirst({
		where: eq(apps.routeId, routeId)
	});

	if (!app) {
		throw `routeId ${routeId} has no exists`;
	}

	const list = (await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: and(
			arrayOverlaps(apps.tags, app.tags),
			eq(apps.status, AppStatus.Enabled),
			ne(apps.id, app.id)
		),
		orderBy: [desc(apps.rate), desc(apps.useCount)],
		limit: LIMIT
	})) as AppWithoutPrompt[];

	if (list.length < LIMIT) {
		const ids = list.map((t) => t.id);

		const extactList = (await db.query.apps.findMany({
			columns: COLUMNS_WITHOUT_PROMPT,
			where: and(
				notInArray(apps.id, ids),
				eq(apps.status, AppStatus.Enabled),
				eq(apps.category, app.category),
				ne(apps.id, app.id)
			),
			orderBy: [desc(apps.rate), desc(apps.useCount)],
			limit: LIMIT - list.length
		})) as AppWithoutPrompt[];

		list.push(...extactList);
	}

	return list;
}

export async function getAppsFromFilter(filter: GetAppFilter) {
	const conditions = [];

	if (filter.routeId) {
		conditions.push(eq(apps.routeId, filter.routeId!));
	}
	if (filter.name) {
		conditions.push(eq(apps.name, filter.name!));
	}

	const list = await db.query.apps.findMany({
		columns: COLUMNS_WITHOUT_PROMPT,
		where: and(...conditions),
		limit: filter.size,
		offset: filter.offset
	});

	return list as AppWithoutPrompt[];
}

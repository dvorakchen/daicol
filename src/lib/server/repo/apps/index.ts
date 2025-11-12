import { db } from "$lib/server/db/index.ts";
import { eq, max } from "drizzle-orm";
import {
  type App,
  apps,
  type AppWithoutPrompt,
} from "$lib/server/db/schema/index.ts";
export * from "$lib/server/repo/apps/create.ts";
import { injectable, type ServiceIdentifier } from "inversify";
import {
  AppCategories,
  type GetAppFilter,
  RankTypes,
} from "$lib/share/app.ts";
import { SearchType } from "$lib/share/search.ts";
import * as pgApp from "$lib/server/repo/apps/apps.ts";

export interface AppRepo {
  getPrompt(routeId: number): Promise<string>;
  increaseUsedCount(routeId: number): Promise<void>;
  getUnusedRouteId(): Promise<number>;
  getRecommendApps(count: number): Promise<AppWithoutPrompt[]>;
  getHotApps(count: number, excludeIds: number[]): Promise<AppWithoutPrompt[]>;
  getLatestApps(count: number): Promise<AppWithoutPrompt[]>;
  getRankApps(rankType: RankTypes): Promise<AppWithoutPrompt[]>;
  getRankAppsByCategory(category: AppCategories): Promise<AppWithoutPrompt[]>;
  searchApps(search: string, type: SearchType): Promise<AppWithoutPrompt[]>;
  getAppByRouteId(
    routeId: number,
    withoutPrompt: boolean,
  ): Promise<App | undefined>;

  getRelationApps(routeId: number): Promise<AppWithoutPrompt[]>;
  getAppsFromFilter(filter: GetAppFilter): Promise<{
    list: AppWithoutPrompt[];
    total: number;
  }>;
}

export const appRepoServiceId: ServiceIdentifier<AppRepo> = Symbol.for(
  "appRepoServiceId",
);

@injectable()
export class PgAppRepo implements AppRepo {
  getRecommendApps(count: number = 10): Promise<AppWithoutPrompt[]> {
    return pgApp.getRecommendApps(count);
  }
  getHotApps(
    count: number = 10,
    excludeIds: number[] = [],
  ): Promise<AppWithoutPrompt[]> {
    return pgApp.getHotApps(count, excludeIds);
  }
  getLatestApps(count: number): Promise<AppWithoutPrompt[]> {
    return pgApp.getLatestApps(count);
  }
  getRankApps(rankType: RankTypes): Promise<AppWithoutPrompt[]> {
    return pgApp.getRankApps(rankType);
  }
  getRankAppsByCategory(category: AppCategories): Promise<AppWithoutPrompt[]> {
    return pgApp.getRankAppsByCategory(category);
  }
  searchApps(search: string, type: SearchType): Promise<AppWithoutPrompt[]> {
    return pgApp.searchApps(search, type);
  }
  getAppByRouteId(
    routeId: number,
    withoutPrompt: boolean = true,
  ): Promise<App | undefined> {
    return pgApp.getAppByRouteId(routeId, withoutPrompt);
  }
  getRelationApps(routeId: number): Promise<AppWithoutPrompt[]> {
    return pgApp.getRelationApps(routeId);
  }
  getAppsFromFilter(filter: GetAppFilter): Promise<{
    list: AppWithoutPrompt[];
    total: number;
  }> {
    return pgApp.getAppsFromFilter(filter);
  }

  async getPrompt(routeId: number) {
    return (
      (
        await db.query.apps.findFirst({
          where: eq(apps.routeId, routeId),
        })
      )?.prompt ?? ""
    );
  }

  async increaseUsedCount(routeId: number) {
    const app = await db.query.apps.findFirst({
      where: eq(apps.routeId, routeId),
    });

    if (app) {
      await db
        .update(apps)
        .set({
          useCount: app.useCount + 1,
        })
        .where(eq(apps.routeId, routeId));
    }
  }

  async getUnusedRouteId() {
    const result = await db
      .select({
        max: max(apps.routeId).as("max"), // 使用 max 聚合函数
      })
      .from(apps);

    // 结果是一个数组，包含一个对象，其中 maxId 是最大值
    const maxRouteId = result[0]?.max;

    return (maxRouteId ?? 10000) + 1;
  }
}

// export async function getPrompt(routeId: number) {
//   return (
//     (
//       await db.query.apps.findFirst({
//         where: eq(apps.routeId, routeId),
//       })
//     )?.prompt ?? ""
//   );
// }

// export async function increaseUsedCount(routeId: number) {
//   const app = await db.query.apps.findFirst({
//     where: eq(apps.routeId, routeId),
//   });

//   if (app) {
//     await db
//       .update(apps)
//       .set({
//         useCount: app.useCount + 1,
//       })
//       .where(eq(apps.routeId, routeId));
//   }
// }

// export async function getUnusedRouteId() {
//   const result = await db
//     .select({
//       max: max(apps.routeId).as("max"), // 使用 max 聚合函数
//     })
//     .from(apps);

//   // 结果是一个数组，包含一个对象，其中 maxId 是最大值
//   const maxRouteId = result[0]?.max;

//   return (maxRouteId ?? 10000) + 1;
// }

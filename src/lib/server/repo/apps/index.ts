import { db } from "$lib/server/db/index.ts";
import { eq, max } from "drizzle-orm";
import { apps } from "$lib/server/db/schema/index.ts";
export * from "$lib/server/repo/apps/apps.ts";
export * from "$lib/server/repo/apps/create.ts";

export async function getPrompt(routeId: number) {
  return (
    (
      await db.query.apps.findFirst({
        where: eq(apps.routeId, routeId),
      })
    )?.prompt ?? ""
  );
}

export async function increaseUsedCount(routeId: number) {
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

export async function getUnusedRouteId() {
  const result = await db
    .select({
      max: max(apps.routeId).as("max"), // 使用 max 聚合函数
    })
    .from(apps);

  // 结果是一个数组，包含一个对象，其中 maxId 是最大值
  const maxRouteId = result[0]?.max;

  return (maxRouteId ?? 10000) + 1;
}

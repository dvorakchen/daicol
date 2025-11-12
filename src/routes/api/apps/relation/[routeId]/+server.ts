import { json, type RequestEvent } from "@sveltejs/kit";
import logger from "$lib/server/log.ts";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";

export async function GET({ params, locals }: RequestEvent) {
  const routeId = params.routeId ?? "";

  if (isNaN(parseInt(routeId))) {
    return json({}, { status: 422 });
  }

  logger.info(`api/apps/relation/[routeId]: ${routeId}`);

  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const apps = await appRepo.getRelationApps(+routeId);

  return json(apps);
}

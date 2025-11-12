import { error, type RequestEvent } from "@sveltejs/kit";
import logger from "$lib/server/log.ts";
import type { AppWithoutPrompt } from "$lib/server/db/schema/index.ts";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";

export async function load({ params, locals }: RequestEvent) {
  const routeId = +(params.routeId ?? "");
  logger.warn(`routeId: ${routeId}`);

  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const app =
    (await appRepo.getAppByRouteId(routeId, true)) as AppWithoutPrompt;

  if (!app) {
    return error(404);
  }

  return {
    app,
    routeId: routeId,
  };
}

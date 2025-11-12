import { error, json, type RequestEvent } from "@sveltejs/kit";
import { AppCategories } from "$lib/share/app.ts";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";
import logger from "$lib/server/log.ts";

export async function GET({ url, locals }: RequestEvent) {
  const category = (url.searchParams.get("category") ?? "").trim()
    .toLowerCase();

  logger.info(`API handle get same category ranking: ${category}`);
  if (!category) {
    return error(400);
  }

  if (!Object.values(AppCategories).includes(category as AppCategories)) {
    return error(400);
  }

  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const apps = await appRepo.getRankAppsByCategory(category as AppCategories);

  return json(apps);
}

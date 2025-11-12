import { json, type RequestEvent } from "@sveltejs/kit";
import { RankTypes } from "$lib/share/app.ts";
import logger from "$lib/server/log.ts";
import { QS_SEARCH_TYPE_KEY } from "$lib/share/search.ts";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";

export async function GET({ url, locals }: RequestEvent) {
  const rankTypeQS =
    (url.searchParams.get(QS_SEARCH_TYPE_KEY) ?? RankTypes.Total)
      .trim()
      .toLowerCase();

  logger.info(`API handle rankType: ${rankTypeQS}`);

  let rankType = RankTypes.Total;

  switch (rankTypeQS) {
    case RankTypes.Month.toLowerCase():
      rankType = RankTypes.Month;
      break;
    case RankTypes.Week.toLowerCase():
      rankType = RankTypes.Week;
      break;
    default:
      rankType = RankTypes.Total;
      break;
  }

  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const apps = await appRepo.getRankApps(rankType);

  return json(apps);
}

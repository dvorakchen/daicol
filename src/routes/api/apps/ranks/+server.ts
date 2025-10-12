import { json, type RequestEvent } from "@sveltejs/kit";
import { RankTypes } from "$lib/share/app.ts";
import { getRankApps } from "$lib/server/repo/apps.ts";
import logger from "$lib/server/log.ts";

export async function GET({ url }: RequestEvent) {
  const rankTypeQS = (url.searchParams.get("type") ?? RankTypes.Total).trim()
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

  const apps = await getRankApps(rankType);

  return json(apps);
}

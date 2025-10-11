import type { RequestEvent } from "@sveltejs/kit";
import { getHotApps } from "../lib/server/repo/apps.ts";

const HOME_PAGE_HOT_APPS_COUNT = 10;

export async function load({}: RequestEvent) {

  const hotApps = await getHotApps(HOME_PAGE_HOT_APPS_COUNT);

  return {
    hotApps
  }
}

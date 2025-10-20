import type { RequestEvent } from "@sveltejs/kit";
import {
  QS_SEARCH_KEY,
  QS_SEARCH_TYPE_KEY,
  SearchType,
} from "$lib/share/index.ts";
import { searchApps } from "$lib/server/repo/apps.ts";

export async function load({ url }: RequestEvent) {
  const sp = url.searchParams;
  const search = (sp.get(QS_SEARCH_KEY) ?? "").trim().toLowerCase();
  const typeQS = (sp.get(QS_SEARCH_TYPE_KEY) ?? "").trim().toLowerCase();

  let searchType: SearchType;
  switch (typeQS) {
    case SearchType.Latest.toLocaleLowerCase():
      searchType = SearchType.Latest;
      break;
    default:
      searchType = SearchType.None;
      break;
  }

  const apps = await searchApps(search, searchType);

  return {
    search,
    searchType,
    apps,
  };
}

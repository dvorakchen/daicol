import { json } from "@sveltejs/kit";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ locals }: RequestEvent) {
  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const apps = await appRepo.getHotApps(4, []);

  return json(apps);
}

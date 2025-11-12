import { redirect, type RequestEvent } from "@sveltejs/kit";
import {
  createApp,
  type CreationUpdateModel,
} from "$lib/server/repo/apps/create.ts";
import { type AppRepo, appRepoServiceId } from "$lib/server/repo/apps/index.ts";

export async function load({ locals }: RequestEvent) {
  const appRepo = locals.di.get<AppRepo>(appRepoServiceId);
  const unusedRouteId = await appRepo.getUnusedRouteId();

  return {
    unusedRouteId,
  };
}

export const actions = {
  create: async ({ request }: RequestEvent) => {
    const data = await request.formData();

    const creationModel = {} as CreationUpdateModel;
    data.entries().forEach(([key, value]) => {
      Object.defineProperty(creationModel, key, {
        enumerable: true,
        configurable: false,
        writable: false,
        value,
      });
    });

    await createApp(creationModel);

    redirect(301, `/admax112358/apps/${creationModel.routeId}`);
  },
};

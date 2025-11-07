import type { App } from "$lib/server/db/schema/index.ts";
import { db } from "$lib/server/db/index.ts";
import { apps } from "$lib/server/db/schema/apps.ts";
import { eq } from "drizzle-orm";
import { AppStatus } from "$lib/share/app.ts";
import logger from "$lib/server/log.ts";
import fileStore from "$lib/server/file-store.ts";

export type CreationUpdateModel =
  & Omit<
    App,
    "id" | "createAt" | "updateAt" | "status" | "tags" | "seoKeywords"
  >
  & {
    referenceImgs: string;
    seoKeywords: string;
    tags: string;
  };

export async function createApp(model: CreationUpdateModel) {
  logger.info(`Create app`);

  let exists = (await db.$count(apps, eq(apps.routeId, model.routeId))) > 0;

  if (exists) {
    throw `App routeId exists: ${model.routeId}`;
  }
  logger.info(`RouteId ${model.routeId} not exists`);

  exists = (await db.$count(apps, eq(apps.name, model.name))) > 0;
  if (exists) {
    throw `App name exists: ${model.routeId}`;
  }
  logger.info(`RouteId ${model.routeId} not exists`);

  const insertionModel = {
    routeId: model.routeId,
    name: model.name,
    category: model.category,
    tags: JSON.parse(model.tags),
    description: model.description,
    seoKeywords: JSON.parse(model.seoKeywords),
    seoDescription: model.seoDescription,
    model: model.model,
    source: model.source,
    prompt: model.prompt,
    rate: model.rate,
    points: model.points,

    referenceImgs: JSON.parse(model.referenceImgs),
    originImg: model.originImg,
    handledImg: model.handledImg,
    icon: model.icon,
    barImg: model.barImg,
    promptPlugIn: JSON.parse(model.promptPlugIn as string),
    status: AppStatus.Enabled,
  } as App;

  await db.insert(apps).values({
    ...insertionModel,
  });
}

export async function updateApp(model: CreationUpdateModel) {
  logger.info(`Update app`);

  const existApp = await db.query.apps.findFirst({
    where: eq(apps.routeId, model.routeId),
  });

  if (!existApp) {
    throw `App routeId not exists: ${model.routeId}`;
  }

  const updateModel = {
    category: model.category,
    tags: JSON.parse(model.tags),
    description: model.description,
    seoKeywords: JSON.parse(model.seoKeywords),
    seoDescription: model.seoDescription,
    model: model.model,
    source: model.source,
    prompt: model.prompt,
    rate: model.rate,
    points: model.points,

    referenceImgs: model.referenceImgs ? JSON.parse(model.referenceImgs) : [],
    originImg: model.originImg,
    handledImg: model.handledImg,
    icon: model.icon,
    barImg: model.barImg,
    promptPlugIn: JSON.parse(model.promptPlugIn as string),
    status: AppStatus.Enabled,
  } as App;

  // collecting url those should be clean
  const cleanupImgs = [];

  console.log(`exist app: `, existApp);
  console.log(`updating model: `, updateModel);

  if ((existApp.referenceImgs ?? []).length > 0) {
    existApp.referenceImgs!.forEach((t) => {
      if (!updateModel.referenceImgs!.includes(t)) {
        cleanupImgs.push(t);
      }
    });
  }

  if (updateModel.originImg !== existApp.originImg) {
    cleanupImgs.push(existApp.originImg);
  }
  if (updateModel.handledImg !== existApp.handledImg) {
    cleanupImgs.push(existApp.handledImg);
  }
  if (updateModel.icon !== existApp.icon) {
    cleanupImgs.push(existApp.icon);
  }
  if (updateModel.barImg !== existApp.barImg) {
    cleanupImgs.push(existApp.barImg);
  }

  await db
    .update(apps)
    .set({
      ...updateModel,
    })
    .where(eq(apps.routeId, model.routeId));

  //	cleanup images
  logger.info(`Cleanup unused images: ${JSON.stringify(cleanupImgs)}`);
  await fileStore.removeAll(cleanupImgs);
}

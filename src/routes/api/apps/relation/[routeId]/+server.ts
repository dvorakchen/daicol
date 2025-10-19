import { json, type RequestEvent } from "@sveltejs/kit";
import logger from "$lib/server/log.ts";
import { getRelationApps } from "$lib/server/repo/apps.ts";

export async function GET({ params }: RequestEvent) {
    const routeId = params.routeId ?? '';
    
    if (isNaN(parseInt(routeId))) {
        return json({}, { status: 422 });
    }

    logger.info(`api/apps/relation/[routeId]: ${routeId}`);
    
    const apps = await getRelationApps(+routeId);

    return json(apps);
}

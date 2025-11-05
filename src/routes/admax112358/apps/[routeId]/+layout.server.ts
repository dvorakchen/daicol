import { error, type RequestEvent } from "@sveltejs/kit";
import { getAppByRouteId } from "$lib/server/repo/apps/apps.ts";

export async function load({ params }: RequestEvent) {
    if (isNaN(parseInt(params.routeId ?? ''))) {
        return error(400, { message: `Unknow RouteId: ${params.routeid}`});
    }

    const routeId = +(params.routeId ?? '');

    const app = await getAppByRouteId(routeId);
    if (!app) {
        return error(400, { message: `Unknow RouteId: ${params.routeid}`});
    }

    return {
        app
    }
}

import { getRecommendApps } from '$lib/server/repo/apps.ts';
import { json } from '@sveltejs/kit';

export async function GET() {
	const apps = await getRecommendApps();

	return json(apps);
}

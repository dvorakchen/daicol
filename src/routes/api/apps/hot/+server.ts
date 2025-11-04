import { json } from '@sveltejs/kit';
import { getHotApps } from '$lib/server/repo/apps/index.ts';

export async function GET() {
	const apps = await getHotApps(4);

	return json(apps);
}

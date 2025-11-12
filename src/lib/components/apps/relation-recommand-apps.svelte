<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppWithoutPrompt } from '$lib/server/db/schema/index.ts';
	import { get } from '$lib/client/net/http.ts';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';
	import AppCard from '../app-card.svelte';

	let { app }: { app: AppWithoutPrompt } = $props();

	const APP_COUNT = 16;
	let getApps = getRelationApps();

	function getRelationApps(): Promise<AppWithoutPrompt[]> {
		return new Promise((resolve, reject) => {
			get<AppWithoutPrompt[]>(`/api/apps/relation/${app.routeId}?count=${APP_COUNT}`).subscribe({
				next: (data) => {
					resolve(data);
				},
				error: (e) => {
					console.error(`request get relation apps by routeId failed: ${e}`);
					reject(e);
				}
			});
		});
	}
</script>

<div class="my-4 flex w-full flex-col rounded-xl md:p-6 md:shadow-sm">
	<h1 class="text-lg font-bold">{m['app.ai.detail.relation_recommand']()}</h1>
</div>

{#await getApps}
	<div class="flex items-center justify-center">
		<BikeLoading />
	</div>
{:then apps}
	<div class="grid grid-cols-4 grid-rows-2 gap-2">
		{#each apps as app (app.routeId)}
			<AppCard {app} />
		{/each}
	</div>
{/await}

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppEntityTypeWithoutPrompt } from '$lib/share';
	import { get } from '$lib/client/net/http.ts';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';
	import AppCard from '../app-card.svelte';

	let { app }: { app: AppEntityTypeWithoutPrompt } = $props();

	let getApps = getRelationApps();

	function getRelationApps(): Promise<AppEntityTypeWithoutPrompt[]> {
		return new Promise((resolve, reject) => {
			get<AppEntityTypeWithoutPrompt[]>(`/api/apps/relation/${app.routeId}`).subscribe({
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
	<div class="grid grid-cols-4 grid-rows-2">
		{#each apps as app (app.routeId)}
			<AppCard {app} />
		{/each}
	</div>
{/await}

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppWithoutPrompt } from '$lib/server/db/schema.ts';
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http.ts';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';
	import AppCard from '../app-card.svelte';
	import { getContext } from 'svelte';

	let { app }: { app: AppWithoutPrompt } = $props();

	const http: Http = getContext(HTTP_SERVER_KEY);

	const APP_COUNT = 16;

	function getRelationApps(): Promise<AppWithoutPrompt[]> {
		return http.get<AppWithoutPrompt[]>(`/api/apps/relation/${app.routeId}?count=${APP_COUNT}`);
	}
</script>

<div class="my-4 flex w-full flex-col rounded-xl md:p-6 md:shadow-sm">
	<h1 class="text-lg font-bold">{m['app.ai.detail.relation_recommand']()}</h1>
</div>

{#await getRelationApps()}
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

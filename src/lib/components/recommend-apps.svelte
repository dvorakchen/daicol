<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppWithoutPrompt } from '$lib/server/db/schema/index.ts';
	import AppCard from '$lib/components/app-card.svelte';
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';
	import { getContext } from 'svelte';

	let { apps } = $props();

	const http: Http = getContext(HTTP_SERVER_KEY);

	let loading = $state(false);

	async function onclick() {
		if (loading) {
			return;
		}
		loading = true;

		const data = await http.get<AppWithoutPrompt[]>(`/api/apps/recommend`);
		apps = data;
		loading = false;
	}
</script>

<div class="flex items-end">
	<h1 class="text-primary-to-accent grow text-4xl font-bold">
		{m['app.ai.recommend']()}
	</h1>

	<button class="btn btn-sm btn-primary" {onclick} disabled={loading}>
		{#if loading}
			<span class="loading-spin loading loading-xs"></span>
		{/if}
		{m['app.ai.recommend.change']()}
	</button>
</div>

<div
	class="-mx-2 grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-5"
>
	{#each apps as app (app.routeId)}
		<AppCard {app} />
	{/each}
</div>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { get } from '$lib/client/net/http.ts';
	import type { AppWithoutPrompt } from '$lib/server/db/schema/index.ts';
	import AppCard from '$lib/components/app-card.svelte';

	let { apps } = $props();

	let loading = $state(false);

	function onclick() {
		if (loading) {
			return;
		}
		loading = true;

		get<AppWithoutPrompt[]>(`/api/apps/recommend`).subscribe({
			next: (data) => {
				apps = data;
				loading = false;
			},
			error: (error) => {
				loading = false;
				console.error(error);
			}
		});
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

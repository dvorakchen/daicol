<script lang="ts">
	import AppCard from '$lib/components/app-card.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { SearchType } from '$lib/share/index.ts';

	let { data } = $props();
</script>

<h1 class="text-primary-to-accent mt-4 grow text-4xl font-bold">
	{#if !data.search && data.searchType === SearchType.None}
		{m['search_ai.look_around']()}
	{:else if data.searchType === SearchType.Latest}
		{m['app.ai.latest']()}
	{/if}
</h1>

<div
	class="-mx-2 grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-5"
>
	{#each data.apps as app (app.routeId)}
		<AppCard {app} />
	{/each}
</div>

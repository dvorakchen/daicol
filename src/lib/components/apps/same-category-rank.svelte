<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ChevronRight, Star } from 'lucide-svelte';
	import { get } from '$lib/client/net/http.ts';
	import { type AppEntityTypeWithPrompt } from '$lib/share/index.ts';
	import type { Subscription } from 'rxjs';
	import { onDestroy } from 'svelte';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';

	let { category } = $props();
	let sub: Subscription;

	onDestroy(() => {
		sub?.unsubscribe();
	});

	function getCategoryRanking(): Promise<AppEntityTypeWithPrompt[]> {
		return new Promise((resolve, reject) => {
			sub = get<AppEntityTypeWithPrompt[]>(
				`/api/apps/ranks/category?category=${category}`
			).subscribe({
				next: (data) => {
					resolve(data);
				},
				error: (e) => {
					reject(e);
				}
			});
		});
	}
</script>

<div class="overflow-hidden rounded-xl shadow-sm">
	<div class="border-b border-secondary/10 bg-secondary/10 px-5 py-3">
		<h3 class="flex items-center text-lg font-bold">{m['app.ai.detail.category_rank']()}</h3>
	</div>
	<div class="divide-y divide-secondary/10">
		{#await getCategoryRanking()}
			<div class="flex justify-center pt-4">
				<BikeLoading />
			</div>
		{:then apps}
			{#each apps as app, i (app.routeId)}
				<div class="flex items-center bg-secondary/5 p-4">
					<div
						class="rank-1 mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-accent"
					>
						{i + 1}
					</div>
					<a href={`/ai/${app.routeId}`}>
						<img class="mr-3 h-12 w-12 rounded object-cover" src={app.icon} alt={app.name} /></a
					>
					<div class="min-w-0 flex-1">
						<a href={`/ai/${app.routeId}`} class="link truncate font-medium text-secondary"
							>{app.name}</a
						>
						<div class="mt-0.5 flex items-center text-xs text-amber-500">
							<span class="w-5"><Star size="sm" /> </span><span class="ml-1 text-gray-600"
								>{app.rate}</span
							>
						</div>
					</div>
					<div class="text-right"><div class="text-sm font-medium">{app.useCount}</div></div>
				</div>
			{/each}
		{/await}
	</div>
	<div class="flex justify-center border-t border-secondary/10 bg-secondary/5 p-3 text-center">
		<a href="/search" class="flex w-fit link justify-center text-sm"
			>{m.more()} <span class="w-5"> <ChevronRight size="sm" /></span></a
		>
	</div>
</div>

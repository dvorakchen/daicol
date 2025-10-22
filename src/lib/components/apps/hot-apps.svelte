<script lang="ts">
	import { get } from '$lib/client/net/http.ts';
	import { m } from '$lib/paraglide/messages';
	import type { AppWithoutPrompt } from '$lib/share/index.ts';
	import { Star } from 'lucide-svelte';
	import { Subscription } from 'rxjs';
	import { onDestroy } from 'svelte';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';

	let sub: Subscription;

	onDestroy(() => {
		sub?.unsubscribe();
	});

	function getHotApps(): Promise<AppWithoutPrompt[]> {
		return new Promise((resolve, reject) => {
			sub = get<AppWithoutPrompt[]>(`/api/apps/hot`).subscribe({
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

<div class="overflow-hidden rounded-xl bg-secondary/10 shadow-sm">
	<div class="border-b border-secondary/10 bg-secondary/10 px-5 py-3">
		<h3 class="flex items-center text-lg font-bold">
			{m['app.ai.detail.hot_apps']()}
		</h3>
	</div>
	<div class="divide-y divide-secondary/10">
		{#await getHotApps()}
			<div class="flex justify-center pt-4">
				<BikeLoading />
			</div>
		{:then apps}
			{#each apps as app (app.routeId)}
				<div class="flex items-center p-3">
					<a href={`/ai/${app.routeId}`}>
						<img class="mr-3 h-10 w-10 rounded object-cover" src={app.icon} alt={app.name} /></a
					>
					<div class="min-w-0 flex-1">
						<a href={`/ai/${app.routeId}`} class="link truncate text-sm font-medium">{app.name}</a>
						<div class="text-xs text-gray-500">{app.category}</div>
					</div>
					<div class="flex items-center text-xs text-amber-500">
						<span class="w-4"><Star size="sm" /></span>
						<span class="ml-1 text-gray-600">{app.rate}</span>
					</div>
				</div>
			{/each}
		{/await}
	</div>
</div>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Eye, Star } from 'lucide-svelte';
	import { get } from '$lib/client/net/http.ts';
	import type { AppEntityTypeWithoutPrompt } from '$lib/share';

	let { apps } = $props();

	let loading = $state(false);

	function onclick() {
		if (loading) {
			return;
		}
		loading = true;

		get<AppEntityTypeWithoutPrompt[]>(`/api/apps/recommend`).subscribe({
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
		<div
			class="relative overflow-hidden rounded-lg bg-base-100 shadow-md nth-[10]:hidden sm:nth-[9]:hidden lg:nth-[10]:block lg:nth-[9]:block"
		>
			<a href={`/ai/${app.routeId}`}
				><img src={app.icon} alt={app.name} class="aspect-video w-full object-cover" /></a
			>
			<div class="flex items-center justify-between bg-base-100 px-1 py-2 sm:block sm:px-2">
				<h3 class="truncate font-semibold">
					<a href={`/ai/${app.routeId}`} class="link">{app.name}</a>
				</h3>
				<div class="tooltip block tooltip-primary" data-tip={app.description}>
					<div
						class="mt-1 hidden max-w-full min-w-0 items-center truncate text-sm whitespace-nowrap text-gray-500 sm:block"
					>
						{app.description}
					</div>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center text-sm text-amber-500">
						<span class="w-5">
							<Star size="sm" />
						</span>
						<span class="ml-1">{app.rate}</span>
					</div>
					<span class="hidden items-center gap-2 text-xs text-gray-500 sm:flex"
						>{app.useCount}
						<span class="w-5">
							<Eye size="xs" />
						</span>
					</span>
				</div>
			</div>
		</div>
	{/each}
</div>

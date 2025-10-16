<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { RankTypes, type AppEntityTypeWithoutPrompt } from '$lib/share/app.js';
	import { ChevronUp, Star } from 'lucide-svelte';
	import { get } from '$lib/client/net/http.ts';
	import { debounceTime } from 'rxjs';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';

	let { initList }: { initList: AppEntityTypeWithoutPrompt[] } = $props();

	let first = true;
	let rankType = $state(RankTypes.Week);
	let rankApps = $state(initList.map((app) => ({ ...app })));
	let top3Apps = $derived(rankApps.slice(0, 3));
	let restApps = $derived(rankApps.slice(3));
	let loading = $state(false);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		rankType;
		if (first) {
			first = false;
			return;
		}

		loading = true;
		const subscription = get<AppEntityTypeWithoutPrompt[]>(`/api/apps/ranks?type=${rankType}`)
			.pipe(debounceTime(500))
			.subscribe({
				next: (data: AppEntityTypeWithoutPrompt[]) => {
					rankApps = data;
					loading = false;
				},
				error: (e) => {
					loading = false;
					console.error(`get rank apps error: `, e);
				}
			});

		return () => {
			subscription.unsubscribe();
		};
	});

	function onChangeRankType(newRankType: RankTypes) {
		rankType = newRankType;
	}
</script>

<div class="relative w-full">
	{#if loading}
		<div
			class="item-center absolute inset-0 top-12 flex w-full items-center justify-center rounded-2xl bg-base-100/50 backdrop-blur-xs"
		>
			<BikeLoading />
		</div>
	{/if}
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-primary-to-accent text-2xl font-bold">{m['app.ai.rank']()}</h2>
		<div class="flex space-x-2">
			<button
				class={['btn btn-sm btn-primary', rankType === RankTypes.Week ? '' : 'btn-outline']}
				onclick={() => onChangeRankType(RankTypes.Week)}>{m['app.ai.rank_week']()}</button
			>
			<button
				class={['btn btn-sm btn-primary', rankType === RankTypes.Month ? '' : 'btn-outline']}
				onclick={() => onChangeRankType(RankTypes.Month)}>{m['app.ai.rank_month']()}</button
			>
			<button
				class={['btn btn-sm btn-primary', rankType === RankTypes.Total ? '' : 'btn-outline']}
				onclick={() => onChangeRankType(RankTypes.Total)}>{m['app.ai.rank_total']()}</button
			>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<div class="grid grid-cols-3 gap-4 lg:col-span-1">
			{#each top3Apps as app, i (app.routeId)}
				<div
					class="col-span-3 overflow-hidden rounded-xl border border-base-100 bg-base-100 shadow-md"
				>
					<div class="flex items-center p-4">
						<div
							class="mr-4 flex h-10 w-10 items-center justify-center text-lg font-bold text-primary"
						>
							{i + 1}
						</div>
						<a href={`/ai/${app.routeId}`}
							><img
								src={app.icon}
								alt={app.name}
								class="mr-4 h-16 w-16 rounded-lg object-cover"
							/></a
						>
						<div class="flex-1">
							<h3 class="text-lg font-bold">
								<a class="link" href={`/ai/${app.routeId}`}>{app.name}</a>
							</h3>
							<div class="mt-1 flex items-center">
								<span class="rounded-full bg-secondary/10 px-2 py-0.5 text-xs text-secondary"
									>{app.category}</span
								>
								<div class="ml-2 flex items-center text-sm text-amber-500">
									<Star /> <span class="ml-1">{app.rate}</span>
								</div>
							</div>
						</div>
						<div class="text-right">
							<div class="text-2xl font-bold text-primary">{app.useCount}</div>
						</div>
					</div>
					<p class="px-8 text-sm text-gray-500">{app.description}</p>
				</div>
			{/each}
		</div>
		<div
			class="overflow-hidden rounded-xl border border-base-100 bg-base-100 shadow-md lg:col-span-2"
		>
			<div
				class="grid grid-cols-10 border-b border-base-100 bg-base-100 px-4 py-3 text-sm text-gray-500"
			>
				<div class="col-span-1 font-medium">{m['app.ai.rank.table_head.rank']()}</div>
				<div class="col-span-4 font-medium">{m['app.ai.rank.table_head.app_name']()}</div>
				<div class="col-span-2 font-medium">{m['app.ai.rank.table_head.category']()}</div>
				<div class="col-span-2 font-medium">{m['app.ai.rank.table_head.rate']()}</div>
				<div class="col-span-1 font-medium">{m['app.ai.rank.table_head.trand']()}</div>
			</div>
			<div class="divide-y divide-base-200">
				{#each restApps as app, i (app.routeId)}
					<div class="grid grid-cols-10 items-center px-4 py-3 transition-colors hover:bg-base-100">
						<div class="col-span-1 pl-1 font-medium text-primary">{i + 4}</div>
						<div class="col-span-4 flex items-center">
							<a href={`/ai/${app.routeId}`}
								><img src={app.icon} alt={app.name} class="mr-3 h-8 w-8 rounded object-cover" /></a
							> <a class="link" href={`/ai/${app.routeId}`}>{app.name}</a>
						</div>
						<div class="col-span-2 text-sm text-gray-500">{app.category}</div>
						<div class="col-span-2 flex items-center text-sm text-amber-500">
							<Star />
							<span class="ml-1">{app.rate}</span>
						</div>
						<div class="col-span-1 text-green-500">
							<ChevronUp class="h-6 w-6 shrink-0" />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

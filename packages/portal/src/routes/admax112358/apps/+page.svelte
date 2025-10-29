<script lang="ts">
	import { get } from '$lib/client/net/http';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';
	import type { AppWithoutPrompt } from '$lib/server/db/schema';
	import type { GetAppFilter } from '$lib/share';
	import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
	import { onDestroy, onMount } from 'svelte';

	let filterData = $state({
		name: undefined,
		routeId: undefined
	} as GetAppFilter);
	let size = $state(20);
	let page = $state(1);
	let list = $state([] as AppWithoutPrompt[]);
	let loading = $state(false);

	const subject = new Subject<GetAppFilter>();
	let subscribe: Subscription;

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		filterData.name;
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		filterData.routeId;
		subject.next(filterData);
		loading = true;
	});

	onMount(() => {
		subscribe = subject
			.pipe(
				debounceTime(1_000),
				switchMap((value) => {
					console.log(value);
					return get<AppWithoutPrompt[]>(
						`/api/apps?page=${page}&size=${size}&name=${value?.name ? value.name : ''}&routeId=${value?.routeId ? value.routeId : ''}`
					);
				})
			)
			.subscribe({
				next: (data) => {
					list = data;
					loading = false;
				},
				error: (e) => {
					console.error(e);
					loading = false;
				}
			});
		subject.next({ name: undefined, routeId: undefined } as GetAppFilter);
	});

	onDestroy(() => {
		subscribe?.unsubscribe();
	});
</script>

<main class="flex flex-col gap-4">
	<div class="flex gap-4">
		<label class="input">
			<span class="label">RouteId</span>
			<input type="text" bind:value={filterData.routeId} />
		</label>
		<label class="input">
			<span class="label">App Name</span>
			<input type="text" bind:value={filterData.name} />
		</label>
		<!-- <button class="btn btn-primary" onclick={onSearch}>{m.search()}</button> -->
	</div>
	<div class="overflow-x-auto">
		<table class="table table-sm">
			<thead>
				<tr>
					<th></th>
					<th>RouteId</th>
					<th>Name</th>
					<th>company</th>
					<th>location</th>
					<th>Last Login</th>
					<th>Favorite Color</th>
				</tr>
			</thead>
			<tbody>
				{#if loading}
					<BikeLoading />
				{:else}
					{#each list as app, i (app.routeId)}
						<tr>
							<th>{i + 1}</th>
							<td>{app.routeId}</td>
							<td>{app.name}</td>
							<td>Littel, Schaden and Vandervort</td>
							<td>Canada</td>
							<td>12/16/2020</td>
							<td>Blue</td>
						</tr>
					{/each}
				{/if}
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th>RouteId</th>
					<th>Name</th>
					<th>company</th>
					<th>location</th>
					<th>Last Login</th>
					<th>Favorite Color</th>
				</tr>
			</tfoot>
		</table>
	</div>
</main>

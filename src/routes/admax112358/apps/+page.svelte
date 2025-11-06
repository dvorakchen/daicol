<script lang="ts">
	import { deleteHttp, get } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import ConfirmButton from '$lib/components/confirm-button.svelte';
	import BikeLoading from '$lib/components/loading-handling/bike-loading.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import type { AppWithoutPrompt } from '$lib/server/db/schema';
	import type { GetAppFilter, PaginationList } from '$lib/share';
	import { debounceTime, Subject, Subscription, switchMap, tap } from 'rxjs';
	import { onDestroy, onMount } from 'svelte';

	let pageData = $state({
		filter: { name: undefined, routeId: undefined } as GetAppFilter,
		page: 1
	});

	const SIZE = 20;
	let list = $state([] as AppWithoutPrompt[]);
	let total = $state(0);
	let loading = $state(false);

	const subject = new Subject<{ filter: GetAppFilter; page: number }>();
	let subscribe: Subscription;

	$effect(() => {
		const {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			filter: { name, routeId },
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			page
		} = pageData;

		subject.next(pageData);
	});

	onMount(() => {
		subscribe = subject
			.pipe(
				tap(() => {
					loading = true;
				}),
				debounceTime(500),
				switchMap((value) => {
					return get<PaginationList<AppWithoutPrompt>>(
						`/api/apps?page=${value.page}&size=${SIZE}&name=${value?.filter?.name ? value.filter?.name : ''}&routeId=${value?.filter?.routeId ? value?.filter?.routeId : ''}`
					);
				})
			)
			.subscribe({
				next: (data) => {
					list = data.list;
					total = data.total;
					loading = false;
				},
				error: (e) => {
					console.error(e);
					loading = false;
				}
			});
		subject.next(pageData);
	});

	onDestroy(() => {
		subscribe?.unsubscribe();
	});

	function onReset() {
		pageData.filter.routeId = undefined;
		pageData.filter.name = undefined;
		pageData.page = 1;
	}

	function onPageChange(newPage: number) {
		pageData.page = newPage;
	}

	function resetPage() {
		pageData.page = 1;
	}

	function onDelete(routeId: number) {
		deleteHttp(`/api/apps?routeId=${routeId}`).subscribe({
			next: () => {
				toastMan.add('success', `Delete Success`);
				list = list.filter((t) => t.routeId !== routeId);
			},
			error: (e) => {
				console.error(`delete fail: `, e);
				toastMan.add('error', `Delete failed`);
			}
		});
	}
</script>

<main class="flex flex-col gap-4">
	<div class="flex gap-4">
		<label class="input">
			<span class="label">RouteId</span>
			<input type="text" bind:value={pageData.filter.routeId} onkeydown={resetPage} />
		</label>
		<label class="input">
			<span class="label">App Name</span>
			<input type="text" bind:value={pageData.filter.name} onkeydown={resetPage} />
		</label>
		<button class="btn btn-secondary" onclick={onReset}>Reset</button>
		<a href="apps/new" class="btn btn-primary">New</a>
	</div>
	<div class="overflow-x-auto">
		<table class="table table-sm">
			<thead>
				<tr>
					<th></th>
					<th>RouteId</th>
					<th>Name</th>
					<th>Category</th>
					<th>Icon</th>
					<th>Create At</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if loading}
					<tr>
						<td colspan="7">
							<div class="flex justify-center py-8">
								<BikeLoading />
							</div>
						</td>
					</tr>
				{:else}
					{#each list as app, i (app.routeId)}
						<tr class=" hover:bg-base-200/50">
							<th>{i + 1}</th>
							<td>{app.routeId}</td>
							<td>{app.name}</td>
							<td>{app.category}</td>
							<td>
								<div class="avatar">
									<div class="w-8 rounded">
										<img src={app.icon} alt={app.name} />
									</div>
								</div>
							</td>
							<td>{app.createAt}</td>
							<td>
								<a class="btn btn-sm btn-primary" href={`apps/${app.routeId}`}>Edit</a>
								<ConfirmButton
									label="Delete"
									onConfirm={() => {
										onDelete(app.routeId);
									}}
								/>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th>RouteId</th>
					<th>Name</th>
					<th>Category</th>
					<th>Icon</th>
					<th>Create At</th>
					<th>Action</th>
				</tr>
			</tfoot>
		</table>

		<Pagination page={pageData.page} {total} onchange={onPageChange} />
	</div>
</main>

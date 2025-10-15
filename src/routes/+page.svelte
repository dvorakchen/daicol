<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { type AppEntityTypeWithPrompt } from '$lib/share/app.js';
	import { Eye, Star } from 'lucide-svelte';

	import RankApps from '$lib/components/rank-apps.svelte';
	import Footer from '$lib/components/footer.svelte';
	import More from '$lib/components/more.svelte';
	import { QS_SEARCH_TYPE_KEY, SearchType } from '$lib/share/search.js';

	let { data } = $props();

</script>

<Navbar />
<!-- <Navbar userSignInInfo={data.userSignInInfo} /> -->
<main class="mx-auto min-h-screen space-y-4 px-2 py-4 lg:max-w-6xl xl:max-w-7xl">
	<section>
		<h1 class="text-primary-to-accent text-4xl font-bold">
			{m['app.ai.hot']()}
		</h1>
		<div
			class="-mx-2 grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-5"
		>
			{#each data.hotApps as app (app.routeId)}
				{@render appCard(app)}
			{/each}
		</div>
	</section>

	<section class="rounded-xl bg-base-200 p-4">
		<RankApps initList={data.rankApps} />
	</section>
	<section class="rounded-xl bg-base-200 p-4">
		<h1 class="text-primary-to-accent text-2xl font-bold">{m['app.ai.latest']()}</h1>
		<div
			class="-mx-2 grid grid-cols-3 grid-rows-2 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-1 lg:grid-cols-6"
		>
			{#each data.hotApps.slice(0, 6) as app (app.routeId)}
				{@render appCard(app)}
			{/each}
		</div>
		<div class="mt-4 text-center">
			<More link={`/search?${QS_SEARCH_TYPE_KEY}=${SearchType.Latest}`} />
		</div>
	</section>
</main>
<Footer />

{#snippet appCard(apps: AppEntityTypeWithPrompt)}
	<div
		class="relative overflow-hidden rounded-lg bg-base-100 shadow-md nth-[10]:hidden sm:nth-[9]:hidden lg:nth-[10]:block lg:nth-[9]:block"
	>
		<a href={`/ai/${apps.routeId}`}
			><img src={apps.icon} alt={apps.name} class="aspect-video w-full object-cover" /></a
		>
		<div class="flex items-center justify-between bg-base-100 px-1 py-2 sm:block sm:px-2">
			<h3 class="truncate font-semibold">
				<a href={`/ai/${apps.routeId}`} class="link">{apps.name}</a>
			</h3>
			<div class="tooltip block tooltip-primary" data-tip={apps.description}>
				<div
					class="mt-1 hidden max-w-full min-w-0 items-center truncate text-sm whitespace-nowrap text-gray-500 sm:block"
				>
					{apps.description}
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center text-sm text-amber-500">
					<Star size="sm" />
					<span class="ml-1">{apps.rate}</span>
				</div>
				<span class="hidden items-center gap-2 text-xs text-gray-500 sm:flex"
					>{apps.useCount}
					<span class="w-5">
						<Eye size="xs" />
					</span>
				</span>
			</div>
		</div>
	</div>
{/snippet}

<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import RankApps from '$lib/components/rank-apps.svelte';
	import Footer from '$lib/components/footer.svelte';
	import More from '$lib/components/more.svelte';
	import { QS_SEARCH_TYPE_KEY, SearchType } from '$lib/share/search.js';
	import RecommendApps from '$lib/components/recommend-apps.svelte';
	import AppCard from '$lib/components/app-card.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { env } from '$env/dynamic/public';

	let { data } = $props();
</script>

<MetaTags
	title={`${m.home()}`}
	titleTemplate={`%s - ${m.title()} ${m.prompt_less_out_of_box()}`}
	description={m.seo_description()}
	canonical={env.PUBLIC_HOST}
	openGraph={{
		url: env.PUBLIC_HOST,
		title: m.title(),
		description: m.seo_description(),
		images: [
			{
				url: `${env.PUBLIC_HOST}logo.png`,
				width: 800,
				height: 600,
				alt: `${m.title()} logo`
			}
		],
		siteName: m.title()
	}}
/>

<Navbar userSignInInfo={data.userSignInInfo} />
<main class="mx-auto min-h-screen space-y-4 px-2 py-4 lg:max-w-6xl xl:max-w-7xl">
	<section>
		<RecommendApps apps={data.recommendApps} />
	</section>

	<section class="rounded-xl bg-base-200 p-4">
		<RankApps initList={data.rankApps} />
	</section>
	<section class="mt-8">
		<h1 class="text-primary-to-accent text-2xl font-bold">{m['app.ai.latest']()}</h1>
		<div
			class="-mx-2 grid grid-cols-3 grid-rows-2 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-1 lg:grid-cols-6"
		>
			{#each data.latestApps as app (app.routeId)}
				<AppCard {app} />
			{/each}
		</div>
		<div class="mt-4 text-center">
			<More link={`/search?${QS_SEARCH_TYPE_KEY}=${SearchType.Latest}`} />
		</div>
	</section>
</main>
<Footer />

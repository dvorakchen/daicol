<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Bot, House } from 'lucide-svelte';
	import AppInfo from '$lib/components/apps/app-info.svelte';
	import Banner from '$lib/components/apps/banner.svelte';
	import SameCategoryRank from '$lib/components/apps/same-category-rank.svelte';
	import HotApps from './hot-apps.svelte';
	import Preview1ImgTo1Img from '$lib/components/apps/preview-1-img-to-1-img.svelte';
	import Generator1ImgTo1Img from '$lib/components/generator-box/generator-1-img-to-1-img.svelte';
	import RelationRecommandApps from './relation-recommand-apps.svelte';

	let { app } = $props();
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li>
			<a href="/" class="">
				<span class="w-5">
					<House size="md" />
				</span>
				{m.home()}
			</a>
		</li>
		<li>
			<span class="w-5">
				<Bot size="md" />
				{app.name}
			</span>
		</li>
	</ul>
</div>

<main class="mx-auto py-2">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
		<div class="flex flex-col lg:col-span-2">
			<Banner {app} />
			<div class="my-4 flex w-full flex-col rounded-xl md:p-6 md:shadow-sm">
				<h1 class="text-lg font-bold">{m['app.ai.detail.use_it_immediately']()}</h1>
			</div>

			<Preview1ImgTo1Img original={app.originImg} handled={app.handledImg} />

			<div class="divider divider-secondary"></div>
			<Generator1ImgTo1Img routeId={app.routeId} promptPlugIn={app.promptPlugIn} />

			<div class="divider divider-secondary"></div>
			<RelationRecommandApps {app} />
		</div>
		<div class="space-y-6">
			<AppInfo {app} />

			<SameCategoryRank category={app.category} />

			<HotApps />
		</div>
	</div>
</main>

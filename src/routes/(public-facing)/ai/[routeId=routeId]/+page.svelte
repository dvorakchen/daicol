<script lang="ts">
	import OneImgToOneImg from '$lib/components/apps/1-img-to-1-img.svelte';
	import AppInfo from '$lib/components/apps/app-info.svelte';
	import SameCategoryRank from '$lib/components/apps/same-category-rank.svelte';
	import HotApps from '$lib/components/apps/hot-apps.svelte';
	import Banner from '$lib/components/apps/banner.svelte';
	import { Bot, House } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages.js';
	import RelationRecommandApps from '$lib/components/apps/relation-recommand-apps.svelte';

	let { data } = $props();
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
				{data.app.name}
			</span>
		</li>
	</ul>
</div>

<main class="mx-auto py-2">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
		<div class="flex flex-col lg:col-span-2">
			<Banner app={data.app} />

			<OneImgToOneImg app={data.app} />

			<RelationRecommandApps app={data.app} />
		</div>
		<div class="space-y-6">
			<AppInfo app={data.app} />

			<SameCategoryRank category={data.app.category} />

			<HotApps />
		</div>
	</div>
</main>

<div class="mb-32"></div>

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Bot, House } from 'lucide-svelte';
	import AppInfo from '$lib/components/apps/app-info.svelte';
	import Banner from '$lib/components/apps/banner.svelte';
	import SameCategoryRank from './same-category-rank.svelte';
	import HotApps from './hot-apps.svelte';
	import originalPhoto from '$lib/assets/imgs/original-photo.jpg?enhanced';
	import Preview1ImgTo1Img from './preview-1-img-to-1-img.svelte';
	import Generator1ImgTo1Img from '../generator-1-img-to-1-img.svelte';
	import type { AppEntityType } from '$lib/share/index.ts';

	let { app }: { app: AppEntityType } = $props();
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

<main class="mx-auto px-4 py-6 md:py-8">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
		<div class="flex flex-col lg:col-span-2">
			<Banner />
			<div class="flex w-full flex-col rounded-xl md:p-6 md:shadow-sm my-4">
				<h1 class="text-lg font-bold">{m['app.ai.detail.use_it_immediately']()}</h1>
			</div>

			<Preview1ImgTo1Img original={originalPhoto} handled={originalPhoto} />

			<div class="divider divider-secondary"></div>
			<Generator1ImgTo1Img routeId={app.routeId} />
		</div>
		<div class="space-y-6">
			<AppInfo />

			<SameCategoryRank />

			<HotApps />
		</div>
	</div>
</main>

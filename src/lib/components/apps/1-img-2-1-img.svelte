<script>
	import { m } from '$lib/paraglide/messages';
	import { Bot, House } from 'lucide-svelte';
	import AppInfo from '$lib/components/apps/app-info.svelte';
	import Banner from '$lib/components/apps/banner.svelte';
	import SameCategoryRank from './same-category-rank.svelte';
	import HotApps from './hot-apps.svelte';
	import originalPhoto from '$lib/assets/imgs/original-photo.jpg?enhanced';
	import Preview1Img21Img from './preview-1-img-2-1-img.svelte';

	let { appName } = $props();
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
				{appName}
			</span>
		</li>
	</ul>
</div>

<main class="mx-auto px-4 py-6 md:py-8">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
		<div class="flex flex-col gap-6 lg:col-span-2">
			<Banner />
			<div class="flex w-full flex-col rounded-xl md:p-6 md:shadow-sm">
				<h1 class="text-lg font-bold">{m['app.ai.detail.use_it_immediately']()}</h1>
			</div>

			<Preview1Img21Img original={originalPhoto} handled={originalPhoto} />

			
		</div>
		<div class="space-y-6">
			<AppInfo />

			<SameCategoryRank />

			<HotApps />
		</div>
	</div>
</main>

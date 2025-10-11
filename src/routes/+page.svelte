<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { StarSolid } from 'flowbite-svelte-icons';

	let { data } = $props();
</script>

<Navbar userSignInInfo={data.userSignInInfo} />
<main class="mx-auto min-h-screen px-2 py-4 lg:max-w-6xl">
	<h1 class=" text-4xl font-bold">{m['app.ai.hot']()}</h1>

	<section
		class="-mx-2 grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden px-2 py-4 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-5"
	>
		{#each data.hotApps as app}
			{@render appCard(app.routeId, app.icon, app.name, app.description, +app.rate, app.useCount)}
		{/each}
		<!-- 
		{#each Array.from({ length: 10 }) as item}
			<div
				class="relative overflow-hidden rounded-lg bg-base-100 shadow-md nth-[10]:hidden sm:nth-[9]:hidden lg:nth-[10]:block lg:nth-[9]:block"
			>
				<a href={`/ai/`}
					><img
						src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
						alt="Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-23-07.png"
						class="aspect-video w-full object-cover"
					/></a
				>
				<div class="flex items-center justify-between bg-base-100 px-1 py-2 sm:block sm:px-2">
					<h3 class="truncate font-semibold">
						<a href={`/ai/`} class="link">手办生成</a>
					</h3>
					<div
						class="tooltip block tooltip-primary"
						data-tip="手办生成手办生成手办生成手办生成手办生成手办生成手办生成手办生成手办生成"
					>
						<div
							class="mt-1 hidden max-w-full min-w-0 items-center truncate text-sm whitespace-nowrap text-gray-500 sm:block"
						>
							手办生成手办生成手办生成手办生成手办生成手办生成手办生成手办生成手办生成
						</div>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center text-sm text-amber-500">
							<StarSolid size="sm" />
							<span class="ml-1">4.5</span>
						</div>
						<span class="hidden items-center gap-2 text-xs text-gray-500 sm:flex"
							>0<i class="icon icon-[mdi--eye-outline]"></i></span
						>
					</div>
				</div>
			</div>
		{/each} -->
	</section>
</main>

{#snippet appCard(
	routeId: string,
	icon: string,
	name: string,
	desc: string,
	rate: number,
	useCount: number
)}
	<div
		class="relative overflow-hidden rounded-lg bg-base-100 shadow-md nth-[10]:hidden sm:nth-[9]:hidden lg:nth-[10]:block lg:nth-[9]:block"
	>
		<a href={`/ai/${routeId}`}
			><img src={icon} alt={name} class="aspect-video w-full object-cover" /></a
		>
		<div class="flex items-center justify-between bg-base-100 px-1 py-2 sm:block sm:px-2">
			<h3 class="truncate font-semibold">
				<a href={`/ai/${routeId}`} class="link">{name}</a>
			</h3>
			<div
				class="tooltip block tooltip-primary"
				data-tip={desc}
			>
				<div
					class="mt-1 hidden max-w-full min-w-0 items-center truncate text-sm whitespace-nowrap text-gray-500 sm:block"
				>
					{desc}
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center text-sm text-amber-500">
					<StarSolid size="sm" />
					<span class="ml-1">{rate}</span>
				</div>
				<span class="hidden items-center gap-2 text-xs text-gray-500 sm:flex"
					>{useCount}<i class="icon icon-[mdi--eye-outline]"></i></span
				>
			</div>
		</div>
	</div>
{/snippet}

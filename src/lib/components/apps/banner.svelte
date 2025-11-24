<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppWithoutPrompt } from '$lib/server/db/schema.ts';
	import { Forward, MessageCircle, Star } from 'lucide-svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import { env } from '$env/dynamic/public';

	let { app }: { app: AppWithoutPrompt } = $props();
</script>

<div class="rounded-xl bg-base-200 shadow-sm">
	<div class="relative h-48 md:h-64">
		<img class="h-full w-full object-cover" src={app.barImg} alt={app.name} />
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-0 left-0 p-6 text-white">
			<div class="flex flex-col items-start">
				<p class="mb-4 text-lg">{app.description}</p>
				<h1 class="text-shadow text-2xl font-bold md:text-3xl">{app.name}</h1>
				<div class="mt-1 flex items-center gap-4">
					<span class="mr-2 rounded-full bg-secondary/90 px-2 py-0.5 text-xs text-white"
						>{app.category}</span
					>
					<div class="flex items-center text-sm text-amber-400">
						<span class="w-5"><Star size="xs" /></span>
						<span class="ml-1 text-white">{app.rate}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="p-6">
		<div class="flex flex-wrap items-center gap-3">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn m-1 btn-primary">
					<Forward />
					{m.share()}
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content menu z-10 w-52 rounded-box bg-base-100 p-2 shadow-sm"
				>
					<li>
						<CopyButton value={`${env.PUBLIC_HOST}ai/${app.routeId}`}>
							{m.copy_link()}
						</CopyButton>
					</li>
				</ul>
			</div>

			<button class="btn btn-outline btn-primary">
				<Star />
				{m.collection()}</button
			>
			<button class="btn">
				<MessageCircle />
				{m.comment()}</button
			>
		</div>
	</div>
</div>

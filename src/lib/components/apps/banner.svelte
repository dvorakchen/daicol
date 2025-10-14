<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { AppEntityTypeWithPrompt } from '$lib/share/index.ts';
	import { Forward, MessageCircle, Star } from 'lucide-svelte';

	let { app }: {app: AppEntityTypeWithPrompt} = $props();
</script>

<div class="overflow-hidden rounded-xl bg-base-200 shadow-sm">
	<div class="relative h-48 md:h-64">
		<img
			class="h-full w-full object-cover"
			src={app.barImg}
			alt="冷艳写真"
		/>
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
		<div class="flex flex-wrap gap-3">
			<button class="btn btn-primary">
				<Forward />
				{m.share()}</button
			>
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

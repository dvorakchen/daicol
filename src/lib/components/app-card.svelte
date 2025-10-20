<script lang="ts">
	import type { AppEntityTypeWithoutPrompt } from '$lib/share';
	import { Eye, Star } from 'lucide-svelte';

	let { app }: { app: AppEntityTypeWithoutPrompt } = $props();
</script>

<div
	class="relative overflow-hidden rounded-lg bg-base-100 shadow-md nth-[10]:hidden sm:nth-[9]:hidden lg:nth-[10]:block lg:nth-[9]:block"
>
	<a href={`/ai/${app.routeId}`}
		><img src={app.icon} alt={app.name} class="aspect-video w-full object-cover" /></a
	>
	<div class="flex items-center justify-between bg-base-100 px-1 py-2 sm:block sm:px-2">
		<h3 class="truncate font-semibold">
			<a href={`/ai/${app.routeId}`} class="link">{app.name}</a>
		</h3>
		<div class="tooltip block tooltip-primary" data-tip={app.description}>
			<div
				class="mt-1 hidden max-w-full min-w-0 items-center truncate text-sm whitespace-nowrap text-gray-500 sm:block"
			>
				{app.description}
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex items-center text-sm text-amber-500">
				<span class="w-3 md:w-4">
					<Star size="sm" />
				</span>
				<span class="ml-1">{app.rate}</span>
			</div>
			<span class="hidden items-center gap-2 text-xs text-gray-500 sm:flex"
				>{app.useCount}
				<span class="w-5">
					<Eye size="xs" />
				</span>
			</span>
		</div>
	</div>
</div>

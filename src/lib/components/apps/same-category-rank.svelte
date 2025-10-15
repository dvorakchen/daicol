<script>
	import { m } from '$lib/paraglide/messages';
	import { ChevronRight, Star } from 'lucide-svelte';

	let { routeId } = $props();
	
</script>

<div class="overflow-hidden rounded-xl shadow-sm">
	<div class="border-b border-secondary/10 bg-secondary/10 px-5 py-3">
		<h3 class="flex items-center text-lg font-bold">{m['app.ai.detail.category_rank']()}</h3>
	</div>
	<div class="divide-y divide-secondary/10">
		<div class="flex items-center bg-secondary/5 p-4">
			<div
				class="rank-1 mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-accent"
			>
				1
			</div>
			<img
				class="mr-3 h-12 w-12 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-18-48.png"
				alt="冷艳写真"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate font-medium text-secondary">冷艳写真</h4>
				<div class="mt-0.5 flex items-center text-xs text-amber-500">
					<span class="w-5"><Star size="sm" /> </span><span class="ml-1 text-gray-600">4.5</span>
				</div>
			</div>
			<div class="text-right"><div class="text-sm font-medium">0+</div></div>
		</div>
		<div class="flex items-center bg-secondary/5 p-4">
			<div
				class="rank-1 mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-accent"
			>
				2
			</div>
			<img
				class="mr-3 h-12 w-12 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-23-07.png"
				alt="手办生成"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate font-medium text-secondary">手办生成</h4>
				<div class="mt-0.5 flex items-center text-xs text-amber-500">
					<span class="w-5"><Star size="sm" /> </span> <span class="ml-1 text-gray-600">4.5</span>
				</div>
			</div>
			<div class="text-right"><div class="text-sm font-medium">0+</div></div>
		</div>
		<div class="flex items-center bg-secondary/5 p-4">
			<div
				class="rank-1 mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-accent"
			>
				3
			</div>
			<img
				class="mr-3 h-12 w-12 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-21-41.png"
				alt="日式四宫格漫画"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate font-medium text-secondary">日式四宫格漫画</h4>
				<div class="mt-0.5 flex items-center text-xs text-amber-500">
					<span class="w-5"><Star size="sm" /> </span> <span class="ml-1 text-gray-600">4.5</span>
				</div>
			</div>
			<div class="text-right"><div class="text-sm font-medium">0+</div></div>
		</div>
		<div class="flex items-center bg-secondary/5 p-4">
			<div
				class="rank-1 mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-accent"
			>
				4
			</div>
			<img
				class="mr-3 h-12 w-12 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-26-39.png"
				alt="地标建筑生成"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate font-medium text-secondary">地标建筑生成</h4>
				<div class="mt-0.5 flex items-center text-xs text-amber-500">
					<span class="w-5"><Star size="sm" /> </span> <span class="ml-1 text-gray-600">0.0</span>
				</div>
			</div>
			<div class="text-right"><div class="text-sm font-medium">0+</div></div>
		</div>
	</div>
	<div class="flex justify-center border-t border-secondary/10 bg-secondary/5 p-3 text-center">
		<a href="/search" class="flex w-fit link justify-center text-sm"
			>{m.more()} <span class="w-5"> <ChevronRight size="sm" /></span></a
		>
	</div>
</div>

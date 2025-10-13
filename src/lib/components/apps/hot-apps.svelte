<script>
	import { m } from "$lib/paraglide/messages";
	import { Star } from "lucide-svelte";

</script>
<div class="overflow-hidden rounded-xl bg-secondary/10 shadow-sm">
	<div class="border-b border-secondary/10 bg-secondary/10 px-5 py-3">
		<h3 class="flex items-center text-lg font-bold">
			{m["app.ai.detail.hot_apps"]()}
		</h3>
	</div>
	<div class="divide-y divide-secondary/10">
		<div class="flex items-center p-3">
			<img
				class="mr-3 h-10 w-10 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-18-48.png"
				alt="冷艳写真"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate text-sm font-medium">冷艳写真</h4>
				<div class="text-xs text-gray-500">创意设计</div>
			</div>
			<div class="flex items-center text-xs text-amber-500">
				<span class="w-5"><Star size="sm" /> </span>
				<span class="ml-1 text-gray-600">4.5</span>
			</div>
		</div>
		<div class="flex items-center p-3">
			<img
				class="mr-3 h-10 w-10 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-23-07.png"
				alt="手办生成"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate text-sm font-medium">手办生成</h4>
				<div class="text-xs text-gray-500">创意设计</div>
			</div>
			<div class="flex items-center text-xs text-amber-500">
				<span class="w-5"><Star size="sm" /> </span>
				<span class="ml-1 text-gray-600">4.5</span>
			</div>
		</div>
		<div class="flex items-center p-3">
			<img
				class="mr-3 h-10 w-10 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-21-41.png"
				alt="日式四宫格漫画"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate text-sm font-medium">日式四宫格漫画</h4>
				<div class="text-xs text-gray-500">创意设计</div>
			</div>
			<div class="flex items-center text-xs text-amber-500">
				<span class="w-5"><Star size="sm" /> </span>
				<span class="ml-1 text-gray-600">4.5</span>
			</div>
		</div>
		<div class="flex items-center p-3">
			<img
				class="mr-3 h-10 w-10 rounded object-cover"
				src="https://aipalui-admin.aiursoft.cn/download/Workspace/icon/2025/09/30/Screenshot From 2025-09-30 19-26-39.png"
				alt="地标建筑生成"
			/>
			<div class="min-w-0 flex-1">
				<h4 class="truncate text-sm font-medium">地标建筑生成</h4>
				<div class="text-xs text-gray-500">创意设计</div>
			</div>
			<div class="flex items-center text-xs text-amber-500">
				<span class="w-5"><Star size="sm" /> </span>
				<span class="ml-1 text-gray-600">0.0</span>
			</div>
		</div>
	</div>
</div>

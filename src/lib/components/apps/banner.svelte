<script>
	import { m } from '$lib/paraglide/messages';
	import { Forward, MessageCircle, Star } from 'lucide-svelte';
</script>

<div class="overflow-hidden rounded-xl bg-base-200 shadow-sm">
	<div class="relative h-48 md:h-64">
		<img
			class="h-full w-full object-cover"
			src="https://aipalui-admin.aiursoft.cn/download/Workspace/barimg/2025/09/30/Screenshot From 2025-09-29 13-41-51.png"
			alt="冷艳写真"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-0 left-0 p-6 text-white">
			<div class="flex flex-col items-start">
				<p class="mb-4 text-lg">使用人物图片生成冷艳风格的写真</p>
				<h1 class="text-shadow text-2xl font-bold md:text-3xl">冷艳写真</h1>
				<div class="mt-1 flex items-center gap-4">
					<span class="mr-2 rounded-full bg-secondary/90 px-2 py-0.5 text-xs text-white"
						>创意设计</span
					>
					<div class="flex items-center text-sm text-amber-400">
						<span class="w-5"><Star size="xs" /></span>
						<span class="ml-1 text-white">4.5 (0 {m.comment()})</span>
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

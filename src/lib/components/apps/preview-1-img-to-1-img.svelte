<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import SingleImgPreviewable from '$lib/components/previewers/single-img-previewable.svelte';

	let { original, handled } = $props();
</script>

<div class="grid grid-cols-4 grid-rows-1">
	<div class="flex items-center">
		<img src={original} alt="Original" />
	</div>
	<div class="flex items-center justify-center">
		<span class="flex font-bold">
			<span>
				<ChevronLeft />
			</span>
			{m['app.ai.detail.original_photo']()}
		</span>
	</div>
	<div class="flex items-center justify-center">
		<span class="flex font-bold">
			{m['app.ai.detail.handled_photo']()}
			<span>
				<ChevronRight />
			</span>
		</span>
	</div>
	<div>
		<SingleImgPreviewable imageLink={handled} />
	</div>
</div>

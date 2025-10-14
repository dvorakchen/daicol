<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ArrowRight } from 'lucide-svelte';
	import UploadFile from '$lib/components/upload-file.svelte';
	import MagicHandling from '$lib/components/loading-handling/magic-handling.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';

	let image = $state(null as null | File);
	let generating = $state(false);

	let handledImageLink = $state(null as null | string);

	function afterSelectImage(file: File) {
		image = file;
	}

	async function onGenerate() {
		if (!image) {
			return;
		}
		generating = true;
	}
</script>

<div class="grid grid-cols-3 grid-rows-1">
	<div>
		<UploadFile {afterSelectImage} />
	</div>
	<div class="flex items-center justify-center">
		{#if generating}
			<div class="text-center">
				<MagicHandling />
				{m['app.ai.generate.generating']()}...
			</div>
		{:else}
			<button
				class="btn h-16 flex-col btn-primary sm:h-10 sm:flex-row"
				onclick={onGenerate}
				disabled={generating}
			>
				{m['app.ai.generate.generate_it']()}
				<span class="w-5"> <ArrowRight /></span>
			</button>
		{/if}
	</div>
	<div>
		<div class="mx-auto max-w-md overflow-hidden rounded-lg md:max-w-xl flex items-center justify-center min-h-full">
			{#if handledImageLink}
				<img src={handledImageLink} alt="Handled" />
			{:else}
				<ImagePlaceholder />
			{/if}
		</div>
	</div>
</div>

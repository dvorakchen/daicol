<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ArrowRight } from 'lucide-svelte';
	import UploadFile from '$lib/components/upload-file.svelte';
	import MagicHandling from '$lib/components/loading-handling/magic-handling.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import { postFile } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import SingleImgPreviewable from './single-img-previewable.svelte';

	let { routeId } = $props();

	let image = $state(null as null | File);
	let generating = $state(false);
	let handledImageLink = $state(null as null | string);

	let openPreview = $state(false);

	let originalImgDiv: HTMLDivElement;
	let handledImgDiv: HTMLDivElement;

	function afterSelectImage(file: File) {
		image = file;
	}

	function afterImageLoaded() {
		originalImgDiv?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}

	async function onGenerate() {
		if (!image) {
			return;
		}
		generating = true;

		postFile(`/api/generator/1-img-to-1-img/${routeId}`, [image]).subscribe({
			next: (data) => {
				handledImageLink = (data as { url: string }).url;
				generating = false;
				handledImgDiv?.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
			},
			error: (e) => {
				console.error(e);
				toastMan.add(
					'error',
					`${m['app.ai.generate.error.occured_please_contact_administrator']()}: ${e.response.message}`
				);
				generating = false;
			}
		});
	}

	function onPreview() {
		if (handledImageLink === null) {
			openPreview = false;
			return;
		}

		openPreview = true;
	}
</script>

<div class="flex flex-col justify-between gap-4 md:flex-row">
	<div class="grow md:max-w-2xs">
		<div class="max-x-full" bind:this={originalImgDiv}>
			<UploadFile {afterSelectImage} {afterImageLoaded} />
		</div>
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
				<span class="w-5 rotate-90 md:rotate-0"> <ArrowRight /></span>
			</button>
		{/if}
	</div>
	<div class="grow md:max-w-2xs">
		<div
			class="mx-auto flex min-h-full max-w-md items-center justify-center overflow-hidden rounded-lg"
			bind:this={handledImgDiv}
		>
			{#if handledImageLink}
				<div class="flex flex-col gap-1">
					<div>
						<a href={handledImageLink} download class="btn btn-sm btn-primary">{m.download()}</a>
						<button class="btn btn-sm btn-secondary" onclick={onPreview}>{m.preview()}</button>
					</div>
					<SingleImgPreviewable imageLink={handledImageLink} open={openPreview} />
				</div>
			{:else}
				<ImagePlaceholder />
			{/if}
		</div>
	</div>
</div>

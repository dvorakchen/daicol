<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ArrowRight } from 'lucide-svelte';
	import UploadFile from '$lib/components/file-uploader/upload-file.svelte';
	import MagicHandling from '$lib/components/loading-handling/magic-handling.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';
	import SingleImgPreviewable from '$lib/components/previewers/single-img-previewable.svelte';
	import type { PromptPlugInType } from '$lib/share';
	import CustomParameters from './custom_parameters.svelte';
	import { getContext } from 'svelte';

	let {
		routeId,
		promptPlugIn
	}: {
		routeId: number;
		promptPlugIn: PromptPlugInType;
	} = $props();

	const http: Http = getContext(HTTP_SERVER_KEY);

	let customParamsInstance: CustomParameters;
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

		const customParamsForm = customParamsInstance.getFormElement();
		const formData = new FormData(customParamsForm);
		const customData: Record<string, string> = {};
		formData.entries().forEach(([Key, value]) => {
			customData[Key] = value.toString();
		});

		const data = await http.postFile<{ urls: string[] }>(
			`/api/generator/img-to-img/${routeId}`,
			[image],
			customData
		);
		handledImageLink = data.urls[0];
		generating = false;
		handledImgDiv?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}

	function onPreview() {
		if (handledImageLink === null) {
			openPreview = false;
			return;
		}

		// neccessary! reset open previewer
		openPreview = false;
		openPreview = true;
	}
</script>

<div class="grid grid-cols-1 grid-rows-[1fr] gap-4">
	<div>
		<CustomParameters {promptPlugIn} bind:this={customParamsInstance} />
	</div>

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
</div>

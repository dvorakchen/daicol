<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { m } from '$lib/paraglide/messages';
	import { Image } from 'lucide-svelte';

	let {
		afterSelectImage = undefined,
		afterImageLoaded = undefined
	}: {
		afterSelectImage: undefined | ((file: File) => void);
		afterImageLoaded: undefined | (() => void);
	} = $props();

	let inputFileEle: HTMLInputElement;
	let uploadImage = $state(null as null | File);
	let previewUploadImage = $derived.by(() => {
		if (!uploadImage) {
			return null;
		}

		return URL.createObjectURL(uploadImage);
	});

	function onchange(ev: Event) {
		const MB_SIZE = 10; // 10MB

		const input = ev.target as HTMLInputElement;
		if ((input.files?.length ?? 0) <= 0) {
			return;
		}

		const file = input.files![0];

		if (file.size > MB_SIZE * 1024 * 1024) {
			toastMan.add('warning', m['app.ai.generate.choose_image_under_mb']({ size: MB_SIZE }));
			return;
		}
		uploadImage = file;

		afterSelectImage?.(file);
	}

	function onUploadImage() {
		inputFileEle.click();
	}

	function onload() {
		if (previewUploadImage) {
			URL.revokeObjectURL(previewUploadImage);
		}
		afterImageLoaded?.();
	}
</script>

<div class="mx-auto max-w-md overflow-hidden rounded-lg md:max-w-xl">
	<div class="md:flex">
		<button class="w-full cursor-pointer" onclick={onUploadImage}>
			{#if previewUploadImage}
				<img src={previewUploadImage} alt="Original" {onload} />
			{:else}
				<div
					class="relative flex h-48 items-center justify-center rounded-lg border-2 border-primary bg-base-100 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
				>
					<div class="absolute flex flex-col items-center">
						<span class="mb-4 w-16 text-primary">
							<Image size="lg" />
						</span>
						<span class="block px-4 font-semibold text-base-content">
							{m['app.ai.generate.drag_and_drop_or_upload_image']()}
						</span>
					</div>
				</div>
			{/if}
		</button>
	</div>
</div>

<input bind:this={inputFileEle} hidden type="file" {onchange} accept=".jpg, .jpeg, .png, .webp" />

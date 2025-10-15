<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ArrowRight } from 'lucide-svelte';
	import UploadFile from '$lib/components/upload-file.svelte';
	import MagicHandling from '$lib/components/loading-handling/magic-handling.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import { postFile } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';

	let { routeId } = $props();

	let image = $state(null as null | File);
	let generating = $state(false);
	let preivewDailog: HTMLDialogElement;

	let handledImageLink = $state(null as null | string);

	function afterSelectImage(file: File) {
		image = file;
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
			preivewDailog?.close();
			return;
		}

		preivewDailog?.show();
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
		<div
			class="mx-auto flex min-h-full max-w-md items-center justify-center overflow-hidden rounded-lg md:max-w-xl"
		>
			{#if handledImageLink}
				<div class="flex flex-col">
					<div>
						<a href={handledImageLink} download class="btn btn-sm btn-primary">{m.download()}</a>
						<button class="btn btn-sm btn-secondary" onclick={onPreview}>{m.preview()}</button>
					</div>
					<button onclick={onPreview} class="cursor-pointer">
						<img src={handledImageLink} alt="Handled" />
					</button>
				</div>
			{:else}
				<ImagePlaceholder />
			{/if}
		</div>
	</div>
</div>

<dialog bind:this={preivewDailog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<img src={handledImageLink} alt="Preview" />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

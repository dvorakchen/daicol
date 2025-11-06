<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { m } from '$lib/paraglide/messages';
	import { FilePlus } from 'lucide-svelte';
	import { UPLOAD_IMAGE_MAX_SIZE } from '$lib/share/index.ts';
	import { uploadFile, type UploadedFile, type UploadProcessEvent } from '$lib/client/net/files';

	type UploadingFile = {
		id: string;
		uploading: boolean;
		loaded: number;
		total: number;
		percent: number;
		file: File;
	};

	let {
		afterSelectFile,
		max = 1,
		accept,
		required = false,
		uploadedFiles = $bindable()
	}: {
		afterSelectFile?: (file: File) => void;
		max?: number;
		accept?: string;
		required?: boolean;
		uploadedFiles?: UploadedFile[];
	} = $props();

	uploadedFiles ??= [];

	let inputEle: HTMLInputElement;
	let uploadingFiles: UploadingFile[] = $state([]);

	let allFileCount = $derived(uploadedFiles.length + uploadingFiles.length);
	let disabled = $derived(!!(max && allFileCount >= max));

	function onchange(ev: Event) {
		const input = ev.target as HTMLInputElement;
		if ((input.files?.length ?? 0) <= 0) {
			return;
		}

		for (const file of input.files!) {
			if (allFileCount >= max) {
				return;
			}
			if (file.size > UPLOAD_IMAGE_MAX_SIZE) {
				toastMan.add(
					'warning',
					m['app.ai.generate.choose_file_under_mb']({ size: UPLOAD_IMAGE_MAX_SIZE / 1024 / 1024 })
				);
				return;
			}

			const uploadingFile: UploadingFile = {
				id: crypto.randomUUID(),
				uploading: true,
				loaded: 0,
				total: file.size,
				percent: 0,
				file
			};

			uploadingFiles.push(uploadingFile);

			uploadFile(`/api/files/upload`, file).subscribe({
				next: (event: UploadProcessEvent) => {
					event = event as UploadProcessEvent;
					if (event.type === 'progress') {
						uploadingFile.loaded = event.loaded ?? 0;
						uploadingFile.total = event.total ?? 0;
						uploadingFile.percent = event.percent ?? 0;
					} else if (event.type === 'complete') {
						if (!event.url?.startsWith('http')) {
							event.url = `${location.protocol}//` + event.url;
						}
						const uploadedFile: UploadedFile = {
							url: event.url ?? '',
							name: event.name ?? '',
							type: file.type
						};
						uploadedFiles!.push(uploadedFile);

						uploadingFiles = uploadingFiles.filter((t) => t.id !== uploadingFile.id);
					}
				},
				error: (err) => {
					console.error(err);
				}
			});
		}
	}

	function onload(objURL: string) {
		URL.revokeObjectURL(objURL);
	}

	function isImage(type: string) {
		const sp = type.split('/');
		return sp.length > 1 && sp[0] === 'image';
	}

	function onRemove(file: UploadedFile) {
		uploadedFiles = uploadedFiles?.filter((t) => t.url !== file.url);
	}
</script>

<div class="flex flex-col gap-2 rounded border border-base-300 p-2">
	<div class="flex min-h-8 flex-wrap gap-2">
		{#each uploadedFiles as file, i (i)}
			<div class="avatar">
				<div class="relative w-14 rounded">
					{#if isImage(file.type)}
						<img src={file.url} alt={file.name} />
					{:else}
						<FilePlus />
					{/if}
					<span class="absolute top-0 right-0 z-10">
						<button
							class="btn btn-circle btn-ghost btn-xs"
							type="button"
							onclick={() => onRemove(file)}>X</button
						>
					</span>
				</div>
			</div>
		{/each}
		{#each uploadingFiles as file, i (i)}
			<div class="avatar">
				<div class="relative w-14 rounded">
					{#if isImage(file.file.type)}
						{@render preImg(URL.createObjectURL(file.file))}
					{:else}
						<FilePlus />
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<label class="input">
		<input bind:this={inputEle} type="file" multiple {onchange} {accept} {disabled} {required} />
		<span class="label">{max - allFileCount} rest</span>
	</label>
</div>

{#snippet preImg(objectURL: string)}
	<img src={objectURL} alt="" onload={() => onload(objectURL)} />
{/snippet}

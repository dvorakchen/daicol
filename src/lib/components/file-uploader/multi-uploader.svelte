<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { m } from '$lib/paraglide/messages';
	import { FilePlus } from 'lucide-svelte';
	import { getFilename, UPLOAD_IMAGE_MAX_SIZE } from '$lib/share/index.ts';
	import { uploadFile, type UploadedFile, type UploadProcessEvent } from '$lib/client/net/files';
	import { getFileMIME } from '$lib/share';
	import { dragAndDropFiles } from '$lib/client/directives/drap-and-drop.svelte';
	import Cropper, { type CropArea } from 'svelte-easy-crop';
	import { onDestroy } from 'svelte';

	type UploadingFile = {
		id: string;
		uploading: boolean;
		loaded: number;
		total: number;
		percent: number;
		file: File;
	};

	let {
		max = 1,
		accept,
		required = false,
		defaultValue,
		onFileChange
	}: {
		max?: number;
		accept?: string;
		required?: boolean;
		defaultValue?: UploadedFile[];
		onFileChange?: (files: UploadedFile[]) => void;
	} = $props();

	let uploadedFiles = $state(
		(defaultValue ?? []).map(
			(file) =>
				({
					url: file.url,
					name: getFilename(file.url),
					type: getFileMIME(file.url)
				}) as UploadedFile
		)
	);

	let inputEle: HTMLInputElement;
	let uploadingFiles: UploadingFile[] = $state([]);

	let allFileCount = $derived(uploadedFiles.length + uploadingFiles.length);
	let disabled = $derived(!!(max && allFileCount >= max));

	let croppingFile: File | null = $state(null);
	let croppingImage = $state('');

	onDestroy(() => {
		if (croppingImage) {
			URL.revokeObjectURL(croppingImage);
		}
	});

	function selectFiles(file: File) {
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

		croppingFile = file;
		croppingImage = URL.createObjectURL(file);
	}

	function onConfirmUploadFile() {
		if (!croppingFile) {
			return;
		}
		confirmUploadFile(croppingFile);
	}

	function confirmUploadFile(file: File) {
		let uploadingFile: UploadingFile = {
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
					uploadingFile = uploadingFiles.find((t) => t.id === uploadingFile.id)!;
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
					uploadedFiles.push(uploadedFile);
					onFileChange?.(uploadedFiles);

					uploadingFiles = uploadingFiles.filter((t) => t.id !== uploadingFile.id);
					cancelCropImage();
				}
			},
			error: (err) => {
				console.error(err);
				cancelCropImage();
			},
			complete: () => {
				cancelCropImage();
			}
		});
	}

	function onchange(ev: Event) {
		const input = ev.target as HTMLInputElement;
		if ((input.files?.length ?? 0) <= 0) {
			return;
		}

		selectFiles(input.files![0]);
	}

	function onload(objURL: string) {
		URL.revokeObjectURL(objURL);
	}

	function isImage(type: string) {
		if (!type) {
			return;
		}
		const sp = type.split('/');
		return sp.length > 1 && sp[0] === 'image';
	}

	function onRemove(file: UploadedFile) {
		uploadedFiles = uploadedFiles?.filter((t) => t.url !== file.url);
		onFileChange?.(uploadedFiles);
	}

	function onDragFiles(files: FileList) {
		if (files.length <= 0) {
			return;
		}

		selectFiles(files[0]);
	}

	let cropArea: CropArea;

	async function onCrop() {
		if (!cropArea || !croppingImage) {
			return;
		}

		const image = new Image();
		image.src = croppingImage;

		// 确保图片加载完成
		await new Promise((resolve, reject) => {
			image.onload = resolve;
			image.onerror = reject;
		});

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			toastMan.add('error', 'Crop Image failed');
			cancelCropImage();
			return;
		}

		// 设置 Canvas 的尺寸为裁剪区域的尺寸
		canvas.width = cropArea.width;
		canvas.height = cropArea.height;

		ctx.drawImage(
			image,
			cropArea.x,
			cropArea.y,
			cropArea.width,
			cropArea.height,
			0,
			0,
			cropArea.width,
			cropArea.height
		);

		const blob: Blob | null = await new Promise((resolve) => {
			canvas.toBlob(
				(blob) => {
					resolve(blob);
				},
				'image/jpeg',
				0.95
			); // 'image/jpeg' 是 MIME 类型, 0.95 是质量
		});

		if (!blob) {
			toastMan.add('error', 'Crop Image failed');
			cancelCropImage();
			return;
		}

		confirmUploadFile(blob as File);
	}

	function onCancelCropImage() {
		cancelCropImage();
	}

	function cancelCropImage() {
		URL.revokeObjectURL(croppingImage);
		croppingFile = null;
		croppingImage = '';
	}
</script>

<div
	class="flex flex-col gap-2 rounded border border-base-300 p-2"
	use:dragAndDropFiles={onDragFiles}
>
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
		{#each uploadingFiles as file (file.id)}
			<div class="avatar">
				<div class="relative w-14 rounded">
					{#if isImage(file.file.type)}
						{@render preImg(URL.createObjectURL(file.file))}
					{:else}
						<FilePlus />
					{/if}
					<progress
						class="progress absolute bottom-0 w-full progress-primary"
						value={file.percent}
						max="100"
					></progress>
					<span class="absolute inset-0 flex items-center justify-center">
						<div class="badge badge-soft badge-primary">{file.percent}%</div>
					</span>
				</div>
			</div>
		{/each}
	</div>

	<label class="input">
		<input bind:this={inputEle} type="file" {onchange} {accept} {disabled} {required} />
		<span class="label">{max - allFileCount} rest</span>
	</label>

	{#if croppingFile}
		<div class="z-10">
			<Cropper image={croppingImage} oncropcomplete={(e) => (cropArea = e.pixels)} />
			<div class="fixed bottom-32 z-20 flex gap-2">
				<button type="button" class="btn" onclick={onCancelCropImage}>Cancel</button>
				<button type="button" class="btn btn-accent" onclick={onCrop}>Crop</button>
				<button type="button" class="btn btn-primary" onclick={onConfirmUploadFile}
					>Use Original</button
				>
			</div>
		</div>
	{/if}
</div>

{#snippet preImg(objectURL: string)}
	<img src={objectURL} alt="" onload={() => onload(objectURL)} />
{/snippet}

<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { m } from '$lib/paraglide/messages';
	import { FilePlus } from 'lucide-svelte';
	import { UPLOAD_IMAGE_MAX_SIZE } from '$lib/share/index.ts';

	let {
		afterSelectFile,
		max = 1,
		accept,
		required = false,
	}: {
		afterSelectFile?: (file: File) => void;
		max?: number;
		accept?: string;
		required?: boolean
	} = $props();

	let queue: File[] = $state([]);
	let disabled = $derived(!(max && queue.length < max));

	function onchange(ev: Event) {
		const input = ev.target as HTMLInputElement;
		if ((input.files?.length ?? 0) <= 0) {
			return;
		}

		for (const file of input.files!) {
			if (queue.length >= max) {
				return;
			}
			if (file.size > UPLOAD_IMAGE_MAX_SIZE) {
				toastMan.add(
					'warning',
					m['app.ai.generate.choose_file_under_mb']({ size: UPLOAD_IMAGE_MAX_SIZE / 1024 / 1024 })
				);
			} else {
				queue.push(file);
				afterSelectFile?.(file);
			}
		}
	}

	function onload(objURL: string) {
		URL.revokeObjectURL(objURL);
	}

	function isImage(type: string) {
		const sp = type.split('/');
		return sp.length > 1 && sp[0] === 'image';
	}
</script>

<div class="flex flex-col gap-2 rounded border border-base-300 p-2">
	<div class="flex min-h-8 flex-wrap gap-2">
		{#each queue as file, i (i)}
			<div class="avatar">
				<div class="w-8 rounded">
					{#if isImage(file.type)}
						{@render preImg(URL.createObjectURL(file))}
					{:else}
						<FilePlus />
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<label class="input">
		<input type="file" multiple {onchange} {accept} {disabled} {required}/>
		<span class="label">{max - queue.length} rest</span>
	</label>
</div>

{#snippet preImg(objectURL: string)}
	<img src={objectURL} alt="" onload={() => onload(objectURL)} />
{/snippet}

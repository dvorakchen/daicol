<script lang="ts">
	import { CircleX, Plus } from 'lucide-svelte';

	const customId = Math.random().toString();

	let { defaultValue = $bindable(), name = '', placeholder = '', presets = [] } = $props();
	let tags = $state<string[]>([]);
	let displayTags = $derived.by(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const set = new Set(tags);
		(defaultValue as string[]).forEach((t) => {
			set.add(t);
		});

		return Array.from(set);
	});

	let value = $derived.by(() => {
		if (!displayTags) {
			return '[]';
		}

		return JSON.stringify(displayTags);
	});

	function onchange(ev: Event) {
		ev.preventDefault();
		const input = ev.target as HTMLInputElement;
		const value = input.value.trim();
		let values: string[] = [];

		try {
			values = JSON.parse(value);
			if (!(values instanceof Array)) {
				values = [values];
			}
		} catch (e) {
			console.log(e);
			values = value.split(/[,，]/);
		}

		values = values.map((str) => str.toString().replace(/^['",，]+|['",，]+$/g, ''));

		values.forEach((value) => {
			value = value.trim();
			if (!value || tags.includes(value)) {
				return;
			} else {
				tags.push(value);
			}
		});

		input.value = '';
	}

	function onRemove(value: string) {
		tags = tags.filter((tag: string) => tag !== value);
		defaultValue = defaultValue.filter((tag: string) => tag !== value);
	}

	function addPreset(value: string) {
		value = value.trim();
		if (value && !tags.includes(value)) {
			tags.push(value);
		}
	}
</script>

<label class="flex flex-col gap-4 rounded border border-base-300 bg-base-100 p-2" for={customId}>
	<div class="flex flex-wrap gap-2">
		{#each displayTags as tag (tag)}
			<button type="button" class="btn btn-sm btn-primary" onclick={() => onRemove(tag)}
				>{tag}
				<span class="w-4">
					<CircleX size="sm" />
				</span>
			</button>
		{/each}
	</div>
	<input type="text" {placeholder} class="input w-full" id={customId} {onchange} />
	<div class="flex flex-col">
		<h1>Preset:</h1>
		<div class="flex flex-wrap gap-2">
			{#each presets as preset (preset)}
				<button type="button" class="btn btn-sm btn-primary" onclick={() => addPreset(preset)}
					>{preset}
					<span class="w-4">
						<Plus size="sm" />
					</span>
				</button>
			{/each}
		</div>
	</div>
	<input type="text" {name} hidden {value} />
</label>

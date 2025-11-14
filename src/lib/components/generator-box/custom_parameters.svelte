<script lang="ts">
	import type { PromptPlugInType } from '$lib/share';
	import { m } from '$lib/paraglide/messages';

	let {
		promptPlugIn
	}: {
		promptPlugIn: PromptPlugInType;
	} = $props();

	let displayList = $derived(
		Object.entries(promptPlugIn).toSorted((a, b) => a[1].sort - b[1].sort)
	);

	let formElement: HTMLFormElement;
	export function getFormElement() {
		return formElement;
	}
</script>

<form class="flex w-full flex-col rounded-xl md:p-6 md:shadow-sm" bind:this={formElement}>
	<h1 class="mb-4 text-lg font-bold">{m['app.ai.generate.custom_parameters']()}</h1>
	<div class="flex flex-wrap gap-2">
		{#each displayList as [key, value] (key)}
			<label class="input">
				<span class="label">{value.display}</span>
				<input type="text" name={key} placeholder={value.value} defaultValue={value.value} />
			</label>
		{/each}
	</div>
</form>

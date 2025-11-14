<script lang="ts">
	import type { PromptPlugInType } from '$lib/share';
	import { m } from '$lib/paraglide/messages';

	let {
		promptPlugIn
	}: {
		promptPlugIn: PromptPlugInType;
	} = $props();

	let formElement: HTMLFormElement;
	export function getFormElement() {
		return formElement;
	}
</script>

<form class="flex w-full flex-col rounded-xl md:p-6 md:shadow-sm" bind:this={formElement}>
	<h1 class="mb-4 text-lg font-bold">{m['app.ai.generate.custom_parameters']()}</h1>
	{#each Object.entries(promptPlugIn) as [key, value] (key)}
		<label class="input">
			<span class="label">{value.display}</span>
			<input type="text" name={key} placeholder={value.value} defaultValue={value.value} />
		</label>
	{/each}
</form>

<script lang="ts">
	import { Copy, CopyCheck } from 'lucide-svelte';

	let { children, value } = $props();

	let copied = $state(false);

	async function onclick() {
		await navigator.clipboard.writeText(value);
		copied = true;
	}
</script>

<button {onclick} class={['btn btn-sm', copied ? 'btn-success' : '']}>
	{#if copied}
		<CopyCheck />
	{:else}
		<Copy />
	{/if}
	{@render children()}</button
>

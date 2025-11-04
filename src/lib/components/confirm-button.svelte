<script lang="ts">
	let {
		label,
		onConfirm
	}: {
		label: string;
		onConfirm?: () => void;
	} = $props();

	let confirming = $state(false);

	function onclick() {
		confirming = true;
	}

	function onCancel() {
		confirming = false;
	}

	function onConfirmDo() {
		onConfirm?.();
	}
</script>

<span>
	{#if confirming}
		<div class="join">
			<button class="btn join-item btn-sm" onclick={onCancel}>Cancel</button>
			<button class="btn join-item btn-sm btn-error" onclick={onConfirmDo}>Confirm!</button>
		</div>
	{:else}
		<button class="btn btn-sm btn-warning" {onclick}>{label}</button>
	{/if}
</span>

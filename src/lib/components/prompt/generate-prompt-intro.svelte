<script lang="ts">
	let loading = $state(false);

	async function onclick() {
		loading = true;
	}
</script>

<button class="btn btn-secondary" type="button" disabled={loading} {onclick}>
	{#if loading}
		<span class="loading loading-spinner"></span>
	{/if}
	Generate Intro</button
>

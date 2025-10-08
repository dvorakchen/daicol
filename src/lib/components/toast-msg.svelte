<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { fly } from 'svelte/transition';

	const typeToClass = {
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error',
		info: 'alert-info'
	};
</script>

<div class="toast-top toast-end toast top-16">
	{#each toastMan.list as [id, { msg, toastType }] (id)}
		<div class="alert {typeToClass[toastType]}" transition:fly={{ x: 200, duration: 500 }}>
			<span>{msg}</span>
		</div>
	{/each}
</div>

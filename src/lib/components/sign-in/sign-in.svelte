<script lang="ts">
	import Username from '$lib/components/sign-in/username.svelte';
	let { title = '' } = $props();
</script>

<Username {title} />

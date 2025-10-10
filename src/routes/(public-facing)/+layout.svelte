<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';

	let { children, data } = $props();
</script>

<Navbar userSignInInfo={data.userSignInInfo} />
{@render children()}

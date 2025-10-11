<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';

	let { children, data } = $props();
</script>

<Navbar userSignInInfo={data.userSignInInfo} />
<div class="p-2 lg:max-w-6xl mx-auto">
	{@render children()}
</div>

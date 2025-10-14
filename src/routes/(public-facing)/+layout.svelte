<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';

	let { children /*, data*/ } = $props();
</script>

<Navbar />
<!-- <Navbar userSignInInfo={data.userSignInInfo} /> -->
<div class="mx-auto p-2 lg:max-w-6xl xl:max-w-7xl">
	{@render children()}
</div>
<Footer />

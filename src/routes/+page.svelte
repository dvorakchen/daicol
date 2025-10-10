<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { AddressBookOutline } from 'flowbite-svelte-icons';

	let { data } = $props();
</script>

<main>
	<Navbar userSignInInfo={data.userSignInInfo} />

	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<AddressBookOutline />
</main>

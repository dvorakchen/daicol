<script lang="ts">
	import ThemeController from '$lib/components/theme-controller.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { AddressBookOutline } from 'flowbite-svelte-icons';
</script>

<ThemeController />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<h1>{m.example_message({ username: 'Dvorak' })}</h1>

<AddressBookOutline />

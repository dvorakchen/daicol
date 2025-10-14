<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import ToastMsg from '$lib/components/toast-msg.svelte';
	import { onMount } from 'svelte';
	// import { invalidate } from '$app/navigation';

	let { children } = $props();

	onMount(() => {
		// const interval = setInterval(() => {
		// 	invalidate('/api/users/sign-in-info');
		// }, 1000 * 30);

		// return () => {
		// 	clearInterval(interval);
		// };
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Daicol</title>
</svelte:head>

<div class="fixed z-20">
	<ToastMsg />
</div>

{@render children?.()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

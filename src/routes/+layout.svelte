<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import ToastMsg from '$lib/components/toast-msg.svelte';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { MetaTags } from 'svelte-meta-tags';
	import {PUBLIC_HOST} from '$env/static/public'
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
	<link rel="icon" href='/favicon.png' />
</svelte:head>


<MetaTags
  title={`${m.home()}`}
  titleTemplate={`%s - ${m.title()}`}
  description={m.seo_description()}
  canonical={PUBLIC_HOST}
  openGraph={{
    url: PUBLIC_HOST,
    title: m.title(),
  description: m.seo_description(),
    images: [
      {
        url: `${PUBLIC_HOST}logo.png`,
        width: 800,
        height: 600,
        alt: `${m.title()} logo`
      },
    ],
    siteName: m.title()
  }}
  />

{@render children()}


<div class="fixed z-20">
	<ToastMsg />
</div>

{@render children?.()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

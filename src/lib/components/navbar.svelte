<script lang="ts">
	import SignOut from '$lib/components/sign-out.svelte';
	import ThemeController from '$lib/components/theme-controller.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import logo from '$lib/assets/logo.png';
	import type { UserSignInInfo } from '$lib/share/user';
	import { page } from '$app/state';
	import { QS_REDIRECT_KEY } from '$lib/share';
	import { onMount } from 'svelte';

	let { userSignInInfo }: { userSignInInfo: UserSignInInfo } = $props();
	let isSignedIn = $derived(Boolean(userSignInInfo.id));

	let signInURL = $state('/signin');

	onMount(() => {
		signInURL = `/signin?${QS_REDIRECT_KEY}=${page.url.pathname}${page.url.search}`;
	});
</script>

<div class="navbar bg-base-100 px-4 shadow">
	<a class="btn pl-1 text-xl btn-ghost md:pl-3" href="/">
		<div class="w-8">
			<img src={logo} alt={m.title()} />
		</div>
		{m.title()}</a
	>
	<div class="mx-2 flex flex-1 items-center justify-center">
		<form action="/search">
			<label class="input w-32 sm:w-48 md:w-68">
				<SearchOutline />
				<input type="search" name="s" placeholder={m.search_ai()} /></label
			>
		</form>
		{name}
	</div>
	<div class="flex-none space-x-2">
		{#if isSignedIn === true}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost btn-sm">
					<div class="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
						<img
							alt={m.avatar()}
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						/>
					</div>
				</div>
				<ul
					class="dropdown-content menu z-1 mt-3 w-52 space-y-2 menu-sm rounded-box bg-base-100 p-2 shadow-2xl"
				>
					<li>
						<button class="btn justify-between btn-ghost">
							Profile
							<span class="badge">New</span>
						</button>
					</li>
					<li>
						<SignOut />
					</li>
				</ul>
			</div>
		{:else if isSignedIn === null}
			<span class="loading loading-spinner text-primary"></span>
		{:else}
			<a class="btn btn-primary" href={signInURL}>{m.sign_in()}</a>
		{/if}

		<ThemeController />
	</div>
</div>

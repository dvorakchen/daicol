<script lang="ts">
	// import SignOut from '$lib/components/sign-out.svelte';
	import ThemeController from '$lib/components/theme-controller.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { Search } from 'lucide-svelte';
	// import type { UserSignInInfo } from '$lib/share/user';
	import { page } from '$app/state';
	import { /*QS_REDIRECT_KEY,*/ QS_SEARCH_KEY } from '$lib/share';
	import Logo from '$lib/components/logo.svelte';
	import ChangeLang from './change-lang.svelte';

	// let { userSignInInfo }: { userSignInInfo: UserSignInInfo } = $props();
	// let isSignedIn = $derived(Boolean(userSignInInfo.id));

	// let signInURL = $state('/signin');
	let searchValue = $state('');
	let loading = $state(false);

	$effect(() => {
		// signInURL = `/signin?${QS_REDIRECT_KEY}=${page.url.pathname}${page.url.search}`;
		searchValue = (page.url.searchParams.get('s') ?? '').trim();
		loading = false;
	});

	function onsubmit() {
		loading = true;
	}
</script>

<div class="navbar flex-col gap-2 bg-transparent shadow">
	<div class="flex h-full w-full max-w-7xl items-center">
		<a class="btn grow justify-start pl-1 text-xl btn-ghost sm:grow-0" href="/">
			<Logo />
			{m.title()}</a
		>
		<div class="mx-2 hidden w-32 flex-1 items-center justify-center sm:flex sm:w-48 md:w-68">
			{@render search()}
		</div>
		<div class="flex-none">
			<!-- {#if isSignedIn === true}
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
			{/if} -->

			<ChangeLang />
			<ThemeController />
		</div>
	</div>
	<div class="block w-full sm:hidden">
		{@render search()}
	</div>
</div>

{#snippet search()}
	<form action="/search" {onsubmit}>
		<label class="input w-full">
			{#if loading}
				<span class="loading-spin loading text-primary"></span>
			{:else}
				<Search />
			{/if}
			<input
				type="search"
				name={QS_SEARCH_KEY}
				placeholder={m.search_ai()}
				value={searchValue}
			/></label
		>
	</form>
{/snippet}

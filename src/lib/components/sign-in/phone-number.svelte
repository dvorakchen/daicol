<script lang="ts">
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import SendCaptcha from '$lib/components/send-captcha.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { Award, Smartphone } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { QS_REDIRECT_KEY } from '$lib/share';
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';
	import { getContext } from 'svelte';

	let { title = '' } = $props();

	const http: Http = getContext(HTTP_SERVER_KEY);

	let formData = $state({} as { phone: string; code: string });
	let error = $state('');
	let loading = $state(false);

	async function onsubmit(ev: Event) {
		ev.preventDefault();
		loading = true;

		await http.post(`/api/users/sign-in`, formData);
		loading = false;
		toastMan.add('success', m['sign_in.success']());
		redirectTo();
	}

	function redirectTo() {
		const to = page.url.searchParams.get(QS_REDIRECT_KEY) ?? '/';
		goto(to);
	}
</script>

<form class="w-2xs" {onsubmit}>
	<h1 class="mb-8 text-5xl font-bold text-gray-900">{title}</h1>
	<label class="validator input">
		<Smartphone />
		<input
			aria-label="phone"
			type="tel"
			class="tabular-nums"
			required
			placeholder={m['sign_in.phone_number']()}
			pattern="[0-9]*"
			minlength="11"
			maxlength="11"
			title={m['sign_in.phone_number.hint']()}
			bind:value={formData.phone}
		/>
	</label>
	<p class="validator-hint">
		{m['sign_in.phone_number.hint']()}
	</p>

	<div class="flex gap-2">
		<div>
			<label class="validator input">
				<Award />
				<input
					type="text"
					class="tabular-nums"
					aria-label="code"
					minlength="4"
					maxlength="4"
					placeholder={m['sign_in.code']()}
					title={m['sign_in.code.hint']()}
					required
					bind:value={formData.code}
				/>
			</label>
			<p class="validator-hint">
				{m['sign_in.code.hint']()}
			</p>
		</div>
		<SendCaptcha phone={formData.phone} />
	</div>

	<button class="btn w-full btn-primary" type="submit" disabled={loading} aria-label="sign in">
		{#if loading}
			<span class="loading loading-spinner"></span>
		{:else}
			{m['sign_in.or_register']()}
		{/if}
	</button>

	{#if error}
		<p class="mt-4 text-sm font-bold text-error">{error}</p>
	{/if}
</form>

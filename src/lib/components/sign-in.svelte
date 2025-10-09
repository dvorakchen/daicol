<script lang="ts">
	import { post } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import SendCaptcha from '$lib/components/send-captcha.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { MobilePhoneOutline, AwardOutline } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { page } from '$app/state'; 
	import { QS_REDIRECT_KEY } from '$lib/share';

	let { title = '' } = $props();

	let formData = $state({} as { phone: string; code: string });
	let error = $state('');
	let loading = $state(false);

	async function onsubmit(ev: Event) {
		ev.preventDefault();
		loading = true;

		post(`/api/users/sign-in`, formData).subscribe({
			next: () => {
				loading = false;
				toastMan.add('success', '');
				redirectTo();
			},
			error: (e) => {
				if (typeof e === 'string') {
					toastMan.add('error', e);
				}
				error = e;
				loading = false;
				console.error(e);
			}
		});
	}

	function redirectTo() {
		const to = page.url.searchParams.get(QS_REDIRECT_KEY) ?? '/';
		goto(to)
	}

</script>

<form
	class="w-2xs"
	{onsubmit}
>
	<h1 class="mb-8 text-5xl font-bold text-gray-900">{title}</h1>
	<label class="validator input">
		<MobilePhoneOutline />
		<input
			name="phone"
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
				<AwardOutline />
				<input
					type="text"
					class="tabular-nums"
					name="code"
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

	<button class="btn w-full btn-primary" type="submit" disabled={loading}>
		{#if loading}
			<span class="loading loading-spinner"></span>
		{:else}
			{m['sign_in.or_register']()}
		{/if}
	</button>
	
	{#if error}
		<p class="text-error mt-4 text-sm font-bold">{error}</p>
	{/if}
</form>

<script lang="ts">
	import { post } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { Key, User } from 'lucide-svelte';
	import { page } from '$app/state';
	import { QS_REDIRECT_KEY } from '$lib/share';

	let { title = '' } = $props();

	let formData = $state({} as { username: string; password: string; rePassword: string });
	let error = $state('');
	let loading = $state(false);
	let signUp = $state(false);

	async function onsubmit(ev: Event) {
		ev.preventDefault();
		loading = true;

		post(`/api/users/sign-in/username`, formData).subscribe({
			next: () => {
				loading = false;
				toastMan.add('success', m['sign_in.success']());
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
		location.href = to;
	}

	function onSwitchSignInSignUp() {
		signUp = !signUp;
	}

	async function onSignUp(ev: Event) {
		ev.preventDefault();
		loading = true;

		if (formData.password !== formData.rePassword) {
			error = m['sign_up.passwords_not_match']();
			return false;
		}

		post(`/api/users/sign-up/username`, formData).subscribe({
			next: () => {
				loading = false;
				toastMan.add('success', m['sign_in.success']());
				signUp = false;
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
</script>

<div class="w-2xs overflow-x-hidden">
	<div class={['grid w-xl grid-cols-2 gap-12 transition-all', signUp ? '-ml-78' : '']}>
		<form class="w-2xs" {onsubmit}>
			<h1 class="mb-8 text-5xl font-bold text-gray-200">{title}</h1>
			<label class="validator input">
				<User />
				<input
					aria-label="username"
					type="tel"
					class="tabular-nums"
					required
					placeholder={m['sign_in.username']()}
					title={m['sign_in.username.hint']()}
					bind:value={formData.username}
				/>
			</label>
			<p class="validator-hint">
				{m['sign_in.username.hint']()}
			</p>

			<div class="flex gap-2">
				<div>
					<label class="validator input">
						<Key />
						<input
							type="password"
							class="tabular-nums"
							aria-label="password"
							placeholder={m['sign_in.password']()}
							title={m['sign_in.password.hint']()}
							required
							bind:value={formData.password}
						/>
					</label>
					<p class="validator-hint">
						{m['sign_in.password.hint']()}
					</p>
				</div>
			</div>

			<div class="flex justify-between gap-4">
				<div class="grow">
					<button class="btn w-full btn-secondary" type="button" onclick={onSwitchSignInSignUp}
						>注册</button
					>
				</div>
				<div class="grow">
					<button
						class="btn w-full btn-primary"
						type="submit"
						disabled={loading}
						aria-label="sign in"
					>
						{#if loading}
							<span class="loading loading-spinner"></span>
						{:else}
							{m['sign_in']()}
						{/if}
					</button>
				</div>
			</div>

			{#if error}
				<p class="mt-4 text-sm font-bold text-error">{error}</p>
			{/if}
		</form>

		<form class="w-2xs" onsubmit={onSignUp} hidden={!signUp}>
			<h1 class="mb-8 text-5xl font-bold text-gray-200">{m['sign_up']()}</h1>
			<label class="validator input">
				<User />
				<input
					aria-label="username"
					type="tel"
					class="tabular-nums"
					required
					placeholder={m['sign_in.username']()}
					title={m['sign_in.username.hint']()}
					bind:value={formData.username}
				/>
			</label>
			<p class="validator-hint">
				{m['sign_in.username.hint']()}
			</p>

			<div>
				<label class="validator input">
					<Key />
					<input
						type="password"
						class="tabular-nums"
						aria-label="password"
						placeholder={m['sign_in.password']()}
						title={m['sign_in.password.hint']()}
						required
						bind:value={formData.password}
					/>
				</label>
				<p class="validator-hint">
					{m['sign_in.password.hint']()}
				</p>
			</div>
			<div>
				<label class="validator input">
					<Key />
					<input
						type="password"
						class="tabular-nums"
						aria-label="password"
						placeholder={m['sign_in.password_reenter']()}
						title={m['sign_in.password.hint']()}
						required
						bind:value={formData.rePassword}
					/>
				</label>
				<p class="validator-hint">
					{m['sign_in.password.hint']()}
				</p>
			</div>
			<div class="flex justify-between gap-4">
				<div class="grow">
					<button
						class="btn w-full btn-primary"
						disabled={loading}
						type="button"
						aria-label="sign in"
						onclick={onSwitchSignInSignUp}
					>
						{#if loading}
							<span class="loading loading-spinner"></span>
						{:else}
							{m['sign_in']()}
						{/if}
					</button>
				</div>
				<div class="grow">
					<button class="btn w-full btn-secondary" disabled={loading} type="submit"
						>{m['sign_up']()}</button
					>
				</div>
			</div>

			{#if error}
				<p class="mt-4 text-sm font-bold text-error">{error}</p>
			{/if}
		</form>
	</div>
</div>

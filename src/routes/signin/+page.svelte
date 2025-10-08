<script lang="ts">
	import { enhance } from '$app/forms';
	import signInImage from '$lib/assets/sign-in-side-background.jpg';
	import SendCaptcha from '$lib/components/send-captcha.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { MobilePhoneOutline, AwardOutline } from 'flowbite-svelte-icons';

	let { form }: { form: { error: string } | null } = $props();

	let phone = $state('');
</script>

<main class="flex h-screen bg-cover" style="background-image: url('{signInImage}')">
	<section class="w-0 overflow-clip sm:w-32 md:w-40 lg:w-lg xl:w-3/6"></section>
	<section class="flex grow-1 flex-col-reverse bg-gray-900/40">
		<form
			class="mx-auto mb-[50%]
            w-2xs items-center md:ml-8
            md:w-2xs
            md:items-start xl:mb-[30%]"
			method="post"
			use:enhance
		>
			<h1 class="mb-8 text-5xl font-bold text-gray-900">{m.sign_in()}</h1>
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
					bind:value={phone}
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
						/>
					</label>
					<p class="validator-hint">
						{m['sign_in.code.hint']()}
					</p>
				</div>
				<SendCaptcha {phone} />
			</div>

			{#if form?.error}
				<p class="mb-4 text-error">{form.error}</p>
			{/if}

			<button class="btn w-full btn-primary" type="submit">
				{m['sign_in.or_register']()}
			</button>
		</form>
	</section>
</main>

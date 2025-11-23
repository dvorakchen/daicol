<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { DateTime } from 'luxon';
	import { getContext, onMount } from 'svelte';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';

	const http: Http = getContext(HTTP_SERVER_KEY);

	const phoneRegex = /^\d{11}$/;

	const COUNTDOWN = 60;
	let clock = $state(0);

	let { phone = '' } = $props();
	let disabled = $derived(phone.trim().length !== 11 || clock !== 0);

	let intervalId: NodeJS.Timeout;

	onMount(() => {
		// timestamp, seconds
		const preClock = localStorage.getItem(SEND_CAPTCHA_CLOCK_KEY);
		if (preClock) {
			const rest = Math.floor(DateTime.utc().toSeconds() - +preClock);
			if (rest < COUNTDOWN) {
				startCountDown(COUNTDOWN - rest);
			}
		}

		return () => {
			clearInterval(intervalId);
		};
	});

	const SEND_CAPTCHA_CLOCK_KEY = 'SEND_CAPTCHA_CLOCK_KEY';

	async function onSendCaptcha() {
		if (!phoneRegex.test(phone)) {
			toastMan.add('warning', m['sign_in.error.invalid_phone']());
			return;
		}

		startCountDown(COUNTDOWN);
		localStorage.setItem(SEND_CAPTCHA_CLOCK_KEY, Math.floor(DateTime.utc().toSeconds()).toString());

		await http.post(`/api/captcha/send`, { phone });
	}

	function startCountDown(start: number) {
		clock = start;
		intervalId = setInterval(() => {
			if (clock <= 1) {
				clock = 0;
				localStorage.removeItem(SEND_CAPTCHA_CLOCK_KEY);
				clearInterval(intervalId);
				return;
			}
			clock--;
		}, 1000);
	}
</script>

<button
	class="btn w-28 btn-primary"
	type="button"
	{disabled}
	onclick={onSendCaptcha}
	aria-label="send captcha"
>
	{#if clock !== 0}
		{clock}
	{:else}
		{m['sign_in.send_code']()}
	{/if}
</button>

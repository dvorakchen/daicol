<script lang="ts">
	import { post } from '$lib/client/net/http';
	import { m } from '$lib/paraglide/messages';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	import { toastMan } from '$lib/client/universal/toast.svelte';

	const COUNTDOWN = 60;
	let clock = $state(0);

	let { phone } = $props();
	let disabled = $derived(phone.trim().length !== 11 || clock !== 0);

	let intervalId: NodeJS.Timeout;

	onMount(initClock);

	const SEND_CAPTCHA_CLOCK_KEY = 'SEND_CAPTCHA_CLOCK_KEY';
	function initClock() {
		// timestamp, seconds
		const preClock = localStorage.getItem(SEND_CAPTCHA_CLOCK_KEY);
		if (preClock) {
			const rest = Math.floor(DateTime.utc().toSeconds() - +preClock);
			if (rest < COUNTDOWN) {
				startCountDown(COUNTDOWN - rest);
			}
		}
	}

	async function onSendCaptcha() {
		startCountDown(COUNTDOWN);
		localStorage.setItem(SEND_CAPTCHA_CLOCK_KEY, Math.floor(DateTime.utc().toSeconds()).toString());

		post(`api/captcha/send`, { phone }).subscribe({
			error: (e) => {
				toastMan.add('error', m['captcha.sent_error']());
				console.error('send captcha error: ', e);
			}
		});
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
	class="btn btn-primary"
	type="button"
	{disabled}
	style:background-color={disabled ? 'white' : ''}
	onclick={onSendCaptcha}
>
	{#if clock !== 0}
		{clock}
	{:else}
		{m['sign_in.send_code']()}
	{/if}
</button>

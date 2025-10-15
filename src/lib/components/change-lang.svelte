<script lang="ts">
	import { Languages } from 'lucide-svelte';
	import { setLocale, locales, getLocale } from '$lib/paraglide/runtime';

	type Language = (typeof locales)[number];
	async function onChangeLang(lang: Language) {
		console.log('current lang: ', getLocale());
		console.log('new lang: ', lang);
		if (getLocale() === lang) {
			console.log('return');
			return;
		}
		await setLocale(lang);
		console.log('setLocale');
	}
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn m-1 btn-circle btn-ghost">
		<Languages />
	</div>
	<ul tabindex="-1" class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-xl">
		<li><button onclick={async () => await onChangeLang('zh')}>中文</button></li>
		<li><button onclick={async () => await onChangeLang('en')}>English</button></li>
	</ul>
</div>

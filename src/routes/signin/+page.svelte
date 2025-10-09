<script lang="ts">
	import signInImage from '$lib/assets/sign-in-side-background.jpg';
	import SignIn from '$lib/components/sign-in.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<main class="flex h-screen bg-cover" style="background-image: url('{signInImage}')">
	<section class="w-0 overflow-clip sm:w-32 md:w-40 lg:w-lg xl:w-3/6"></section>
	<section class="flex grow-1 flex-col-reverse bg-gray-900/40">
		<div
			class="mx-auto mb-[50%]
            rounded bg-base-200/50 px-4 py-8
            md:ml-8 xl:mb-[30%]"
		>
			<SignIn title={m.sign_in()} />
		</div>
	</section>
</main>

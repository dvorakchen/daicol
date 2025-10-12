<script>
	import { m } from '$lib/paraglide/messages';
	import { CaretDownSolid } from 'flowbite-svelte-icons';

    let { link } = $props();
</script>

<a href={link} class="btn btn-outline btn-primary"
	>{m.more()}
	<CaretDownSolid />
</a>

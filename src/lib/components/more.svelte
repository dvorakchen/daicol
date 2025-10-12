<script>
	import { m } from '$lib/paraglide/messages';
	import { ChevronDown } from 'lucide-svelte';

	let { link } = $props();
</script>

<a href={link} class="btn btn-outline btn-primary"
	>{m.more()}
	<ChevronDown />
</a>

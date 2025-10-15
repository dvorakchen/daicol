<script lang="ts">
	import OneImgToOneImg from '$lib/components/apps/1-img-to-1-img.svelte';
	import handled from '$lib/assets/imgs/10004/handled.webp?enhanced';
	import original from '$lib/assets/imgs/10004/original.webp?enhanced';

	let { data } = $props();
</script>

<OneImgToOneImg app={data.app} {original} {handled} />

<div class="mb-32"></div>

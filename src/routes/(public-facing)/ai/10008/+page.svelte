<script lang="ts">
	import OneImgToOneImg from '$lib/components/apps/1-img-to-1-img.svelte';
	import original from '$lib/assets/imgs/original-photo.webp?enhanced';
	import handled from '$lib/assets/imgs/10008/handled.webp?enhanced';

	let { data } = $props();
</script>

<OneImgToOneImg app={data.app} {original} {handled} />

<div class="mb-32"></div>

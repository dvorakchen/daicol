<script lang="ts">
	import OneImgToOneImg from '$lib/components/apps/1-img-to-1-img.svelte';

	let { data } = $props();
</script>

<OneImgToOneImg app={data.app} />

<div class="mb-32"></div>

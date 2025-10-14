<script>
	import OneImgToOneImg from '$lib/components/apps/1-img-to-1-img.svelte';
	import original from '$lib/assets/imgs/original-photo.png?enhanced';
	import handled from '$lib/assets/imgs/10001/handled.png?enhanced';


	let { data } = $props();
</script>

<OneImgToOneImg app={data.app} {original} {handled}/>

<div class="mb-32"></div>
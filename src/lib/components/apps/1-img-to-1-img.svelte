<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Preview1ImgTo1Img from '$lib/components/apps/preview-1-img-to-1-img.svelte';
	import Generator1ImgTo1Img from '$lib/components/generator-box/generator-1-img-to-1-img.svelte';

	let { app } = $props();
</script>

<div class="my-4 flex w-full flex-col rounded-xl md:p-6 md:shadow-sm">
	<h1 class="text-lg font-bold">{m['app.ai.detail.use_it_immediately']()}</h1>
</div>

<Preview1ImgTo1Img original={app.originImg} handled={app.handledImg} />

<div class="divider divider-secondary"></div>
<Generator1ImgTo1Img routeId={app.routeId} promptPlugIn={app.promptPlugIn} />

<div class="divider divider-secondary"></div>

<script lang="ts">
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';
	import type { PromptBaseIntro } from '$lib/share/prompt';
	import { getContext } from 'svelte';

	let {
		prompt,
		cb
	}: {
		prompt: string;
		cb: (value: PromptBaseIntro) => void;
	} = $props();

	const http: Http = getContext(HTTP_SERVER_KEY);

	let loading = $state(false);

	async function onclick() {
		if (!prompt.trim()) {
			return;
		}
		loading = true;

		const data = await http.post<PromptBaseIntro>('/api/generator/prompt-base-intro', { prompt });
		cb(data);
		// cb({
		// 	keywords: [
		// 		'头部特写',
		// 		'长发',
		// 		'大雨淋湿',
		// 		'发丝水珠',
		// 		'微距镜头',
		// 		'CG厚涂风格',
		// 		'32K画质',
		// 		'明暗对比',
		// 		'顶光照射',
		// 		'冷色调背景'
		// 	],
		// 	seoDescription:
		// 		'头部特写中长发被大雨淋湿，发丝水珠飞溅，微距镜头突显皮肤纹理与CG厚涂风格，32K高清画质强化明暗对比与冷色调氛围。',
		// 	name: '雨湿长发特写',
		// 	description: '微距镜头捕捉雨湿长发与皮肤细节的CG厚涂风格。',
		// 	tags: ['写真', '特写', 'CG', '雨景', '高清', '皮肤纹理']
		// });

		loading = false;
	}
</script>

<button class="btn btn-secondary" type="button" disabled={loading} {onclick}>
	{#if loading}
		<span class="loading loading-spinner"></span>
	{/if}
	Generate Intro</button
>

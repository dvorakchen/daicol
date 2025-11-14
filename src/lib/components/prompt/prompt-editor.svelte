<script lang="ts">
	import { promptPlugInRegex } from '$lib/share';

	let {
		text = $bindable(),
		name,
		required,
		placeholder
	}: { text?: string; name?: string; required?: boolean; placeholder?: string } = $props();

	let displayBox: HTMLDivElement;

	function oninput(ev: Event) {
		const textarea = ev.target as HTMLTextAreaElement;
		text = textarea.value;
		text = textarea.value;
		displayBox.scrollTop = textarea.scrollTop;
	}

	function onscroll(ev: Event) {
		const textarea = ev.target as HTMLTextAreaElement;
		displayBox.scrollTop = textarea.scrollTop;
	}

	type Segment = { type: 'text' | 'token'; content: string };

	let segments = $derived.by(() => {
		if (!text) return [];

		const segs: Segment[] = [];
		let lastIndex = 0;

		const regex = promptPlugInRegex();
		const matches = [...text.matchAll(regex)];

		for (const match of matches) {
			const matchStart = match.index!;
			const matchEnd = matchStart + match[0].length;

			if (matchStart > lastIndex) {
				segs.push({ type: 'text', content: text.substring(lastIndex, matchStart) });
			}

			segs.push({ type: 'token', content: match[0] });

			lastIndex = matchEnd;
		}

		if (lastIndex < text.length) {
			segs.push({ type: 'text', content: text.substring(lastIndex) });
		}

		return segs;
	});
</script>

<div class="relative h-full">
	<div
		class="pointer-events-none absolute inset-0 textarea z-10 cursor-text overflow-scroll bg-transparent break-words"
		bind:this={displayBox}
	>
		{#each segments as segment, i (i)}
			{#if segment.type === 'token'}
				<span class="odd:text-accent even:text-primary">{segment.content}</span>
			{:else}
				<div style="white-space: pre-wrap; display: inline;">{segment.content}</div>
			{/if}
		{/each}
	</div>
	<textarea
		class="absolute inset-0 textarea z-0 max-h-full resize-none"
		{name}
		{required}
		{placeholder}
		{oninput}
		{onscroll}
		spellcheck="false">{text}</textarea
	>
</div>

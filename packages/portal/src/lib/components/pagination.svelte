<script lang="ts">
	let { page = 1, total, onchange = null } = $props();

	let maxPagesToShow = 7;
	let totalPages = $derived(Math.ceil(total / 20));
	let range = $derived(calculatePaginationRange(page, totalPages, maxPagesToShow));

	function onPre() {
		if (page <= 1) {
			return;
		}

		onchange?.(--page);
	}

	function onNext() {
		if (page >= totalPages) {
			return;
		}

		onchange?.(++page);
	}

	function calculatePaginationRange(
		currentPage: number,
		totalPages: number,
		maxPagesToShow: number
	) {
		if (totalPages <= 1) {
			return [];
		}

		const offset = Math.floor((maxPagesToShow - 1) / 2);

		let startPage = currentPage - offset;

		if (startPage < 1) {
			startPage = 1;
		}

		let endPage = startPage + maxPagesToShow - 1;

		if (endPage > totalPages) {
			endPage = totalPages;

			startPage = Math.max(1, endPage - maxPagesToShow + 1);
		}

		const range = [];
		for (let i = startPage; i <= endPage; i++) {
			range.push(i);
		}

		return range;
	}

	function onPageClick(newPage: number) {
		page = newPage;
		onchange?.(page);
	}
</script>

<div class="join">
	<button class="btn join-item" onclick={onPre}>Previous page</button>
	{#each range as item (item)}
		<button
			class={['btn join-item', page === item ? 'btn-primary' : '']}
			onclick={() => onPageClick(item)}>{item}</button
		>
	{/each}

	<button class="btn join-item" onclick={onNext}>Next page</button>
</div>

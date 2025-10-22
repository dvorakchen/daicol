<script lang="ts">
	let { imageLink, open = false } = $props();
	let preivewDailog: HTMLDialogElement;

	$effect(() => {
		if (open) {
			preivewDailog?.show();
		} else {
			preivewDailog?.close();
		}
	});

	function onPreview() {
		if (imageLink === null) {
			preivewDailog?.close();
			return;
		}

		preivewDailog?.show();
	}
</script>

<button onclick={onPreview} class="cursor-pointer">
	<img src={imageLink} alt="Handled" />
</button>

<dialog bind:this={preivewDailog} class="modal">
	<div class="modal-box max-w-6xl w-fit">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-sm">✕</button>
		</form>
		<img src={imageLink} alt="Preview" />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

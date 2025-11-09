import type { Action } from 'svelte/action';

export const dragAndDropFiles: Action<HTMLElement, (files: FileList) => void> = (
	node,
	callback
) => {
	function preventDefaults(e: Event) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDragOver(e: DragEvent) {
		preventDefaults(e);
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'copy';
		}
		// node.appendChild(mask);
	}

	function handleDragLeave(e: DragEvent) {
		preventDefaults(e);
		// node.removeChild(mask);
	}

	function handleDrop(e: DragEvent) {
		preventDefaults(e);
		node.classList.remove('drag-over');

		if (e.dataTransfer && e.dataTransfer.files.length > 0) {
			callback(e.dataTransfer.files);
		}
	}

	//     const mask = document.createElement('div');
	//     mask.style.position = 'absolute';
	//     mask.style.inset = '0';
	//     mask.style.backdropFilter = 'blur(10px)';
	//     mask.style.display = 'flex';
	//     mask.style.alignItems = 'center';
	//     mask.style.justifyContent = 'center';
	//     mask.style.fontSize = '2rem';
	//     mask.style.zIndex = '100';
	//     mask.innerHTML = `
	// Release
	//     `;

	$effect(() => {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
			document.body.addEventListener(eventName, preventDefaults, false);
		});

		node.addEventListener('dragenter', handleDragOver, true);
		node.addEventListener('dragover', handleDragOver, true);
		node.addEventListener('dragleave', handleDragLeave, true);
		node.addEventListener('drop', handleDrop, true);

		return () => {
			['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
				document.body.removeEventListener(eventName, preventDefaults, false);
			});

			node.removeEventListener('dragenter', handleDragOver);
			node.removeEventListener('dragover', handleDragOver);
			node.removeEventListener('dragleave', handleDragLeave);
			node.removeEventListener('drop', handleDrop);
		};
	});
};

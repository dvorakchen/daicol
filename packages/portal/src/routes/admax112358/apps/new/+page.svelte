<script lang="ts">
	import { enhance } from '$app/forms';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import InputTags from '$lib/components/input-tags.svelte';
	import { AppCategories, enumToArray } from '$lib/share';
	import MultiUploader from '$lib/components/file-uploader/multi-uploader.svelte';
	import { upload } from '$lib/client/net/files';
	import type { SubmitFunction } from '@sveltejs/kit';

	const categoryOptions = enumToArray(AppCategories);

	let loading = $state(false);
	const refImgs: File[] = [];
	let refImgStoreNames: string[] = $state([]);
	let originImg: File | null = null;
	let originImgStoreNames = '';
	let handledImg: File | null = null;
	let handledImgStoreNames = '';
	let iconImg: File | null = null;
	let iconImgStoreNames = '';
	let barImg: File | null = null;
	let barImgStoreNames = '';

	async function afterSelectRefImg(file: File) {
		refImgs.push(file);
	}
	async function afterSelectOriginImg(file: File) {
		originImg = file;
	}
	async function afterSelectHandledImg(file: File) {
		handledImg = file;
	}
	async function afterSelectIcon(file: File) {
		iconImg = file;
	}
	async function afterSelectBarImg(file: File) {
		barImg = file;
	}

	async function uploadAllImages() {
		refImgStoreNames = [];
		for (const file of refImgs) {
			refImgStoreNames.push((await upload(file)).name);
		}

		if (originImg) {
			originImgStoreNames = (await upload(originImg)).name;
		} else {
			toastMan.add('warning', 'Need Origin Image');
			return;
		}

		if (handledImg) {
			handledImgStoreNames = (await upload(handledImg)).name;
		} else {
			toastMan.add('warning', 'Need Handled Image');
			return;
		}
		if (iconImg) {
			iconImgStoreNames = (await upload(iconImg)).name;
		} else {
			toastMan.add('warning', 'Need Icon Image');
			return;
		}
		if (barImg) {
			barImgStoreNames = (await upload(barImg)).name;
		} else {
			toastMan.add('warning', 'Need Bar Image');
			return;
		}
	}

	const enhanceSubmitEvent: SubmitFunction = async ({ formData }) => {
		loading = true;

		await uploadAllImages();
		if (refImgStoreNames) {
			formData.set('referenceImgs', JSON.stringify(refImgStoreNames));
		}
		if (originImgStoreNames) {
			formData.set('originImg', originImgStoreNames);
		}
		if (handledImgStoreNames) {
			formData.set('handledImg', handledImgStoreNames);
		}
		if (iconImgStoreNames) {
			formData.set('icon', iconImgStoreNames);
		}
		if (barImgStoreNames) {
			formData.set('barImg', barImgStoreNames);
		}
		return async ({ update }) => {
			toastMan.add('success', 'Success');
			loading = false;
			await update();
		};
	};
</script>

<main class="mx-auto max-w-7xl">
	<h1 class="my-8 text-lg font-bold">New App</h1>

	<form method="POST" action="?/create" use:enhance={enhanceSubmitEvent}>
		<div class="grid grid-cols-3 gap-4">
			<div>
				<label class="input">
					<span class="label">RouteId</span>
					<input type="text" name="routeId" required />
				</label>
			</div>

			<div>
				<label class="input">
					<span class="label">App Name</span>
					<input type="text" name="name" required />
				</label>
			</div>

			<div>
				<select class="select" required name="category" placeholder="Select Category">
					{#each categoryOptions as cate (cate.value)}
						<option value={cate.value}>{cate.label}</option>
					{/each}
				</select>
			</div>

			<div>
				<InputTags name="tags" placeholder="Tags" />
			</div>

			<div>
				<textarea class="textarea" name="description" placeholder="Description" required></textarea>
			</div>

			<div>
				<InputTags name="seoKeywords" placeholder="SEO Keywords" />
			</div>

			<div>
				<textarea class="textarea" name="seoDescription" placeholder="SEO Description" required
				></textarea>
			</div>

			<div>
				<label class="input">
					<span class="label">Model</span>
					<input type="text" name="model" required />
				</label>
			</div>

			<div>
				<label class="input">
					<span class="label">Source</span>
					<input type="text" name="source" required />
				</label>
			</div>

			<div>
				<textarea class="textarea" name="prompt" placeholder="Prompt" required></textarea>
			</div>

			<div>
				<textarea
					class="textarea"
					name="promptPlugIn"
					placeholder="promptPlugIn"
					defaultValue={'{}'}
					required
				></textarea>
			</div>
			<div></div>

			<div>
				<label class="input">
					<span class="label">Rate</span>
					<input type="number" required placeholder="Rate" min="1" max="10" name="rate" />
				</label>
			</div>
			<div>
				<label class="input">
					<span class="label">Points</span>
					<input type="number" required placeholder="Points" min="1" max="100" name="points" />
				</label>
			</div>
			<div></div>
			<div>
				<span class="label">Reference Imgs</span>
				<div class="max-w-80">
					<MultiUploader
						max={2}
						afterSelectFile={afterSelectRefImg}
						accept=".jpg, .jpeg, .png"
					/>
					<input type="text" hidden />
				</div>
			</div>
			<div>
				<span class="label">originImg</span>
				<div class="max-w-80">
					<MultiUploader
						required
						afterSelectFile={afterSelectOriginImg}
						accept=".jpg, .jpeg, .png"
					/>
				</div>
			</div>
			<div>
				<span class="label">handledImg</span>
				<div class="max-w-80">
					<MultiUploader
						required
						afterSelectFile={afterSelectHandledImg}
						accept=".jpg, .jpeg, .png"
					/>
				</div>
			</div>
			<div>
				<span class="label">icon</span>
				<div class="max-w-80">
					<MultiUploader
						required
						afterSelectFile={afterSelectIcon}
						accept=".jpg, .jpeg, .png"
					/>
				</div>
			</div>
			<div>
				<span class="label">Bar Img</span>
				<div class="max-w-80">
					<MultiUploader
						required
						afterSelectFile={afterSelectBarImg}
						accept=".jpg, .jpeg, .png"
					/>
				</div>
			</div>
		</div>

		<div class="my-4 flex flex-row-reverse gap-2">
			<button class="btn btn-primary" type="submit" disabled={loading}>
				Submit
				{#if loading}
					<span class="loading loading-spinner"></span>
				{/if}
			</button>
			<button class="btn btn-secondary" type="button" onclick={() => history.back()}>Back</button>
		</div>
	</form>
</main>

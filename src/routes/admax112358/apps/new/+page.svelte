<script lang="ts">
	import { enhance } from '$app/forms';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import InputTags from '$lib/components/input-tags.svelte';
	import { AppCategories, enumToArray } from '$lib/share';
	import MultiUploader from '$lib/components/file-uploader/multi-uploader.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { type UploadedFile } from '$lib/client/net/files';

	let { data } = $props();
	const categoryOptions = enumToArray(AppCategories);

	let loading = $state(false);
	let refImgStoreNames: UploadedFile[] = $state([]);
	let originImg: UploadedFile[] = $state([]);
	let handledImg: UploadedFile[] = $state([]);
	let iconImg: UploadedFile[] = $state([]);
	let barImg: UploadedFile[] = $state([]);

	const enhanceSubmitEvent: SubmitFunction = async ({ formData }) => {
		loading = true;
		if (refImgStoreNames) {
			formData.set('referenceImgs', JSON.stringify(refImgStoreNames.map((t) => t.url)));
		}
		if (originImg.length > 0) {
			formData.set('originImg', originImg[0].url);
		}
		if (handledImg.length > 0) {
			formData.set('handledImg', handledImg[0].url);
		}
		if (iconImg.length > 0) {
			formData.set('icon', iconImg[0].url);
		}
		if (barImg.length > 0) {
			formData.set('barImg', barImg[0].url);
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
					<input type="text" name="routeId" required defaultValue={data.unusedRouteId} />
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
						<option value={cate.label}>{cate.label}</option>
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
					<input type="text" name="model" required defaultValue="seedream-4" />
				</label>
			</div>

			<div>
				<label class="input">
					<span class="label">Source</span>
					<input type="text" name="source" required defaultValue="字节跳动" />
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
					<input type="text" required placeholder="Rate" name="rate" defaultValue="4.5" />
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
						accept=".jpg, .jpeg, .png"
						onFileChange={(files) => (refImgStoreNames = files)}
					/>
				</div>
			</div>
			<div>
				<span class="label">originImg</span>
				<div class="max-w-80">
					<MultiUploader
						required
						accept=".jpg, .jpeg, .png"
						onFileChange={(files) => (originImg = files)}
					/>
				</div>
			</div>
			<div>
				<span class="label">handledImg</span>
				<div class="max-w-80">
					<MultiUploader
						required
						accept=".jpg, .jpeg, .png"
						onFileChange={(files) => (handledImg = files)}
					/>
				</div>
			</div>
			<div>
				<span class="label">icon</span>
				<div class="max-w-80">
					<MultiUploader
						required
						accept=".jpg, .jpeg, .png"
						onFileChange={(files) => (iconImg = files)}
					/>
				</div>
			</div>
			<div>
				<span class="label">Bar Img</span>
				<div class="max-w-80">
					<MultiUploader
						required
						accept=".jpg, .jpeg, .png"
						onFileChange={(files) => (barImg = files)}
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
			<a class="btn btn-secondary" href="/admax112358/apps">Back</a>
		</div>
	</form>
</main>

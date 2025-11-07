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
	let refImgStoreNames: UploadedFile[] = $state(
		data.app.referenceImgs?.map((t) => ({ url: t }) as UploadedFile) ?? []
	);
	let originImg: UploadedFile[] = $state([{ url: data.app.originImg } as UploadedFile]);
	let handledImg: UploadedFile[] = $state([{ url: data.app.handledImg } as UploadedFile]);
	let iconImg: UploadedFile[] = $state([{ url: data.app.icon } as UploadedFile]);
	let barImg: UploadedFile[] = $state([{ url: data.app.barImg } as UploadedFile]);

	const enhanceSubmitEvent: SubmitFunction = async ({ formData }) => {
		loading = true;

		if (refImgStoreNames.length) {
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
	<h1 class="my-8 text-lg font-bold">Update App</h1>

	<form method="POST" action="?/update" use:enhance={enhanceSubmitEvent}>
		<div class="grid grid-cols-3 gap-4">
			<div>
				<label class="input">
					<span class="label">RouteId</span>
					<input type="text" defaultValue={data.app.routeId} disabled />
					<input type="text" name="routeId" defaultValue={data.app.routeId} hidden />
				</label>
			</div>

			<div>
				<label class="input">
					<span class="label">App Name</span>
					<input type="text" defaultValue={data.app.name} disabled />
					<input type="text" name="name" defaultValue={data.app.name} hidden />
				</label>
			</div>

			<div>
				<select class="select" required name="category" placeholder="Select Category">
					{#each categoryOptions as cate (cate.value)}
						<option value={cate.label} selected={data.app.category === cate.label}
							>{cate.label}</option
						>
					{/each}
				</select>
			</div>

			<div>
				<InputTags name="tags" placeholder="Tags" defaultValue={data.app.tags} />
			</div>

			<div>
				<h1>Description</h1>
				<textarea
					class="textarea"
					name="description"
					placeholder="Description"
					required
					defaultValue={data.app.description}
				></textarea>
			</div>

			<div>
				<InputTags
					name="seoKeywords"
					placeholder="SEO Keywords"
					defaultValue={data.app.seoKeywords}
				/>
			</div>

			<div>
				<h1>SEO Description</h1>
				<textarea
					class="textarea"
					name="seoDescription"
					placeholder="SEO Description"
					required
					defaultValue={data.app.seoDescription}
				></textarea>
			</div>

			<div>
				<label class="input">
					<span class="label">Model</span>
					<input type="text" name="model" required defaultValue={data.app.model} />
				</label>
			</div>

			<div>
				<label class="input">
					<span class="label">Source</span>
					<input type="text" name="source" required defaultValue={data.app.source} />
				</label>
			</div>

			<div>
				<h1>Prompt</h1>
				<textarea
					class="textarea"
					name="prompt"
					placeholder="Prompt"
					required
					defaultValue={data.app.prompt}>{data.app.prompt}</textarea
				>
			</div>

			<div>
				<h1>Prompt PlugIn</h1>
				<textarea
					class="textarea"
					name="promptPlugIn"
					placeholder="promptPlugIn"
					defaultValue={JSON.stringify(data.app.promptPlugIn)}
					required>{JSON.stringify(data.app.promptPlugIn)}</textarea
				>
			</div>
			<div></div>

			<div>
				<label class="input">
					<span class="label">Rate</span>
					<input type="text" required placeholder="Rate" name="rate" defaultValue={data.app.rate} />
				</label>
			</div>
			<div>
				<label class="input">
					<span class="label">Points</span>
					<input
						type="number"
						required
						placeholder="Points"
						min="1"
						max="100"
						name="points"
						defaultValue={data.app.points}
					/>
				</label>
			</div>
			<div></div>
			<div>
				<span class="label">Reference Imgs</span>
				<div class="max-w-80">
					<MultiUploader
						max={2}
						accept=".jpg, .jpeg, .png"
						defaultValue={refImgStoreNames}
						onFileChange={(files) => (refImgStoreNames = files)}
					/>
					<input type="text" hidden />
				</div>
			</div>
			<div>
				<span class="label">originImg</span>
				<div class="max-w-80">
					<MultiUploader
						required
						accept=".jpg, .jpeg, .png"
						defaultValue={originImg}
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
						defaultValue={handledImg}
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
						defaultValue={iconImg}
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
						defaultValue={barImg}
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

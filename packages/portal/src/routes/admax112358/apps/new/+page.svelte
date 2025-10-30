<script lang="ts">
	import { enhance } from '$app/forms';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import InputTags from '$lib/components/input-tags.svelte';
	import UploadFile from '$lib/components/upload-file.svelte';
	import { AppCategories, enumToArray } from '$lib/share';

	const categoryOptions = enumToArray(AppCategories);

</script>

<main class="mx-auto max-w-7xl">
	<h1 class="my-8 text-lg font-bold">New App</h1>

	<form
		method="POST"
		action="?/create"
		use:enhance={async () => {
			return async ({ update }) => {
				toastMan.add('success', 'Success');
				await update();
			};
		}}
	>
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
					<input type="text" name="appName" required />
				</label>
			</div>

			<div>
				<select class="select" required>
					<option disabled selected>Select Category</option>
					{#each categoryOptions as cate (cate.value)}
						<option value={cate.value}>{cate.label}</option>
					{/each}
				</select>
			</div>

			<div>
				<InputTags name="tags" placeholder="Tags" />
			</div>

			<div>
				<textarea class="textarea" placeholder="Description" required></textarea>
			</div>

			<div>
				<InputTags name="seoKeywords" placeholder="SEO Keywords" />
			</div>

			<div>
				<textarea class="textarea" placeholder="SEO Description" required></textarea>
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
				<textarea class="textarea" placeholder="Prompt" required></textarea>
			</div>

			<div>
				<label class="input">
					<span class="label">PromptPlugIn</span>
					<input type="text" name="promptPlugIn" disabled />
				</label>
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
				<div class=" shadow">
					<UploadFile />
				</div>

				<input type="text" name="referenceImgs" hidden />
			</div>
			<div>
				<span class="label">originImg</span>
				<div class=" shadow">
					<UploadFile />
				</div>

				<input type="text" name="originImg" hidden />
			</div>
			<div>
				<span class="label">handledImg</span>
				<div class=" shadow">
					<UploadFile />
				</div>

				<input type="text" name="handledImg" hidden />
			</div>
			<div>
				<span class="label">icon</span>
				<div class=" shadow">
					<UploadFile />
				</div>

				<input type="text" name="icon" hidden />
			</div>
			<div>
				<span class="label">Bar Img</span>
				<div class=" shadow">
					<UploadFile />
				</div>

				<input type="text" name="barImg" hidden />
			</div>
		</div>

		<div class="my-4 flex flex-row-reverse gap-2">
			<button class="btn btn-primary" type="submit">Submit</button>
			<button class="btn btn-secondary" type="button" onclick={() => history.back()}>Back</button>
		</div>
	</form>
</main>

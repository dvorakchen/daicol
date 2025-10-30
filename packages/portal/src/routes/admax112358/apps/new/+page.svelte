<script lang="ts">
	import { AppCategories } from '$lib/share';

	function enumToArray(enumObj: Record<string, string>): { value: string; label: string }[] {
		return Object.keys(enumObj).map((key) => ({
			value: key,
			label: enumObj[key]
		}));
	}

	const categoryOptions = enumToArray(AppCategories);
</script>

<main class="mx-auto max-w-7xl">
	<h1 class="my-8 text-lg font-bold">New App</h1>

	<form class="grid grid-cols-3" method="post" action="create">
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

		<div></div>
	</form>
</main>

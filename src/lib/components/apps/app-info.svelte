<script>
	import { m } from "$lib/paraglide/messages";
	import { DateTime } from "luxon";

	let { app } = $props();

	let displayDate = $derived.by(() => {
		return DateTime.fromJSDate(app.createAt).toISODate()
	})
</script>
<div class="overflow-hidden rounded-xl shadow-sm">
	<div class="border-b border-secondary/10 bg-secondary/10 px-5 py-3">
		<h3 class="text-lg font-bold">{m["app.ai.detail.app_info"]()}</h3>
	</div>
	<div class="bg-secondary/5 p-4">
		<table class="w-full text-sm">
			<tbody
				><tr class="border-b border-secondary/10"
					><td class="py-2 text-gray-500">{m["app.ai.detail.model"]()}</td><td class="py-2 text-right"
						>{app.model}</td
					></tr
				><tr class="border-b border-secondary/10"
					><td class="py-2 text-gray-500">{m["app.ai.detail.update_date"]()}</td><td class="py-2 text-right">{displayDate}</td
					></tr
				></tbody
			>
		</table>
	</div>
</div>

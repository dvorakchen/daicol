<!-- this is the administractor page -->
<script lang="ts">
	import ChangeLang from '$lib/components/change-lang.svelte';
	import SignOut from '$lib/components/sign-out.svelte';
	import ThemeController from '$lib/components/theme-controller.svelte';
	import { m } from '$lib/paraglide/messages';
	import { House, LayoutGrid, PanelLeftOpen } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="drawer-open drawer">
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<div class="navbar bg-base-100 shadow-sm">
			<div class="flex-1"></div>
			<div class="flex items-center gap-4">
				<a class="btn btn-circle btn-ghost" href="/">
					<House />
				</a>
				<ThemeController />
				<ChangeLang />
				<SignOut />
			</div>
		</div>
		<div class="p-4">
			{@render children()}
		</div>
	</div>

	<div class="drawer-side is-drawer-close:overflow-visible">
		<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
		<div
			class="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64"
		>
			<!-- button to open/close drawer -->
			<div
				class="m-2 flex items-center gap-4 is-drawer-close:tooltip is-drawer-close:tooltip-right"
				data-tip="Open"
			>
				<label
					for="my-drawer-4"
					class="drawer-button btn btn-circle btn-ghost is-drawer-open:rotate-y-180"
				>
					<PanelLeftOpen />
				</label>
				<span class="text-xl font-bold text-nowrap is-drawer-close:hidden">{m.title()}</span>
			</div>
			<!-- Sidebar content here -->
			<ul class="menu w-full grow gap-2 shadow-lg">
				<!-- list item -->
				<li>
					<button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
						<House />
						<span class="is-drawer-close:hidden">Homepage</span>
					</button>
				</li>

				<!-- list item -->
				<li>
					<a
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip={m['app.list']()}
						href="/admax112358/apps"
					>
						<LayoutGrid />
						<span class="is-drawer-close:hidden">{m['app.list']()}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

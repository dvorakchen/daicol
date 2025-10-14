<!-- ai generate figure -->
<script lang="ts">
	import {PUBLIC_HOST} from '$env/static/public'
	import { m } from '$lib/paraglide/messages.js';
	import { MetaTags } from 'svelte-meta-tags';

	let { children, data } = $props();
</script>

<MetaTags
  title={`${data.app.name}`}
  titleTemplate={`%s - ${m.title()}`}
  description={data.app.seoDescription}
  canonical={PUBLIC_HOST}
  openGraph={{
    url: `${PUBLIC_HOST}ai/${data.app.routeId}`,
    title: data.app.name,
    description: data.app.description,
    images: [
      {
        url: data.app.barImg,
        width: 800,
        height: 600,
        alt: data.app.name
      },
    ],
    siteName: m.title()
  }}
  />

{@render children()}

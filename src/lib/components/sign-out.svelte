<script lang="ts">
	import { HTTP_SERVER_KEY, type Http } from '$lib/client/net/http';
	import { m } from '$lib/paraglide/messages';
	import { getContext } from 'svelte';

	const http: Http = getContext(HTTP_SERVER_KEY);

	async function onclick() {
		await http.post(`/api/users/sign-out`);
		location.href = location.href;
	}
</script>

<button class="btn btn-sm btn-error" type="button" {onclick}>
	{m.sign_out()}
</button>

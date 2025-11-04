<script lang="ts">
	import { post } from '$lib/client/net/http';
	import { m } from '$lib/paraglide/messages';

	async function onclick() {
		post(`/api/users/sign-out`).subscribe(() => {
			location.href = location.href;
		});
	}
</script>

<button class="btn btn-sm btn-error" type="button" {onclick}>
	{m.sign_out()}
</button>

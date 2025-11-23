import { HTTP_SERVER_KEY, AxiosHttp } from '$lib/client/net/http.ts';
import { env } from '$env/dynamic/public';
import { setContext } from 'svelte';

export function setAllDIContext() {
	setContext(HTTP_SERVER_KEY, new AxiosHttp(env.PUBLIC_API_HOST));
}

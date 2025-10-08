import { ajax, type AjaxConfig } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { EMPTY, map, Observable, throwError } from 'rxjs';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { QS_REDIRECT_KEY } from '$lib/share/index.ts';

export type Headers = Readonly<Record<string, string>>;

export function get(url: string, headers?: Headers) {
	return httpRequest('GET', url, headers);
}

export function post(url: string, body?: unknown, headers?: Headers) {
	return httpRequest('POST', url, headers, body);
}

const redirectToSignin = () => {
	console.warn('401');
	goto(`/signin?${QS_REDIRECT_KEY}=${page.url.pathname}`, {
		replaceState: true
	});
};

const httpRequest = <T>(
	method: string,
	url: string,
	headers: Headers = {},
	body: unknown = {}
): Observable<T> => {
	const finalHeaders = {
		'Content-Type': 'application/json',
		...headers
	};

	const ajaxConfig: AjaxConfig = {
		url: url,
		method,
		headers: finalHeaders,
		body,
		responseType: 'json'
	};

	return ajax(ajaxConfig).pipe(
		map((response) => response.response as T),
		catchError((error) => {
			if (error.status === 401) {
				redirectToSignin();

				return EMPTY;
			} else {
				return throwError(() => error);
			}
		})
	);
};

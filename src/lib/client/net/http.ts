import { ajax, type AjaxConfig } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { EMPTY, map, Observable, throwError } from 'rxjs';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { QS_REDIRECT_KEY } from '$lib/share/index.ts';

export type Headers = Readonly<Record<string, string>>;

export function get<T>(url: string, headers?: Headers) {
	return httpRequest<T>('GET', url, headers);
}

/**
 * send a post request, content-type is json by default
 */
export function post<T>(url: string, body?: unknown, headers?: Headers) {
	return httpRequest<T>('POST', url, headers, body);
}

export function deleteHttp<T>(url: string, body?: unknown, headers?: Headers) {
	return httpRequest<T>('DELETE', url, headers, body);
}

export function postFile<T>(url: string, files: File[], listData: Record<string, string> = {}) {
	const formData = new FormData();

	files.forEach((file) => {
		formData.append(`file`, file);
	});
	Object.entries(listData).forEach(([key, value]) => {
		formData.append(key, value);
	});

	return httpRequest<T>('POST', url, {}, formData);
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
		...headers
	};

	if (!(body instanceof FormData) && !finalHeaders['Content-Type']) {
		finalHeaders['Content-Type'] = 'application/json';
	}

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
			switch (error.status) {
				case 401: {
					redirectToSignin();
					return EMPTY;
				}
				case 400:
				case 422: {
					return throwError(() => error.response.error);
				}
				default: {
					return throwError(() => error);
				}
			}
		})
	);
};

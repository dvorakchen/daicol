import { fromEvent, merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export type UploadedFile = {
	url: string;
	name: string;
	// image/jpeg ...
	type: string;
};

export type UploadProcessEvent = {
	type: 'progress' | 'complete' | 'error';
	loaded?: number;
	total?: number;
	percent?: number;
	url?: string;
	name?: string;
};

export function uploadFile(url: string, file: File) {
	const formData = new FormData();
	formData.append('file', file, file.name);

	const xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);

	const uploadProgress$ = fromEvent<ProgressEvent>(xhr.upload, 'progress').pipe(
		filter((event) => event.lengthComputable),
		map((event) => {
			const loaded = event.loaded;
			const total = event.total;
			const percent = Math.round((loaded / total) * 100);
			return { type: 'progress' as const, percent, loaded, total };
		})
	);

	const uploadResult$ = new Observable<UploadProcessEvent>((subscriber) => {
		xhr.onload = () => {
			if (xhr.status === 200) {
				try {
					const response = JSON.parse(xhr.responseText);
					subscriber.next({
						type: 'complete',
						url: response.url,
						name: response.name
					});
					subscriber.complete();
				} catch (e) {
					console.error(e);
					subscriber.error({
						type: 'parse_error',
						message: 'Failed to parse server response',
						rawResponse: xhr.responseText
					});
				}
			} else {
				console.error(xhr.responseText);
				subscriber.error({
					type: 'error',
					status: xhr.status,
					response: xhr.responseText
				});
			}
		};

		xhr.onerror = () => {
			subscriber.error({ type: 'error', message: '网络错误或请求失败' });
		};

		xhr.send(formData);

		return () => xhr.abort();
	});

	return merge(uploadProgress$, uploadResult$);
}

export type UploadResult = { name: string };

export async function upload(file: File) {
	const formData = new FormData();

	formData.append(`file`, file);

	const response = await fetch(`/api/files`, {
		method: 'POST',
		body: formData
	});

	const data: UploadResult = await response.json();
	return data;
}

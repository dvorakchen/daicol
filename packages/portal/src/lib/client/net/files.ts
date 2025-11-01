import { post } from "$lib/client/net/http.ts";

export function upload(file: File) {
  const formData = new FormData();

  formData.append(`file`, file);

  return post<{ name: string }>(`/api/files`, formData, {});
}

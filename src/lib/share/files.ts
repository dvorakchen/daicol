/**
 * 根据文件名返回对应的 MIME (Multipurpose Internet Mail Extensions) 类型。
 * @param filename 文件名（包含扩展名）。
 * @returns 对应的 MIME 类型字符串，如果找不到匹配项则返回 'application/octet-stream'。
 */
export function getFileMIME(filename: string): string {
	const DEFAULT_MIME = 'application/octet-stream';
	const parts = filename.split('.');
	if (parts.length < 2) {
		return DEFAULT_MIME;
	}

	const ext = parts.at(-1)?.toLowerCase();

	if (!ext) {
		return DEFAULT_MIME;
	}

	const MIME_MAP: { [key: string]: string } = {
		// 图像
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		png: 'image/png',
		webp: 'image/webp',
		bmp: 'image/bmp',
		gif: 'image/gif',
		svg: 'image/svg+xml',
		ico: 'image/x-icon',

		// 视频
		mp4: 'video/mp4',
		webm: 'video/webm',
		mov: 'video/quicktime',
		avi: 'video/x-msvideo',

		// 音频
		mp3: 'audio/mpeg',
		wav: 'audio/wav',
		ogg: 'audio/ogg',

		// 文档
		pdf: 'application/pdf',
		doc: 'application/msword',
		docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		xls: 'application/vnd.ms-excel',
		xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		ppt: 'application/vnd.ms-powerpoint',
		pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		txt: 'text/plain',
		csv: 'text/csv',
		html: 'text/html',
		json: 'application/json',

		// 压缩和可执行
		zip: 'application/zip',
		rar: 'application/x-rar-compressed',
		'7z': 'application/x-7z-compressed',
		exe: 'application/x-msdownload'
	};

	return MIME_MAP[ext] || DEFAULT_MIME;
}

import { Buffer } from 'node:buffer';

// 常见的图片类型魔术数字（十六进制）
const imageMagicNumbers: { [key: string]: string } = {
	// JPEG / JPG：通常是 FFD8 FFE0 或 FFD8 FFE1 开头
	ffd8ff: 'image/jpeg',
	// PNG: 89 50 4E 47 (4 字节)
	'89504e47': 'image/png',
	// GIF: 47 49 46 38 (4 字节)
	'47494638': 'image/gif',
	// BMP: 42 4D (2 字节)
	'424d': 'image/bmp',
	// TIFF (大端): 4D 4D (MM)
	'4d4d': 'image/tiff',
	// TIFF (小端): 49 49 (II)
	'4949': 'image/tiff'
};

// WebP 需要 12 个字节：RIFF (0-3) + (4-7 size) + WEBP (8-11)
const WEBP_RIFF_HEX = '52494646'; // RIFF
const WEBP_SIGNATURE_HEX = '57454250'; // WEBP
const MIN_WEBP_SIZE = 12; // WebP 至少需要的 Buffer 长度

/**
 * 通过 Buffer 的魔术数字判断图片类型。
 * @param {Buffer} buffer 包含文件开头的 Buffer 对象。
 * @returns {string | null} 返回 MIME 类型或 null。
 */
export function detectImageTypeByMagicNumber(buffer: Buffer): string | null {
	const bytesRead = buffer.length;

	// 检查是否足够进行基础判断
	if (bytesRead < 2) {
		return null; // Buffer 太小，无法判断
	}

	// 1. 将读取到的字节转换为十六进制字符串
	// 仅转换 Buffer 的前 8 个字节（足够覆盖大多数基础格式）
	const hexSignature = buffer.slice(0, Math.min(bytesRead, 8)).toString('hex').toLowerCase();

	// 2. 遍历魔术数字列表进行比对
	for (const [magic, mimeType] of Object.entries(imageMagicNumbers)) {
		if (hexSignature.startsWith(magic)) {
			return mimeType;
		}
	}

	// 3. 特殊格式检查: WebP
	// 检查是否读取了至少 12 个字节，并且前 4 个字节是 'RIFF'
	if (
		bytesRead >= MIN_WEBP_SIZE &&
		buffer.slice(0, 4).toString('hex').toLowerCase() === WEBP_RIFF_HEX
	) {
		// 检查偏移量 8 处的 'WEBP' 签名
		const webpCheck = buffer.slice(8, 12).toString('hex').toLowerCase();

		if (webpCheck === WEBP_SIGNATURE_HEX) {
			return 'image/webp';
		}
	}

	return null;
}

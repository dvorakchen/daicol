import sharp from "sharp";
import { Buffer } from "node:buffer";

/**
 * 调整图片大小并将其压缩为 WebP 格式。
 * @param input 包含原始图像数据的 Buffer 对象。
 * @param width 目标宽度最大（可选，默认为 800）。
 * @param quality WebP 压缩质量 (0-100)，默认为 80。
 * @returns 包含 WebP 格式图像数据的新 Buffer 对象。
 */
export async function resizeAndCompressToWebp(
  input: Buffer,
  width: number = 800,
  quality: number = 80,
): Promise<Buffer> {
  const image = sharp(input);

  const metadata = await image.metadata();
  const originalWidth = metadata.width;

  let pipeline = image;

  if (originalWidth && originalWidth > width) {
    pipeline = pipeline.resize(width);
  }

  return pipeline.webp({ quality: quality }).toBuffer();
}

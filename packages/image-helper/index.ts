export { detectImageTypeByMagicNumber } from "./image-type.ts";
export { resizeAndCompressToWebp } from "./compress.ts";

export const SupportImage = {
  Webp: "webp",
  Png: "png",
  Jpg: "jpg",
  Jpeg: "jpeg",
} as const;

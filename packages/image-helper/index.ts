export { detectImageTypeByMagicNumber } from "./image-type.ts";
export { resizeAndCompress } from "./compress.ts";

export const SupportImage = {
  // Webp: "webp",
  Png: "png",
  Jpg: "jpg",
  Jpeg: "jpeg",
} as const;

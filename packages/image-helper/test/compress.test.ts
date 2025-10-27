import { resizeAndCompressToWebp } from "../compress.ts";
import fs from "node:fs/promises";
import { assertGreaterOrEqual } from "@std/assert";

const INPUT_IMAGE = "test/input.jpg";

Deno.test("compress jpg to webp", async () => {
  const input = await fs.readFile(INPUT_IMAGE);
  console.log(`原始文件大小: ${input.length} bytes`);

  const output = await resizeAndCompressToWebp(input);

  console.log(`压缩后的 WebP 文件大小: ${output.length} bytes`);

  assertGreaterOrEqual(input.length, output.length);
});

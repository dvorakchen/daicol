import { resizeAndCompress } from "../compress.ts";
import fs from "node:fs/promises";
import { assertGreaterOrEqual } from "@std/assert";

const INPUT_IMAGE = "test/input.jpg";

Deno.test("resize and compress", async () => {
  const input = await fs.readFile(INPUT_IMAGE);
  console.log(`原始图片大小: ${input.length} bytes`);

  const output = await resizeAndCompress(input, 200);

  console.log(`压缩后的图片大小: ${output.length} bytes`);

  assertGreaterOrEqual(input.length, output.length);
});

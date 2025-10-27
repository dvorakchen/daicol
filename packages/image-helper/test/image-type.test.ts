import fs from "node:fs/promises";
import { detectImageTypeByMagicNumber } from "../image-type.ts";
import { assertEquals } from "@std/assert";

const INPUT_IMAGE = "test/input.jpg";

Deno.test("detect type for jpeg", async () => {
  const input = await fs.readFile(INPUT_IMAGE);

  const output = detectImageTypeByMagicNumber(input);

  assertEquals(output, "image/jpeg");
});

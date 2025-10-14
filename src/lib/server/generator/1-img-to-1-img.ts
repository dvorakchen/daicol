import { env } from "$env/dynamic/private";
import { Buffer } from "node:buffer";
import logger from "$lib/server/log.ts";
import { m } from "$lib/paraglide/messages.js";

export async function generate(file: File, prompt: string): Promise<string> {
  logger.info(`generate 1-img-to-1-img`);
  logger.info(`file: ${file}`);

  const ext = file.name.split(".").at(-1);
  logger.info("file extension name: " + ext);

  const buf = await file.arrayBuffer();

  const base64Image = Buffer.from(buf).toString("base64");

  const response = await fetch(
    "https://ark.cn-beijing.volces.com/api/v3/images/generations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.VOLCENGINE_API_KEY}`,
      },
      body: JSON.stringify({
        "model": "doubao-seedream-4-0-250828",
        "prompt": prompt,
        "image": `data:image/${ext};base64,${base64Image}`,
        "size": "2K",
        "sequential_image_generation": "disabled",
        "stream": false,
        "response_format": "url",
        "watermark": false,
      }),
    },
  );

  const json = await response.json();

  if (json.error) {
    logger.error(`call doubao api failed: ` + JSON.stringify(json));
    const errorCodes = new Set([
      "OutputImageSensitiveContentDetected",
      "InputImageSensitiveContentDetected",
    ]);
    let errorMsg = json.error.code ?? '';

    if (errorCodes.has(errorMsg)) {
      errorMsg = m["app.ai.generate.error.sensitive_content"]();
    } else if ((errorMsg) === "QuotaExceeded") {
      logger.error("doubao api out of limits!");
    } else if ((errorMsg) === "AuthenticationError") {
      logger.error("doubao api key error");
    }

    throw errorMsg;
  }

  const url = json.data[0].url;
  logger.info(`generated ${url}`);

  return url;
}

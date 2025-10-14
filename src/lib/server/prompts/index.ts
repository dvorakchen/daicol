import prompts10001to10050 from "$lib/server/prompts/10001-10050.ts";
import logger from "$lib/server/log.ts";

export function getPrompt(routeId: number): string {
  let prompt: { routeId: number; prompt: string } | undefined;
  if (routeId >= 10001 && routeId <= 10050) {
    prompt = prompts10001to10050.find((t) => t.routeId === (+routeId));
  }

  if (!prompt) {
    throw `Can not get prompt by routeId: ${routeId}`;
  }

  logger.info(`routeId got prompt: ${prompt.prompt}`);
  return prompt.prompt;
}

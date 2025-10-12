import prompts10001to10050 from "./10001-10050.ts";

export function getPrompt(routeId: number): string {
  let prompt: { routeId: number; prompt: string } | undefined;
  if (routeId >= 10001 && routeId <= 10050) {
    prompt = prompts10001to10050.find((t) => t.routeId === routeId);
  }

  if (!prompt) {
    throw `Can not get prompt by routeId: ${routeId}`;
  }

  return prompt.prompt;
}

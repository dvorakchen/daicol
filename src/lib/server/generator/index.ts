import type { ServiceIdentifier } from 'inversify';
import type { PromptBaseIntro } from '$lib/share/prompt.ts';

export type ReferenceImage = {
	mimeType: string;
	content: ArrayBuffer;
};

export interface Generator {
	genImage(images: ReferenceImage[], prompt: string): Promise<string[]>;
}

export const generatorServiceId: ServiceIdentifier<Generator> = Symbol.for('generatorServiceId');

export interface PromptBaseIntroGenerator {
	genInfoByPrompt(prompt: string): Promise<PromptBaseIntro>;
}

export const promptBaseIntroGeneratorServiceId: ServiceIdentifier<Generator> = Symbol.for(
	'promptBaseIntroGeneratorServiceId'
);

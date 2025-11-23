import type { ServiceIdentifier } from 'inversify';

export type ReferenceImage = {
	mimeType: string;
	content: ArrayBuffer;
};

export interface Generator {
	genImage(images: ReferenceImage[], prompt: string): Promise<string[]>;
}

export const generatorServiceId: ServiceIdentifier<Generator> = Symbol.for('generatorServiceId');

export type PromptBaseIntro = {
	keywords: string[];
	description: string;
	title: string;
	summary: string;
	tags: string[];
};

export interface PromptBaseIntroGenerator {
	genInfoByPrompt(prompt: string): Promise<PromptBaseIntro>;
}

export const promptBaseIntroGeneratorServiceId: ServiceIdentifier<Generator> = Symbol.for(
	'promptBaseIntroGeneratorServiceId'
);

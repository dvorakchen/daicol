import type { ServiceIdentifier } from 'inversify';

export type ReferenceImage = {
	mimeType: string;
	content: ArrayBuffer;
};

export interface Generator {
	genImage(images: ReferenceImage[], prompt: string): Promise<string[]>;
}

export const generatorServiceId: ServiceIdentifier<Generator> = Symbol.for('generatorServiceId');

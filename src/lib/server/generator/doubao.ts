import { type Generator, type ReferenceImage } from '$lib/server/generator/index.ts';
import { env } from '$env/dynamic/private';
import { Buffer } from 'node:buffer';
import { m } from '$lib/paraglide/messages.js';
import { loggerServiceId, type Logger } from '$lib/server/logger/index.ts';
import { inject } from 'inversify';

const ErrorCode = {
	OutputImageSensitiveContentDetected: 'OutputImageSensitiveContentDetected',
	InputImageSensitiveContentDetected: 'InputImageSensitiveContentDetected'
};

export type DaoBaoResponseType = {
	model: string;
	created: number;
	data: {
		url: string;
		size: string;
	}[];
	usage: {
		generated_images: number;
		output_tokens: string;
		total_tokens: string;
	};
	error: {
		code: string;
		message: string;
	};
};

export class DoubaoGenerator implements Generator {
	constructor(@inject(loggerServiceId) private logger: Logger) {}

	async genImage(images: ReferenceImage[], prompt: string): Promise<string[]> {
		this.logger.info(`images: ${images.length}`);

		const imgBase64s: string[] = [];
		for (const img of images) {
			this.logger.info('file mime: ' + img.mimeType);

			const buf = img.content;

			const base64Image = Buffer.from(buf).toString('base64');
			imgBase64s.push(`data:${img.mimeType};base64,${base64Image}`);
		}

		const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.VOLCENGINE_API_KEY}`
			},
			body: JSON.stringify({
				model: 'doubao-seedream-4-0-250828',
				prompt: prompt,
				image: imgBase64s,
				size: '2K',
				sequential_image_generation: 'disabled',
				sequential_image_generation_options: {
					max_images: 1
				},
				stream: false,
				response_format: 'url',
				watermark: false
			})
		});

		const json: DaoBaoResponseType = await response.json();

		if (json.error) {
			this.logger.error(`call doubao api failed: ` + JSON.stringify(json));
			const errorCodes = new Set([
				ErrorCode.OutputImageSensitiveContentDetected,
				ErrorCode.InputImageSensitiveContentDetected
			]);
			let errorMsg = json.error.code ?? '';

			if (errorCodes.has(errorMsg)) {
				errorMsg = m['app.ai.generate.error.sensitive_content']();
			} else if (errorMsg === 'QuotaExceeded') {
				this.logger.error('doubao api out of limits!');
			} else if (errorMsg === 'AuthenticationError') {
				this.logger.error('doubao api key error');
			}

			throw errorMsg;
		}

		const urls = json.data.map((t) => t.url);
		this.logger.info(`generated ${urls}`);

		return urls;
	}
}

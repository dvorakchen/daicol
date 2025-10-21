import { env } from '$env/dynamic/private';
import { Buffer } from 'node:buffer';
import logger from '$lib/server/log.ts';
import { m } from '$lib/paraglide/messages.js';
import type { ReferenceImage } from '$lib/server/generator/index.ts';

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

export async function generate(
	images: ReferenceImage[],
	prompt: string,
	maxImages: number = 1
): Promise<string[]> {
	logger.info(`images: ${images.length}`);

	const imgBase64s: string[] = [];
	for (const img of images) {
		const ext = img.filename.split('.').at(-1);
		logger.info('file extension name: ' + ext);

		const buf = img.content;

		const base64Image = Buffer.from(buf).toString('base64');
		imgBase64s.push(`data:image/${ext};base64,${base64Image}`);
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
			sequential_image_generation: maxImages <= 1 ? 'disabled' : 'auto',
			sequential_image_generation_options: {
				max_images: maxImages
			},
			stream: false,
			response_format: 'url',
			watermark: false
		})
	});

	const json: DaoBaoResponseType = await response.json();

	if (json.error) {
		logger.error(`call doubao api failed: ` + JSON.stringify(json));
		const errorCodes = new Set([
			ErrorCode.OutputImageSensitiveContentDetected,
			ErrorCode.InputImageSensitiveContentDetected
		]);
		let errorMsg = json.error.code ?? '';

		if (errorCodes.has(errorMsg)) {
			errorMsg = m['app.ai.generate.error.sensitive_content']();
		} else if (errorMsg === 'QuotaExceeded') {
			logger.error('doubao api out of limits!');
		} else if (errorMsg === 'AuthenticationError') {
			logger.error('doubao api key error');
		}

		throw errorMsg;
	}

	const urls = json.data.map((t) => t.url);
	logger.info(`generated ${urls}`);

	return urls;
}

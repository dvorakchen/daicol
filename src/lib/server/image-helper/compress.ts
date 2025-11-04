import { Buffer } from 'node:buffer';
import { Jimp } from 'jimp';

export async function resizeAndCompress(input: Buffer, width: number = 800): Promise<Buffer> {
	const image = await Jimp.read(input);

	const originalWidth = image.width;

	if (originalWidth > width) {
		image.resize({ w: width });
	} else {
		return input;
	}

	console.log(image.mime);

	const resBuf = await image.getBuffer('image/jpeg');

	return resBuf.length < input.length ? resBuf : input;
}

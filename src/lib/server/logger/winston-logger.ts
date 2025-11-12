import winston, { createLogger, format, transports } from 'winston';
import type { Logger } from '$lib/server/logger/index.ts';

export class WinstonLogger implements Logger {
	private readonly logger: winston.Logger;
	constructor() {
		const { combine, timestamp, label, prettyPrint } = format;

		this.logger = createLogger({
			level: 'info',
			format: combine(label({ label: 'Daicol Server' }), timestamp(), prettyPrint()),
			transports: [new transports.Console()]
		});
	}

	info(message: string): void {
		this.logger.info(message);
	}
	warn(message: string): void {
		this.logger.warn(message);
	}
	error(message: string): void {
		this.logger.error(message);
	}
}
